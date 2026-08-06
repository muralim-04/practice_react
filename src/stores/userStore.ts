import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserRes } from "../types/UserTypes";

type DefaultStore = {
    user: UserRes | null
    setUser: (user: UserRes) => void,
    logout: () => void
}

export const useDefaultStore = create<DefaultStore>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            logout: () => set({ user: null }),
        }),
        {
            name: "user-storage",
        }
    )
);