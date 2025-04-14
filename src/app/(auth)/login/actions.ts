"use server";

import { z } from "zod";
import { LoginState } from "./page";
import { createClient } from "@/lib/supabase-server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

const loginSchema = z.object({
  email: z.string().email({ message: "無効なメールアドレスです。" }),
  password: z
    .string()
    .min(8, { message: "パスワードは8文字以上で入力してください。" }),
});

export const loginAction = async (
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> => {
  const supabase = await createClient();
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validatedFields = loginSchema.safeParse(rawData);

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    return {
      emailErr: errors.email?.[0],
      passwordErr: errors.password?.[0],
    };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  });

  if (error) {
    return { formErr: "無効なアカウントです" };
  }

  if (data.session) {
    const { error: sessionError } = await supabase.auth.setSession({
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    });

    if (sessionError) {
      console.error("Session setting error:", sessionError);
      return { formErr: "セッションの設定に失敗しました" };
    }

    const {
      data: { session },
      error: sessionCheckError,
    } = await supabase.auth.getSession();

    if (sessionCheckError) {
      console.error("Session check error:", sessionCheckError);
      return { formErr: "セッションの確認に失敗しました" };
    }

    if (!session) {
      console.error("No session found after setting");
      return { formErr: "セッションが見つかりません" };
    }

    const cookieStore = await cookies();
    cookieStore.set(
      "sb",
      JSON.stringify({
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        expires_at: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
      }),
      {
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
      }
    );

    console.log("Session successfully set:", session.user.email);
  }

  const authUser = await supabase.auth.getUser();

  if (!authUser.data.user) {
    return { formErr: "ユーザーが見つかりません" };
  }

  // check if user exists in database
  const user = await prisma.user.findUnique({
    where: {
      id: authUser.data.user?.id,
      email: authUser.data.user?.email,
    },
  });

  if (!user) {
    await prisma.user.create({
      data: {
        id: authUser.data.user?.id,
        nickname: "",
      },
    });
  }

  return { success: true };
};
