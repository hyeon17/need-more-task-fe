import { create } from 'zustand';

type OverViewState = {
  TODO: string;
  IN_PROGRESS: string;
  DONE: string;
  selectedProgress: string;
  displayedData: any;
};

type OverViewAction = {
  setSelectedProgress: (progress: string) => void;
  setDisplayedData: (data: any) => void;
};

type OverViewStore = OverViewState & OverViewAction;

const overViewState = create<OverViewStore>((set, get) => ({
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
  selectedProgress: 'All' || get().TODO || get().IN_PROGRESS || get().DONE,
  displayedData: null,
  setSelectedProgress: (progress: string) => set({ selectedProgress: progress }),
  setDisplayedData: (data: any) => set({ displayedData: data }),
}));

export const useOverViewState = () => overViewState((state) => state);
