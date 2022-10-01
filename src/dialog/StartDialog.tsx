import React from 'react';
import Dialog, { DialogProps } from '../ui/Dialog';

type StartDialogProps = Pick<DialogProps, 'isOpen' | 'onClose'>;

function StartDialog({
  isOpen,
  onClose,
}: StartDialogProps): React.ReactElement {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="flex py-5 justify-center items-center text-center text-lg font-medium">
        상단의 START 버튼을 누르면
        <br />
        그리기가 시작됩니다.
      </div>
    </Dialog>
  );
}

export default StartDialog;
