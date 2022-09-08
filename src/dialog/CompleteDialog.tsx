import React from 'react';
import Button from '../ui/Button';
import Dialog, { DialogProps } from '../ui/Dialog';
import { Link } from 'react-router-dom';

type CompleteDialogProps = Pick<DialogProps, 'isOpen' | 'onClose'> & {
  notEnding: () => void;
};

function CompleteDialog({
  isOpen,
  onClose,
  notEnding,
}: CompleteDialogProps): React.ReactElement {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col space-y-8">
        <div className="w-full h-80 border border-gray-700 bg-gray-300">
          그리기 시간이 종료되지 않았습니다. 완료하시겠어요?
        </div>
        <div className="flex justify-between">
          <Button onClick={notEnding}>아니요</Button>
          <Link to={'/pages/preview'}>
            <Button onClick={onClose}>예</Button>
          </Link>
        </div>
      </div>
    </Dialog>
  );
}

export default CompleteDialog;
