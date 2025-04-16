"use client";

import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface StudyCardProps {
  url: string;
  children?: ReactNode;
}
export default function StudyCard({ url, children }: StudyCardProps) {
  const router = useRouter();
  return (
    <Button
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid #ccc",
        borderRadius: 4,
        width: "80%",
        aspectRatio: "5 / 3",
      }}
      onClick={() => {
        router.push(url);
      }}
    >
      {children}
    </Button>
  );
}
