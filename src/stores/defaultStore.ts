import { create } from "zustand";

type DefaultStore = {
    name: string,
    age: number,
    increment: () => void,
    decrement: () => void
}

export const useDefaultStore = create<DefaultStore>((set) => ({
    name: "Muralim",
    age: 22,
    increment: () => {
        set((state) => ({ age: state.age + 1}))
    },
    decrement: () => {
        set((state) => ({age: state.age - 1}))
    }
}));