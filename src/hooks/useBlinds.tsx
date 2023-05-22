import * as React from 'react';
import { initialConfig } from '../settings';

interface useBlindsOwnProps {
  blinds: { small: number; big: number };
  endOfBlinds: boolean;
}

export const useBlinds = (timer: string): useBlindsOwnProps => {
  const [index, setIndex] = React.useState<number>(0);
  const [endOfBlinds, setEndOfBlinds] = React.useState<boolean>(false);

  React.useEffect(() => {
    setTimeout(() => {
      if (timer === '00:00') {
        if (initialConfig.length > index + 1) {
          setIndex((prev) => prev + 1);
        } else {
          setEndOfBlinds(true);
        }
      }
    }, 1500);
  }, [index, timer]);

  return {
    blinds: initialConfig[index],
    endOfBlinds
  };
};
