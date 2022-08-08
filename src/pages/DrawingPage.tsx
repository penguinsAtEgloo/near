import React, { useCallback, useState } from 'react';
import Button from '../components/Button';
import SaveDialog from './SaveDialog';

function DrawingPage() {
  const [isSaveMode, setSaveMode] = useState(false);
  const openSaveMode = useCallback(() => setSaveMode(true), []);
  const closeSaveMode = useCallback(() => setSaveMode(false), []);

  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const openSaveDialog = useCallback(() => setShowSaveDialog(true), []);
  const closeSaveDialog = useCallback(() => setShowSaveDialog(false), []);
  return (
    <div className="fixed inset-0 flex flex-col">
      <div
        className="flex grow w-full bg-gray-200"
        onPointerDown={closeSaveMode}
      >
        <div>그리는 화면</div>
        <SaveDialog isOpen={showSaveDialog} onClose={closeSaveDialog} />
      </div>
      <div className="flex h-20 space-x-10 justify-center items-center">
        {isSaveMode ? (
          <>
            <Button>링크복사</Button>
            <Button>인스타</Button>
            <Button>페이스북</Button>
            <Button onClick={openSaveDialog}>저장</Button>
          </>
        ) : (
          <>
            <Button>펜</Button>
            <Button>지우개</Button>
            <Button>undo</Button>
            <Button onClick={openSaveMode}>공유</Button>
          </>
        )}
      </div>
    </div>
  );
}

export default DrawingPage;
