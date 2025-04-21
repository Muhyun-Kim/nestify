import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
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

    return NextResponse.json(rooms);
  } catch (error) {
    console.error("Failed to fetch study rooms:", error);
    return NextResponse.json(
      { error: "Failed to fetch rooms" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get("studyRoomId");

  if (!roomId) {
    return NextResponse.json({ error: "Room ID is required" }, { status: 400 });
  }

  try {
    await prisma.studyRoom.delete({
      where: { id: Number(roomId) },
    });

    return NextResponse.json(
      { message: "Room deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete room:", error);
    return NextResponse.json(
      { error: "Failed to delete room" },
      { status: 500 }
    );
  }
}
