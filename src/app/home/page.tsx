"use client";

import { useUserStore } from "@/store/user";
import { Box, Button } from "@mui/material";

export default function Home() {
  const user = useUserStore((state) => state.user);
  return (
    <Box>
      <Button
        onClick={() => {
          console.log(user);
        }}
      >
        button
      </Button>
    </Box>
  );
}
