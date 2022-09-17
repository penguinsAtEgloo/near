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
          if (!reader.result) return;
          setImgSrc(reader.result.toString());
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
    navigate('/');
    window.location.reload();
  }, [navigate]);

  const [drawingStep, setDrawingStep] = useRecoilState(drawingStepState);
  const complete = useCallback(() => {
    setDrawingStep('wait');
    if (!canvasRef) return;
    (canvasRef as any).setView({ scale: 1.0 });
    (canvasRef as any).setView({ x: 0, y: 0 });
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
        <CanvasDraw
          className="CanvasDraw"
          imgSrc={backImage}
          ref={(canvasDraw) => {
            setCanvasRef(canvasDraw);
          }}
          clampLinesToDocument={true}
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
          mouseZoomFactor={0.5}
          zoomExtents={{ min: 0.33, max: 3 }}
          disabled={drawingStep !== 'play'}
        />
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
