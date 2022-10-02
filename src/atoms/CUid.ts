import { atom } from 'recoil';

export const myDrawingCUidState = atom<string | undefined>({
  key: 'myCUid',
  default: undefined,
});
