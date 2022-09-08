import { atom } from 'recoil';

export const drawingStepState = atom<'wait' | 'play' | 'pause'>({
  key: 'drawingStep',
  default: 'wait',
});
