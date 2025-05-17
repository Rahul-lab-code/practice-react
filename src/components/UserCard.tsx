import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteUser, updateUser } from "../services/admin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {Card,CardContent,Typography,Button} from "@mui/material";
import UserModal from "./UserModal";

const UserCard = ({username,id,role,}: {
  username: string;
  id: string;
  role: string;
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [modalType, setModalType] = useState<"update" | "delete" | null>(null);
  const [userName, setuserName] = useState(username);
  const [updatedRole, setupdatedRole] = useState(role);
  const [message, setMessage] = useState("");

  const closeModal = () => {
    setMessage("");
    setModalType(null);
  };

  const updateMutation = useMutation({
    mutationFn: () => updateUser(id, userName, updatedRole),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      closeModal();
    },
    onError: (err) => {
      setMessage(err?.message || "Update failed");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      closeModal();
    },
    onError: (err) => {
      setMessage(err?.message || "Delete failed");
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

      <UserModal
        modalType={modalType}
        open={!!modalType}
        username={username}
        userName={userName}
        setuserName={setuserName}
        updatedRole={updatedRole}
        setupdatedRole={setupdatedRole}
        message={message}
        onClose={closeModal}
        onUpdate={() => updateMutation.mutate()}
        onDelete={() => deleteMutation.mutate()}
        isUpdating={updateMutation.isPending}
        isDeleting={deleteMutation.isPending}
      />
    </Card>
  );
};

export default UserCard;
