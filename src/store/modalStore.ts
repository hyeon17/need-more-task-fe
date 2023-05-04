import { create } from 'zustand';
import { StatusType } from '@/pages/kanban';

type ModalState = {
  modal: 'create' | 'overview' | null;
};

type ModalAction = {
  onCloseModal: () => void;
  onOpenOverView: () => void;
  onOpenCreate: () => void;
};

type ModalId = {
  id: string | StatusType;
};

type ModalIdAction = {
  onSetModalId: (id: string) => void;
};

type ModalStore = ModalState & ModalAction & ModalId & ModalIdAction;

const modalState = create<ModalStore>((set) => ({
  id: '',
  modal: null,
  onCloseModal: () => set(() => ({ modal: null })),
  onOpenOverView: () => set(() => ({ modal: 'overview' })),
  onOpenCreate: () => set(() => ({ modal: 'create' })),
  onSetModalId: (id) => set(() => ({ id })),
}));

export const useModalState = () => modalState((state) => state);
