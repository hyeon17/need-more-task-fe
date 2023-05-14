import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface IAccessToken {
  accessToken: string;
}

export interface IAccessTokenStore {
  accessToken: IAccessToken | null;
  onSaveAccessToken: (data: IAccessToken) => void;
  onDeleteAccessToken: () => void;
  onRemoveAccessToken: () => void;
  getAccessToken: () => string | null | undefined;
}

const accessTokenStore = create<IAccessTokenStore>()(
  devtools((set) => ({
    accessToken: null,
    onSaveAccessToken: (accessToken: IAccessToken) => {
      set(() => ({ accessToken }));

      localStorage.setItem('needMoreTaskToken', JSON.stringify(accessToken));
    },
    onDeleteAccessToken: () => set(() => ({ accessToken: null })),
    onRemoveAccessToken: () => localStorage.removeItem('needMoreTaskToken'),
    getAccessToken: () => {
      if (typeof window !== 'undefined') {
        const accessToken = localStorage.getItem('needMoreTaskToken');
        return accessToken ? JSON.parse(accessToken) : '';
      }
    },
  })),
);

export const useAccessTokenStore = () => accessTokenStore((state) => state);
