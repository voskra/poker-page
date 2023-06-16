import * as React from 'react';

interface UseTimerResult {
  startTimer: (afterPaused?: boolean) => void;
  pauseTimer: () => void;
  timer: string;
}

export const useTimer = (time = '00:10'): UseTimerResult => {
  const [timer, setTimer] = React.useState(time);
  const [pausedTimer, setPausedTimer] = React.useState(time);
  const interval = React.useRef<NodeJS.Timer | null>(null);

  const getTimeRemaining = React.useCallback((date: Date) => {
    const total =
      Date.parse(date.toString()) - Date.parse(new Date().toString());

    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);

    return {
      total,
      minutes,
      seconds
    };
  }, []);

  const changeTimer = React.useCallback(
    (date: Date) => {
      const { total, minutes, seconds } = getTimeRemaining(date);

      if (total >= 0) {
        setTimer(
          (minutes > 9 ? minutes : '0' + minutes) +
            ':' +
            (seconds > 9 ? seconds : '0' + seconds)
        );
      } else if (interval.current) {
        clearInterval(interval.current);
      }
    },
    [getTimeRemaining]
  );

  const initInterval = React.useCallback(
    (date: Date, afterPaused: boolean) => {
      if (!afterPaused) {
        setTimer(time);
      }

      if (interval.current) {
        clearInterval(interval.current);
      }

      interval.current = setInterval(() => {
        changeTimer(date);
      }, 1000);
    },
    [changeTimer, time]
  );

  const getDeadTime = React.useCallback(
    (afterPaused: boolean) => {
      const deadline = new Date();
      const [minutes, seconds] = (afterPaused ? pausedTimer : time).split(':');
      deadline.setSeconds(deadline.getSeconds() + +seconds);
      deadline.setMinutes(deadline.getMinutes() + +minutes);

      return deadline;
    },
    [pausedTimer, time]
  );

  const startTimer = React.useCallback(
    (afterPaused = false) => {
      initInterval(getDeadTime(afterPaused), afterPaused);
    },
    [getDeadTime, initInterval]
  );

  const pauseTimer = React.useCallback(() => {
    if (interval.current) {
      setPausedTimer(timer);
      clearInterval(interval.current);
    }
  }, [timer]);

  return {
    startTimer,
    pauseTimer,
    timer
  };
};
