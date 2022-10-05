/* eslint-disable jsx-a11y/alt-text */
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import near from '../assets/near.png';
// import title from '../assets/main.png';
import drawingface from '../assets/drawing-face.png';
import { countUpVisitor } from '../api/counter';
import { isKakaotalk } from '../helpers/device';
import { friendCuidState } from '../atoms/FriendCuid';
import { friendImageState } from '../atoms/FriendImage';
import { getGift } from '../api/images';
import { useRecoilState, useSetRecoilState } from 'recoil';

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
  const moveNext = useCallback(() => {
    navigate('/pages/draw');
  }, [navigate]);

  return (
    <div className="fixed inset-0 flex flex-col space-y-10 justify-center items-center bg-white">
      {!isKakaotalk && !cuid && (
        <>
          <div className="font-extrabold text-3xl text-center">
            친구야.. 이게 나라고?
          </div>
          <div className="font-normal text-xl text-center my-2">
            3분 안에 그리는 내 친구
          </div>
          <div className="w-[250px] h-[290px] flex justify-center items-center">
            <img src={isDrawing ? drawingface : near} />
          </div>
        </>
      )}
      {!isKakaotalk && cuid && (
        <>
          <div className="font-normal text-xl text-center mb-0">
            친구가 그린 내 모습이 도착했다..!
          </div>
          <div className="font-extrabold text-3xl text-center mt-0 leading-3">
            확인해 볼까?
          </div>
          <div className="w-[250px] h-[290px] flex justify-center items-center">
            <img
              className="absolute w-[250px] h-[290px] border-0 blur-md"
              src={friendImage}
            />
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
        <div className="space-y-[10px] text-center">
          <p className="text-[20px] leading-[24px">3분안에 친구 얼굴 그리고</p>
          <button
            className="px-24 py-5 rounded-[100px] bg-black font-semibold text-xl text-white"
            type="button"
            onClick={moveNext}
          >
            내 그림 확인하기
          </button>
        </div>
      )}
    </div>
  );
}

export default MainPage;
