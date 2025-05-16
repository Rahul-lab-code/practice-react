import axios from "axios";
import type { loginProps } from "../types";
const API_BASE_URL = "http://localhost:3000";


export const api = axios.create({
    baseURL:API_BASE_URL,
    headers:{
        "Content-Type":"application/json",
    }
});

export const myData = async (storedToken:string)=>{

    const response = await api.get('/me',{
        headers:{
            Authorization:`Bearer ${storedToken}`
        }
    });
    return response.data;
}

export const login = async({username,password}:loginProps)=>{
    try{
        const response = await api.post('/auth/login',{
            username,
            password
        });
        return response.data;
    }catch(e){
        console.log("Login Failed Please Try Again", e);
        throw new Error("Invalid Credintials");
    }
}