import { atom } from 'recoil';

export const drawingState = atom<string | undefined>({
  key: 'drawing',
  default: undefined,
});
