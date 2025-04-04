"use client";

import { Box, Button, TextField, Typography } from "@mui/material";

export default function Study() {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h4">study作成</Typography>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField name="title" label="タイトル" />
        <TextField name="description" label="説明" />
        <Button type="submit" variant="contained" color="primary">
          作成
        </Button>
      </Box>
    </Box>
  );
}
