import {
  createContext,
  use,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { useTimer } from '../hooks/useTimer';
import { useModeContext } from './ModeContext';
import { useSettingsContext } from './SettingsContext';
import { useSessionContext } from './SessionContext';

// Separate contexts for control (rarely changes) and state (changes every second)
const TimerControlContext = createContext(null);
const TimerStateContext = createContext(null);

export const TimerProvider = ({ children }) => {
  const userStartedRef = useRef(false);
  const { mode, setMode } = useModeContext();
  const { timerSettings } = useSettingsContext();
  const { currentCycle, completeFocusSession, nextCycle, resetCycle } =
    useSessionContext();

  const getDuration = () => {
    switch (mode) {
      case 'FOCUS':
        return parseInt(timerSettings[mode].value) * 60;

      case 'BREAK':
        return parseInt(timerSettings[mode].value) * 60;

      case 'RECOVER':
        return parseInt(timerSettings[mode].value) * 60;

      default:
        return parseInt(timerSettings.FOCUS.value) * 60;
    }
  };

  const duration = getDuration();

  // Transition when timer completes
  const handleTimerComplete = useCallback(() => {
    const repeatCount = parseInt(timerSettings.REPEAT.value);

    if (mode === 'FOCUS') {
      completeFocusSession();

      if (currentCycle >= repeatCount) {
        setMode('RECOVER');
      } else {
        setMode('BREAK');
      }
    } else if (mode === 'BREAK') {
      nextCycle();
      setMode('FOCUS');
    } else if (mode === 'RECOVER') {
      handleTimerReset();
    }
  }, [
    mode,
    currentCycle,
    timerSettings,
    completeFocusSession,
    nextCycle,
    resetCycle,
    setMode,
  ]);

  // Auto start next mode when timer is running
  useEffect(() => {
    if (!userStartedRef.current) return;

    let timerId;
    if (!hasStarted && !isRunning && mode) {
      timerId = setTimeout(() => {
        start(parseInt(timerSettings[mode].value));
      }, 1000); // 1 second delay when transitioning
    }
    // Return a cleanup function
    return () => {
      clearTimeout(timerId);
    };
  }, [mode]);

  const {
    remaining,
    totalDuration,
    isRunning,
    hasStarted,
    start,
    pause,
    reset,
  } = useTimer(duration, handleTimerComplete);

  const handleTimerReset = useCallback(() => {
    reset();
    resetCycle();
    setMode('FOCUS');
    userStartedRef.current = false;
  }, [resetCycle, reset]);

  const handleEndMode = useCallback(() => {
    reset();
    handleTimerComplete();
  }, [reset, handleTimerComplete]);

  // Control context only updates when isRunning or functions change
  const controlValue = useMemo(
    () => ({
      isRunning,
      hasStarted,
      userStartedRef,
      start,
      pause,
      handleTimerReset,
      handleEndMode,
    }),
    [
      isRunning,
      hasStarted,
      userStartedRef,
      start,
      pause,
      handleTimerReset,
      handleEndMode,
    ]
  );

  // State context only contains remaining time
  const stateValue = { remaining, totalDuration };

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

// Hook for components that need the time value (remaining, totalDuration)
export const useTimerState = () => {
  const context = use(TimerStateContext);

  if (!context) {
    throw new Error('useTimerState must be used within TimerProvider');
  }

  return context;
};
