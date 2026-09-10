import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserRes } from "../types/UserTypes";

type UserStore = {
    user: UserRes | null
    setUser: (user: UserRes) => void,
    setUserAvatar: (avatarUrl: string) => void;
    logout: () => void
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            setUserAvatar: (avatarUrl: string) =>
                set((state) => ({
                    user: state.user ? { ...state.user, avatarUrl } : null,
                })),
            logout: () => {
                set({ user: null });
                window.location.href = '/login';
            },
        }),
        {
            name: "user-storage",
        }
    )
);