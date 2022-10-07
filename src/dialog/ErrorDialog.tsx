import React from 'react';
import Dialog, { DialogProps } from '../ui/Dialog';

type ErrorDialogProps = Pick<DialogProps, 'isOpen' | 'onClose'>;

function ErrorDialog({
  isOpen,
  onClose,
}: ErrorDialogProps): React.ReactElement {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="flex py-5 justify-center items-center text-center text-lg font-medium">
        예기치 못한 에러가 발생하였습니다.
      </div>
    </Dialog>
  );
}

export default ErrorDialog;
