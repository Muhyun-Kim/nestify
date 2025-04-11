"use server";

import { createClient } from "@/lib/supabase-server";
import { z } from "zod";
import { CreateStudyState } from "./page";
import prisma from "@/lib/prisma";

const createStudySchema = z.object({
  title: z.string().min(1, { message: "タイトルは必須です。" }),
  description: z.string().min(1, { message: "説明は必須です。" }),
  password: z.preprocess((val) => {
    if (val === "" || val === null) return undefined;
    return val;
  }, z.string().min(8, { message: "パスワードは8文字以上で入力してください。" }).optional()),
  isPublic: z.boolean(),
  ownerId: z.string(),
});

export const createStudyAction = async (
  prevState: CreateStudyState,
  formData: FormData
) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    password: formData.get("password"),
    isPublic: formData.get("isPublic") === "on",
    ownerId: user?.id,
  };

  const validatedFields = createStudySchema.safeParse(rawData);

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    return {
      titleErr: errors.title?.[0],
      descriptionErr: errors.description?.[0],
      passwordErr: errors.password?.[0],
      isPublicErr: errors.isPublic?.[0],
      success: false,
    };
  }

  const res = await prisma.studyRoom.create({
    data: {
      title: validatedFields.data.title,
      description: validatedFields.data.description,
      password: validatedFields.data.password,
      isPublic: validatedFields.data.isPublic,
      ownerId: validatedFields.data.ownerId,
    },
  });

  if (!res) {
    return {
      formErr: "Study作成に失敗しました。",
      success: false,
    };
  }

  return { success: true };
};
