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
import { myDrawingCuidState } from '../atoms/MyCuid';
import { friendCuidState } from '../atoms/FriendCuid';
import { friendImageState } from '../atoms/FriendImage';
import { useNavigate } from 'react-router-dom';

const HEADER_HEIGHT = 70;

function PreviewPage(): React.ReactElement {
  const [canvasRef, setCanvasRef] = useState<CanvasDraw | null>(null);

  const drawing = useRecoilValue(drawingState);
  const history = useRecoilValue(historyState);
  const myCuid = useRecoilValue(myDrawingCuidState);
  const friendCuid = useRecoilValue(friendCuidState);

  const [showCopyDialog, setShowCopyDialog] = useState(false);
  const closeCopyDialog = useCallback(() => setShowCopyDialog(false), []);
  const friendImage = useRecoilValue(friendImageState);

  const copyURL = useCallback(() => {
    if (!drawing) return;
    const url = encodeURI(myCuid as string);
    window.navigator.clipboard
      .writeText(`https://drawingface.com/${url}`)
      .then(() => {
        setShowCopyDialog(true);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [drawing, myCuid]);

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
  }, [canvasRef, history, friendImage, friendCuid]);

  const moveToMain = useCallback(() => window.location.replace('/'), []);

  const size = useMemo(() => {
    return { width: window.innerWidth, height: window.innerHeight };
  }, []);

  const [saveType, setSaveType] = useState<'drawing' | 'history'>('drawing');
  const handleImgType = useCallback(() => setSaveType('drawing'), []);
  const handleHistoryType = useCallback(() => setSaveType('history'), []);

  const navigate = useNavigate();

  const moveToGiftPage = useCallback(() => navigate('/pages/gift'), [navigate]);

  useEffect(() => {
    if (!myCuid) {
      window.location.replace('/');
    }
  }, [myCuid]);

  return (
    <div className="fixed inset-0 flex flex-col items-center bg-gray-200">
      <div
        className="absolute w-full flex bg-white"
        style={{ minHeight: `${HEADER_HEIGHT}px` }}
      >
        <button type="button" className="pl-4" onClick={moveToMain}>
          <Back />
        </button>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold">
          미리보기
        </div>
      </div>
      <div
        className="absolute flex flex-col"
        style={{ top: `${HEADER_HEIGHT}px` }}
      >
        <div className="relative flex">
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
          <>
            <img
              className="bg-white"
              src={drawing || ''}
              alt="미리보기"
              style={{ width: size.width, height: size.height - HEADER_HEIGHT }}
            />
            <div className="absolute top-16 right-[5vw] space-y-2.5">
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
                  <span />
                </a>
              </button>
              <button
                className="flex p-4 justify-center items-center bg-black rounded-full"
                onClick={copyURL}
              >
                <Share />
              </button>
            </div>
          </>
        ) : (
          <CanvasDraw
            className="CanvasDraw"
            ref={(canvasDraw) => {
              setCanvasRef(canvasDraw);
            }}
            canvasWidth={size.width}
            canvasHeight={size.height - HEADER_HEIGHT}
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
      {friendCuid && (
        <div
          className="absolute bottom-[30px] flex flex-col items-center"
          style={{ top: `${HEADER_HEIGHT}px` }}
        >
          <button
            className="absolute bottom-[30px] w-[318px] h-[64px] bg-black rounded-full"
            onClick={moveToGiftPage}
          >
            <span className="text-white">친구가 그린 내 그림 확인하기</span>
          </button>
        </div>
      )}
      <CopyDialog isOpen={showCopyDialog} onClose={closeCopyDialog} />
    </div>
  );
}

export default PreviewPage;
