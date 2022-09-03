/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Link } from 'react-router-dom';
import Face from '../icons/Face';

function MainPage(): React.ReactElement {
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
      <Face color="black" />
      <Link to={'/pages/draw'}>
        <button className="px-4 py-2 bg-gray-800 text-white">
          그림 그리기 Start!
        </button>
      </Link>
    </div>
  );
}

export default MainPage;
