import clsx from 'clsx';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { useRecoilValue } from 'recoil';
import { drawingState } from '../atoms/Drawing';
import { historyState } from '../atoms/History';
import CopyDialog from '../dialog/CopyDialog';
import Back from '../icons/Back';
import Download from '../icons/Download';
import Share from '../icons/Share';

function PreviewPage(): React.ReactElement {
  const [canvasRef, setCanvasRef] = useState<CanvasDraw | null>(null);

  const drawing = useRecoilValue(drawingState);
  const history = useRecoilValue(historyState);

  const [showCopyDialog, setShowCopyDialog] = useState(false);
  const closeCopyDialog = useCallback(() => setShowCopyDialog(false), []);

  const copyURL = useCallback(() => {
    if (!drawing) return;
    window.navigator.clipboard.writeText(drawing).then(() => {
      setShowCopyDialog(true);
    });
  }, [drawing]);

  const saveAsPNG = useCallback(() => {
    if (!drawing) return;
    const canvasImage: HTMLAnchorElement = document.querySelector(
      '#download_link'
    ) as HTMLAnchorElement;
    canvasImage.click();
  }, [drawing]);

  useEffect(() => {
    if (!canvasRef) return;
    if (!history) return;
    setTimeout(() => {
      canvasRef.loadSaveData(history);
    }, 500);
  }, [canvasRef, history]);

  const moveBack = useCallback(() => {
    window.location.replace('/');
  }, []);

  const size = useMemo(() => {
    return { width: window.innerWidth, height: window.innerHeight };
  }, []);

  const [saveType, setSaveType] = useState<'drawing' | 'history'>('drawing');
  const handleImgType = useCallback(() => setSaveType('drawing'), []);
  const handleHistoryType = useCallback(() => setSaveType('history'), []);

  const [pageType, setPageType] = useState<'preview' | 'gift'>('preview');
  const pageTypeHandler = useCallback(() => {
    setPageType('gift');
  }, []);
  return (
    <div className="fixed inset-0 flex flex-col items-center bg-gray-200">
      <div className="relative min-h-[75px] w-full flex bg-white">
        <button type="button" className="pl-4" onClick={moveBack}>
          <Back />
        </button>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold">
          {pageType === 'preview' ? '저장하기' : '그림 확인하기'}
        </div>
      </div>
      <div className="relative flex flex-col">
        {pageType === 'preview' ? (
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
        ) : (
          <div className="flex"></div>
        )}

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
      <div className="absolute right-[5vw] bottom-[20vh] space-y-2.5">
        <button
          className="flex p-4 justify-center items-center bg-black rounded-full"
          onClick={saveAsPNG}
        >
          <Download />
          <a
            id="download_link"
            className="invisible"
            href={drawing}
            download="IMAGE.png"
          >
            <span></span>
          </a>
        </button>
        {pageType === 'preview' && (
          <button
            className="flex p-4 justify-center items-center bg-black rounded-full"
            onClick={copyURL}
          >
            <Share />
          </button>
        )}
      </div>
      <div className="absolute bottom-[8vh]">
        {pageType === 'preview' ? (
          <button
            className="flex w-[318px] h-[64px] space-x-3.5 justify-center items-center bg-black rounded-full"
            onClick={pageTypeHandler}
          >
            <span className="text-white">내 그림 확인하기</span>
          </button>
        ) : (
          <button
            className="flex w-[318px] h-[64px] space-x-3.5 justify-center items-center bg-black rounded-full"
            onClick={moveBack}
          >
            <span className="text-white">또 그리러 가기 GO !</span>
          </button>
        )}
      </div>
      {showCopyDialog && (
        <CopyDialog isOpen={showCopyDialog} onClose={closeCopyDialog} />
      )}
    </div>
  );
}

export default PreviewPage;
