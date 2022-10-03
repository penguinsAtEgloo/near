import { atom } from 'recoil';

export const friendImageState = atom<string | undefined>({
  key: 'friendImage',
  default: undefined,
});
