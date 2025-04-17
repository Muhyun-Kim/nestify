"use client";

import { Modal, Box, Typography, TextField } from "@mui/material";
import { StudyRoomWithOwner } from "./page";

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
  console.log(selectedRoom);
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "30%",
          height: "40%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography>{selectedRoom?.title}</Typography>
        {!selectedRoom?.isPublic && (
          <TextField label="비밀번호" type="password" fullWidth />
        )}
      </Box>
    </Modal>
  );
}
