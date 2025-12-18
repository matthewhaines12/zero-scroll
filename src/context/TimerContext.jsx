import { createContext, use, useMemo } from 'react';
import { useTimer } from '../hooks/useTimer';

// Separate contexts for control (rarely changes) and state (changes every second)
const TimerControlContext = createContext(null);
const TimerStateContext = createContext(null);

export const TimerProvider = ({ children }) => {
  const { remaining, isRunning, hasStarted, start, pause, reset } = useTimer();

  // Control context only updates when isRunning or functions change
  const controlValue = useMemo(
    () => ({ isRunning, hasStarted, start, pause, reset }),
    [isRunning, hasStarted, start, pause, reset]
  );

  // State context only contains remaining time
  const stateValue = { remaining };

  return (
    <TimerControlContext value={controlValue}>
      <TimerStateContext value={stateValue}>{children}</TimerStateContext>
    </TimerControlContext>
  );
};

// Hook for components that need control (start, pause, reset, isRunning)
export const useTimerControl = () => {
  const context = use(TimerControlContext);

  if (!context) {
    throw new Error('useTimerControl must be used within TimerProvider');
  }

  return context;
};

// Hook for components that need the time value (remaining)
export const useTimerState = () => {
  const context = use(TimerStateContext);

  if (!context) {
    throw new Error('useTimerState must be used within TimerProvider');
  }

  return context;
};
