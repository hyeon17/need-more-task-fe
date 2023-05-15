import { create } from 'zustand';

type OverViewState = {
  displayedData: any;
  currentPage: number;
  totalPage: number;
};

type OverViewAction = {
  setDisplayedData: (data: any) => void;
  setCurrentPage: (page: number) => void;
  setTotalPage: (page: number) => void;
  getTotalPage: () => number;
};

type OverViewStore = OverViewState & OverViewAction;

const overViewState = create<OverViewStore>((set, get) => ({
  displayedData: null,
  currentPage: 0,
  totalPage: 0,
  setDisplayedData: (data: any) => set({ displayedData: data }),
  setCurrentPage: (page: number) => set({ currentPage: page }),
  setTotalPage: (page: number) => set({ totalPage: page }),
  getTotalPage: () => get().totalPage,
}));

export const useOverViewState = () => overViewState((state) => state);
