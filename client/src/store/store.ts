import { create } from "zustand";

interface NavState {
    isPlantList: boolean;
    setPlantList: (value: boolean) => void;
    isOverView: boolean;
    setOverView: (value: boolean) => void;
    isBuyers: boolean;
    setBuyers: (value: boolean) => void;
    isPlantOwners: boolean;
    setPlantOwners: (value: boolean) => void
    isSetting: boolean;
    setSetting: (value: boolean) => void
    isAddPlants: boolean
    setAddPlants: (value: boolean) => void
}

export const useNavStore = create<NavState>((set) => ({
    isPlantList: false,
    setPlantList: (value) => set({ isPlantList: value }),
    isOverView: true,
    setOverView: (value) => set({isOverView: value}),
    isBuyers: false,
    setBuyers: (value) => set({isBuyers: value}),
    isPlantOwners: false,
    setPlantOwners: (value) => set({isPlantOwners: value}),
    isSetting: false,
    setSetting: (value) => set({isSetting: value}),
    isAddPlants: false,
    setAddPlants: (value) => set({isAddPlants: value})
}));
