import { atom } from 'recoil';

export const linesState = atom<string | null>({
  key: 'lines',
  default: null,
});
