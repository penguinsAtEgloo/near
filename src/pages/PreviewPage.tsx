import React, { useEffect, useState } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { useRecoilValue } from 'recoil';
import { drawingState } from '../atoms/Drawing';
import { historyState } from '../atoms/History';

function PreviewPage(): React.ReactElement {
  const [canvasRef, setCanvasRef] = useState<CanvasDraw | null>(null);
  const drawing = useRecoilValue(drawingState);
  const history = useRecoilValue(historyState);

  useEffect(() => {
    if (!canvasRef) return;
    if (!history) return;
    setTimeout(() => {
      canvasRef.loadSaveData(history);
    }, 500);
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
      {drawing && <img src={drawing} alt="미리보기" />}
    </div>
  );
}

export default PreviewPage;
