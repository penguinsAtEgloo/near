import { atom } from 'recoil';

export const drawingState = atom<string | null>({
  key: 'drawing',
  default: null,
});
