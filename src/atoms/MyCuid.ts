import { atom } from 'recoil';

export const myDrawingCuidState = atom<string | undefined>({
  key: 'myCuid',
  default: undefined,
});
