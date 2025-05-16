import { Box, Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      borderRadius={2}
      boxShadow={3}
      p={4}
    >
      <Typography variant="h4" mb={4} color="primary">
        Admin Dashboard
      </Typography>
      <Stack spacing={3} direction="column" width="100%" maxWidth={300}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/users')}
        >
          Manage Users
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          size="large"
          onClick={() => navigate('/admin/tasks')}
        >
          Manage Tasks
        </Button>
      </Stack>
    </Box>
  )
}

export default Admin