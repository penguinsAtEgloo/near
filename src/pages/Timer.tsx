import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Button from '../ui/Button';

import CanvasDraw from 'react-canvas-draw';
import { erasedLinesState } from '../atoms/ErasedLines';
import { useSetRecoilState } from 'recoil';
import TimeoutDialog from '../dialog/TimeoutDialog';
import CompleteDialog from '../dialog/CompleteDialog';

function Timer({
  className,
  canvasDraw,
  onComplete,
  onStart,
  onTimeout,
}: {
  className: string;
  canvasDraw: CanvasDraw | null;
  onComplete: () => void;
  onStart: () => void;
  onTimeout: () => void;
}): React.ReactElement {
  const [seconds, setSeconds] = useState(3);
  const [isStart, setIsStart] = useState(false);

  const [over, setOver] = useState(false);
  const closeSetOver = useCallback(() => {
    setOver(false);
    onTimeout();
  }, [setOver, onTimeout]);
  const onSave = useCallback(() => {
    setOver(false);
    onComplete();
  }, [setOver, onComplete]);

  const [completion, setCompletion] = useState(false);
  const closeCompletion = useCallback(() => {
    setCompletion(false);
    onComplete();
  }, [setCompletion, onComplete]);

  const setErasedLines = useSetRecoilState(erasedLinesState);

  const clear = useCallback(() => {
    setErasedLines([]);
    canvasDraw?.clear();
  }, [canvasDraw, setErasedLines]);

  const tryAgain = useCallback(() => {
    setOver(false);
    setSeconds(180);
    setIsStart(false);
    clear();
  }, [setOver, setSeconds, setIsStart, clear]);

  const endBtn = useCallback(() => {
    setIsStart(false);
    setCompletion(true);
  }, [setIsStart, setCompletion]);

  const notEnding = useCallback(() => {
    setCompletion(false);
    setIsStart(true);
  }, [setCompletion, setIsStart]);

  const start = useCallback(() => {
    setIsStart(true);
    onStart();
  }, [setIsStart, onStart]);

  useEffect(() => {
    if (isStart) {
      const countdown = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          //0초일때
          clearInterval(countdown);
          setOver(true);
        }
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [isStart, seconds]);

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
      <Button onClick={start}>시작</Button>
      {/*완료버튼 클릭시 시간 멈추게 만들기 + 다이얼로그창 닫기  clear */}
      <Button onClick={endBtn}>완료</Button>
      <TimeoutDialog
        tryAgain={tryAgain}
        isOpen={over}
        onSave={onSave}
        onClose={closeSetOver}
      />
      <CompleteDialog
        isOpen={completion}
        onClose={closeCompletion}
        notEnding={notEnding}
      />
    </div>
  );
}

export default Timer;
