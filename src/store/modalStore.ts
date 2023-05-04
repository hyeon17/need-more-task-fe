import { create } from 'zustand';

type ModalState = {
  modal: boolean;
};

type ModalAction = {
  onCloseModal: () => void;
  onOpenModal: () => void;
};

type ModalId = {
  id: string;
};

type ModalIdAction = {
  onSetModalId: (id: string) => void;
};

type ModalStore = ModalState & ModalAction & ModalId & ModalIdAction;

const modalState = create<ModalStore>((set) => ({
  id: '',
  modal: false,
  onCloseModal: () => set(() => ({ modal: false })),
  onOpenModal: () => set(() => ({ modal: true })),
  onSetModalId: (id) => set(() => ({ id })),
}));

export const useModalState = () => modalState((state) => state);
