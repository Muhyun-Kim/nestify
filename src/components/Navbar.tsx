"use client";

import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const router = useRouter();
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Button
            variant="text"
            color="inherit"
            sx={{ textTransform: "none" }}
            onClick={() => router.push("/")}
          >
            <Typography variant="h6">Nestify</Typography>
          </Button>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="text" color="inherit">
            Profile
          </Button>
          <Button variant="text" color="inherit">
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
