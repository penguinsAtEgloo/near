/* eslint-disable jsx-a11y/alt-text */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import face from '../assets/face.png';
import drawingface from '../assets/drawing-face.png';
import unsupportedFace from '../assets/unsupported-face.png';
import { countUpVisitor } from '../api/counter';
import { isKakaotalk } from '../helpers/device';
import { friendCuidState } from '../atoms/FriendCuid';
import { friendImageState } from '../atoms/FriendImage';
import { getGift } from '../api/images';
import { useRecoilState, useSetRecoilState } from 'recoil';
import clsx from 'clsx';

function MainPage(): React.ReactElement | null {
  const [isDrawing, setDrawing] = useState(false);
  const [visitCounter, setVisitCounter] = useState(0);
  const { cuid } = useParams();
  const setFriendCuid = useSetRecoilState(friendCuidState);
  const [friendImage, setFriendImage] = useRecoilState(friendImageState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setDrawing((prev) => !prev);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const mainImage = useMemo(() => {
    if (isKakaotalk) return unsupportedFace;
    if (friendImage) return friendImage;
    return isDrawing ? drawingface : face;
  }, [friendImage, isDrawing]);

  useEffect(() => {
    countUpVisitor().then((res: any) => {
      setVisitCounter(res.data.count);
    });
  }, []);

  useEffect(() => {
    if (cuid) {
      getGift(cuid)
        .then((res) => {
          if (!res || !res.data || !res.data.encodedImageUrl) {
            return;
          }
          setFriendCuid(cuid);
          setFriendImage(res.data.encodedImageUrl);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    setReady(true);
  }, [cuid, setFriendCuid, setFriendImage]);

  const navigate = useNavigate();
  const moveNext = useCallback(() => navigate('/pages/draw'), [navigate]);

  if (!ready) return null;
  return (
    <div className="fixed inset-0 flex flex-col space-y-8 justify-center items-center bg-white">
      <div
        className={clsx('flex', friendImage ? 'flex-col-reverse' : 'flex-col')}
      >
        <div className="font-extrabold text-3xl text-center">
          {friendImage ? '확인해 볼까?' : '친구야.. 이게 나라고?'}
        </div>
        <div className="font-normal text-xl text-center my-2">
          {friendImage
            ? '친구가 그린 내 모습이 도착했다..!'
            : '2분 안에 그리는 내 친구'}
        </div>
      </div>
      <div className="w-[250px] h-[300px] flex justify-center items-center">
        <div
          className={clsx(
            'max-w-[250px] max-h-[300px] flex justify-center items-center',
            friendImage && 'w-[250px] h-[300px]'
          )}
        >
          <img
            className={clsx(
              'w-full h-full',
              !isKakaotalk && friendImage && 'blur-md'
            )}
            src={mainImage}
            alt="메인이미지"
          />
        </div>
      </div>
      {isKakaotalk ? (
        <div className="text-lg font-semibold">
          사파리 또는 크롬 브라우저로 접속해 주세요
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-center text-lg font-semibold">
            {friendImage
              ? '2분 안에 친구 얼굴 그리고'
              : `현재 ${visitCounter}명 참여중`}
          </div>
          <button
            className="px-24 py-5 rounded-[100px] bg-black font-semibold text-xl text-white"
            type="button"
            onClick={moveNext}
          >
            {friendImage ? '내 그림 확인하기' : '친구 그려주기'}
          </button>
        </div>
      )}
    </div>
  );
}

export default MainPage;
