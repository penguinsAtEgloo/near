import clsx from 'clsx';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Button from '../ui/Button';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

function Timer({ className }: { className?: string }): React.ReactElement {
  const [seconds, setSeconds] = useState(3);
  const [isStart, setIsStart] = useState(false);

  const [over, setOver] = useState(false); // 시간 끝날때 다이얼로그
  const openSetOver = useCallback(() => setOver(true), []);
  const closeSetOver = useCallback(() => setOver(false), []);

  const [open, setOpen] = useState(false); // 완료버튼 눌렀을때 다이얼로그
  const openSetOpen = useCallback(() => setOpen(true), []);
  const closeSetOpen = useCallback(() => setOpen(false), []);

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
      <Button onClick={openSetOpen}>완료</Button>
      <Dialog // 시간끝날때 다이얼로그
        open={over}
        onClose={closeSetOver}
      >
        <DialogTitle id="dialog-title">
          그리기 시간이 종료되었습니다.
        </DialogTitle>
        <DialogActions>
          <Button onClick={closeSetOver}>다시 도전!</Button>
          <Button onClick={closeSetOver}>저장하기</Button>
        </DialogActions>
      </Dialog>
      <Dialog // 완료버튼 다이얼로그
        open={open}
        onClose={closeSetOpen}
      >
        <DialogTitle id="dialog-title">
          그리기 시간이 종료되지 않았습니다. 완료하시겠어요?
        </DialogTitle>
        <DialogActions>
          <Button onClick={closeSetOpen}>아니요</Button>
          <Button onClick={closeSetOpen}>예</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Timer;
