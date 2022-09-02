import CanvasDraw from 'react-canvas-draw';
import { atom } from 'recoil';

export const canvasState = atom<CanvasDraw | null>({
  key: 'canvasState',
  default: null,
});
