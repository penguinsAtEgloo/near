import React, { useState, useCallback } from 'react';
import Modal, { ModalProps } from '../ui/Modal';
import Cropper from 'react-easy-crop';

import Check from '../icons/Check';

import { useRecoilState, useSetRecoilState } from 'recoil';
import { Point, Area } from 'react-easy-crop/types';
import { backImageState } from '../atoms/BackImage';
import { imageSourceState } from '../atoms/ImageSource';

type LoadImageModalProps = Pick<ModalProps, 'isOpen' | 'onClose'>;

function LoadImageModal({
  isOpen,
  onClose,
}: LoadImageModalProps): React.ReactElement {
  const setCroppedImage = useSetRecoilState(backImageState);
  const [tempCropped, setTempCropped] = useState('');
  const [imgSrc, setImageSource] = useRecoilState(imageSourceState);

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const beforeClose = useCallback(() => {
    setCroppedImage('');
    // 초기화
    setImageSource('');
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    onClose();
  }, [onClose, setImageSource, setCroppedImage]);

  const beforeConFirm = useCallback(() => {
    setCroppedImage(tempCropped);
    // 초기화
    setImageSource('');
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    onClose();
  }, [onClose, setCroppedImage, setImageSource, tempCropped]);

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      if (
        imgSrc &&
        croppedAreaPixels.width > 0 &&
        croppedAreaPixels.height > 0
      ) {
        const img: HTMLImageElement = new Image();
        img.src = imgSrc;
        const canvas = document.createElement('canvas');
        const res = canvas?.getContext('2d');
        if (!res || !(res instanceof CanvasRenderingContext2D)) {
          return;
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

        setTempCropped(canvas.toDataURL('image/jpeg'));
      }
    },
    [imgSrc, setTempCropped]
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
        {imgSrc && (
          <button
            type="button"
            onClick={beforeConFirm}
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
