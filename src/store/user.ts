import { getUser } from "@/app/(auth)/profile/actions";
import prisma from "@/lib/prisma";
import { supabaseBrowserClient } from "@/lib/supbase-browser";
import { create } from "zustand";
interface User {
  id: string;
  email: string;
  nickname: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  restoreUser: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  restoreUser: async () => {
    const user = await getUser();

    if (user) {
      set({
        user: {
          id: user.id,
          email: user.email!,
          nickname: user.nickname ?? "",
        },
      });
    }
  },
}));
