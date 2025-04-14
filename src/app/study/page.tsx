import { Box, Typography } from "@mui/material";
import { use } from "react";
import { fetchStudyRooms } from "./actions";

export default function StudyMainPage() {
  const rooms = use(fetchStudyRooms());
  console.log(rooms);
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography>Study一覧</Typography>
    </Box>
  );
}
