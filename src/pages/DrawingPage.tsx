import React, { useCallback, useState, useRef, useEffect } from 'react';
import Button from '../ui/Button';
import SaveDialog from '../dialog/SaveDialog';
import CanvasDraw from 'react-canvas-draw';
import chimchak from '../assets/chimchak.png';
import { useRecoilValue, useRecoilState } from 'recoil';
import { penWidthState } from '../atoms/PenWidth';
import { penColorState } from '../atoms/PenColor';
import { canvasState } from 'atoms/CanvasState';
import ToolBar from '../components/ToolBar';
import Timer from './Timer';
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router';

function DrawingPage(): React.ReactElement {
  const [isSaveMode, setSaveMode] = useState(false);
  const openSaveMode = useCallback(() => setSaveMode(true), []);
  const closeSaveMode = useCallback(() => setSaveMode(false), []);

  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const openSaveDialog = useCallback(() => setShowSaveDialog(true), []);
  const closeSaveDialog = useCallback(() => setShowSaveDialog(false), []);

  const penColor = useRecoilValue(penColorState);
  const penWidth = useRecoilValue(penWidthState);

  const [canvasRef, setCanvasRef] = useRecoilState(canvasState);
  // const canvasRef = useRecoilValue(canvasState);
  // const setCanvasRef = useSetRecoilState(canvasState);

  // Drawing
  const [drawing, setDrawing] = useState('');
  // const [imgURL, setImageURL] = useState<string | null>(null);
  // const imgUrl = canvasRef?.getDataURL();

  // const minifiedCanvas = useRef(null);
  // const saveDrawing = useCallback(() => {
  //   if (!canvasRef) return;
  //   const data = canvasRef.getSaveData();
  //   if (!minifiedCanvas) return;
  //   canvasRef?.loadSaveData(data);
  //   console.log(canvasRef.getDataURL('image/png', false, '#FFFFFF'));
  // }, [canvasRef]);

  useEffect(() => {
    saveAsPNG();
    const data = canvasRef?.getSaveData();
    console.log('canvasRef => ' + canvasRef);
    console.log('모든좌표 데이터', data);
  }, [canvasRef]);

  const saveAsPNG = () => {
    const canvas = document.querySelector(
      '.CanvasDraw canvas:nth-child(2)'
    ) as HTMLCanvasElement;
    const imageURL = canvas.toDataURL('image/png');
    setDrawing(imageURL);
    console.log('PNG image data');
    console.log(imageURL);
  };

  const handleSaveClick = () => {
    saveAsPNG();
    const data = canvasRef?.getSaveData();
    console.log('canvasRef => ' + canvasRef);
    console.log('모든좌표 데이터', data);
    // secondCanvas.current.loadSaveData(data);
    // navigate('/pages/save', { state: canvasRef });
  };

  return (
    <div className="fixed inset-0 flex flex-col">
      <div
        className="flex grow w-full bg-gray-200"
        onPointerDown={closeSaveMode}
      >
        <CanvasDraw
          className="CanvasDraw"
          ref={(canvasDraw) => {
            setCanvasRef(canvasDraw);
          }}
          // TODO: 영역크기 계산하여 width, height 넣어주어야 함
          canvasWidth={375}
          canvasHeight={667}
          catenaryColor=""
          brushColor={penColor}
          brushRadius={penWidth}
          lazyRadius={0}
          hideGrid
          hideInterface
          // TODO: 사진 업로드
          imgSrc={chimchak}
        />
        {/* <CanvasDraw
          ref={minifiedCanvas}
          // ref={(canvasDraw) => {
          //   //setMinifiedRef(canvasDraw);
          // }}
          canvasWidth={375}
          canvasHeight={667}
          hideGrid={true}
          disabled={true}
        /> */}
        <button onClick={handleSaveClick}>save</button>
        {/* <img src={drawing} alt="사진" /> */}
        <Timer className="absolute" />
        <SaveDialog isOpen={showSaveDialog} onClose={closeSaveDialog} />
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-11">
        {isSaveMode ? (
          <>
            <Button>링크복사</Button>
            <Button>인스타</Button>
            <Button>페이스북</Button>

            {/* <Link
              className="absolute bottom-48"
              to={'/pages/save'}
              state={{ canvasRef: canvasRef }}
            >
            </Link> */}
            {/* <Button onClick={handleSaveClick}>프리뷰페이지</Button> */}
            <Button onClick={openSaveDialog}>저장</Button>
          </>
        ) : (
          <ToolBar canvasDraw={canvasRef} onProceed={openSaveMode} />
        )}
      </div>
    </div>
  );
}

export default DrawingPage;
