/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import near from '../assets/near.png';
import drawingface from '../assets/drawing-face.png';
import { countUpVisitor } from '../api/counter';

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

  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center space-y-5 bg-white">
      <div className="space-y-1.5">
        <div className="font-extrabold text-3xl text-center">
          친구야.. 이게 나라고?
        </div>
        <div className="font-normal text-xl text-center">
          3분 안에 그리는 내 친구
        </div>
      </div>
      <div className="w-[250px] h-[290px] flex justify-center items-center">
        <img src={isDrawing ? drawingface : near} />
      </div>
      <Link to={'/pages/draw'}>
        <button className="px-24 py-5 rounded-[100px] bg-black font-semibold text-xl text-white">
          친구 그려주기
        </button>
      </Link>
      <div>
        {visitCounter > 50 ? (
          <h1>사람들이 {visitCounter}번 방문했습니다!</h1>
        ) : null}
      </div>
    </div>
  );
}

export default MainPage;
