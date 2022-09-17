import { atom } from 'recoil';

export const backImageState = atom<string>({
  key: 'backImage',
  default: '',
});
