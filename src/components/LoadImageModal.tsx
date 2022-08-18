import React from 'react';
import Modal, { ModalProps } from '../ui/Modal';

type LoadImageModalProps = Pick<ModalProps, 'isOpen' | 'onClose'>;

function LoadImageModal({
  isOpen,
  onClose,
}: LoadImageModalProps): React.ReactElement {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="h-full">dd</div>
    </Modal>
  );
}

export default LoadImageModal;
