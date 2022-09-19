import { atom } from 'recoil';

export const secondsState = atom<number>({
  key: 'seconds',
  default: 180,
});
