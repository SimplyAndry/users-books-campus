import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  avatar: string;
  password: string; // aggiunto campo password
  birthdate: string;
  articlesId: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
      updateUser: (user) => set({ user }),
    }),
    {
      name: "auth-storage", // nome chiave localStorage
    }
  )
);
// const selectedUserId = useUserStore((s) => s.selectedUserId)
// const setSelectedUserId = useUserStore((s) => s.setSelectedUserId)