import React, { useState, useEffect, useCallback, useMemo } from 'react';

import { useRecoilState } from 'recoil';
import { drawingStepState } from '../atoms/DrawingStep';
import PauseDialog from '../dialog/PauseDialog';
import clsx from 'clsx';

// TODO: replace
// const TIME_LIMIT = 180;
const TIME_LIMIT = 3;

function Timer({
  className,
  onComplete,
}: {
  className: string;
  onComplete: () => void;
}): React.ReactElement {
  const [seconds, setSeconds] = useState(TIME_LIMIT);
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
    <div
      className={clsx(
        'px-2 py-1 space-x-1 rounded-full border drop-shadow bg-white',
        className
      )}
    >
      <div className={timeStyle}>
        {Math.floor(seconds / 60)}:
        {seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}
      </div>
      <button
        className="px-2 py-1 rounded-full bg-black text-white text-xs"
        type="button"
        onClick={toggleDrawing}
      >
        {drawingStep === 'play' ? 'STOP' : 'START'}
      </button>
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
