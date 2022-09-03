import React, { useState, useRef, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import Check from '../icons/Check';
import Modal, { ModalProps } from '../ui/Modal';
import { imageSourceState } from '../atoms/ImageSource';
import { useSetRecoilState } from 'recoil';

type WebCamModalProps = Pick<ModalProps, 'isOpen' | 'onClose'>;

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

function WebCamModal({
  isOpen,
  onClose,
}: WebCamModalProps): React.ReactElement {
  const { height, width } = useWindowDimensions();

  const webcamRef = useRef<any>(null);
  const [image, setImage] = useState('');

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef?.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);
  const setImgSrc = useSetRecoilState(imageSourceState);

  const videoConstraints: MediaTrackConstraints = {
    facingMode: 'user',
    width: width,
    height: height - 200,
  };

  const imageinput = useRef<HTMLInputElement>(null);

  const beforeConFirm = useCallback(() => {
    if (image) {
      setImgSrc(image);
      // 초기화
      setImage('');
      onClose();
    }
  }, [onClose, image, setImgSrc]);

  const loadImage = useCallback(() => {
    imageinput.current?.click();
  }, []);

  const onSelectFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          setImgSrc(reader.result?.toString() || '');
          e.target.value = '';
          onClose();
        });
        reader.readAsDataURL(e.target.files[0]);
      }
    },
    [setImgSrc, onClose]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="h-screen w-screen">
        <p className="absolute w-full top-[30px] text-center font-normal leading-[30px] text-base">
          이미지 불러오기
        </p>
        <button
          className="absolute right-[30px] top-[30px]"
          type="button"
          onClick={beforeConFirm}
        >
          <Check />
        </button>
        <div className="absolute w-full top-[100px] bottom-[100px] flex justify-center">
          {image === '' ? (
            <Webcam
              key={image}
              className="webcam"
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              screenshotQuality={1}
            />
          ) : (
            <img src={image} alt="Scan" />
          )}
        </div>
        <button
          type="button"
          onClick={capture}
          className="absolute bottom-[50px] right-[30px]"
        >
          찍기
        </button>
        <button
          className="absolute inset-x-0 bottom-[50px]"
          type="button"
          onClick={loadImage}
        >
          파일 선택...needs design
        </button>
        <input
          ref={imageinput}
          className="invisible"
          onChange={onSelectFile}
          type="file"
          accept="image/*"
        />
      </div>
    </Modal>
  );
}

export default WebCamModal;
