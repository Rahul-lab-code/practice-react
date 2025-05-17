/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TaskType, updateTaskProps } from "../types";
import { generateErrorMessage } from "./admin";
import { api } from "./auth";


export const getTasks = async (page = 1, limit = 10) => {
  try {
    const storedToken = localStorage.getItem('token');
    const response = await api.get('/tasks', {
      headers: {
        Authorization: `Bearer ${storedToken}`
      },
      params: {
        page,
        limit
      }
    });
    console.log(response.data);
    return response.data;
  } catch(err:any){
          if (err.response) {
              const message = generateErrorMessage(err.response.status, err.response.data?.message, "task");
              throw new Error(message);
          }
          throw new Error("Couldn't process user request.");
      }
}



export const createTask = async({title,description,priority,assignees}:TaskType)=>{
    try {
        const storedToken = localStorage.getItem('token');
        const response = await api.post('/tasks',{
            title,
            description,
            priority,
            assignees
        },{
        headers:{
            Authorization:`Bearer ${storedToken}`
        }
    });
        return response;
    } catch(err:any){
        if (err.response) {
            const message = generateErrorMessage(err.response.status, err.response.data?.message, "task");
            throw new Error(message);
        }
        throw new Error("Couldn't process user request.");
    }
}


export const updateTask = async({id,status,description,priority}:updateTaskProps)=>{
    try {
        const storedToken = localStorage.getItem('token');
        const response = await api.put(`/tasks/${id}`,{
            description,
            priority,
            status
        },{
        headers:{
            Authorization:`Bearer ${storedToken}`
        }
    });
        return response;
    }catch(err:any){
        if (err.response) {
            const message = generateErrorMessage(err.response.status, err.response.data?.message, "task");
            throw new Error(message);
        }
        throw new Error("Couldn't process user request.");
    }
}

export const deleteTask = async(id:string)=>{
    try {
        const storedToken = localStorage.getItem('token');
        const response = await api.delete(`/tasks/${id}`,{
        headers:{
            Authorization:`Bearer ${storedToken}`
        }
    });
        return response;
    } catch(err:any){
        if (err.response) {
            const message = generateErrorMessage(err.response.status, err.response.data?.message, "user");
            throw new Error(message);
        }
        throw new Error("Couldn't process user request.");
    }
}

export const userTasks = async(userId:string)=>{
    try {
        const storedToken = localStorage.getItem('token');
        const response = await api.delete(`/tasks/user/${userId}`,{
        headers:{
            Authorization:`Bearer ${storedToken}`
        }
    });
        return response.data;
    } catch(err:any){
        if (err.response) {
            const message = generateErrorMessage(err.response.status, err.response.data?.message, "user");
            throw new Error(message);
        }
        throw new Error("Couldn't process user request.");
    }
}


export const taskHistory = async(taskId:string)=>{
    try {
        const storedToken = localStorage.getItem('token');
        const response = await api.delete(`/tasks/${taskId}/history`,{
        headers:{
            Authorization:`Bearer ${storedToken}`
        }
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