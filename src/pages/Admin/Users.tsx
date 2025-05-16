import { useState } from "react";
import UserCard from "../../components/UserCard";
import { getUsers } from "../../services/admin";
import type { fetchedUserType } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  ButtonGroup,
  Typography,
  Divider,
  CircularProgress,
  Stack,
  Paper,
} from "@mui/material";

const fetchUsers = async () => {
  const response = await getUsers();
  return response;
};

const Users = () => {
  const navigate = useNavigate();
  const [roleFilter, setRoleFilter] = useState<"member" | "admin" | null>(null);

  const { data: users = [], isLoading, isError } = useQuery<fetchedUserType[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const filteredUsers = roleFilter
    ? users.filter((user) => user.role === roleFilter)
    : users;

  const renderUserList = (role: "member" | "admin") => (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h5" sx={{ mb: 1 }}>
        {role === "member" ? "Members" : "Admins"}
      </Typography>
      <Stack spacing={2}>
        {users
          .filter((user) => user.role === role)
          .map((user) => (
            <Paper key={user._id} elevation={2} sx={{ p: 2 }}>
              <UserCard
                id={user._id}
                username={user.username}
                role={user.role}
              />
            </Paper>
          ))}
      </Stack>
    </Box>
  );

  if (isLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  if (isError)
    return (
      <Typography color="error" sx={{ mt: 4 }}>
        Failed to load users.
      </Typography>
    );

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Users
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/create")}
        sx={{ mb: 2 }}
      >
        Create User
      </Button>
      <Divider sx={{ mb: 2 }} />
      <ButtonGroup variant="outlined" sx={{ mb: 3 }}>
        <Button
          variant={roleFilter === null ? "contained" : "outlined"}
          onClick={() => setRoleFilter(null)}
        >
          All
        </Button>
        <Button
          variant={roleFilter === "admin" ? "contained" : "outlined"}
          onClick={() => setRoleFilter("admin")}
        >
          Admin
        </Button>
        <Button
          variant={roleFilter === "member" ? "contained" : "outlined"}
          onClick={() => setRoleFilter("member")}
        >
          Member
        </Button>
      </ButtonGroup>
      <Box>
        {roleFilter ? (
          <Box>
            <Typography variant="h5" sx={{ mb: 1 }}>
              {roleFilter === "admin" ? "Admins" : "Members"}
            </Typography>
            <Stack spacing={2}>
              {filteredUsers.map((user) => (
                <Paper key={user._id} elevation={2} sx={{ p: 2 }}>
                  <UserCard
                    id={user._id}
                    username={user.username}
                    role={user.role}
                  />
                </Paper>
              ))}
            </Stack>
          </Box>
        ) : (
          <Box>
            {renderUserList("member")}
            <Divider sx={{ my: 2 }} />
            {renderUserList("admin")}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Users;