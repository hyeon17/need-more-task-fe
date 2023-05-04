import { create } from 'zustand';

interface User {
  department: string;
  email: string;
  fullName: string;
  joinCompanyYear: string;
  phone: string;
  profileImageUrl: string;
}

interface UserState {
  userInfo: User | null;
  setUserInfo: (userInfo: User) => void;
  clearUserInfo: () => void;
}

const useUserStore = create<UserState>((set) => ({
  userInfo: null,
  setUserInfo: (userInfo) => set({ userInfo }),
  clearUserInfo: () => set({ userInfo: null }),
}));

export const useUserInfo = () => useUserStore((state) => state);
