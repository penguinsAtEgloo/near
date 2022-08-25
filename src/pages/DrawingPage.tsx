import React, { useCallback, useState, useRef } from 'react';
import Button from '../ui/Button';
import SaveDialog from '../dialog/SaveDialog';
import CanvasDraw from 'react-canvas-draw';
import LoadImageModal from '../components/LoadImageModal';
import ToolBar from '../components/ToolBar';
import Camera from '../icons/Camera';
import Check from '../icons/Check';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { penWidthState } from '../atoms/PenWidth';
import { penColorState } from '../atoms/PenColor';
import { backImageState } from '../atoms/BackImage';
import { imageSourceState } from '../atoms/ImageSource';
import Timer from './Timer';

function DrawingPage(): React.ReactElement {
  const [isSaveMode, setSaveMode] = useState(false);
  const openSaveMode = useCallback(() => setSaveMode(true), []);
  const closeSaveMode = useCallback(() => setSaveMode(false), []);

  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const openSaveDialog = useCallback(() => setShowSaveDialog(true), []);
  const closeSaveDialog = useCallback(() => setShowSaveDialog(false), []);

  const penColor = useRecoilValue(penColorState);
  const penWidth = useRecoilValue(penWidthState);

  const backImage = useRecoilValue(backImageState);
  const [canvasRef, setCanvasRef] = useState<CanvasDraw | null>(null);
  const imageinput = useRef<HTMLInputElement>(null);
  const setImgSrc = useSetRecoilState(imageSourceState);

  const [showLoadImageModal, setShowLoadImageModal] = useState(false);
  const openLoadImageModal = useCallback(() => setShowLoadImageModal(true), []);
  const closeLoadImageModal = useCallback(
    () => setShowLoadImageModal(false),
    []
  );

  const onSelectFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          setImgSrc(reader.result?.toString() || '');
        });
        reader.readAsDataURL(e.target.files[0]);
        openLoadImageModal();
      }
    },
    [openLoadImageModal, setImgSrc]
  );

  const loadImage = useCallback(() => {
    imageinput.current?.click();
  }, []);

  return (
    <>
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
            imgSrc={backImage}
            enablePanAndZoom={true}
            mouseZoomFactor={1}
            zoomExtents={{ min: 0.33, max: 3 }}
          />
          <Timer className="absolute" />
          <SaveDialog isOpen={showSaveDialog} onClose={closeSaveDialog} />
          <input
            ref={imageinput}
            onChange={onSelectFile}
            type="file"
            className="invisible"
            accept="image/*"
          />
        </div>
        <div className="absolute top-4 right-4 flex w-[80px] justify-between">
          <button type="button" onClick={loadImage}>
            <Camera />
          </button>
          <Check />
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
      <LoadImageModal
        isOpen={showLoadImageModal}
        onClose={closeLoadImageModal}
      />
    </>
  );
}

export default DrawingPage;
