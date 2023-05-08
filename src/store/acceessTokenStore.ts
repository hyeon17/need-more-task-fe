import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface IAccessToken {
  accessToken: string | null | undefined;
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
    onSaveAccessToken: (data: IAccessToken) => {
      set(() => ({ accessToken: data }));
      // console.log('onSave', data);

      localStorage.setItem('needMoreTaskToken', JSON.stringify(data.accessToken));
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
