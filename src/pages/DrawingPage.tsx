import React, { useCallback, useState } from 'react';
import Button from '../components/Button';

function DrawingPage() {
  const [isSaveMode, setSaveMode] = useState(false);
  const openSaveMode = useCallback(() => setSaveMode(true), []);
  const closeSaveMode = useCallback(() => setSaveMode(false), []);
  return (
    <div className="fixed inset-0 flex flex-col">
      <div
        className="flex grow w-full bg-gray-200"
        onPointerDown={closeSaveMode}
      >
        <div>그리는 화면</div>
      </div>
      <div className="flex h-20 space-x-10 justify-center items-center">
        {isSaveMode ? (
          <>
            <Button>링크복사</Button>
            <Button>인스타</Button>
            <Button>페이스북</Button>
            <Button></Button>
          </>
        ) : (
          <>
            <Button>펜</Button>
            <Button>지우개</Button>
            <Button>undo</Button>
            <Button onClick={openSaveMode}>저장</Button>
          </>
        )}
      </div>
    </div>
  );
}

export default DrawingPage;
