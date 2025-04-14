"use server";

import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase-server";
import { z } from "zod";

export async function getUser() {
  const supabase = await createClient();
  const id = (await supabase.auth.getUser()).data.user?.id;
  if (!id) {
    return null;
  }
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
}

const nicknameSchema = z.object({
  nickname: z.string().min(1, "ニックネームは必須です。"),
});

export async function updateNicknameAction(formData: FormData) {
  const nickname = formData.get("nickname");

  const parsed = nicknameSchema.safeParse({ nickname });
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors.nickname?.[0] };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) return { error: "認証されていません。" };

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: { nickname: parsed.data.nickname },
  });

  return { success: true, nickname: updated.nickname };
}
