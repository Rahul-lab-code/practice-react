import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"
import { getTasks } from "../../services/tasks";
import { type paginationTaskType } from "../../types";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { TaskCard } from "../../components/TaskCard";


const Tasks = () => {
  const navigate = useNavigate();

  const [page,setPage] = useState(1);
  const limit = 5;

  const { data, isLoading, isError } = useQuery<paginationTaskType>({
    queryKey:["tasks",page,limit],
    queryFn:()=>getTasks(page,limit),
  });

  const totalPages = data?.totalPages ?? 1;

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
        {data?.tasks.map((task) => <TaskCard 
        key={task._id}
        _id={task._id} 
        assignees={task.assignees} 
        description={task.description} 
        priority={task.priority} 
        title={task.title} />)}
      </Stack>

      <Stack direction="row" spacing={2} justifyContent="center" mt={3}>
        <Button
          variant="outlined"
          disabled={page === 1}
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
        >
          Previous
        </Button>
        <Typography variant="body1" sx={{ alignSelf: "center" }}>
          Page {page} of {totalPages}
        </Typography>
        <Button
          variant="outlined"
          disabled={page === totalPages}
          onClick={() => setPage((old) => Math.min(old + 1, totalPages))}
        >
          Next
        </Button>
      </Stack>
    </Container>
  )
}

export default Tasks