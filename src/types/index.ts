export interface loginProps{
    username : string;
    password : string;
}

export type fetchedUserType = {
    username:string;
    _id: string;
    role:'member'|'admin'
}

export interface RegisterProps extends loginProps{
    role : 'member' | 'admin';
}

export type PriorityType = "Low" | "Medium" | "High";

export type StatusType = {
    status : "Created" | "In Progress" | "Under Review" | "Closed";
}

export interface TaskType{
    title:string;
    description:string;
    priority : PriorityType;
    assignees : string[];
}

export interface updateTaskProps {
    priority : PriorityType;
    status : StatusType;
    description:string;
    id:string;
}


export interface fetchedTaskType extends Omit<TaskType, 'assignees'> {
    _id: string;
    assignees: fetchedUserType[];
}
