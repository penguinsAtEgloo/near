import React from 'react';
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
      <div className="flex flex-col pt-3 space-y-4 text-center text-xl divide-y">
        <div className="text-lg">
          {isTimeout
            ? '그리기 시간이 종료되었습니다'
            : '그리기 시간이 종료되지 않았습니다.'}
          <br />
          {!isTimeout && '완료하시겠어요?'}
        </div>
        <div className="flex justify-evenly divide-x">
          <button
            className="w-1/2 py-2 text-lg"
            type="button"
            onClick={onClose}
          >
            {isTimeout ? '다시 도전!' : '아니요'}
          </button>
          <Link className="w-1/2 py-2 text-lg" to={'/pages/preview'}>
            <button type="button" onClick={onProceed}>
              {isTimeout ? '저장하기' : '예'}
            </button>
          </Link>
        </div>
      </div>
    </Dialog>
  );
}

export default PauseDialog;
