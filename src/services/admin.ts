import type { RegisterProps } from "../types";
import { api } from "./auth"


export const getUsers =async ()=>{
    try{
        const storedToken = localStorage.getItem('token');
        const response = await api.get('/users',{
        headers:{
            Authorization:`Bearer ${storedToken}`
        }
    })
        return response.data;
    }catch(err){
        console.log(err);
        throw new Error ("Coudnt get the users");
    }
}



export const updateUser = async(id:string,username:string,role:string)=>{
    try{
        const storedToken = localStorage.getItem('token');
        const response = await api.put(`/users/${id}`,{
            username,
            role
        },{
        headers:{
            Authorization:`Bearer ${storedToken}`
        }
    })
        return response;
    }catch(err){
        console.log(err);
        throw new Error('Cannot update User');
    }
}


export const deleteUser = async(id:string)=>{
    try{
        const storedToken = localStorage.getItem('token');
        const response = await api.delete(`/users/${id}`,{
        headers:{
            Authorization:`Bearer ${storedToken}`
        }
    })
        return response;
    }catch(err){
        console.log(err);
        throw new Error('Cannot Delete User');
    }
}

export const createUser = async ({username,password,role}:RegisterProps) => {
    try{
        const storedToken = localStorage.getItem('token');
        const response = await api.post(`/auth/register`,{
            username,
            password,
            role
        },{
        headers:{
            Authorization:`Bearer ${storedToken}`
        }
    })
        return response;
    }catch(err){
        console.log(err);
        throw new Error('Cannot Create User');
    }
}