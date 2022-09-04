/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import face from '../assets/face.png';
import drawingface from '../assets/drawing-face.png';

function MainPage(): React.ReactElement {
  const [isDrawing, setDrawing] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      setDrawing((prev) => !prev);
    }, 1000);
    return () => clearInterval(timer);
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
        <img src={isDrawing ? drawingface : face} />
      </div>
      <Link to={'/pages/draw'}>
        <button className="px-24 py-6 rounded-[100px] bg-black font-semibold text-xl text-white">
          친구 그려주기
        </button>
      </Link>
    </div>
  );
}

export default MainPage;
