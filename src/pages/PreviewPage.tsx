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
    window.navigator.clipboard.writeText(drawing).then(() => {
      alert('링크가 복사되었습니다! 그림을 친구에게 전달해보세요.');
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
    navigate('/');
    window.location.reload();
  }, [navigate]);

  const size = useMemo(() => {
    return { width: window.innerWidth, height: window.innerHeight };
  }, []);

  const [saveType, setSaveType] = useState<'drawing' | 'history'>('drawing');
  const handleImgType = useCallback(() => setSaveType('drawing'), []);
  const handleHistoryType = useCallback(() => setSaveType('history'), []);

  return (
    <div className="fixed inset-0 flex flex-col items-center bg-gray-200">
      <div className="relative min-h-[75px] w-full flex bg-white">
        <button type="button" className="pl-4" onClick={moveBack}>
          <Back />
        </button>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold">
          저장하기
        </div>
      </div>
      <div className="relative flex flex-col">
        <div className="flex">
          <button
            className={clsx(
              'py-2 bg-white text-center font-semibold border-b-[3px]',
              saveType === 'drawing'
                ? 'text-black border-black'
                : 'text-gray-400 border-gray-200'
            )}
            style={{ width: size.width / 2 }}
            type="button"
            onClick={handleImgType}
          >
            이미지 타입
          </button>
          <button
            className={clsx(
              'py-2 bg-white text-center font-semibold border-b-[3px]',
              saveType === 'history'
                ? 'text-black border-black'
                : 'text-gray-400 border-gray-200'
            )}
            style={{ width: size.width / 2 }}
            type="button"
            onClick={handleHistoryType}
          >
            영상 타입
          </button>
        </div>
        {saveType === 'drawing' ? (
          <img
            className="bg-white"
            src={drawing || ''}
            alt="미리보기"
            style={{ width: size.width, height: size.height - 75 }}
          />
        ) : (
          <CanvasDraw
            className="CanvasDraw"
            ref={(canvasDraw) => {
              setCanvasRef(canvasDraw);
            }}
            canvasWidth={size.width}
            canvasHeight={size.height - 75}
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
      <div className="absolute right-5 bottom-5 space-y-2.5">
        <button
          className="flex p-4 justify-center items-center bg-black rounded-full"
          onClick={saveAsPNG}
        >
          <Download />
        </button>
        <button
          className="flex p-4 justify-center items-center bg-black rounded-full"
          onClick={copyURL}
        >
          <Share />
        </button>
      </div>
    </div>
  );
}

export default PreviewPage;
