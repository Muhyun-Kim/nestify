"use server";

import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase-server";

export async function fetchStudyRooms() {
  const rooms = await prisma.studyRoom.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const supabase = await createClient();
  console.log((await supabase.auth.getUser()).data.user);

  return rooms;
}
