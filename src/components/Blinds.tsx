import * as React from 'react';
import { Divider, Typography, LinearProgress } from '@mui/material';
import useSound from 'use-sound';
import clockSound from '../sounds/clock.mp3';
import bellSound from '../sounds/bell.mp3';

interface BlindsOwnProps {
  blinds: {
    small: number;
    big: number;
  };
  progress: number;
}

export const Blinds = React.memo<BlindsOwnProps>(({ blinds, progress }) => {
  const [playClock, { stop:stopClock }] = useSound(clockSound);
  const [playBell, { stop:stopBell }] = useSound(bellSound);

  React.useEffect(() => {
    if (progress === 90) {
      playClock();
    }

    if (progress === 0) {
      stopClock();
      stopBell();
    }

    if (progress === 100) {
      playBell()
    }
  }, [playBell, playClock, progress, stopBell, stopClock]);

  return (
    <>
      <Typography variant="h3">{blinds.small}</Typography>
      <Divider variant="middle" />
      <Typography variant="h3">{blinds.big}</Typography>
      <LinearProgress value={progress} variant="determinate" />
    </>
  );
});

Blinds.displayName = nameof(Blinds);
