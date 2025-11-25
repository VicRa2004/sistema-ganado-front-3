import { User } from "@/modules/user/domain/User";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  user: User | null;

  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;

  clear: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,

      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),

      clear: () => set({ token: null }),
    }),
    {
      name: "auth-storage", // nombre en localStorage
      partialize: (state) => ({ token: state.token }), // solo guardamos token
    }
  )
);
