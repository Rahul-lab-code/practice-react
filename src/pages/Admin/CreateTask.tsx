import { useState, type FormEvent } from 'react'
import MultipleSelectChip from '../../components/ui/MultipleSelectChip'
import { type fetchedUserType, type PriorityType } from '../../types';
import { createTask } from '../../services/tasks';
import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

const CreateTask = () => {
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [priority,setPriority] = useState<PriorityType>("Low");
    const [assignees,setAssignees] = useState<fetchedUserType[]>([]);
    const [message,setMessage] = useState('');

    const handleCreateTask = async(e:FormEvent)=>{
        e.preventDefault();
        console.log(title,description,priority,assignees);
        const assigneesId = assignees.map(assignee => assignee._id);
        try{
            await createTask({title,description,priority,assignees:assigneesId});
            setMessage('Task Created');
        }catch(err){
            console.log(err);
            setMessage('Error creating in task');
        }
    }
  return (
     <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
    <Typography variant="h4" component="h1" gutterBottom>
      Create Task
    </Typography>
    <form onSubmit={handleCreateTask}>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel id="priority-label">Priority</InputLabel>
        <Select
          labelId="priority-label"
          value={priority}
          label="Priority"
          onChange={(event) => setPriority(event.target.value as PriorityType)}
        >
          <MenuItem value={'Low'}>Low</MenuItem>
          <MenuItem value={'Medium'}>Medium</MenuItem>
          <MenuItem value={'High'}>High</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <MultipleSelectChip setAssignees={setAssignees} />
      </FormControl>
      {message && (
        <Box my={2}>
          <Alert severity={message === 'Task Created' ? 'success' : 'error'}>
            {message}
          </Alert>
        </Box>
      )}
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Create Task
      </Button>
    </form>
  </Box>
  )
}

export default CreateTask