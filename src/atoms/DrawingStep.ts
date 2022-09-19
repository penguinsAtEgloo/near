import { atom } from 'recoil';

export const drawingStepState = atom<'wait' | 'play' | 'pause' | 'end'>({
  key: 'drawingStep',
  default: 'wait',
});
