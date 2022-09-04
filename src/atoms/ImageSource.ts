import { atom } from 'recoil';

export const imageSourceState = atom<string | null>({
  key: 'imageSource',
  default: null,
});
