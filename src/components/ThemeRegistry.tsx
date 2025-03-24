"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/theme/theme";
import React from "react";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
