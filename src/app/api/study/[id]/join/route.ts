import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const id = (await context.params).id;
  const { password } = await request.json();

  const studyRoom = await prisma.studyRoom.findUnique({
    where: { id: parseInt(id) },
  });

  if (!studyRoom) {
    return NextResponse.json(
      { error: "この部屋は存在しません。" },
      { status: 404 }
    );
  }

  if (!studyRoom.password) {
    return NextResponse.json(
      { error: "この部屋にはパスワードが設定されていません。" },
      { status: 403 }
    );
  }

  const isMatch = await bcrypt.compare(password, studyRoom.password);

  if (!isMatch) {
    return NextResponse.json(
      { error: "パスワードが間違っています。" },
      { status: 401 }
    );
  }

  return NextResponse.json({ message: "成功" }, { status: 200 });
}
