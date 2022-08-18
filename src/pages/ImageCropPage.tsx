import React, { useState, useCallback } from 'react';
import Button from '../components/Button';
import Cropper from 'react-easy-crop';
import { Point, Area } from 'react-easy-crop/types';
import { Link } from 'react-router-dom';

import '../index.css';

const ImageCropPage = () => {
  const [imgSrc, setImgSrc] = useState('');
  const [croppedImage, setCroppedImage] = useState('');

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      const img: HTMLImageElement = new Image();
      img.src = imgSrc;
      const canvas = document.createElement('canvas');
      const res = canvas?.getContext('2d');
      if (!res || !(res instanceof CanvasRenderingContext2D)) {
        throw new Error('Failed to get 2D context');
      }
      const ctx: CanvasRenderingContext2D = res;
      // calculate bounding box of the rotated image
      canvas.width =
        Math.abs(Math.cos(0) * img.width) + Math.abs(Math.sin(0) * img.height);
      canvas.height =
        Math.abs(Math.sin(0) * img.width) + Math.abs(Math.cos(0) * img.height);
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

      const croppedImage = canvas.toDataURL('image/jpeg');
      console.log('croppedImage', croppedImage);
      setCroppedImage(croppedImage);
    },
    [imgSrc]
  );

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgSrc(reader.result?.toString() || '');
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  return (
    <div>
      <div className="ImageCropPage">
        <div className="crop-container">
          {Boolean(imgSrc) ? (
            <Cropper
              image={imgSrc}
              crop={crop}
              zoom={zoom}
              rotation={0}
              aspect={9 / 12}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          ) : (
            <input onChange={onSelectFile} type="file" accept="image/*" />
          )}
        </div>
        {Boolean(imgSrc) && (
          <Link to={'/pages/draw'} state={{ imgSrc: croppedImage }}>
            <Button className="z-10 absolute bottom-40 right-0">확인</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ImageCropPage;
