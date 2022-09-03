import { atom } from 'recoil';

export const drawingState = atom<string>({
  key: 'drawingState',
  default: '',
});
