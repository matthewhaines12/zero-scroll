import { createContext, useContext } from 'react';
import { useTimer } from '../hooks/useTimer';

export const TimerContext = createContext(null);

export const TimerProvider = ({ children }) => {
  const timer = useTimer();

  return <TimerContext value={timer}>{children}</TimerContext>;
};

export const useTimerContext = () => {
  const context = useContext(TimerContext);

  if (!context) {
    throw new Error('useTimer must be used within TimerProvider');
  }

  return context;
};
