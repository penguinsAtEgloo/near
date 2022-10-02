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
import EyeOpen from '../icons/EyeOpen';
import EyeClosed from '../icons/EyeClosed';

import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { penWidthState } from '../atoms/PenWidth';
import { penColorState } from '../atoms/PenColor';
import { backImageState } from '../atoms/BackImage';
import { imageSourceState } from '../atoms/ImageSource';
import { linesState } from '../atoms/Lines';
import { erasedLinesState } from '../atoms/ErasedLines';
import Timer from './Timer';
import { useNavigate } from 'react-router-dom';
import { drawingState } from '../atoms/Drawing';
import { historyState } from '../atoms/History';
import { drawingStepState } from '../atoms/DrawingStep';
import { postImage } from '../api/images';
import FinishDialog from '../dialog/FinishDialog';
import { secondsState } from '../atoms/Seconds';
import StartDialog from '../dialog/StartDialog';
import { myDrawingCUidState } from '../atoms/CUid';

function DrawingPage(): React.ReactElement {
  const penColor = useRecoilValue(penColorState);
  const penWidth = useRecoilValue(penWidthState);
  const backImage = useRecoilValue(backImageState);
  const [imageSource, setImgSrc] = useRecoilState(imageSourceState);
  const setLines = useSetRecoilState(linesState);
  const setErasedLines = useSetRecoilState(erasedLinesState);
  const setDrawing = useSetRecoilState(drawingState);
  const setHistory = useSetRecoilState(historyState);
  const [backgroundShown, setBackgroundShown] = useState<boolean>(true);
  const setMyCUid = useSetRecoilState(myDrawingCUidState);

  const imageInput = useRef<HTMLInputElement>(null);
  const [canvasRef, setCanvasRef] = useState<CanvasDraw | null>(null);
  const [showLoadImageModal, setShowLoadImageModal] = useState(false);
  const closeLoadImageModal = useCallback(
    () => setShowLoadImageModal(false),
    []
  );

  const [showStartDialog, setShowStartDialog] = useState(true);
  const closeStartDialog = useCallback(() => setShowStartDialog(false), []);

  const switchBackground = useCallback(() => {
    setBackgroundShown((prev) => !prev);
  }, []);

  const size = useMemo(() => {
    return { width: window.innerWidth, height: window.innerHeight };
  }, []);

  const [blankImage, setBlankImage] = useState('');
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = size.width;
    canvas.height = size.height;
    const res = canvas?.getContext('2d');
    if (!res || !(res instanceof CanvasRenderingContext2D)) {
      return;
    }
    const ctx: CanvasRenderingContext2D = res;
    if (!ctx) return;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    setBlankImage(canvas.toDataURL('image/jpeg'));
  }, [setBlankImage, size]);

  const dataURLtoBlob = useCallback((dataurl: any) => {
    const arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
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
    imageInput.current?.click();
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
    window.location.replace('/');
  }, []);
  const refresh = useCallback(() => {
    window.location.reload();
  }, []);

  const [drawingStep, setDrawingStep] = useRecoilState(drawingStepState);
  const playDrawing = useCallback(
    () => setDrawingStep('play'),
    [setDrawingStep]
  );

  const targetRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const start = (event: Event) => {
      if (!event.target) return;
      const targetElement = targetRef.current;
      if (!targetElement) return;
      if (targetElement.contains(event.target as HTMLElement)) playDrawing();
    };
    document.addEventListener('pointerdown', start);
    return () => document.removeEventListener('pointerdown', start);
  }, [playDrawing]);

  const requestCompleteDrawing = useCallback(() => {
    setDrawingStep('end');
  }, [setDrawingStep]);

  const complete = useCallback(() => {
    if (!canvasRef) return;
    (canvasRef as any).setView({ scale: 1.0 });
    (canvasRef as any).setView({ x: 0, y: 0 });
    const imageUrl = (canvasRef as any).getDataURL(
      'image/png',
      false,
      '#FFFFFF'
    );
    const blob = dataURLtoBlob(imageUrl);
    const formData = new FormData();
    formData.append('image', blob);

    setDrawing(imageUrl);
    setHistory(canvasRef.getSaveData());
    postImage(formData)
      .then((res: any) => {
        if (!res || !res.data || !res.data.message) return;
        setMyCUid(res.data.message);
      })
      .catch((error) => {
        console.error(error.response);
      });

    navigate('/pages/preview');
  }, [canvasRef, dataURLtoBlob, navigate, setDrawing, setHistory, setMyCUid]);

  const seconds = useRecoilValue(secondsState);

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
            ref={imageInput}
            onChange={onSelectFile}
            type="file"
            className="invisible w-0 h-0"
            accept="image/*"
          />
        </div>
        <button
          className="px-2 rounded-full bg-white font-semibold"
          type="button"
          onClick={requestCompleteDrawing}
        >
          완료
        </button>
      </div>
      <div className="absolute bottom-0 w-full" ref={targetRef}>
        {backImage && (
          <button
            type="button"
            className="absolute right-[30px] top-[10px] z-10"
            onClick={switchBackground}
          >
            {backgroundShown ? <EyeOpen /> : <EyeClosed />}
          </button>
        )}
        <CanvasDraw
          className="CanvasDraw"
          imgSrc={backgroundShown ? backImage : blankImage}
          ref={(canvasDraw) => {
            setCanvasRef(canvasDraw);
          }}
          backgroundColor={'#FFF'}
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
      <Timer className="absolute top-20 left-4 flex text-center" />
      <div className="absolute left-1/2 -translate-x-1/2 bottom-11">
        <ToolBar canvasDraw={canvasRef} />
      </div>
      <LoadImageModal
        isOpen={showLoadImageModal}
        onClose={closeLoadImageModal}
      />
      <FinishDialog
        isOpen={drawingStep === 'end' || seconds === 0}
        isTimeout={seconds === 0}
        onClose={seconds === 0 ? refresh : playDrawing}
        onProceed={complete}
      />
      <StartDialog isOpen={showStartDialog} onClose={closeStartDialog} />
    </div>
  );
}

export default DrawingPage;
