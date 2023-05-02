import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface IJoinData {
  department?: string;
  joinCompanyYear?: number;
  fullname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  imagePath?: string;
  phone?: string;
}

interface IUserJoinInfoStore {
  me: IJoinData | null;
  onResetSignup: () => void;
  onSaveSignup: (signupData: IJoinData) => void;
}

const userJoinStore = create<IUserJoinInfoStore>()(
  devtools((set) => ({
    me: null,
    onSaveSignup: (signupData) => set((state) => ({ me: { ...state.me, ...signupData } })),
    onResetSignup: () => set(() => ({ me: null })),
  })),
);

export const useUserJoinStore = () => userJoinStore((state) => state);
