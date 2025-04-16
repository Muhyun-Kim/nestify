export default async function StudyRoomPage({
  params,
}: {
  params: { id?: string };
}) {
  if (!params?.id) {
    return <div>Loading...</div>;
  }

  return <div>{params.id}</div>;
}
