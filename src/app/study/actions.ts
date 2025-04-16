"use server";

import prisma from "@/lib/prisma";

export async function fetchStudyRooms() {
  const rooms = await prisma.studyRoom.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      owner: {
        select: {
          nickname: true,
        },
      },
    },
  });

  return rooms;
}
