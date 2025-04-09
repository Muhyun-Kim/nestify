"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import { loginAction } from "./actions";
import { useActionState, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface LoginState {
  emailErr?: string;
  passwordErr?: string;
  formErr?: string;
  success?: boolean;
}

const initState: LoginState = {};

export default function Login() {
  const [state, formAction] = useActionState(loginAction, initState);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (state.success) {
      router.push("/study/create");
    }
  }, [state.success, router]);

  return (
    <Box
      component="form"
      action={formAction}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <TextField
        name="email"
        label="Email"
        type="email"
        error={!!state.emailErr}
        helperText={state.emailErr}
      />
      <TextField
        name="password"
        label="Password"
        type="password"
        error={!!state.passwordErr}
        helperText={state.passwordErr}
      />
      {state.formErr && <Typography color="error">{state.formErr}</Typography>}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button type="submit" disabled={isLoading}>
          Login
        </Button>
        <Button
          type="button"
          onClick={() => {
            router.push("/sign-up");
          }}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
}
