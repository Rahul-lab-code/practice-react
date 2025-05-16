import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteUser, updateUser } from "../services/admin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {Card,CardContent,Typography,Button,Modal,Box,TextField,Select,MenuItem,InputLabel,FormControl} from "@mui/material";

const UserCard = ({username,id,role,}: {username: string;id: string;role: string;}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [modalType, setModalType] = useState<"update" | "delete" | null>(null);
  const [userName, setuserName] = useState(username);
  const [updatedRole, setupdatedRole] = useState(role);

  const closeModal = () => setModalType(null);

  const updateMutation = useMutation({
    mutationFn: () => updateUser(id, userName, updatedRole),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      closeModal(); 
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      closeModal();
    },
  });

  return (
    <Card key={id} sx={{ border: "1px solid #ccc", p: 2, m: 2 }}>
      <CardContent>
        <Typography variant="h6">{username}</Typography>
        <Button
          variant="outlined"
          sx={{ mr: 1, mt: 1 }}
          onClick={() => navigate(`/tasks/user/${id}`)}
        >
          View Tasks
        </Button>
        <Button
          variant="outlined"
          sx={{ mr: 1, mt: 1 }}
          onClick={() => setModalType("update")}
        >
          Update User
        </Button>
        <Button
          variant="outlined"
          color="error"
          sx={{ mt: 1 }}
          onClick={() => setModalType("delete")}
        >
          Delete User
        </Button>
      </CardContent>

      <Modal
        open={!!modalType}
        onClose={closeModal}>
        <Box
          sx={{
            backgroundColor: "white",
            p: 4,
            borderRadius: 2,
            minWidth: 300,
            mx: "auto",
            my: "20vh",
            outline: "none",
            boxShadow: 24,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {modalType === "update" && (
            <>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                  label="Username"
                  value={userName}
                  onChange={(e) => setuserName(e.target.value)}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  value={updatedRole}
                  label="Role"
                  onChange={(e) => setupdatedRole(e.target.value)}
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="member">Member</MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button onClick={closeModal} variant="outlined">
                  Close
                </Button>
                <Button
                  onClick={() => updateMutation.mutate()}
                  disabled={updateMutation.isPending}
                  variant="contained"
                >
                  {updateMutation.isPending ? "Updating..." : "Update"}
                </Button>
              </Box>
            </>
          )}
          {modalType === "delete" && (
            <>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Are you sure you want to delete {username}?
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  onClick={() => deleteMutation.mutate()}
                  disabled={deleteMutation.isPending}
                  variant="contained"
                  color="error"
                >
                  {deleteMutation.isPending ? "Deleting..." : "Yes, Delete"}
                </Button>
                <Button onClick={closeModal} variant="outlined">
                  Cancel
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Card>
  );
};

export default UserCard;