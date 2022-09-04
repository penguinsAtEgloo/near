import clsx from 'clsx';
import React, { useState, useEffect } from 'react';

function Timer({ className }: { className?: string }): React.ReactElement {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(500000000000);

  useEffect(() => {
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
  }, [minutes, seconds]);

  return (
    <div className={clsx(className)}>
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
}

export default Timer;
