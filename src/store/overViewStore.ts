import { create } from 'zustand';

type OverViewState = {
  TODO: string;
  IN_PROGRESS: string;
  DONE: string;
};

type OverViewAction = {
  // getTODOStore: () => MouseEventHandler<HTMLButtonElement>;
  getIN_PROGRESSStore: () => string;
  getDONEStore: () => string;
};

type OverViewStore = OverViewState & OverViewAction;

const overViewState = create<OverViewStore>((set, get) => ({
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
  getTODOStore: () => get().TODO,
  getIN_PROGRESSStore: () => get().IN_PROGRESS,
  getDONEStore: () => get().DONE,
}));

export const useOverViewState = () => overViewState((state) => state);