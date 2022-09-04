import { atom } from 'recoil';

export const drawingState = atom<string>({
  key: 'drawing',
  default: '',
});
