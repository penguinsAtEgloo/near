import React, { useCallback, useEffect, useRef, useState } from 'react';
import CanvasDraw from 'react-canvas-draw';
import Button from '../ui/Button';
import Dialog, { DialogProps } from '../ui/Dialog';

type SaveDialogProps = Pick<DialogProps, 'isOpen' | 'onClose'>;

function SaveDialog({ isOpen, onClose }: SaveDialogProps): React.ReactElement {
  const [canvasRef, setCanvasRef] = useState<CanvasDraw | null>(null);
  const [drawing, setDrawing] = useState('');

  useEffect(() => {
    saveAsPNG();
    const data = canvasRef?.getSaveData();
    console.log('canvasRef => ' + canvasRef);
    console.log('모든좌표 데이터', data);
  }, [canvasRef, isOpen]);

  const saveAsPNG = () => {
    const canvas = document.querySelector(
      '.CanvasDraw canvas:nth-child(2)'
    ) as HTMLCanvasElement;
    const imageURL = canvas.toDataURL('image/png');
    setDrawing(imageURL);
    console.log('PNG image data');
    console.log(imageURL);
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col space-y-8">
        <div className="flex justify-center items-center w-full h-80 border border-gray-700 bg-gray-300">
          <img className="h-80" src={drawing} alt="미리보기" />
        </div>
        <div className="flex justify-between">
          <Button>이미지 저장</Button>
          <Button>동영상 저장</Button>
          <Button>히스토리 저장</Button>
          <Button>필터 +</Button>
        </div>
      </div>
    </Dialog>
  );
}

export default SaveDialog;
