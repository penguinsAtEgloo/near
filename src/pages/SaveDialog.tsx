import React from 'react';
import Button from '../components/Button';
import Dialog, { DialogProps } from '../components/Dialog';

type SaveDialogProps = Pick<DialogProps, 'isOpen' | 'onClose'>;

function SaveDialog({ isOpen, onClose }: SaveDialogProps) {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col space-y-8">
        <div className="w-full h-80 border border-gray-700 bg-gray-300">
          미리보기
        </div>
        <div className="flex justify-between">
          <Button>이미지 저장</Button>
          <Button>동영상 저장</Button>
          <Button>히스토리 저장</Button>
          <Button>필터 +</Button>
        </div>
      </div>
    </Dialog>
  );
}

export default SaveDialog;
