import React from 'react';
import Button from '../ui/Button';
import Dialog, { DialogProps } from '../ui/Dialog';
import { Link } from 'react-router-dom';

type PauseDialogProps = Pick<DialogProps, 'isOpen' | 'onClose'> & {
  onProceed: () => void;
  isTimeout: boolean;
};

function PauseDialog({
  isOpen,
  onClose,
  isTimeout,
  onProceed,
}: PauseDialogProps): React.ReactElement {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col space-y-8">
        <div className="w-full h-80 border border-gray-700 bg-gray-300">
          {isTimeout
            ? '그리기 시간이 종료되었습니다'
            : '그리기 시간이 종료되지 않았습니다. 완료하시겠어요?'}
        </div>
        <div className="flex justify-between">
          <Button onClick={onClose}>
            {isTimeout ? '초기화 후 다시 그리기' : '아니요'}
          </Button>
          <Link to={'/pages/preview'}>
            <Button onClick={onProceed}>{isTimeout ? '저장하기' : '예'}</Button>
          </Link>
        </div>
      </div>
    </Dialog>
  );
}

export default PauseDialog;
