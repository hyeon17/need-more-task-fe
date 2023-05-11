import { KanbanDataType } from '@/pages/kanban';
import { create } from 'zustand';

type KanbanBoard = {
  kanban: KanbanDataType;
};

type KanbanBoardAction = {
  onAddKanban: (kanban: KanbanDataType) => void;
  onUpdateKanban: (kanban: KanbanDataType) => void;
};

type KanbanBoardStore = KanbanBoard & KanbanBoardAction;

const KanbanBoardStore = create<KanbanBoardStore>((set) => ({
  kanban: {
    DONE: [],
    IN_PROGRESS: [],
    TODO: [],
  },
  onAddKanban: (kanban) => set(() => ({ kanban })),
  onUpdateKanban: (kanban) => set(() => ({ kanban })),
}));

export const useKanbanBoardState = () => KanbanBoardStore((state) => state);
