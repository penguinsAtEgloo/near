import clsx from 'clsx';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Button from '../ui/Button';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

function Timer({ className }: { className?: string }): React.ReactElement {
  const [seconds, setSeconds] = useState<number>(3);
  const [isStart, setIsStart] = useState<boolean>(false);
  const [open, setOpen] = useState(false); // 시간 끝날때 다이얼로그
  const [over, setOver] = useState(false); // 완료버튼 눌렀을때 다이얼로그

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
          setOpen(true);
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
    if (seconds <= 180) {
      return 'text-slate-900';
    }
    return 'text-slate-900';
  }, [seconds]);

  return (
    <div className={clsx(className)}>
      <div className={clsx(timeStyle)}>
        {Math.floor(seconds / 60)}:
        {seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}
      </div>
      <Button onClick={start}>시작</Button>
      <Button onClick={() => setOver(true)}>완료</Button>
      <Dialog // 시간끝날때 다이얼로그
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle id="dialog-title">
          그리기 시간이 종료되었습니다.
        </DialogTitle>
        <DialogContent>
          {/*<DialogContentText id="dialog-description">*/}
          {/*  그리기 시간이 종료되었습니다.1212*/}
          {/*</DialogContentText>*/}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>다시 도전!</Button>
          <Button onClick={() => setOpen(false)}>저장하기</Button>
        </DialogActions>
      </Dialog>
      <Dialog // 완료버튼 다이얼로그
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        open={over}
        onClose={() => setOver(false)}
      >
        <DialogTitle id="dialog-title">
          그리기 시간이 종료되지 않았습니다. 완료하시겠어요?
        </DialogTitle>
        <DialogContent>
          {/*<DialogContentText id="dialog-description">*/}
          {/*  그리기 시간이 종료되었습니다.1212*/}
          {/*</DialogContentText>*/}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOver(false)}>아니요</Button>
          <Button onClick={() => setOver(false)}>예</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Timer;
