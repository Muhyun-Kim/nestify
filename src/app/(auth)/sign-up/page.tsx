"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import { signUpAction } from "./actions";
import { useActionState } from "react";
import { useRouter } from "next/navigation";

export interface SingUpState {
  emailErr?: string;
  passwordErr?: string;
  confirmPasswordErr?: string;
  formErr?: string;
  success?: boolean;
}

const initState: SingUpState = {};

export default function SignUp() {
  const [state, formAction] = useActionState(signUpAction, initState);
  const router = useRouter();

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
      <TextField
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        error={!!state.confirmPasswordErr}
        helperText={state.confirmPasswordErr}
      />
      {state.formErr && <Typography color="error">{state.formErr}</Typography>}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button type="submit">Sign Up</Button>
        <Button
          type="button"
          onClick={() => {
            router.push("/login");
          }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}
