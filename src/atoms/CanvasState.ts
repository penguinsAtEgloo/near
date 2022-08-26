import CanvasDraw from 'react-canvas-draw';
import { atom } from 'recoil';

// export interface ICanvasTypes {
//   //   data?: string;
//   //   canvasRef?: string;
//   canvas: CanvasDraw | null;
//   imgURL?: string;
//   getSaveData?: () => void;
//   loadSaveData?(saveData: string, immediate?: boolean): void;
//   getDataURL?(
//     fileType: string,
//     useBackgroundImage?: boolean | undefined,
//     color?: string | undefined
//   ): string;
//   clear?(): void;
//   undo?(): void;
//   //   canvas: HTMLCanvasElement | null;
// }

export const canvasState = atom<CanvasDraw | null>({
  key: 'canvasState',
  default: null,
});
