export default async function StudyRoomPage(
  props: {
    params: Promise<{ id?: string }>;
  }
) {
  const params = await props.params;
  if (!params?.id) {
    return <div>Loading...</div>;
  }

  return <div>{params.id}</div>;
}
