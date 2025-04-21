"use client";

import { useUserStore } from "@/store/user";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
interface DeleteBtnProps {
  roomOwnerId: string;
  roomId: number;
}

export default function DeleteBtn({ roomOwnerId, roomId }: DeleteBtnProps) {
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  const handleDelete = async () => {
    const params = new URLSearchParams();
    params.set("studyRoomId", roomId.toString());
    const res = await fetch(`/api/study?${params.toString()}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.push("/study");
    } else {
      console.error("Failed to delete room");
    }
  };
  return (
    <>
      {user?.id === roomOwnerId ? (
        <Button variant="contained" color="error" onClick={handleDelete}>
          削除
        </Button>
      ) : (
        <Box />
      )}
    </>
  );
}
