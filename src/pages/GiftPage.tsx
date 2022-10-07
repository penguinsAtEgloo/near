import React, { useCallback, useEffect, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import Back from '../icons/Back';
import Download from '../icons/Download';
import { friendImageState } from '../atoms/FriendImage';

const HEADER_HEIGHT = 63;

function GiftPage(): React.ReactElement {
  const friendImage = useRecoilValue(friendImageState);

  const saveFriendImage = useCallback(() => {
    if (!friendImage) return;
    const canvasImage: HTMLAnchorElement = document.querySelector(
      '#download_link_friend'
    ) as HTMLAnchorElement;
    canvasImage.click();
    canvasImage.remove();
  }, [friendImage]);

  const moveToMain = useCallback(() => window.location.replace('/'), []);

  const size = useMemo(() => {
    return { width: window.innerWidth, height: window.innerHeight };
  }, []);

  useEffect(() => {
    if (!friendImage) {
      window.location.replace('/');
    }
  }, [friendImage]);

  return (
    <div className="fixed inset-0 flex flex-col items-center bg-gray-200">
      <div
        className="absolute w-full flex bg-white"
        style={{ minHeight: `${HEADER_HEIGHT}px` }}
      >
        <button type="button" className="pl-4" onClick={moveToMain}>
          <Back />
        </button>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-semibold">
          그림 확인하기
        </div>
      </div>
      <div
        className="absolute flex flex-col items-center"
        style={{ top: `${HEADER_HEIGHT}px` }}
      >
        <button
          className="absolute top-4 right-[5vw] bg-black p-4 rounded-full"
          onClick={saveFriendImage}
        >
          <Download />
          <a
            id="download_link_friend"
            className="invisible"
            href={friendImage}
            download="IMAGE.png"
          >
            <span />
          </a>
        </button>
        <img
          src={friendImage}
          alt="친구그림"
          className="bg-white"
          style={{
            width: size.width,
            height: size.height - HEADER_HEIGHT,
          }}
        />
      </div>
      <button
        className="absolute bottom-5 w-[318px] h-[64px] bg-black rounded-full"
        onClick={moveToMain}
      >
        <span className="text-white text-lg font-semibold">
          또 그리러 가기 GO !
        </span>
      </button>
    </div>
  );
}

export default GiftPage;
