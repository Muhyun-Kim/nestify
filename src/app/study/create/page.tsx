"use client";

import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useActionState, useEffect, useState } from "react";
import { createStudyAction } from "./actions";
import { useRouter } from "next/navigation";

export interface CreateStudyState {
  titleErr?: string;
  descriptionErr?: string;
  passwordErr?: string;
  isPublicErr?: string;
  formErr?: string;
  success: boolean;
}

const initState: CreateStudyState = {
  success: false,
};

export default function Study() {
  const [isPublic, setIsPublic] = useState(true);
  const [state, formAction] = useActionState(createStudyAction, initState);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.push("/home");
    }
  }, [state.success, router]);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h4">Study作成</Typography>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        action={formAction}
      >
        <TextField name="title" label="タイトル" error={!!state.titleErr} />
        {!isPublic && (
          <TextField
            name="password"
            label="パスワード"
            error={!!state.passwordErr}
          />
        )}
        <TextField
          name="description"
          label="説明"
          error={!!state.descriptionErr}
        />
        <FormControlLabel
          control={<Switch name="isPublic" />}
          label="非公開"
          onChange={(_e, checked) => setIsPublic(!checked)}
        />
        <Button type="submit" variant="contained" color="primary">
          作成
        </Button>
        {state.formErr && (
          <Typography color="error">{state.formErr}</Typography>
        )}
      </Box>
    </Box>
  );
}
