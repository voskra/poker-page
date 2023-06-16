import * as React from 'react';
import { Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Blinds, Timer } from '../components';
import { useTimer } from '../hooks/useTimer';
import { initialTime } from '../settings';
import { useBlinds } from '../hooks/useBlinds';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 150,
  lineHeight: '60px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}));

export const BlindTimer = React.memo(() => {
  const [isTimerStarted, setIsTimerStarted] = React.useState<boolean>(false);
  const [progress, setProgress] = React.useState<number>(0);
  const [timerAlmostOver, setTimerAlmostOver] = React.useState<boolean>(false);
  const prevTimerStart = React.useRef<boolean>(false);
  const { startTimer, pauseTimer, timer } = useTimer(initialTime);
  const { blinds, endOfBlinds } = useBlinds(timer);

  const toggleTimer = React.useCallback(() => {
    if (isTimerStarted && prevTimerStart.current) {
      prevTimerStart.current = false;
      pauseTimer();
    } else {
      prevTimerStart.current = true;
      startTimer(true);
    }

    setIsTimerStarted((prev) => !prev);
  }, [isTimerStarted, pauseTimer, startTimer]);

  React.useEffect(() => {
    if (endOfBlinds) {
      pauseTimer();
    }
  }, [pauseTimer, endOfBlinds]);

  React.useEffect(() => {
    const [initMinutes, initSeconds] = initialTime.split(':');
    const [minutes, seconds] = timer.split(':');
    const initTotal = +initMinutes * 60 + +initSeconds;
    const total = +minutes * 60 + +seconds;

    setTimerAlmostOver(minutes === '00' && +seconds < 10);
    setProgress(((initTotal - total) / initTotal) * 100);
  }, [timer]);

  React.useEffect(() => {
    if (isTimerStarted && timer === '00:00') {
      setTimeout(() => startTimer(), 1000);
    }
  }, [isTimerStarted, startTimer, timer]);

  return (
    <Grid
      columns={{ xs: 2, md: 12 }}
      container={true}
      spacing={{ xs: 2, md: 3 }}
    >
      <Grid item={true} md={4} xs={2}>
        <Item>
          <Blinds
            blinds={blinds}
            isTimerStarted={isTimerStarted}
            progress={progress}
            timerAlmostOver={timerAlmostOver}
          />
        </Item>
      </Grid>
      <Grid item={true} md={8} xs={2}>
        <Item>
          <Timer
            isEnded={endOfBlinds}
            isStarted={isTimerStarted}
            timer={timer}
            toggleTimer={toggleTimer}
          />
        </Item>
      </Grid>
    </Grid>
  );
});

BlindTimer.displayName = nameof(BlindTimer);
