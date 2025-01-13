import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Bear {
  id: number;
  name: string;
}

interface BearState {
  blackBears: number;
  pollarBears: number;
  pandaBears: number;
  bears: Bear[];
  totalBears: () => number;
  increaseBlackBearsPopulation: (by: number) => void;
  increasePollarBearsPopulation: (by: number) => void;
  increasePandaBearsPopulation: (by: number) => void;

  addBear: () => void;
  clearBears: () => void;
}

export const useBearStore = create<BearState>()(
  persist(
    (set, get) => ({
      blackBears: 10,
      pollarBears: 5,
      pandaBears: 1,
      totalBears: () => {
        return (
          get().blackBears +
          get().pollarBears +
          get().pandaBears +
          get().bears.length
        );
      },
      bears: [{ id: 1, name: "Oso #1" }],
      increaseBlackBearsPopulation: (by) =>
        set((state) => ({ blackBears: state.blackBears + by })),
      increasePollarBearsPopulation: (by) =>
        set((state) => ({ pollarBears: state.pollarBears + by })),
      increasePandaBearsPopulation: (by) =>
        set((state) => ({ pandaBears: state.pandaBears + by })),
      addBear: () =>
        set((state) => ({
          bears: [
            ...state.bears,
            {
              id: state.bears.length + 1,
              name: `Oso #` + (state.bears.length + 1),
            },
          ],
        })),
      clearBears: () => set({ bears: [] }),
    }),
    { name: "bear-storage" }
  )
);
