import { atom } from 'recoil';

export const historyState = atom<string | undefined>({
  key: 'historyState',
  default: undefined,
});
