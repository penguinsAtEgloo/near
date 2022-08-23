import React, { useState, useCallback } from 'react';
import Modal, { ModalProps } from '../ui/Modal';
import Cropper from 'react-easy-crop';

import Check from '../icons/Check';

import { useRecoilState } from 'recoil';
import { Point, Area } from 'react-easy-crop/types';
import { backImageState } from '../atoms/BackImage';
import { imageSourceState } from '../atoms/ImageSource';

type LoadImageModalProps = Pick<ModalProps, 'isOpen' | 'onClose'>;

function LoadImageModal({
  isOpen,
  onClose,
}: LoadImageModalProps): React.ReactElement {
  const [, setCroppedImage] = useRecoilState(backImageState);
  const [imgSrc, setImageSource] = useRecoilState(imageSourceState);
  console.log('imgSrc:::', imgSrc);

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const beforeClose = useCallback(() => {
    console.log('BeforeClose');
    setImageSource('');
    onClose();
  }, [onClose, setImageSource]);

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      if (
        imgSrc &&
        croppedAreaPixels.x &&
        croppedAreaPixels.y &&
        croppedAreaPixels.width &&
        croppedAreaPixels.height
      ) {
        const img: HTMLImageElement = new Image();
        img.src = imgSrc;
        const canvas = document.createElement('canvas');
        const res = canvas?.getContext('2d');
        if (!res || !(res instanceof CanvasRenderingContext2D)) {
          throw new Error('Failed to get 2D context');
        }
        const ctx: CanvasRenderingContext2D = res;
        canvas.width =
          Math.abs(Math.cos(0) * img.width) +
          Math.abs(Math.sin(0) * img.height);
        canvas.height =
          Math.abs(Math.sin(0) * img.width) +
          Math.abs(Math.cos(0) * img.height);
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(1, 1);
        ctx.translate(-img.width / 2, -img.height / 2);
        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height
        );
        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;
        ctx.putImageData(data, 0, 0);

        setCroppedImage(canvas.toDataURL('image/jpeg'));
      }
    },
    [imgSrc, setCroppedImage]
  );

  return (
    <Modal isOpen={isOpen} onClose={beforeClose}>
      <>
        <Cropper
          image={imgSrc}
          crop={crop}
          zoom={zoom}
          rotation={0}
          aspect={320 / 586}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          restrictPosition={false}
          objectFit={'contain'}
        />
        {Boolean(imgSrc) && (
          <button
            onClick={onClose}
            className="z-10 absolute top-[30px] right-[30px]"
          >
            <Check></Check>
          </button>
        )}
      </>
    </Modal>
  );
}

export default LoadImageModal;
