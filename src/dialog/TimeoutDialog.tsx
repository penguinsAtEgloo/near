import React from 'react';
import Button from '../ui/Button';
import Dialog, { DialogProps } from '../ui/Dialog';
import { Link } from 'react-router-dom';

type TimeoutDialogProps = Pick<DialogProps, 'isOpen' | 'onClose'> & {
  tryAgain: () => void;
} & { onSave: () => void };

function TimeoutDialog({
  isOpen,
  onClose,
  onSave,
  tryAgain,
}: TimeoutDialogProps): React.ReactElement {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col space-y-8">
        <div className="w-full h-80 border border-gray-700 bg-gray-300">
          그리기 시간이 종료되었습니다
        </div>
        <div className="flex justify-between">
          <Button onClick={tryAgain}>다시 도전!</Button>
          <Link to={'/pages/preview'}>
            <Button onClick={onSave}>저장하기</Button>
          </Link>
        </div>
      </div>
    </Dialog>
  );
}

export default TimeoutDialog;
