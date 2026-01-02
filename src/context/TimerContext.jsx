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
import { useAudioContext } from './AudioContext';
import { useAuthContext } from './AuthContext';
// import * as sessionsApi from '../services/api/session.api';
import { startSession, stopSession } from '../services/api/session.api';

// Separate contexts for control (rarely changes) and state (changes every second)
const TimerControlContext = createContext(null);
const TimerStateContext = createContext(null);

export const TimerProvider = ({ children }) => {
  const userStartedRef = useRef(false);
  const currentSessionIDref = useRef(null);

  const { mode, setMode } = useModeContext();
  const { timerSettings } = useSettingsContext();
  const { playNotification } = useAudioContext();
  const { user, accessToken } = useAuthContext();
  const { currentCycle, completeFocusSession, nextCycle, resetCycle } =
    useSessionContext();

  const initialDuration = useMemo(() => {
    const modeValue = timerSettings[mode].value || timerSettings.FOCUS.value;
    return parseInt(modeValue) * 60;
  }, [mode, timerSettings]);

  // Transition when timer completes
  const handleTimerComplete = useCallback(
    async ({ minutesSpent }) => {
      playNotification();
      const repeatCount = parseInt(timerSettings.REPEAT.value);

      if (user && currentSessionIDref.current && mode === 'FOCUS') {
        try {
          await stopSession(
            currentSessionIDref.current,
            minutesSpent,
            true,
            accessToken
          );
          currentSessionIDref.current = null;
        } catch (err) {
          console.error('Failed to completed session in backend:', err);
        }
      }

      if (mode === 'FOCUS') {
        completeFocusSession(minutesSpent);

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
    },
    [
      mode,
      currentCycle,
      timerSettings,
      completeFocusSession,
      nextCycle,
      playNotification,
      user,
      accessToken,
    ]
  );

  const {
    remaining,
    totalDuration,
    isRunning,
    hasStarted,
    start,
    pause,
    reset,
  } = useTimer(initialDuration, handleTimerComplete);

  const handleStart = useCallback(
    async (duration) => {
      start(duration);

      if (user && mode == 'FOCUS') {
        try {
          const plannedDuration =
            duration || parseInt(timerSettings.FOCUS.value);
          const res = await startSession(mode, plannedDuration, accessToken);
          currentSessionIDref.current = res.session._id;
        } catch (error) {}
      }
    },
    [start, user, mode, timerSettings]
  );

  // Auto start next mode when timer is running
  useEffect(() => {
    if (!userStartedRef.current) return;

    let timerId;
    if (!hasStarted && !isRunning && mode) {
      timerId = setTimeout(() => {
        handleStart(parseInt(timerSettings[mode].value));
      }, 100); // 1 second delay when transitioning
    }
    // Return a cleanup function
    return () => {
      clearTimeout(timerId);
    };
  }, [mode, hasStarted, isRunning, start, timerSettings]);

  const handleTimerReset = useCallback(() => {
    reset();
    resetCycle();
    setMode('FOCUS');
    userStartedRef.current = false;
  }, [resetCycle, reset]);

  const handleEndMode = useCallback(async () => {
    const minutesSpent = Math.floor((totalDuration - remaining) / 60);

    if (user && currentSessionIDref.current && mode === 'FOCUS') {
      try {
        await stopSession(
          currentSessionIDref.current,
          minutesSpent,
          false,
          accessToken
        );
        currentSessionIDref.current = null;
      } catch (err) {
        console.error('Failed to completed session in backend:', err);
      }
    }

    reset();
    handleTimerComplete({ minutesSpent });
  }, [reset, handleTimerComplete, remaining, totalDuration, user]);

  // Control context only updates when isRunning or functions change
  const controlValue = useMemo(
    () => ({
      isRunning,
      hasStarted,
      userStartedRef,
      handleStart,
      pause,
      handleTimerReset,
      handleEndMode,
    }),
    [
      isRunning,
      hasStarted,
      userStartedRef,
      handleStart,
      pause,
      handleTimerReset,
      handleEndMode,
    ]
  );

  // State context only contains remaining time
  const stateValue = useMemo(
    () => ({ remaining, totalDuration }),
    [remaining, totalDuration]
  );

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
