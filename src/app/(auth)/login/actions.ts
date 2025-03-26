"use server";

import { supabase } from "@/lib/supabase";
import { z } from "zod";
import { LoginState } from "./page";

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
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validatedFields = loginSchema.safeParse(rawData);

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    console.log(errors.email?.[0]);
    console.log(errors.password?.[0]);
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
    console.log(error);
    return { formErr: "無効なアカウントです" };
  } else {
    console.log(data);
    return { success: true };
  }
};
