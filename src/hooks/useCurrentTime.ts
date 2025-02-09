import { useState } from 'react';
import { useInterval } from 'usehooks-ts';

const getCurrentTime = () => Math.floor(Date.now());

export const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  useInterval(() => setCurrentTime(getCurrentTime()), 1_000);

  return currentTime;
};
