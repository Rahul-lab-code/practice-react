import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { myData } from "../services/auth";

interface AuthContextType{
    token : string|null;
    role : string | null;
    isLoading : boolean;
    login : (token:string,role:string)=>void;
    logout : ()=>void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}:{children : ReactNode})=>{
    const [token,setToken] = useState<string | null>(localStorage.getItem('token'));
    const [role,setRole] = useState<string|null>(null);
    const [isLoading,setIsLoading] = useState(true);

    useEffect(()=>{
        restoreSession();
    },[]);

    const restoreSession = async() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const response = await myData(storedToken);
      setToken(storedToken);
      setRole(response.role);
      setIsLoading(false);
    }
  };

    const login = (token:string,role:string)=>{
        setToken(token);
        setRole(role);
        localStorage.setItem('token',token);
        localStorage.setItem('role',role);
        setIsLoading(false);
    }

    const logout = ()=>{
        setToken(null);
        setRole(null);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setIsLoading(false);
    }
    return (
        <AuthContext.Provider value={{token,role,login,logout,isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("Use Auth must be provided");
    }
    return context;
}