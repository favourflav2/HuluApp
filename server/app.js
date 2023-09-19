import morgan from "morgan";
import express from "express";
import cors from "cors"
import dotenv from 'dotenv'
import { env } from "custom-env";
import helmet from 'helmet'
import authRoutes from "./routes/authRoutes.js";
env(true);

const app = express()

//* Middleware
dotenv.config()
app.use(cors())
app.use(morgan("dev"))
app.use(helmet())
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

const port = process.env.PORT || 5001

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})

app.get('/',(req,res)=>{
    console.log("Welcome to the backend")
})

app.use("/auth",authRoutes)

console.log(process.env.NODE_ENV);