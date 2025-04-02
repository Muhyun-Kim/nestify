"use client";

import { supabaseBrowserClient } from "@/lib/supbase-browser";
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
import { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function Profile() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const [open, setOpen] = useState(false);
  const [nickname, setNickname] = useState(user?.nickname ?? "");

  const handleUpdate = async () => {
    const supabase = supabaseBrowserClient;
    const { data, error } = await supabase.auth.updateUser({
      data: { nickname },
    });

    if (error) {
      console.error("닉네임 업데이트 실패:", error.message);
      return;
    }

    setUser({
      id: data.user.id,
      email: data.user.email!,
      nickname: data.user.user_metadata.nickname ?? "",
    });

    setOpen(false);
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
        <DialogContent>
          <TextField
            fullWidth
            label="新しいユーザー名"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>キャンセル</Button>
          <Button onClick={handleUpdate} variant="contained">
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
