"use client";

import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useActionState } from "react";
import { createStudyAction } from "./actions";

export interface CreateStudyState {
  titleErr?: string;
  descriptionErr?: string;
  formErr?: string;
  success?: boolean;
}

const initState: CreateStudyState = {};

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
        <FormControlLabel control={<Switch name="isPublic" />} label="公開" />
        <Button type="submit" variant="contained" color="primary">
          作成
        </Button>
      </Box>
    </Box>
  );
}
