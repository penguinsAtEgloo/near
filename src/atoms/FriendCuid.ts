import { atom } from 'recoil';

export const friendCuidState = atom<string | undefined>({
  key: 'friendCuid',
  default: undefined,
});
