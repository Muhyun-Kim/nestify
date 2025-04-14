"use client";

import { useUserStore } from "@/store/user";
import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState, useEffect } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import prisma from "@/lib/prisma";
import { updateNicknameAction } from "./actions";

export default function Profile() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const [open, setOpen] = useState(false);
  const [nickname, setNickname] = useState(user?.nickname ?? "");
  const restoreUser = useUserStore((state) => state.restoreUser);
  const [error, setError] = useState("");

  useEffect(() => {
    restoreUser();
  }, [restoreUser]);

  const handleSubmit = async (formData: FormData) => {
    const result = await updateNicknameAction(formData);
    if (result.nickname) {
      setUser({
        ...user!,
        nickname: result.nickname,
      });
      setOpen(false);
    } else {
      setError(result.error ?? "");
    }
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Typography variant="body1">ID: {user?.id}</Typography>
        <Button
          color="primary"
          onClick={() => {
            navigator.clipboard.writeText(user?.id ?? "");
          }}
        >
          <ContentCopyIcon />
        </Button>
      </Box>
      <Typography variant="body1">Email: {user?.email}</Typography>
      <Typography variant="body1">
        Name:{" "}
        {user?.nickname == "" ? "ユーザー名を設定してください" : user?.nickname}
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        ユーザー名を変更する
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>ユーザー名を変更</DialogTitle>
        <form action={handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              name="nickname"
              label="新しいユーザー名"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              autoFocus
              error={!!error}
              helperText={error}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>キャンセル</Button>
            <Button type="submit" variant="contained">
              保存
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
