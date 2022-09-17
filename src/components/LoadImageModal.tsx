import React, { useState, useCallback, useMemo } from 'react';
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
  const [localCropped, setLocalCropped] = useState<Area | null>(null);
  const [imgSrc, setImageSource] = useRecoilState(imageSourceState);

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const size = useMemo(() => {
    return { width: window.innerWidth, height: window.innerHeight };
  }, []);

  const beforeClose = useCallback(() => {
    setLocalCropped(null);
    // 초기화
    setImageSource('');
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    onClose();
  }, [onClose, setImageSource, setLocalCropped]);

  const onConfirm = useCallback(() => {
    if (!localCropped) return;
    const img: HTMLImageElement = new Image();
    img.src = imgSrc;
    const canvas = document.createElement('canvas');
    const res = canvas?.getContext('2d');
    if (!res || !(res instanceof CanvasRenderingContext2D)) {
      return;
    }
    const ctx: CanvasRenderingContext2D = res;
    canvas.width = img.width + Math.abs(localCropped.x);
    canvas.height = img.height + Math.abs(localCropped.y);

    ctx.scale(1, 1);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.translate(localCropped.x * -1, localCropped.y * -1);
    ctx.globalAlpha = 0.5;
    ctx.drawImage(img, 0, 0);
    const data = ctx.getImageData(
      0,
      0,
      localCropped.width,
      localCropped.height
    );
    ctx.translate(localCropped.x, localCropped.y);

    canvas.width = localCropped.width;
    canvas.height = localCropped.height;

    ctx.putImageData(data, 0, 0);

    setCroppedImage(canvas.toDataURL('image/jpeg'));

    // 초기화
    setImageSource('');
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    onClose();
  }, [imgSrc, onClose, setCroppedImage, setImageSource, localCropped]);

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      if (croppedAreaPixels.width > 0 && croppedAreaPixels.height > 0) {
        setLocalCropped(croppedAreaPixels);
      }
    },
    [setLocalCropped]
  );

  return (
    <Modal isOpen={isOpen} onClose={beforeClose}>
      <>
        {imgSrc && (
          <Cropper
            image={imgSrc}
            crop={crop}
            zoom={zoom}
            rotation={0}
            aspect={size.width / (size.height - 75)}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            restrictPosition={false}
            objectFit={'contain'}
          />
        )}
        {imgSrc && (
          <button
            type="button"
            onClick={onConfirm}
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
