import React from 'react';
import Dialog, { DialogProps } from '../ui/Dialog';

type CopyDialogProps = Pick<DialogProps, 'isOpen' | 'onClose'>;

function CopyDialog({ isOpen, onClose }: CopyDialogProps): React.ReactElement {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="flex py-5 justify-center items-center text-center text-lg">
        링크가 복사되었습니다!
        <br />
        그림을 친구에게 전달해보세요.
      </div>
    </Dialog>
  );
}

export default CopyDialog;
