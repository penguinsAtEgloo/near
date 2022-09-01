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

  const videoConstraints: MediaTrackConstraints = {
    facingMode: 'user',
    width: width,
    height: height - 200,
  };
  const setImageSource = useSetRecoilState(imageSourceState);

  const beforeConFirm = useCallback(() => {
    if (image) {
      setImageSource(image);
      // 초기화
      setImage('');
      onClose();
    }
  }, [onClose, image, setImageSource]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="h-full">
        <div className="absolute top-[30px] w-screen">
          <p className="absolute w-full text-center font-normal leading-[30px] text-base">
            이미지 불러오기
          </p>
          <button
            className="absolute right-[30px]"
            type="button"
            onClick={beforeConFirm}
          >
            <Check />
          </button>
        </div>
        <div>
          <div className="absolute top-[100px] bottom-[100px] h-screen">
            {image === '' ? (
              <Webcam
                className="webcam w-screen"
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                screenshotQuality={1}
              />
            ) : (
              <img
                className="w-full"
                src={image}
                alt="Scan"
                style={{ width: width, height: height }}
              />
            )}
          </div>
          <button
            type="button"
            onClick={capture}
            className="absolute bottom-[50px] right-[30px]"
          >
            찍기
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default WebCamModal;
