import type { TaskType, updateTaskProps } from "../types";
import { api } from "./auth";


export const getTasks = async()=>{
    try {
        const storedToken = localStorage.getItem('token');
        const response = await api.get('/tasks',{
        headers:{
            Authorization:`Bearer ${storedToken}`
        }
    });
        console.log(response.data);
        
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error('Could not get Tasks');
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
    } catch (error) {
        console.log(error);
        throw new Error('Could not create Task');
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
    } catch (error) {
        console.log(error);
        throw new Error('Could not create Task');
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
    } catch (error) {
        console.log(error);
        throw new Error('Could not delete Task');
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
    } catch (error) {
        console.log(error);
        throw new Error('Could not get users Task');
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
    } catch (error) {
        console.log(error);
        throw new Error('Could not get Task history');
    }
}