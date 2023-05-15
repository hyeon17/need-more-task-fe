import { create } from 'zustand';
import dayjs from 'dayjs';

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

const today = new Date();
const sideBarState = create<SideBarStore>((set, get) => ({
  startAt: dayjs(today).subtract(3, 'day').format('YYYY-MM-DD'),
  endAt: dayjs(today).add(3, 'day').format('YYYY-MM-DD'),
  getStartAtStore: () => get().startAt,
  getEndAtStore: () => get().endAt,
  setStartAtStore: (startAt: string) => set({ startAt }),
  setEndAtStore: (endAt: string) => set({ endAt }),
}));

export const useSideBarState = () => sideBarState((state) => state);