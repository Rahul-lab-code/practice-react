import { useEffect, useState, type JSX } from 'react';
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({ children, allowedRoles }: { children: JSX.Element; allowedRoles: string[] }) => {
  const {isLoading, role, token, } = useAuth();
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if(!isLoading){
      if (!token || !role || !allowedRoles.includes(role)) {
      navigate('/login'); 
    } else {
      setIsAuthorized(true); 
    }
    }
  }, [token, role, allowedRoles]);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  if (!isAuthorized) {
    return null;
  }

  return children;
};

export default ProtectedRoutes;