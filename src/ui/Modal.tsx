import { Dialog as HeadlessModal, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import Close from '../icons/Close';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactElement;
}

// skeleton
function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps): React.ReactElement {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <HeadlessModal as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HeadlessModal.Panel className="w-screen h-screen transform overflow-hidden bg-white text-left align-middle shadow-xl transition-all">
                {title && (
                  <HeadlessModal.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </HeadlessModal.Title>
                )}
                <div className="mt-2">{children}</div>
                <button
                  className="absolute top-[30px] left-[30px]"
                  onClick={onClose}
                >
                  <Close></Close>
                </button>
              </HeadlessModal.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessModal>
    </Transition>
  );
}

export default Modal;
