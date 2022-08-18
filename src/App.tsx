import ImageCropPage from 'pages/ImageCropPage';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  RecoilRoot,
  // atom,
  // selector,
  // useRecoilState,
  // useRecoilValue,
} from 'recoil';
import DrawingPage from './pages/DrawingPage';
import MainPage from './pages/MainPage';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="pages/draw" element={<DrawingPage />} />
          <Route path="pages/image" element={<ImageCropPage />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
