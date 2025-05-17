/* eslint-disable @typescript-eslint/no-explicit-any */

import type { RegisterProps } from "../types";
import { api } from "./auth"


export function generateErrorMessage(
  status?: number,
  backendMessage?: string,
  resource = "resource"
): string {
  if (typeof status !== "number") {
    return `An error occurred while processing the ${resource}.`;
  }

  switch (status) {
    case 400:
      return backendMessage || `Bad request.`;
    case 401:
      return "Unauthorized: Please log in again.";
    case 403:
      return `Forbidden: You do not have permission to perform this action.`;
    case 404:
      return `resource not found.`;
    case 409:
      return backendMessage || `Conflict: The ${resource} already exists.`;
    case 500:
      return `Server error while processing the ${resource}. Try again later.`;
    case 201:
      return backendMessage ||  `resource created successfully.`;
    case 204:
      return backendMessage || `No content.`;
    default:
      return backendMessage || `An error occurred while processing the ${resource}.`;
  }
}


export const getUsers =async ()=>{
    try{
        const storedToken = localStorage.getItem('token');
        const response = await api.get('/users',{
        headers:{
            Authorization:`Bearer ${storedToken}`
        }
    })
        return response.data;
    }catch(err:any){
        if (err.response) {
            const message = generateErrorMessage(err.response.status, err.response.data?.message, "user");
            throw new Error(message);
        }
        throw new Error("Couldn't process user request.");
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
    }catch(err:any){
        if (err.response) {
            const message = generateErrorMessage(err.response.status, err.response.data?.message, "user");
            throw new Error(message);
        }
        throw new Error("Couldn't process user request.");
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
    }catch(err:any){
        if (err.response) {
            const message = generateErrorMessage(err.response.status, err.response.data?.message, "user");
            throw new Error(message);
        }
        throw new Error("Couldn't process user request.");
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
    }catch(err:any){
        if (err.response) {
            const message = generateErrorMessage(err.response.status, err.response.data?.message, "user");
            throw new Error(message);
        }
        throw new Error("Couldn't process user request.");
    }
}