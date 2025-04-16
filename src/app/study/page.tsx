import { Box, Typography } from "@mui/material";
import { use } from "react";
import { fetchStudyRooms } from "./actions";
import StudyCard from "./StudyCard";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function StudyMainPage() {
  const rooms = use(fetchStudyRooms());
  console.log(rooms);
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography>Study一覧</Typography>
      <Box
        sx={{
          width: "80%",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          columnGap: 2,
          rowGap: 4,
        }}
      >
        <StudyCard url="/study/create">
          <AddCircleOutlineIcon sx={{ fontSize: 40, color: "primary.main" }} />
        </StudyCard>
        {rooms.map((room) => (
          <StudyCard key={room.id} url={`/study/${room.id}`}>
            <Typography>{room.title}</Typography>
          </StudyCard>
        ))}
      </Box>
    </Box>
  );
}
