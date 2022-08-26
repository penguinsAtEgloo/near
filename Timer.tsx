import clsx from 'clsx';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Button from '../ui/Button';

function Timer({ className }: { className?: string }): React.ReactElement {
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(10);
  const [isStart, setIsStart] = useState<boolean>(false);

  const start = useCallback(() => {
    if (!isStart) {
      setIsStart(true);
    }
  }, [isStart, setIsStart]);

  useEffect(() => {
    if (isStart) {
      const countdown = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            //0분 0초일때
            clearInterval(countdown);
            alert('시간이 종료되었습니다.');
          } else {
            // x분 0초가 될때
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [isStart, minutes, seconds]);

  return (
    <div className={clsx(className)}>
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      <Button onClick={start}>시작</Button>
    </div>
  );
}

export default Timer;
