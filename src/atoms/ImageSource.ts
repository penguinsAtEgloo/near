import { atom } from 'recoil';

export const imageSourceState = atom<string>({
  key: 'imageSource',
  default: '',
});
