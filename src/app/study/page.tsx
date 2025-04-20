"use client";

import { Box, Modal, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import StudyCard from "./StudyCard";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useRouter } from "next/navigation";
import { StudyRoom } from "@prisma/client";
import EnterStudyRoomModal from "./EnterStudyRoomModal";

export interface StudyRoomWithOwner extends StudyRoom {
  owner: {
    nickname: string;
  } | null;
}

export default function StudyMainPage() {
  const [rooms, setRooms] = useState<StudyRoomWithOwner[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<StudyRoomWithOwner | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch("/api/study");
        const data = await res.json();
        setRooms(data);
      } catch (e) {
        console.error("방 정보 가져오기 실패:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
      }}
    >
      <Box
        sx={{
          width: "80%",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          columnGap: 2,
          rowGap: 4,
        }}
      >
        <StudyCard onClick={() => router.push("/study/create")}>
          <AddCircleOutlineIcon sx={{ fontSize: 40, color: "primary.main" }} />
        </StudyCard>

        {loading
          ? Array.from({ length: 7 }).map((_, index) => (
              <StudyCard key={index}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Skeleton variant="text" width="60%" height={30} />
                  <Skeleton variant="text" width="40%" height={20} />
                </Box>
              </StudyCard>
            ))
          : rooms.map((room) => (
              <StudyCard
                key={room.id}
                onClick={() => {
                  setSelectedRoom(room);
                  setOpen(true);
                }}
              >
                <Box>
                  <Typography fontWeight="bold">{room.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {room.owner?.nickname ?? "No owner"}
                  </Typography>
                </Box>
              </StudyCard>
            ))}
      </Box>
      <EnterStudyRoomModal
        open={open}
        setOpen={setOpen}
        selectedRoom={selectedRoom ?? null}
      />
    </Box>
  );
}
