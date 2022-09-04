import { atom } from 'recoil';

export const historyState = atom<string | null>({
  key: 'history',
  default: null,
});
