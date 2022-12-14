import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import DrawingPage from './pages/DrawingPage';
import MainPage from './pages/MainPage';
import PreviewPage from './pages/PreviewPage';
import GiftPage from './pages/GiftPage';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path=":cuid" element={<MainPage />} />
            <Route path="" element={<MainPage />} />
          </Route>
          <Route path="pages/draw" element={<DrawingPage />} />
          <Route path="pages/preview" element={<PreviewPage />} />
          <Route path="pages/gift" element={<GiftPage />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
