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
          {friendImage ? '????????? ???????' : '?????????.. ?????? ??????????'}
        </div>
        <div className="font-normal text-xl text-center my-2">
          {friendImage
            ? '????????? ?????? ??? ????????? ????????????..!'
            : '2??? ?????? ????????? ??? ??????'}
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
            alt="???????????????"
          />
        </div>
      </div>
      {isKakaotalk ? (
        <div className="text-lg font-semibold">
          ????????? ?????? ?????? ??????????????? ????????? ?????????
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-center text-lg font-semibold">
            {friendImage
              ? '2??? ?????? ?????? ?????? ?????????'
              : `?????? ${visitCounter}??? ?????????`}
          </div>
          <button
            className="px-24 py-5 rounded-[100px] bg-black font-semibold text-xl text-white"
            type="button"
            onClick={moveNext}
          >
            {friendImage ? '??? ?????? ????????????' : '?????? ????????????'}
          </button>
        </div>
      )}
    </div>
  );
}

export default MainPage;
