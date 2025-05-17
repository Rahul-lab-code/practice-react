import { useState, type FormEvent } from "react"
import { login } from "../services/auth";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Alert, Box, Button, Paper, TextField, Typography } from "@mui/material";


const LoginPage = () => {
    const [userName,setuserName] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState<string|null>(null);
    const auth = useAuth();
    const navigate = useNavigate();


    const handleLogin = async(e:FormEvent)=>{
        setError(null);
        e.preventDefault();
        console.log(userName,password);
        try{
            const {token,role} = await login({username:userName,password:password});
            auth.login(token,role);
            switch (role) {
                case 'admin':
                    navigate('/admin-dashboard');
                    break;
                case 'member':
                    navigate('/member-dashboard');
                    break;
                default:
                    navigate('/login');
            }
            console.log(token,role);
        }
        catch(err){
            setError('Invalid Login Credintials');
            console.log(err);
        }
    }
  return (
    <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
  >
    <Paper elevation={5} sx={{ p: 4, minWidth: 350 }}>
      <Typography variant="h4" component="h1" align="center">
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Username"
            variant="outlined"
            value={userName}
            onChange={(event) => setuserName(event.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            fullWidth
            required
          />
          {error && <Alert severity="error">{error}</Alert>}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </Box>
      </form>
    </Paper>
  </Box>
  )
}

export default LoginPage