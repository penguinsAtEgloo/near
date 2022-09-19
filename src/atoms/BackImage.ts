import { atom } from 'recoil';

export const backImageState = atom<string | undefined>({
  key: 'backImage',
  default: undefined,
});
