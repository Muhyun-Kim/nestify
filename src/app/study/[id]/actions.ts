"use server";

import prisma from "@/lib/prisma";

export async function fetchStudyRoom(id: number) {
  const room = await prisma.studyRoom.findUnique({
    where: { id },
  });
  return room;
}
