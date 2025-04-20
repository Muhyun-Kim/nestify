"use client";

import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { StudyRoomWithOwner } from "./page";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useState } from "react";
import { useRouter } from "next/navigation";
interface EnterStudyRoomModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedRoom: StudyRoomWithOwner | null;
}

export default function EnterStudyRoomModal({
  open,
  setOpen,
  selectedRoom,
}: EnterStudyRoomModalProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleEnter = async () => {
    if (selectedRoom?.password) {
      const res = await fetch(`/api/study/${selectedRoom.id}/join`, {
        method: "POST",
        body: JSON.stringify({ password }),
      });
      console.log(res);
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        return;
      }
    }
    setOpen(false);
    router.push(`/study/${selectedRoom?.id}`);
  };
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "30%",
          height: "30%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          px: 4,
          py: 2,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ height: "50%" }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <CancelOutlinedIcon onClick={() => setOpen(false)} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h6">{selectedRoom?.title}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            height: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {!selectedRoom?.isPublic && (
            <TextField
              label="password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!error}
              helperText={error}
            />
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleEnter}
          >
            Enter
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
