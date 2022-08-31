import clsx from 'clsx';
import React, { useState, useEffect, useCallback } from 'react';
import Button from '../ui/Button';

function Timer({ className }: { className?: string }): React.ReactElement {
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
          //0분 0초일때
          clearInterval(countdown);
          alert('시간이 종료되었습니다.');
        }
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [isStart, seconds]);

  return (
    <div className={clsx(className)}>
      {Math.floor(seconds / 60)}:
      {seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}
      <Button onClick={start}>시작</Button>
    </div>
  );
}

export default Timer;
