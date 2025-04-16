import { Box, Button, Typography } from "@mui/material";
import { use } from "react";
import { fetchStudyRooms } from "./actions";
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
        sx={{ width: "80%", display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #ccc",
            borderRadius: 4,
            width: "15%",
            aspectRatio: "5 / 3",
          }}
        >
          <Button>
            <AddCircleOutlineIcon sx={{ fontSize: 40 }} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
