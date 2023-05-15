import { create } from 'zustand';

type OverViewState = {
  TODO: string;
  IN_PROGRESS: string;
  DONE: string;
  selectedProgress: string;
  displayedData: any;
  currentPage: number;
};

type OverViewAction = {
  setSelectedProgress: (progress: string) => void;
  setDisplayedData: (data: any) => void;
  setCurrentPage: (page: number) => void;
};

type OverViewStore = OverViewState & OverViewAction;

const overViewState = create<OverViewStore>((set, get) => ({
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
  selectedProgress: 'All' || get().TODO || get().IN_PROGRESS || get().DONE,
  displayedData: null,
  currentPage: 0,
  setSelectedProgress: (progress: string) => set({ selectedProgress: progress }),
  setDisplayedData: (data: any) => set({ displayedData: data }),
  setCurrentPage: (page: number) => set({ currentPage: page }),
}));

export const useOverViewState = () => overViewState((state) => state);
