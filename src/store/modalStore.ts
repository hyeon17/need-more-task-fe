import { create } from 'zustand';
import { StatusType } from '@/constant/TaskOverview';

type ModalState = {
  modal: 'create' | 'overview' | null;
  progressModal: 'TODO' | 'IN_PROGRESS' | 'DONE' | null;
};

type ModalAction = {
  onCloseModal: () => void;
  onOpenOverView: () => void;
  onOpenCreate: () => void;
  onOpenCreateProgress: (progressModal: 'TODO' | 'IN_PROGRESS' | 'DONE' | null) => void;
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
  progressModal: null,
  onCloseModal: () => set(() => ({ modal: null })),
  onOpenOverView: () => set(() => ({ modal: 'overview' })),
  onOpenCreate: () => set(() => ({ modal: 'create' })),
  onSetModalId: (id) => set(() => ({ id })),
  onOpenCreateProgress: (progressModal: 'TODO' | 'IN_PROGRESS' | 'DONE' | null) => set(() => ({ progressModal })),
}));

export const useModalState = () => modalState((state) => state);
