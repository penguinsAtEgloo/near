/* eslint-disable jsx-a11y/alt-text */
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import near from '../assets/near.png';
import title from '../assets/main.png';
import drawingface from '../assets/drawing-face.png';
import { countUpVisitor } from '../api/counter';
import { isKakaotalk } from '../helpers/device';
import { cuidState } from '../atoms/CUid';
import { friendImageState } from '../atoms/FriendImage';
import { getGift } from '../api/images';
import { useRecoilState, useSetRecoilState } from 'recoil';

function MainPage(): React.ReactElement {
  const [isDrawing, setDrawing] = useState(false);
  const [visitCounter, setVisitCounter] = useState(0);
  const { cuid } = useParams();
  const setCuid = useSetRecoilState(cuidState);
  const [friendImage, setFriendImage] = useRecoilState(friendImageState);

  useEffect(() => {
    const timer = setInterval(() => {
      setDrawing((prev) => !prev);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    countUpVisitor().then((res: any) => {
      setVisitCounter(res.data.count);
    });
  }, []);

  useEffect(() => {
    if (cuid) {
      const res: any = getGift(cuid);
      if (
        !res ||
        !res.data ||
        !res.data.imgUrl ||
        !res.data.imgUrl.contains('http')
      )
        return;
      setCuid(cuid);
      setFriendImage(res.data.imgUrl);
    }
    // setCuid(cuid);
  }, [cuid, setCuid, setFriendImage]);

  const navigate = useNavigate();
  const moveNext = useCallback(() => {
    navigate('/pages/draw');
  }, [navigate]);

  return (
    <div className="fixed inset-0 flex flex-col space-y-10 justify-center items-center bg-white">
      <img className="absolute top-20" src={title} />
      {!isKakaotalk && !cuid && (
        <div className="w-[250px] h-[290px] flex justify-center items-center">
          <img src={isDrawing ? drawingface : near} />
        </div>
      )}
      {!isKakaotalk && cuid && (
        <>
          <div className="w-[428px] h-[390px] flex justify-center items-center">
            <img
              className="absolute w-[250px] h-[290px] border-0 blur-md"
              src={friendImage}
            />
            <div className="absolute w-full h-[390px] bg-[#D3D3D3]/[.9] text-center inset-x-0 shadow-lg flex flex-col justify-center">
              <p className="text-xl font-normal leading-[33px]">
                그럼 너도 그려.
              </p>
            </div>
          </div>
        </>
      )}
      <div className="text-lg font-semibold">
        {visitCounter > 50 && <div>현재 {visitCounter}명 참여중</div>}
      </div>
      {isKakaotalk && (
        <div className="text-lg font-semibold">
          사파리 또는 크롬 브라우저로 접속해 주세요
        </div>
      )}
      {!isKakaotalk && !cuid && (
        <button
          className="px-24 py-5 rounded-[100px] bg-black font-semibold text-xl text-white"
          type="button"
          onClick={moveNext}
        >
          친구 그려주기
        </button>
      )}
      {!isKakaotalk && cuid && (
        <button
          className="rounded-[100px] w-[318px] h-[78px] bg-black font-normal text-white"
          type="button"
          onClick={moveNext}
        >
          <p className="text-[20px] leading-[24px]">3분안에 친구 얼굴 그리고</p>
          <p className="text-[28px] leading-[24px]">내 그림 확인하기</p>
        </button>
      )}
    </div>
  );
}

export default MainPage;
