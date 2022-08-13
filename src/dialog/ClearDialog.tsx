import React from 'react';
import Dialog, { DialogProps } from '../ui/Dialog';

type ClearDialogProps = Pick<DialogProps, 'isOpen' | 'onClose'> & {
  onClear: () => void;
};

function ClearDialog({ isOpen, onClose, onClear }: ClearDialogProps) {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col space-y-8">
        <div>모든 변경사항이 삭제됩니다. 그래도 괜찮나요?</div>
        <div className="flex space-x-4 justify-end">
          <button
            className="rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            type="button"
            onClick={onClear}
          >
            네 삭제할게요
          </button>
          <button
            className="rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
