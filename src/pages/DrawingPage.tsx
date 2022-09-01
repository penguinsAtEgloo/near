import React, { useCallback, useState, useRef, useEffect } from 'react';
import Button from '../ui/Button';
import CanvasDraw from 'react-canvas-draw';
import LoadImageModal from '../components/LoadImageModal';
import ToolBar from '../components/ToolBar';
import Camera from '../icons/Camera';
import Check from '../icons/Check';
import Download from 'icons/Download';
import Share from 'icons/Share';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { penWidthState } from '../atoms/PenWidth';
import { penColorState } from '../atoms/PenColor';
import { backImageState } from '../atoms/BackImage';
import { imageSourceState } from '../atoms/ImageSource';
import Timer from './Timer';
import { Link } from 'react-router-dom';

function DrawingPage(): React.ReactElement {
  const [isSaveMode, setSaveMode] = useState(false);
  const openSaveMode = useCallback(() => setSaveMode(true), []);
  const closeSaveMode = useCallback(() => setSaveMode(false), []);

  const penColor = useRecoilValue(penColorState);
  const penWidth = useRecoilValue(penWidthState);

  const backImage = useRecoilValue(backImageState);
  const [canvasRef, setCanvasRef] = useState<CanvasDraw | null>(null);
<<<<<<< HEAD
=======
  const setDrawing = useSetRecoilState(drawingState);
  const setHistory = useSetRecoilState(historyState);

  const saveAsPNG = useCallback(() => {
    const canvas = document.querySelector(
      '.CanvasDraw canvas:nth-child(2)'
    ) as HTMLCanvasElement;
    const imageURL = canvas.toDataURL('image/png');
    setDrawing(imageURL);
    console.log(imageURL);

    if (!canvasRef) return;
    setHistory(canvasRef.getSaveData());
  }, [canvasRef, setDrawing, setHistory]);

>>>>>>> 5fc55f2 (feat: add export button)
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

  useEffect(() => {
    saveAsPNG();
    const data = canvasRef?.getSaveData();
    console.log('canvasRef => ' + canvasRef);
    console.log('모든좌표 데이터', data);
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

  const handleSaveClick = () => {
    saveAsPNG();
    const data = canvasRef?.getSaveData();
    console.log('canvasRef => ' + canvasRef);
    console.log('모든좌표 데이터', data);
    // secondCanvas.current.loadSaveData(data);
    // navigate('/pages/save', { state: canvasRef });
  };

  return (
    <>
      <div className="fixed inset-0 flex flex-col">
        <div
          className="flex grow w-full bg-gray-200"
          onPointerDown={closeSaveMode}
        >
          <CanvasDraw
            className="CanvasDraw"
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
          <button type="button" onClick={openSaveMode}>
            <Check />
          </button>
        </div>
        <div className="flex absolute left-1/2 -translate-x-1/2 bottom-11 space-x-2 justify-center">
          <div>
            {isSaveMode ? (
              <>
                <button className="flex items-center justify-center gap-4 w-full h-16 px-4 py-2 bg-black text-white rounded-full align-center">
                  친구에게 공유하기
                  <Share />
                </button>
                <Link to={'/pages/preview'}>
                  <button
                    className="flex items-center justify-center gap-4 w-full h-16 px-4 py-2 bg-black text-white rounded-full align-center"
                    onClick={saveAsPNG}
                  >
                    파일 저장하기
                    <Download />
                  </button>
                </Link>
              </>
            ) : (
              <ToolBar canvasDraw={canvasRef} onProceed={openSaveMode} />
            )}
          </div>
        </div>
      </div>
      <div className="fixed inset-0 flex flex-col">
        <div
          className="flex grow w-full bg-gray-200"
          onPointerDown={closeSaveMode}
        >
          <CanvasDraw
            className="CanvasDraw"
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
          />
          {/* <CanvasDraw
          ref={minifiedCanvas}
          // ref={(canvasDraw) => {
          //   //setMinifiedRef(canvasDraw);
          // }}
          canvasWidth={375}
          canvasHeight={667}
          hideGrid={true}
          disabled={true}
        /> */}
          <button onClick={handleSaveClick}>save</button>
          {/* <img src={drawing} alt="사진" /> */}
          <Timer className="absolute" />
          <SaveDialog isOpen={showSaveDialog} onClose={closeSaveDialog} />
        </div>
        <LoadImageModal
          isOpen={showLoadImageModal}
          onClose={closeLoadImageModal}
        />
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
              {/* <Button onClick={handleSaveClick}>프리뷰페이지</Button> */}
              <Button onClick={openSaveDialog}>저장</Button>
            </>
          ) : (
            <ToolBar canvasDraw={canvasRef} onProceed={openSaveMode} />
          )}
        </div>
      </div>
    </>
  );
}

export default DrawingPage;
