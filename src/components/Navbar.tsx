"use client";

import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { supabaseBrowserClient } from "@/lib/supbase-browser";
import { useUserStore } from "@/store/user";

export const Navbar = () => {
  const router = useRouter();
  const logout = async () => {
    const supabase = supabaseBrowserClient;
    await supabase.auth.signOut();
    useUserStore.getState().clearUser();
    document.cookie = "sb=; path=/; max-age=0;";
    router.push("/");
  };
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Button
            variant="text"
            color="inherit"
            sx={{ textTransform: "none" }}
            onClick={() => router.push("/home")}
          >
            <Typography variant="h6">Nestify</Typography>
          </Button>
          <Button
            variant="text"
            color="inherit"
            onClick={() => router.push("/study")}
          >
            Study
          </Button>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="text"
            color="inherit"
            onClick={() => router.push("/profile")}
          >
            Profile
          </Button>
          <Button variant="text" color="inherit" onClick={logout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
