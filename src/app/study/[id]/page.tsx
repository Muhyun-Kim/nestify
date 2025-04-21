import { Box, Button, Typography } from "@mui/material";
import { fetchStudyRoom } from "./actions";
import DeleteBtn from "./DeleteBtn";

export default async function StudyRoomPage(props: {
  params: Promise<{ id?: string }>;
}) {
  const params = await props.params;
  if (!params?.id) {
    return <div>Loading...</div>;
  }

  const room = await fetchStudyRoom(Number(params.id));
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Box
        sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}
      >
        <Box />
        <Typography variant="h4">{room?.title}</Typography>
        <DeleteBtn roomOwnerId={room!.ownerId} roomId={room!.id} />
      </Box>
    </Box>
  );
}
