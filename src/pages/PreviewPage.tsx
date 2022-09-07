import clsx from 'clsx';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { drawingState } from '../atoms/Drawing';
import { historyState } from '../atoms/History';
import Back from '../icons/Back';
import Download from '../icons/Download';
import Share from '../icons/Share';

function PreviewPage(): React.ReactElement {
  const [canvasRef, setCanvasRef] = useState<CanvasDraw | null>(null);

  const drawing = useRecoilValue(drawingState);
  const history = useRecoilValue(historyState);

  const copyURL = useCallback(() => {
    if (!drawing) return;
    window.navigator.clipboard.writeText(drawing || '').then(() => {
      alert('복사 완료!');
    });
  }, [drawing]);

  const saveAsPNG = useCallback(() => {
    if (!canvasRef) return;
    if (!drawing) return;
    const canvasImage = document.createElement('a');
    canvasImage.href = drawing;
    canvasImage.download = 'IMAGE.png';
    document.body.appendChild(canvasImage);
    canvasImage.click();
  }, [canvasRef, drawing]);

  useEffect(() => {
    if (!canvasRef) return;
    if (!history) return;
    setTimeout(() => {
      canvasRef.loadSaveData(history);
    }, 500);
  }, [canvasRef, history]);

  const navigate = useNavigate();
  const moveBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const size = useMemo(() => {
    return window.innerWidth < window.innerHeight
      ? window.innerWidth
      : window.innerHeight;
  }, []);

  const [saveType, setSaveType] = useState<'drawing' | 'history'>('drawing');
  const handleImgType = useCallback(() => setSaveType('drawing'), []);
  const handleHistoryType = useCallback(() => setSaveType('history'), []);

  return (
    <div className="fixed inset-0 flex flex-col space-y-6 items-center bg-gray-200">
      <div className="relative h-[75px] w-full flex bg-white">
        <button type="button" className="pl-4" onClick={moveBack}>
          <Back />
        </button>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          저장하기
        </div>
      </div>
      <div className="relative flex flex-col">
        <div className="flex">
          <button
            className={clsx(
              'py-2 rounded-t-3xl bg-black text-white text-center',
              saveType === 'drawing'
                ? 'bg-black text-white'
                : 'bg-gray-300 text-gray-500'
            )}
            style={{ width: size / 2 }}
            type="button"
            onClick={handleImgType}
          >
            이미지 타입
          </button>
          <button
            className={clsx(
              'py-2 rounded-t-3xl bg-black text-white text-center',
              saveType === 'history'
                ? 'bg-black text-white'
                : 'bg-gray-300 text-gray-500'
            )}
            style={{ width: size / 2 }}
            type="button"
            onClick={handleHistoryType}
          >
            영상 타입
          </button>
        </div>
        {saveType === 'drawing' ? (
          <img
            className="border-2 border-black bg-white"
            src={drawing || ''}
            alt="미리보기"
            style={{ width: size, height: size }}
          />
        ) : (
          <CanvasDraw
            className="CanvasDraw border-2 border-black"
            ref={(canvasDraw) => {
              setCanvasRef(canvasDraw);
            }}
            canvasWidth={size}
            canvasHeight={size}
            catenaryColor=""
            lazyRadius={0}
            hideGrid
            hideInterface
            enablePanAndZoom={true}
            mouseZoomFactor={1}
            zoomExtents={{ min: 0.33, max: 3 }}
            disabled={true}
          />
        )}
      </div>

      <div className="space-y-2.5">
        <button
          className="flex w-[318px] h-[64px] space-x-3.5 justify-center items-center bg-black rounded-full"
          onClick={saveAsPNG}
        >
          <span className="text-white">파일 저장하기</span>
          <Download />
        </button>
        <button
          className="flex w-[318px] h-[64px] space-x-3.5 justify-center items-center bg-black rounded-full"
          onClick={copyURL}
        >
          <span className="text-white">친구에게 공유하기</span>
          <Share />
        </button>
      </div>
    </div>
  );
}

export default PreviewPage;
