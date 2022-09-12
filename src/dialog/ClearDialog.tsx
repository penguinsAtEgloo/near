import React from 'react';
import Dialog, { DialogProps } from '../ui/Dialog';

type ClearDialogProps = Pick<DialogProps, 'isOpen' | 'onClose'> & {
  onClear: () => void;
};

function ClearDialog({ isOpen, onClose, onClear }: ClearDialogProps) {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col pt-3 space-y-4 text-center divide-y">
        <div className="text-lg">그림을 초기화할까요?</div>
        <div className="flex justify-evenly divide-x">
          <button
            className="w-1/2 py-2 text-lg"
            type="button"
            onClick={onClear}
          >
            네 삭제할게요
          </button>
          <button
            className="w-1/2 py-2 text-lg"
            type="button"
            onClick={onClose}
          >
            아니요
          </button>
        </div>
      </div>
    </Dialog>
  );
}

export default ClearDialog;
