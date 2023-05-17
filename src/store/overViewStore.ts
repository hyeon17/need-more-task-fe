import { create } from 'zustand';

type OverViewState = {
  displayedData: any;
  currentPage: number;
  totalPage: number;
  TODO: string;
  IN_PROGRESS: string;
  DONE: string;
  selectedProgress: string;
};

type OverViewAction = {
  getDisplayedData: () => void;
  setDisplayedData: (data: any) => void;
  setCurrentPage: (page: number) => void;
  setTotalPage: (page: number) => void;
  getTotalPage: () => number;
  getSelectedProgress: () => string;
  setSelectedProgress: (progress: string) => void;
};

type OverViewStore = OverViewState & OverViewAction;

const overViewState = create<OverViewStore>((set, get) => ({
  displayedData: null,
  currentPage: 0,
  totalPage: 0,
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
  selectedProgress: 'All' || get().TODO || get().IN_PROGRESS || get().DONE,
  getDisplayedData: () => get().displayedData,
  setDisplayedData: (data: any) => set({ displayedData: data }),
  setCurrentPage: (page: number) => set({ currentPage: page }),
  setTotalPage: (page: number) => set({ totalPage: page }),
  getTotalPage: () => get().totalPage,
  getSelectedProgress: () => get().selectedProgress,
  setSelectedProgress: (progress: string) => set({ selectedProgress: progress }),
}));

export const useOverViewState = () => overViewState((state) => state);
