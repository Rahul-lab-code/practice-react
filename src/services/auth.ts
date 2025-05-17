/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import type { loginProps } from "../types";
import { generateErrorMessage } from "./admin";
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
    }catch(err:any){
            if (err.response) {
                const message = generateErrorMessage(err.response.status, err.response.data?.message, "user");
                throw new Error(message);
            }
            throw new Error("Couldn't process user request.");
        }
}