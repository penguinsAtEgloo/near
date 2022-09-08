import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Button from '../ui/Button';

import { useRecoilState } from 'recoil';
import { drawingStepState } from '../atoms/DrawingStep';
import PauseDialog from '../dialog/PauseDialog';

// const TIME_LIMIT = 180;

function Timer({
  className,
  onComplete,
}: {
  className: string;
  onComplete: () => void;
}): React.ReactElement {
  // TODO: replace
  // const [seconds, setSeconds] = useState(TIME_LIMIT);
  const [seconds, setSeconds] = useState(3);
  const [drawingStep, setDrawingStep] = useRecoilState(drawingStepState);

  const retryDrawing = useCallback(() => {
    window.location.reload();
  }, []);

  const playDrawing = useCallback(() => {
    setDrawingStep('play');
  }, [setDrawingStep]);

  const toggleDrawing = useCallback(() => {
    if (drawingStep === 'play') {
      setDrawingStep('pause');
      return;
    }
    setDrawingStep('play');
  }, [drawingStep, setDrawingStep]);

  useEffect(() => {
    if (drawingStep !== 'play') return;
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [drawingStep, seconds]);

  const timeStyle = useMemo(() => {
    if (seconds <= 10) {
      return 'text-red-500';
    }
    if (seconds <= 59) {
      return 'text-orange-500';
    }
    return 'text-slate-900';
  }, [seconds]);

  return (
    <div className={className}>
      <div className={timeStyle}>
        {Math.floor(seconds / 60)}:
        {seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}
      </div>
      <Button onClick={toggleDrawing}>
        {drawingStep === 'play' ? '일시정지' : '재생'}
      </Button>
      <PauseDialog
        isOpen={drawingStep === 'pause' || seconds === 0}
        isTimeout={seconds === 0}
        onClose={seconds === 0 ? retryDrawing : playDrawing}
        onProceed={onComplete}
      />
    </div>
  );
}

export default Timer;
