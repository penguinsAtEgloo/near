import { atom } from 'recoil';

export const backImageState = atom<string | null>({
  key: 'backImage',
  default: null,
});
