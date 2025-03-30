"use server";

import { createClient } from "@/lib/supabase-server";
import { SingUpState } from "./page";
import { z } from "zod";
import { AuthError } from "@supabase/supabase-js";

const signUpSchema = z
  .object({
    email: z.string().email({ message: "無効なメールアドレスです。" }),
    password: z
      .string()
      .min(8, { message: "パスワードは8文字以上で入力してください。" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "パスワードが一致しません。",
  });

export const signUpAction = async (
  prevState: SingUpState,
  formData: FormData
): Promise<SingUpState> => {
  const supabase = await createClient();
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const validatedFields = signUpSchema.safeParse(rawData);

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    return {
      emailErr: errors.email?.[0],
      passwordErr: errors.password?.[0],
      confirmPasswordErr: errors.confirmPassword?.[0],
    };
  }

  const { data, error } = await supabase.auth.signUp({
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  });

  if (error) {
    return {
      formErr: handleError(error),
    };
  }

  return {
    success: true,
  };
};

const handleError = (error: AuthError): string => {
  console.log(error);
  switch (error.code) {
    case "over_email_send_rate_limit":
      return "もう少し時間をおいてください";
    default:
      return "エラーが発生しました。";
  }
};
