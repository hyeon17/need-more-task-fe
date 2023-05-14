import { create } from 'zustand';

type SideBarState = {
  startAt: string;
  endAt: string;
};

type SideBarAction = {
  getStartAtStore: () => string;
  getEndAtStore: () => string;
  setStartAtStore: (startAt: string) => void;
  setEndAtStore: (endAt: string) => void;
};

type SideBarStore = SideBarState & SideBarAction;


const sideBarState = create<SideBarStore>((set, get) => ({
  startAt: '',
  endAt: '',
  getStartAtStore: () => get().startAt,
  getEndAtStore: () => get().endAt,
  setStartAtStore: (startAt: string) => set({ startAt }),
  setEndAtStore: (endAt: string) => set({ endAt }),
}));

export const useSideBarState = () => sideBarState((state) => state);