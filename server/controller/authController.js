import pg from "pg";
const { Pool } = pg;
import { env } from "custom-env";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
env(true);

const pool = new Pool({
  connectionString: process.env.POSTGRES_URI,
});
pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export async function signUp(req, res) {
  try {
    const { firstName, lastName, password, email } = req.body;
    
    // First we check if theres already a user with this email
    const loginText = "SELECT * FROM login WHERE email = $1";
    const loginEmail = [email];
    const checkLoginTable = await pool.query(loginText, loginEmail);

    if (checkLoginTable?.rows?.length) {
      return res.status(400).json({ msg: "This email is already being used" });
    }

    // If theres no email match we can now push email and password into login table
    const hash = await bcrypt.hash(password, 10);
    const text = `INSERT INTO login (hash,email) VALUES ($1, $2) RETURNING *`;
    const values = [hash, email];
    const pushIntoLoginTable = await pool.query(text, values);

    // Once the email and hashed password has been pushed into login table we now push the req.body info into users tables
    const userText = "INSERT INTO users (first_name, last_name, email, joined) VALUES ($1, $2, $3, $4) RETURNING *";
    const userValues = [firstName, lastName, email, new Date()];
    const user = await pool.query(userText, userValues);

    // Token
    const token = jwt.sign({ email: email, id: user?.rows[0].id }, process.env.SECRET, { expiresIn: "3h" });

    // Send Token and User to frontend
    res.status(200).json({ user: user.rows[0], token });
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
}

export async function logIn(req, res) {
  try {
    const {email, password} = req.body

    // First we check if the email we get is in the login table
    const loginCheck = "SELECT * FROM login WHERE email = $1"
    const loginValue = [email]
    const loginTable = await pool.query(loginCheck, loginValue)

    // If the email we get from the frontend is not inside the login table we return an error
    if(!loginTable.rows[0]){
        return res.status(400).json({ msg: "Theres no users with that email" });
    }

    // If the email from the frontend matches the one in our login table we check if the passwords are the same
    const isMatch = await bcrypt.compare(password, loginTable.rows[0].hash)

    // If the passwords dont match we throw an error
    if(!isMatch){
        return res.status(400).json({ msg: "Passwords do not match" });
    }

    const text = "SELECT * FROM users WHERE email = $1"
    const values = [email]
    const user = await pool.query(text,values)
    const token = jwt.sign({email:email, id:user.rows[0].id}, process.env.SECRET, {expiresIn:"3h"})
    res.status(200).json({user:user.rows[0],token})
    //res.send(loginTable.rows[0])
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
}

export async function saveTvOrMovie(req,res){
  try{
    const {item_id, name, type, img} = req.body
    const userId = req.userId
    

    // Check if movie or tv is already in table
    const text = 'SELECT * FROM my_stuff WHERE who_liked = $1'
    const values = [userId]
    const liked_tv_or_movie_table = await pool.query(text,values)

    // Now we use findindex over the array we get from our database ... if the item in our db is equal to what we get from the frontend we will remove the item ... else we will add the item
    //* If we dont find a match find index will return -1

    const index = liked_tv_or_movie_table.rows.findIndex(val => val.name === name && val.item_id === item_id.toString())
   

    if(index === -1){
      const addText = "INSERT INTO my_stuff (img, type, item_id, name, who_liked ) VALUES ($1, $2, $3, $4, $5) RETURNING *"
      const addValues = [img, type, item_id, name, userId]
      const addIntoMyStuff = await pool.query(addText, addValues)
    }else{
      const removeText = 'DELETE FROM my_stuff WHERE name = $1 AND item_id = $2'
      const removeValues = [name,item_id]
      const removeFromMyStuff = await pool.query(removeText, removeValues)
    }

    const allUserStuff = await pool.query(text,values)
    return res.status(200).json(allUserStuff.rows)

  }catch(e){
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
}

export async function getAllSavedStuff(req,res){
  try{
    const text = 'SELECT * FROM my_stuff WHERE who_liked = $1'
    const result = await pool.query(text,[req.userId])

    return res.status(200).json(result.rows)

  }catch(e){
    console.log(e.message);
    res.status(400).json({ msg: e.message });
  }
}

export async function changeName(req,res){
  try{
    const userId = req.userId
    const {firstName, lastName, email} = req.body
    const text = 'UPDATE users SET first_name = $1, last_name = $2 WHERE id = $3 RETURNING *  '
    const values = [firstName,lastName, userId]
    const user = await pool.query(text,values)
    //console.log(user?.rows[0])
    res.status(200).json(user?.rows[0])

  }catch(e){
    console.log(e.message);
    res.status(400).json({ msg: e.message });
  }
}

export async function changeEmail(req,res){
  try{
    const {email} = req.body

    // Going to get logged in user email here
    const userText = "SELECT email FROM users WHERE id = $1"
    const loggedInUserEmail = await pool.query(userText,[req.userId])
    
  
    // Going to check if the new email from the frontend is in our login table already
    const text = "SELECT * FROM login WHERE email = $1"
    const values = [email]
    const sameEmailCheck = await pool.query(text,values)
    
    //* If new email is already in our table we throw an error
    if(sameEmailCheck?.rows?.length){
      return res.status(400).json({msg:"This email is already being used by you or another user"})
    }

    //* If theres no error we update the logged in users email with the new email from out frontend
    const updateLoginEmailText = "UPDATE login SET email = $1 WHERE email = $2 RETURNING *"
    const updateLoginEmail = await pool.query(updateLoginEmailText,[email, loggedInUserEmail?.rows[0].email])
    

    //* We also update our users table 
    const updateUserEmailText = "UPDATE users SET email = $1 WHERE id = $2 RETURNING *"
    const updateUserEmail = await pool.query(updateUserEmailText,[email, `${req.userId}`])

    res.status(200).json(updateUserEmail?.rows[0])


  }catch(e){
    console.log(e.message);
    res.status(400).json({ msg: e.message });
  }
}

