import * as React from 'react';
import { Typography, Button } from '@mui/material';
import { PlayArrow, Pause, Stop } from '@mui/icons-material';
import { debounce } from '../utils';

interface TimerOwnProps {
  toggleTimer: () => void;
  isStarted: boolean;
  isEnded: boolean;
  timer: string;
}

export const Timer = React.memo<TimerOwnProps>(
  ({ toggleTimer, isStarted, isEnded, timer }) => {
    const startIcon = React.useMemo(() => {
      if (isEnded) {
        return <Stop />;
      }

      if (isStarted) {
        return <Pause />;
      }

      return <PlayArrow />;
    }, [isEnded, isStarted]);

    return (
      <>
        <Typography variant="h2">{timer}</Typography>
        <Button
          disabled={isEnded}
          size="large"
          startIcon={startIcon}
          variant="contained"
          onClick={debounce(toggleTimer, 500)}
        >
          {isEnded ? 'STOPPED' : isStarted ? 'PAUSE' : 'PLAY'}
        </Button>
      </>
    );
  }
);

Timer.displayName = nameof(Timer);
