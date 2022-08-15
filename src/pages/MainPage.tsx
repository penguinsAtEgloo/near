/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Link } from 'react-router-dom';
import sample from '../assets/sample.png';

function MainPage(): React.ReactElement {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center space-y-4 bg-gray-200">
      <img src={sample} />
      <div className="absolute top-48 p-4 bg-white">
        친구야 내 초상화를 그려줘
      </div>
      <Link className="absolute bottom-48" to={'/pages/draw'}>
        <button className="px-4 py-2 bg-gray-800 text-white">
          초상화 그리러 가기 &gt;
        </button>
      </Link>
    </div>
  );
}

export default MainPage;
