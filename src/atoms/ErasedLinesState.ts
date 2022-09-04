import { atom } from 'recoil';

export const erasedLinesState = atom<string[]>({
  key: 'erasedLines',
  default: [],
});
