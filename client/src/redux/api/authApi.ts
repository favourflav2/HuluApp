import axios from 'axios'

interface SignUpData {
    email:string | number,
    password: string | number;
    firstName:string | number;
    lastName:string | number;
}

interface LoginData {
    email: string | number;
    password: string | number
}

export interface Save {
    img:string,
    type:string;
    item_id: number,
    name:string;
}

interface ChangeName {
    firstName:string | number,
    lastName:string | number
}

const devEnv = process.env.NODE_ENV !== "production"


const API = axios.create({baseURL: `{${devEnv ? process.env.REACT_APP_LOCALHOST_API : process.env.REACT_APP_PROD_API}}`})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile") || '{}').token}`
    }
    return req
})

export function sign_Up(data:SignUpData){
    return API.post("/auth/signup",data)
}

export function log_In(data:LoginData){
    return API.post("/auth/login",data)
}

export function save_Tv_Or_Movie(data:Save){
    return API.post("/auth/save",data)
}

export function get_All_Stuff(){
    return API.get("/auth/getAllStuff")
}

export function change_Name(data:ChangeName){
    return API.post("/auth/changeName",data)
}

export function change_Email(data:ChangeName){
    return API.post("/auth/changeEmail",data)
}
