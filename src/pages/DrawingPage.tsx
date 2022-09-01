import React, { useCallback, useState, useRef, useEffect } from 'react';
import CanvasDraw from 'react-canvas-draw';
import LoadImageModal from '../components/LoadImageModal';
// import WebCamModal from '../components/WebCamModal';
import WebCamModal from '../components/WebCamModal';
import ToolBar from '../components/ToolBar';
import Camera from '../icons/Camera';
import Check from '../icons/Check';
import Download from 'icons/Download';
import Share from 'icons/Share';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { penWidthState } from '../atoms/PenWidth';
import { penColorState } from '../atoms/PenColor';
import { backImageState } from '../atoms/BackImage';
import { imageSourceState } from '../atoms/ImageSource';
import { linesState } from '../atoms/Lines';
import { erasedLinesState } from '../atoms/ErasedLines';
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
  const [drawing, setDrawing] = useRecoilState(drawingState);
  const setHistory = useSetRecoilState(historyState);

  const copyURL = useCallback(() => {
    if (!canvasRef) return;
    const canvas = document.querySelector(
      '.CanvasDraw canvas:nth-child(2)'
    ) as HTMLCanvasElement;
    const imageURL = canvas.toDataURL('image/png');
    setDrawing(imageURL);
    window.navigator.clipboard.writeText(drawing).then(() => {
      alert('복사 완료!');
    });
  }, [canvasRef, drawing, setDrawing]);

  const saveAsPNG = useCallback(() => {
    if (!canvasRef) return;
    const canvas = document.querySelector(
      '.CanvasDraw canvas:nth-child(2)'
    ) as HTMLCanvasElement;
    const imageURL = canvas.toDataURL('image/png');
    setDrawing(imageURL);
    const canvasImage = document.createElement('a');
    canvasImage.href = imageURL;
    canvasImage.download = 'NEAR.png';
    document.body.appendChild(canvasImage);
    canvasImage.click();

    setHistory(canvasRef.getSaveData());
  }, [canvasRef, setDrawing, setHistory]);

  const imageinput = useRef<HTMLInputElement>(null);
  const [imageSource, setImgSrc] = useRecoilState(imageSourceState);
  const setLines = useSetRecoilState(linesState);
  const setErasedLines = useSetRecoilState(erasedLinesState);

  const [showLoadImageModal, setShowLoadImageModal] = useState(false);
  const closeLoadImageModal = useCallback(() => {
    setShowLoadImageModal(false);
  }, []);

  const [showWebCamModal, setShowWebCamModal] = useState(false);
  const closeWebCamModal = useCallback(() => setShowWebCamModal(false), []);

  const [opacity, setOpacity] = useState<number>(0.5);

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
    }
  }, [isMobile, loadImage]);

  const onChangeOpacity = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setOpacity(parseInt(e.target.value) / 100);
    },
    [setOpacity]
  );

  const onChangeCanvas = useCallback(
    (e: CanvasDraw) => {
      if (canvasRef) {
        const lineStr: string | undefined = canvasRef.getSaveData();
        if (lineStr) {
          setLines(lineStr);
        }
        if (!(canvasRef as any).valuesChanged) {
          setErasedLines([]);
        }
      }
    },
    [canvasRef, setLines, setErasedLines]
  );

  return (
    <>
      <div className="fixed inset-0 flex flex-col">
        <div className="grow w-full bg-gray-200" onPointerDown={closeSaveMode}>
          <div className="bg-black">
            <input type="range" onChange={onChangeOpacity} />
          </div>
          {backImage && (
            <div className="absolute">
              <img
                src={backImage}
                alt="배경이미지"
                style={{ opacity: opacity, width: '375px', height: '667px' }}
              />
            </div>
          )}
          <CanvasDraw
            className="CanvasDraw"
            ref={(canvasDraw) => {
              setCanvasRef(canvasDraw);
            }}
            onChange={onChangeCanvas}
            // TODO: 영역크기 계산하여 width, height 넣어주어야 함
            canvasWidth={375}
            canvasHeight={667}
            catenaryColor=""
            brushColor={penColor}
            brushRadius={penWidth}
            lazyRadius={0}
            hideGrid
            hideInterface
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
                <button
                  className="flex items-center justify-center gap-4 w-full h-16 px-4 py-2 bg-black text-white rounded-full align-center"
                  onClick={copyURL}
                >
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
