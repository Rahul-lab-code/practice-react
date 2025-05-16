import { useState, type FormEvent } from 'react'
import { createUser } from '../../services/admin';
import { Box, Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl, Alert } from '@mui/material';

const CreateUser = () => {
    const [username,setUsername]= useState('');
    const [password,setPassword] = useState('');
    const [role,setRole] = useState<'admin' | 'member'>('member');
    const [data,setData] = useState('');

    const handleCreate = async(e:FormEvent)=>{
        e.preventDefault();
        try{
            const response = await createUser({username,password,role});
            console.log(response);
            setData('User Created Successfully');
        }catch(err){
            console.log(err);
            setData('Error Creating the user');
        }
    }

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
        <Typography variant="h4" gutterBottom>
            Create User
        </Typography>
        <form onSubmit={handleCreate}>
            <TextField
                label="User Name"
                fullWidth
                margin="normal"
                value={username}
                onChange={(event)=>setUsername(event.target.value)}
            />
            <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(event)=>setPassword(event.target.value)}
            />
            <FormControl fullWidth margin="normal">
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                    labelId="role-label"
                    value={role}
                    label="Role"
                    onChange={(e) => setRole(e.target.value as 'admin' | 'member')}
                >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="member">Member</MenuItem>
                </Select>
            </FormControl>
            {data && (
                <Alert severity={data === 'User Created Successfully' ? 'success' : 'error'} sx={{ my: 2 }}>
                    {data}
                </Alert>
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Create User
            </Button>
        </form>
    </Box>
  )
}

export default CreateUser