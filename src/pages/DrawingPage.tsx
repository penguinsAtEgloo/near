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
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

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

<<<<<<< HEAD
=======
  // Drawing
  const [drawing, setDrawing] = useState('');

  const minifiedCanvas = useRef(null);
  const saveDrawing = useCallback(() => {
    if (!canvasRef) return;
    const data = canvasRef.getSaveData();
    if (!minifiedCanvas) return;
    canvasRef?.loadSaveData(data);
    console.log(canvasRef.getDataURL('image/png', false, '#FFFFFF'));
  }, [canvasRef]);
  const saveAsPNG = () => {
    const canvas = document.querySelector(
      '.CanvasDraw canvas:nth-child(2)'
    ) as HTMLCanvasElement;
    const imageURL = canvas.toDataURL('image/png');
    setDrawing(imageURL);
    console.log('PNG image data');
    console.log(imageURL);
  };
  const navigate = useNavigate();
  const handleSaveClick = () => {
    saveAsPNG();
    const data = canvasRef?.getSaveData();
    // console.log('canvasRef => ' + canvasRef);
    // console.log('모든좌표 데이터', data);
    // secondCanvas.current.loadSaveData(data);
    navigate('/pages/save', { state: canvasRef });
  };

>>>>>>> e75b3d3 (feat: add preview page #22)
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
<<<<<<< HEAD
      <LoadImageModal
        isOpen={showLoadImageModal}
        onClose={closeLoadImageModal}
      />
    </>
=======
      <div className="absolute left-1/2 -translate-x-1/2 bottom-11">
        {isSaveMode ? (
          <>
            <Button>링크복사</Button>
            <Button>인스타</Button>
            <Button>페이스북</Button>

            {/* <Link
              className="absolute bottom-48"
              to={'/pages/save'}
              state={{ canvasRef: canvasRef }}
            >
              
            </Link> */}
            <Button onClick={handleSaveClick}>프리뷰페이지</Button>
            {/* <Button onClick={openSaveDialog}>저장</Button> */}
          </>
        ) : (
          <ToolBar canvasDraw={canvasRef} onProceed={openSaveMode} />
        )}
      </div>
    </div>
>>>>>>> e75b3d3 (feat: add preview page #22)
  );
}

export default DrawingPage;
