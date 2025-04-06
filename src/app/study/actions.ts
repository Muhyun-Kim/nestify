"use server";

import { createClient } from "@/lib/supabase-server";
import { CreateStudyState } from "./page";
import { z } from "zod";

const createStudySchema = z.object({});

export const createStudyAction = async (
  prevState: CreateStudyState,
  formData: FormData
) => {
  const supabase = await createClient();
  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
  };
  return { success: true };
};
