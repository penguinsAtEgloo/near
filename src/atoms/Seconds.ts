import { atom } from 'recoil';

export const secondsState = atom<number>({
  key: `seconds/${Date.now()}`,
  default: 120,
});
