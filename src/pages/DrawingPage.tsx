import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import CanvasDraw from 'react-canvas-draw';
import LoadImageModal from '../components/LoadImageModal';
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
import { drawingStepState } from '../atoms/DrawingStep';
import { postImage } from '../api/images';

const dataURLtoBlob = (dataurl: any) => {
  const arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

function DrawingPage(): React.ReactElement {
  const penColor = useRecoilValue(penColorState);
  const penWidth = useRecoilValue(penWidthState);

  const [backImage, setBackImg] = useRecoilState(backImageState);
  const [canvasRef, setCanvasRef] = useState<CanvasDraw | null>(null);

  const imageinput = useRef<HTMLInputElement>(null);
  const [imageSource, setImgSrc] = useRecoilState(imageSourceState);
  const setLines = useSetRecoilState(linesState);
  const setErasedLines = useSetRecoilState(erasedLinesState);

  const [showLoadImageModal, setShowLoadImageModal] = useState(false);
  const closeLoadImageModal = useCallback(() => {
    setShowLoadImageModal(false);
  }, []);

  const [opacity, setOpacity] = useState<number>(0.5);

  const setDrawing = useSetRecoilState(drawingState);
  const setHistory = useSetRecoilState(historyState);

  const size = useMemo(() => {
    return { width: window.innerWidth, height: window.innerHeight };
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
    if (imageSource) {
      setShowLoadImageModal(true);
    }
  }, [imageSource]);

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
    setBackImg(null);
    navigate('/');
  }, [navigate, setBackImg]);

  const [drawingStep, setDrawingStep] = useRecoilState(drawingStepState);
  const complete = useCallback(() => {
    setDrawingStep('wait');
    if (!canvasRef) return;
    const imageUrl = (canvasRef as any).getDataURL('image/png');
    const blob = dataURLtoBlob(imageUrl);
    const formData = new FormData();
    formData.append('image', blob);

    setDrawing(imageUrl);
    setHistory(canvasRef.getSaveData());
    postImage(formData)
      .then((res) => console.log(res))
      .catch((error) => {
        console.log(error.response);
      });
  }, [canvasRef, setDrawing, setDrawingStep, setHistory]);

  return (
    <div className="fixed inset-0 flex flex-col">
      <div className="w-full min-h-[75px] flex p-4 justify-between">
        {/* to prevent occupying full width in safari browser */}
        <div className="w-20 flex space-x-1">
          <button type="button" onClick={moveBack}>
            <Back />
          </button>
          <button type="button" onClick={loadImage}>
            <Picture />
          </button>
          <input
            ref={imageinput}
            onChange={onSelectFile}
            type="file"
            className="invisible w-0 h-0"
            accept="image/*"
          />
        </div>
        <Link className="flex items-center" to={'/pages/preview'}>
          <button
            className="px-2 rounded-full bg-white font-semibold"
            type="button"
            onClick={complete}
          >
            완료
          </button>
        </Link>
      </div>
      <div className="absolute bottom-0 w-full">
        {backImage && (
          <img
            className="absolute"
            src={backImage}
            alt="배경이미지"
            style={{ opacity, height: `${size.height - 75}px` }}
          />
        )}
        <CanvasDraw
          className="CanvasDraw"
          ref={(canvasDraw) => {
            setCanvasRef(canvasDraw);
          }}
          onChange={onChangeCanvas}
          canvasWidth={size.width}
          canvasHeight={size.height - 75}
          catenaryColor=""
          brushColor={penColor}
          brushRadius={penWidth}
          lazyRadius={0}
          hideGrid
          hideInterface
          enablePanAndZoom={true}
          mouseZoomFactor={1}
          zoomExtents={{ min: 0.33, max: 3 }}
          disabled={drawingStep !== 'play'}
        />
      </div>
      <div className="absolute top-1/2 -left-14 transform -translate-y-1/2 flex space-x-4 justify-center items-center box-border bg-black w-[185px] h-[38px] border-solid border-1 shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[100px] rotate-90">
        <Opacity />
        <input type="range" onChange={onChangeOpacity} />
      </div>
      <Timer className="absolute top-20 left-4 flex" onComplete={complete} />
      <div className="absolute left-1/2 -translate-x-1/2 bottom-11">
        <ToolBar canvasDraw={canvasRef} />
      </div>
      <LoadImageModal
        isOpen={showLoadImageModal}
        onClose={closeLoadImageModal}
      />
    </div>
  );
}

export default DrawingPage;
