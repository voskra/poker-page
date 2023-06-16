import * as React from 'react';
import { Divider, Typography, LinearProgress } from '@mui/material';
import { linearProgressClasses } from '@mui/material/LinearProgress';
import useSound from 'use-sound';
import clockSound from '../sounds/clock.mp3';
import voiceSound from '../sounds/voice.mp3';

interface BlindsOwnProps {
  blinds: {
    small: number;
    big: number;
  };
  progress: number;
  timerAlmostOver: boolean;
  isTimerStarted: boolean;
}

export const Blinds = React.memo<BlindsOwnProps>(
  ({ blinds, progress, timerAlmostOver, isTimerStarted }) => {
    const [playClock, { stop: stopClock }] = useSound(clockSound);
    const [playVoice, { stop: stopVoice }] = useSound(voiceSound);
    const clockPlayed = React.useRef<boolean>(false);

    const stopClockFunc = React.useCallback(() => {
      clockPlayed.current = false;
      stopClock();
    }, [stopClock]);

    React.useEffect(() => {
      if (!isTimerStarted) {
        stopVoice();
        stopClockFunc();
      }

      if (timerAlmostOver && isTimerStarted && !clockPlayed.current) {
        clockPlayed.current = true;
        playClock();
      }

      if (progress === 0) {
        stopVoice();
      }

      if (progress === 100) {
        stopClockFunc();
        playVoice();
      }
    }, [
      playVoice,
      playClock,
      progress,
      stopVoice,
      stopClockFunc,
      timerAlmostOver,
      isTimerStarted
    ]);

    const linerProps = React.useMemo(() => {
      if (timerAlmostOver) {
        return {
          [`& .${linearProgressClasses.bar}`]: { backgroundColor: '#d32f2f' }
        };
      }

      return void 0;
    }, [timerAlmostOver]);

    return (
      <>
        <Typography variant="h3">{blinds.small}</Typography>
        <Divider variant="middle" />
        <Typography variant="h3">{blinds.big}</Typography>
        <LinearProgress
          sx={linerProps}
          value={progress}
          variant="determinate"
        />
      </>
    );
  }
);

Blinds.displayName = nameof(Blinds);
