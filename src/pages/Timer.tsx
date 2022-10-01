import React, { useEffect, useCallback, useMemo } from 'react';

import { useRecoilState } from 'recoil';
import { drawingStepState } from '../atoms/DrawingStep';
import clsx from 'clsx';
import { secondsState } from '../atoms/Seconds';

function Timer({ className }: { className: string }): React.ReactElement {
  const [seconds, setSeconds] = useRecoilState(secondsState);
  const [drawingStep, setDrawingStep] = useRecoilState(drawingStepState);

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
  }, [drawingStep, seconds, setSeconds]);

  const timeStyle = useMemo(() => {
    if (seconds <= 10) {
      return 'text-red-500';
    }
    if (seconds <= 30) {
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
      <div className={clsx('w-9 font-medium', timeStyle)}>
        {Math.floor(seconds / 60)}:
        {seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}
      </div>
      <button
        className={clsx(
          'w-[54px] p-1 rounded-full border border-black text-xs font-bold',
          drawingStep === 'play' ? 'bg-white text-black' : 'bg-black text-white'
        )}
        type="button"
        onClick={toggleDrawing}
      >
        {drawingStep === 'play' ? 'STOP' : 'START'}
      </button>
    </div>
  );
}

export default Timer;
