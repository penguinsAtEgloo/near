import clsx from 'clsx';
import React, { useState, useEffect } from 'react';

function Timer({ className }: { className?: string }): React.ReactElement {
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        // 0초일때
        clearInterval(countdown);
        alert('시간이 종료되었습니다.');
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [seconds]);

  return (
      <div className={clsx(className)}>
        {Math.floor(seconds / 60)}:{(seconds % 60) < 10 ? `0${seconds % 60}` : seconds % 60}
      </div>
  );
}

export default Timer;
