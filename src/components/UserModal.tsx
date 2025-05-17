import React from "react";
import {
  Modal,
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Typography,
  Alert,
} from "@mui/material";

interface UserModalProps {
  modalType: "update" | "delete" | null;
  open: boolean;
  username: string;
  userName: string;
  setuserName: (val: string) => void;
  updatedRole: string;
  setupdatedRole: (val: string) => void;
  message: string;
  onClose: () => void;
  onUpdate: () => void;
  onDelete: () => void;
  isUpdating: boolean;
  isDeleting: boolean;
}

const UserModal: React.FC<UserModalProps> = ({
  modalType,
  open,
  username,
  userName,
  setuserName,
  updatedRole,
  setupdatedRole,
  message,
  onClose,
  onUpdate,
  onDelete,
  isUpdating,
  isDeleting,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
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
            {message && <Alert severity="error">{message}</Alert>}
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button onClick={onClose} variant="outlined">
                Close
              </Button>
              <Button onClick={onUpdate} disabled={isUpdating} variant="contained">
                {isUpdating ? "Updating..." : "Update"}
              </Button>
            </Box>
          </>
        )}

        {modalType === "delete" && (
          <>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Are you sure you want to delete {username}?
            </Typography>
            {message && <Alert severity="error">{message}</Alert>}
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button onClick={onDelete} disabled={isDeleting} variant="contained" color="error">
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </Button>
              <Button onClick={onClose} variant="outlined">
                Cancel
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default UserModal;
