import React, { useCallback, useState, useRef, useEffect } from 'react';
import CanvasDraw from 'react-canvas-draw';
import LoadImageModal from '../components/LoadImageModal';
import WebCamModal from '../components/WebCamModal';
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
import { drawingState } from '../atoms/DrawingState';
import { historyState } from '../atoms/HistoryState';

function DrawingPage(): React.ReactElement {
  const [isMobile, setIsMobile] = useState(false);
  const [isSaveMode, setSaveMode] = useState(false);
  const openSaveMode = useCallback(() => setSaveMode(true), []);
  const closeSaveMode = useCallback(() => setSaveMode(false), []);

  const penColor = useRecoilValue(penColorState);
  const penWidth = useRecoilValue(penWidthState);

  const backImage = useRecoilValue(backImageState);
  const [canvasRef, setCanvasRef] = useState<CanvasDraw | null>(null);
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

  const imageinput = useRef<HTMLInputElement>(null);
  const [imageSource, setImgSrc] = useRecoilState(imageSourceState);

  const [showLoadImageModal, setShowLoadImageModal] = useState(false);
  const closeLoadImageModal = useCallback(() => {
    setShowLoadImageModal(false);
  }, []);

  const [showWebCamModal, setShowWebCamModal] = useState(false);
  const closeWebCamModal = useCallback(() => setShowWebCamModal(false), []);

  const onSelectFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          setImgSrc(reader.result?.toString() || '');
          e.target.value = '';
        });
        reader.readAsDataURL(e.target.files[0]);
      }
    },
    [setImgSrc]
  );

  const loadImage = useCallback(() => {
    imageinput.current?.click();
  }, []);

  useEffect(() => {
    try {
      document.createEvent('TouchEvent');
      setIsMobile(true);
    } catch (e) {
      setIsMobile(false);
    }
  }, [setIsMobile]);

  useEffect(() => {
    if (imageSource) {
      setShowLoadImageModal(true);
    }
  }, [imageSource]);

  const loadCameraModals = useCallback(() => {
    if (isMobile) {
      loadImage();
    } else {
      setShowWebCamModal(true);
    }
  }, [isMobile, loadImage, setShowWebCamModal]);

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
          <button type="button" onClick={loadCameraModals}>
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
      <LoadImageModal
        isOpen={showLoadImageModal}
        onClose={closeLoadImageModal}
      />
      <WebCamModal isOpen={showWebCamModal} onClose={closeWebCamModal} />
    </>
  );
}

export default DrawingPage;
