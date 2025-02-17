import { useState } from 'react';
import { useInterval } from 'usehooks-ts';

const getCurrentTime = () => Math.floor(Date.now() / 1000);

export const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  useInterval(() => setCurrentTime(getCurrentTime()), 1_000);

  return currentTime;
};
