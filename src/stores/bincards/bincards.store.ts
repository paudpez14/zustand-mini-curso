import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

interface BinCard {
  bin: string;
  minAmount: number;
  maxAmount: number;
  level: number;
}

interface ResultEvaluate {
  descriptionError: string | undefined;
  isValidate: boolean;
}

interface BinCardState {
  bins: Record<string, BinCard>;
  getEvaluateMinAmount: (minAmmount: number, bin: string) => ResultEvaluate;
}
const storeApi: StateCreator<BinCardState> = (set, get) => ({
  bins: {
    "VISA ORO": {
      bin: "VISA ORO",
      minAmount: 700,
      maxAmount: 2999,
      level: 1,
    },
    "VISA PLATINIUM": {
      bin: "VISA PLATINIUM",
      minAmount: 3000,
      maxAmount: 3999,
      level: 2,
    },
    "VISA SIGNATURE": {
      bin: "VISA SIGNATURE",
      minAmount: 4000,
      maxAmount: 14999,
      level: 3,
    },
    "VISA INFINITE": {
      bin: "VISA INFINITE",
      minAmount: 8000,
      maxAmount: 20000,
      level: 4,
    },
  },
  getEvaluateMinAmount: (minAmmount, bin) => {
    const binsCardByEvaluate = get().bins;
    const infoBinById = get().bins[bin];
    if (minAmmount === infoBinById.maxAmount) {
      return {
        isValidate: false,
        descriptionError: "Error iguales bin",
      };
    }

    for (const [key, value] of Object.entries(binsCardByEvaluate)) {
      if (
        key !== bin &&
        minAmmount <= value.maxAmount &&
        infoBinById.level > value.level
      ) {
        console.log(`El cupo debe ser mayor a ${value.bin}.`);
        return {
          isValidate: false,
          descriptionError: `El cupo debe ser mayor a ${value.bin}.`,
        };
      }
      if (
        key !== bin &&
        minAmmount >= value.minAmount &&
        infoBinById.level < value.level
      ) {
        console.log(`El cupo debe ser menor a ${value.bin}`);
        return {
          isValidate: false,
          descriptionError: `El cupo debe ser menor a ${value.bin}`,
        };
      }
    }
    return {
      isValidate: true,
      descriptionError: undefined,
    };
  },
});
export const useBinCardState = create<BinCardState>()(devtools(storeApi));
