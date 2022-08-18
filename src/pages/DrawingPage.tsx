import React, { useCallback, useState } from 'react';
import Button from '../ui/Button';
import SaveDialog from '../dialog/SaveDialog';
import CanvasDraw from 'react-canvas-draw';
import LoadImageModal from '../components/LoadImageModal';
import chimchak from '../assets/chimchak.png';
import { useRecoilValue } from 'recoil';
import { penWidthState } from '../atoms/PenWidth';
import { penColorState } from '../atoms/PenColor';
import ToolBar from '../components/ToolBar';
import Camera from '../icons/Camera';
import Check from '../icons/Check';

function DrawingPage(): React.ReactElement {
  const [isSaveMode, setSaveMode] = useState(false);
  const openSaveMode = useCallback(() => setSaveMode(true), []);
  const closeSaveMode = useCallback(() => setSaveMode(false), []);

  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const openSaveDialog = useCallback(() => setShowSaveDialog(true), []);
  const closeSaveDialog = useCallback(() => setShowSaveDialog(false), []);

  const [showLoadImageModal, setShowLoadImageModal] = useState(false);
  const openLoadImageModal = useCallback(() => setShowLoadImageModal(true), []);
  const closeLoadImageModal = useCallback(
    () => setShowLoadImageModal(false),
    []
  );

  const penColor = useRecoilValue(penColorState);
  const penWidth = useRecoilValue(penWidthState);

  const [canvasRef, setCanvasRef] = useState<CanvasDraw | null>(null);

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
          imgSrc={imgSrc}
        />
        <SaveDialog isOpen={showSaveDialog} onClose={closeSaveDialog} />
        <LoadImageModal
          isOpen={showLoadImageModal}
          onClose={closeLoadImageModal}
        />
      </div>
      <div className="absolute top-4 right-4 flex w-[80px] justify-between">
        <button onClick={openLoadImageModal}>
          <Camera></Camera>
        </button>
        <Check></Check>
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
