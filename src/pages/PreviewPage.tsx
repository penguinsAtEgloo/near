import React, { useEffect, useState } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { useRecoilValue } from 'recoil';
import { drawingState } from '../atoms/DrawingState';
import { historyState } from '../atoms/HistoryState';

function PreviewPage(): React.ReactElement {
  const [canvasRef, setCanvasRef] = useState<CanvasDraw | null>(null);
  const drawing = useRecoilValue(drawingState);
  const history = useRecoilValue(historyState);

  useEffect(() => {
    console.log({ history });
    if (!history) return;
    canvasRef?.loadSaveData(history);
  }, [canvasRef, history]);

  return (
    <div className="fixed inset-0">
      <CanvasDraw
        className="CanvasDraw"
        ref={(canvasDraw) => {
          setCanvasRef(canvasDraw);
        }}
        // TODO: 영역크기 계산하여 width, height 넣어주어야 함
        canvasWidth={375}
        canvasHeight={667}
        catenaryColor=""
        lazyRadius={0}
        hideGrid
        hideInterface
        enablePanAndZoom={true}
        mouseZoomFactor={1}
        zoomExtents={{ min: 0.33, max: 3 }}
      />
      <img src={drawing} alt="미리보기" />
    </div>
  );
}

export default PreviewPage;
