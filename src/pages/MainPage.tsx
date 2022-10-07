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

function MainPage(): React.ReactElement {
  const [isDrawing, setDrawing] = useState(false);
  const [visitCounter, setVisitCounter] = useState(0);
  const { cuid } = useParams();
  const setCuid = useSetRecoilState(friendCuidState);
  const [friendImage, setFriendImage] = useRecoilState(friendImageState);

  useEffect(() => {
    const timer = setInterval(() => {
      setDrawing((prev) => !prev);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const mainImage = useMemo(() => {
    if (isKakaotalk) return unsupportedFace;
    if (cuid) return friendImage;
    return isDrawing ? drawingface : face;
  }, [cuid, friendImage, isDrawing]);

  useEffect(() => {
    countUpVisitor().then((res: any) => {
      setVisitCounter(res.data.count);
    });
  }, []);

  useEffect(() => {
    if (cuid) {
      getGift(cuid).then((res) => {
        if (!res || !res.data || !res.data.imageUrl) return;
        setCuid(cuid);
        setFriendImage(res.data.imageUrl);
      });
    }
  }, [cuid, setCuid, setFriendImage]);

  const navigate = useNavigate();
  const moveNext = useCallback(() => navigate('/pages/draw'), [navigate]);

  return (
    <div className="fixed inset-0 flex flex-col space-y-8 justify-center items-center bg-white">
      <div className={clsx('flex', cuid ? 'flex-col-reverse' : 'flex-col')}>
        <div className="font-extrabold text-3xl text-center">
          {cuid ? '확인해 볼까?' : '친구야.. 이게 나라고?'}
        </div>
        <div className="font-normal text-xl text-center my-2">
          {cuid
            ? '친구가 그린 내 모습이 도착했다..!'
            : '2분 안에 그리는 내 친구'}
        </div>
      </div>
      <div className="w-[250px] h-[290px] flex justify-center items-center">
        <img
          className={clsx('w-full h-full', !isKakaotalk && cuid && 'blur-md')}
          src={mainImage}
        />
      </div>
      {isKakaotalk ? (
        <div className="text-lg font-semibold">
          사파리 또는 크롬 브라우저로 접속해 주세요
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-center text-lg font-semibold">
            {cuid
              ? '2분 안에 친구 얼굴 그리고'
              : `현재 ${visitCounter}명 참여중`}
          </div>
          <button
            className="px-24 py-5 rounded-[100px] bg-black font-semibold text-xl text-white"
            type="button"
            onClick={moveNext}
          >
            {cuid ? '내 그림 확인하기' : '친구 그려주기'}
          </button>
        </div>
      )}
    </div>
  );
}

export default MainPage;
