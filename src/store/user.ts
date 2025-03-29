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
    const supabase = supabaseBrowserClient;
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.user) {
      set({
        user: {
          id: session.user.id,
          email: session.user.email!,
          nickname: session.user.user_metadata.nickname ?? "",
        },
      });
    }
  },
}));
