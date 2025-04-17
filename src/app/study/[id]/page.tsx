import { fetchStudyRoom } from "./actions";

export default async function StudyRoomPage(props: {
  params: Promise<{ id?: string }>;
}) {
  const params = await props.params;
  if (!params?.id) {
    return <div>Loading...</div>;
  }

  const room = await fetchStudyRoom(Number(params.id));
  return <div>{room?.title}</div>;
}
