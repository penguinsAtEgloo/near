import React, { useCallback, useState } from 'react';
import Button from '../components/Button';
import SaveDialog from './SaveDialog';
import CanvasDraw from 'react-canvas-draw';
import chimchak from '../assets/chimchak.png';

function DrawingPage() {
  const [isSaveMode, setSaveMode] = useState(false);
  const openSaveMode = useCallback(() => setSaveMode(true), []);
  const closeSaveMode = useCallback(() => setSaveMode(false), []);

  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const openSaveDialog = useCallback(() => setShowSaveDialog(true), []);
  const closeSaveDialog = useCallback(() => setShowSaveDialog(false), []);

  const [penColor, setPenColor] = useState('#000000');
  const setColorValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPenColor(value);
  };
  const [penWidth, setPenWidth] = useState(10);
  const setWidthValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    setPenWidth(value);
  };
  const [showSlider, setShowSlider] = useState(false);
  const handleShowSlider = useCallback(
    () => setShowSlider((prev) => !prev),
    []
  );

  const [canvasRef, setCanvasRef] = useState<CanvasDraw | null>(null);
  const clear = useCallback(() => {
    canvasRef?.clear();
  }, [canvasRef]);
  const undo = useCallback(() => {
    canvasRef?.undo();
  }, [canvasRef]);

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
          canvasHeight={587}
          catenaryColor=""
          brushColor={penColor}
          brushRadius={penWidth}
          lazyRadius={0}
          hideGrid
          hideInterface
          // TODO: 사진 업로드
          imgSrc={chimchak}
        />
        <SaveDialog isOpen={showSaveDialog} onClose={closeSaveDialog} />
      </div>
      <div className="fixed inset-x-0 bottom-0 flex h-20 p-2 justify-between items-center">
        {isSaveMode ? (
          <>
            <Button>링크복사</Button>
            <Button>인스타</Button>
            <Button>페이스북</Button>
            <Button onClick={openSaveDialog}>저장</Button>
          </>
        ) : (
          <>
            <input
              className="w-12 h-12"
              type="color"
              onChange={setColorValue}
            />
            <Button className="relative" onClick={handleShowSlider}>
              <>
                굵기
                {showSlider && (
                  <input
                    className="absolute -top-6 -left-10"
                    type="range"
                    value={penWidth}
                    min={1}
                    max={20}
                    onChange={setWidthValue}
                  />
                )}
              </>
            </Button>
            <Button onClick={clear}>모두 지우기</Button>
            <Button onClick={undo}>실행취소</Button>
            <Button>사진 업로드</Button>
            <Button onClick={openSaveMode}>공유</Button>
          </>
        )}
      </div>
    </div>
  );
}

export default DrawingPage;
