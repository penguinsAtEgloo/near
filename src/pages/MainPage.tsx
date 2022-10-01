/* eslint-disable jsx-a11y/alt-text */
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import near from '../assets/near.png';
import title from '../assets/main.png';
import drawingface from '../assets/drawing-face.png';
import { countUpVisitor } from '../api/counter';
import { isKakaotalk } from '../helpers/device';

function MainPage(): React.ReactElement {
  const [isDrawing, setDrawing] = useState(false);
  const [visitCounter, setVisitCounter] = useState(0);

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

  const navigate = useNavigate();
  const moveNext = useCallback(() => {
    navigate('/pages/draw');
  }, [navigate]);

  return (
    <div className="fixed inset-0 flex flex-col space-y-10 justify-center items-center bg-white">
      <img className="absolute top-20" src={title} />
      <div className="w-[250px] h-[290px] flex justify-center items-center">
        <img src={isDrawing ? drawingface : near} />
      </div>
      <div className="text-lg font-semibold">
        {visitCounter > 50 && <div>현재 {visitCounter}명 참여중</div>}
      </div>
      {isKakaotalk ? (
        <div className="text-lg font-semibold">
          사파리 또는 크롬 브라우저로 접속해 주세요
        </div>
      ) : (
        <button
          className="px-24 py-5 rounded-[100px] bg-black font-semibold text-xl text-white"
          type="button"
          onClick={moveNext}
        >
          친구 그려주기
        </button>
      )}
    </div>
  );
}

export default MainPage;
