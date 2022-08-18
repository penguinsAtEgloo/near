import React, { useCallback, useState, useRef } from 'react';
import Button from '../ui/Button';
import SaveDialog from '../dialog/SaveDialog';
import CanvasDraw from 'react-canvas-draw';
import chimchak from '../assets/chimchak.png';
import { useRecoilValue } from 'recoil';
import { penWidthState } from '../atoms/PenWidth';
import { penColorState } from '../atoms/PenColor';
import ToolBar from '../components/ToolBar';

function DrawingPage() {
  const [isSaveMode, setSaveMode] = useState(false);
  const openSaveMode = useCallback(() => setSaveMode(true), []);
  const closeSaveMode = useCallback(() => setSaveMode(false), []);

  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const openSaveDialog = useCallback(() => setShowSaveDialog(true), []);
  const closeSaveDialog = useCallback(() => setShowSaveDialog(false), []);

  const penColor = useRecoilValue(penColorState);
  const penWidth = useRecoilValue(penWidthState);

  const [canvasRef, setCanvasRef] = useState<CanvasDraw | null>(null);
  // const [minifiedRef, setMinifiedRef] useState<CanvasDraw | null >(null);

  const minifiedCanvas = useRef(null);
  const saveDrawing = () => {
    //console.log('click');
    // const data = canvasRef.current.getSaveData();
    // console.log(data);
    // minifiedCanvas.current.loadSaveData(data);
    const data = canvasRef?.getSaveData();
    console.log(data);
    // minifiedRef?.loadSaveData(data);
    // canvasDraw?.loadSaveData(data);
  };

  // const showDrawing = useCallback(() => {
  //   CanvasDraw?.loadSaveData();
  // })
  // const undo = useCallback(() => {
  //   canvasDraw?.undo();
  // }, [canvasDraw]);

  return (
    <div className="fixed inset-0 flex flex-col">
      <div
        className="flex grow w-full bg-gray-200"
        onPointerDown={closeSaveMode}
      >
        <CanvasDraw
          ref={(canvasDraw) => {
            setCanvasRef(canvasDraw);
          }}
          // TODO: 영역크기 계산하여 width, height 넣어주어야 함
          canvasWidth={375}
          canvasHeight={667}
          catenaryColor=""
          brushColor={penColor}
          brushRadius={penWidth}
          lazyRadius={0}
          hideGrid
          hideInterface
          // TODO: 사진 업로드
          imgSrc={chimchak}
        />
        <CanvasDraw
          ref={minifiedCanvas}
          // ref={(canvasDraw) => {
          //   //setMinifiedRef(canvasDraw);
          // }}
          canvasWidth={375}
          canvasHeight={667}
          hideGrid={true}
          disabled={true}
        />
        <button onClick={saveDrawing}>save</button>
        <SaveDialog isOpen={showSaveDialog} onClose={closeSaveDialog} />
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-11">
        {isSaveMode ? (
          <>
            <Button>링크복사</Button>
            <Button>인스타</Button>
            <Button>페이스북</Button>
            <Button onClick={openSaveDialog}>저장</Button>
          </>
        ) : (
          <ToolBar canvasDraw={canvasRef} onProceed={openSaveMode} />
        )}
      </div>
    </div>
  );
}

export default DrawingPage;
