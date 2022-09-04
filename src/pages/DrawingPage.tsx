import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import CanvasDraw from 'react-canvas-draw';
import LoadImageModal from '../components/LoadImageModal';
import WebCamModal from '../components/WebCamModal';
import ToolBar from '../components/ToolBar';

import Picture from '../icons/Picture';
import Back from '../icons/Back';
import Opacity from 'icons/Opacity';

import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { penWidthState } from '../atoms/PenWidth';
import { penColorState } from '../atoms/PenColor';
import { backImageState } from '../atoms/BackImage';
import { imageSourceState } from '../atoms/ImageSource';
import { linesState } from '../atoms/Lines';
import { erasedLinesState } from '../atoms/ErasedLines';
import Timer from './Timer';
import { Link, useNavigate } from 'react-router-dom';
import { drawingState } from '../atoms/Drawing';
import { historyState } from '../atoms/History';

function DrawingPage(): React.ReactElement {
  const [isMobile, setIsMobile] = useState(false);

  const penColor = useRecoilValue(penColorState);
  const penWidth = useRecoilValue(penWidthState);

  const backImage = useRecoilValue(backImageState);
  const [canvasRef, setCanvasRef] = useState<CanvasDraw | null>(null);

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

  const setDrawing = useSetRecoilState(drawingState);
  const setHistory = useSetRecoilState(historyState);

  const size = useMemo(() => {
    return window.innerWidth < window.innerHeight
      ? window.innerWidth
      : window.innerHeight;
  }, []);

  const onSelectFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          setImgSrc(reader.result?.toString() || null);
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

  const onChangeOpacity = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setOpacity(parseInt(e.target.value) / 100);
    },
    [setOpacity]
  );

  const onChangeCanvas = useCallback(
    (e: CanvasDraw) => {
      if (!canvasRef) return;
      const lineStr = canvasRef.getSaveData();
      setLines(lineStr);
      // 사용자가 직접 쓰는 경우 false, canvasRef.loadSaveData 를 쓸 경우 true
      const valuesChanged: boolean = (canvasRef as any).valuesChanged;
      if (!valuesChanged) {
        setErasedLines([]);
      }
    },
    [canvasRef, setLines, setErasedLines]
  );

  const navigate = useNavigate();
  const moveBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const complete = useCallback(() => {
    if (!canvasRef) return;
    const canvas = document.querySelector(
      '.CanvasDraw canvas:nth-child(2)'
    ) as HTMLCanvasElement;
    const imageURL = canvas.toDataURL('image/png');
    setDrawing(imageURL);
    setHistory(canvasRef.getSaveData());
  }, [canvasRef, setDrawing, setHistory]);

  return (
    <div className="fixed inset-0 flex flex-col">
      <div className="grow w-full bg-gray-200">
        <div className="h-[75px] w-full gap-x-1 flex flex-row bg-white">
          <button type="button" className="pl-4" onClick={moveBack}>
            <Back />
          </button>
          <button type="button" onClick={loadCameraModals}>
            <Picture />
          </button>
        </div>
        <Link to={'/pages/preview'}>
          <button
            type="button"
            className="absolute top-0 right-4 h-[75px]"
            onClick={complete}
          >
            완료
          </button>
        </Link>
        <div
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{ width: size, height: size }}
        >
          {backImage && (
            <img
              src={backImage}
              className="absolute"
              alt="배경이미지"
              style={{ opacity }}
            />
          )}
          <CanvasDraw
            className="CanvasDraw"
            ref={(canvasDraw) => {
              setCanvasRef(canvasDraw);
            }}
            onChange={onChangeCanvas}
            canvasWidth={size}
            canvasHeight={size}
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
          <div className="absolute top-1/2 -left-14 transform -translate-y-1/2 flex space-x-4 justify-center items-center box-border bg-black w-[185px] h-[38px] border-solid border-1 shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[100px] rotate-90">
            <Opacity />
            <input type="range" onChange={onChangeOpacity} />
          </div>
        </div>
        <Timer className="absolute" />
        <input
          ref={imageinput}
          onChange={onSelectFile}
          type="file"
          className="invisible"
          accept="image/*"
        />
      </div>
      <div className="flex absolute left-1/2 -translate-x-1/2 bottom-11 space-x-2 justify-center">
        <ToolBar canvasDraw={canvasRef} />
      </div>
      <LoadImageModal
        isOpen={showLoadImageModal}
        onClose={closeLoadImageModal}
      />
      <WebCamModal isOpen={showWebCamModal} onClose={closeWebCamModal} />
    </div>
  );
}

export default DrawingPage;
