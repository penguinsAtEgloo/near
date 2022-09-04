import React from 'react';
import Dialog, { DialogProps } from '../ui/Dialog';

type ClearDialogProps = Pick<DialogProps, 'isOpen' | 'onClose'> & {
  onClear: () => void;
};

function ClearDialog({ isOpen, onClose, onClear }: ClearDialogProps) {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col space-y-8 text-center text-xl">
        <span className="font-medium">
          모든 변경사항이 삭제됩니다.
          <br />
          그래도 괜찮나요?
        </span>
        <div className="flex space-x-4 justify-evenly">
          <button
            className="rounded-md border border-transparent px-4 py-2 text-xl font-medium text-black-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            type="button"
            onClick={onClear}
          >
            네 삭제할게요
          </button>
          <button
            className="rounded-md border border-transparent px-4 py-2 text-xl font-medium text-black-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
