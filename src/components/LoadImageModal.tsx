import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import Check from '../icons/Check';
import Modal, { ModalProps } from '../ui/Modal';

/*TODOs
1. 사진찍고 껐다 켰을때 다시 사진 찍을 수 있게 하기
2. 카메라 전환 버튼 디자인 및 위치 받기
3. 사진 찍은 전/후 체크박스 disabled/enabled 디자인 받기 */

type LoadImageModalProps = Pick<ModalProps, 'isOpen' | 'onClose'>;
const FACING_MODE_USER = 'user';
const FACING_MODE_ENVIRONMENT = 'environment';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

function LoadImageModal({
  isOpen,
  onClose,
}: LoadImageModalProps): React.ReactElement {
  const { height, width } = useWindowDimensions();
  console.log('width: ', width);
  console.log('height: ', height);

  const webcamRef = useRef<any>(null);
  const [image, setImage] = useState('');

  const [facingMode, setFacingMode] = React.useState(FACING_MODE_USER);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef?.current.getScreenshot();
    setImage(imageSrc);
    console.log(imageSrc.toString());
  }, [webcamRef]);

  const videoConstraints: MediaTrackConstraints = {
    facingMode: facingMode,
    width: width,
    height: height / 2,
  };

  const handleClick = React.useCallback(() => {
    setFacingMode((prevState) =>
      prevState === FACING_MODE_USER
        ? FACING_MODE_ENVIRONMENT
        : FACING_MODE_USER
    );
  }, []);

  console.log(facingMode + videoConstraints);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="h-full">
        <div className="absolute top-[30px] w-screen">
          <p className="absolute w-full text-center font-normal leading-[30px] text-base">
            이미지 불러오기
          </p>
          <button className="absolute right-[30px]">
            <Check></Check>
          </button>
        </div>
        <div className="webcam-container">
          <div className="webcam-img absolute inset-y-1/4">
            {image === '' ? (
              <Webcam
                className="webcam"
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                screenshotQuality={1}
              />
            ) : (
              <img
                src={image}
                alt="Scan"
                style={{ width: '500px', height: 'auto' }}
              />
            )}
          </div>
          <button className="absolute bottom-[50px]" onClick={handleClick}>
            Switch camera
          </button>
          <button
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

export default LoadImageModal;
