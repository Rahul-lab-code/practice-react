import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"
import { getTasks } from "../../services/tasks";
import { type fetchedTaskType } from "../../types";
import { Button, Card, CardContent, Container, Stack, Typography } from "@mui/material";


const Tasks = () => {
  const navigate = useNavigate();
  const { data: tasks, isLoading, isError } = useQuery<fetchedTaskType[]>({
    queryKey:["tasks"],
    queryFn:getTasks
  });

 if (isLoading) return <Container><Typography>Loading...</Typography></Container>;
  if (isError) return <Container><Typography color="error">Error loading tasks</Typography></Container>;
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Admin | Tasks</Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={()=>{navigate('/create-task')}}
        sx={{ mb: 3 }}
      >
        Create Task
      </Button>
      <Stack spacing={2}>
        {tasks?.map((task) => (
          <Card key={task._id} variant="outlined">
            <CardContent>
              <Typography variant="h6">{task.title}</Typography>
              <Typography variant="body2" color="text.secondary">{task.description}</Typography>
              <Typography variant="body2">Priority: {task.priority}</Typography>
              <Typography variant="body2">
                Assignees: {task.assignees.map((assignee) => assignee.username).join(", ")}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  )
}

export default Tasks