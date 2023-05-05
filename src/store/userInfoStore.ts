import { create } from 'zustand';
import { IUser } from '@/type/authTypes';

interface UserState {
  userInfo: IUser | null;
  setUserInfo: (userInfo: IUser) => void;
  clearUserInfo: () => void;
}

const useUserStore = create<UserState>((set) => ({
  userInfo: null,
  setUserInfo: (userInfo) => set({ userInfo }),
  clearUserInfo: () => set({ userInfo: null }),
}));

export const useUserInfo = () => useUserStore((state) => state);
