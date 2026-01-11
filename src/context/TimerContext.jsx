import {
  createContext,
  use,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { useTimer } from '../components/timer/useTimer';
import { useModeContext } from './ModeContext';
import { useSettingsContext } from './SettingsContext';
import { useSessionContext } from './SessionContext';
import { useAudioContext } from './AudioContext';
import { useAuthContext } from './AuthContext';
import { startSession, stopSession } from '../services/api/session.api';
import { MIN_FOCUS_MINUTES } from '../services/utils/constants';

// Separate contexts for control (rarely changes) and state (changes every second)
const TimerControlContext = createContext(null);
const TimerStateContext = createContext(null);

export const TimerProvider = ({ children }) => {
  const userStartedRef = useRef(false);
  const sessionIDref = useRef(null);

  const { mode, setMode } = useModeContext();
  const { timerSettings, preferences } = useSettingsContext();
  const { playNotification } = useAudioContext();
  const { status, accessToken } = useAuthContext();
  const { currentCycle, completeFocusSession, nextCycle, resetCycle } =
    useSessionContext();

  const initialDuration = useMemo(() => {
    const modeValue = timerSettings[mode].value || timerSettings.FOCUS.value;
    return parseInt(modeValue) * 60;
  }, [mode, timerSettings]);

  // Transition when timer completes
  const handleTimerComplete = useCallback(
    async (minutesSpent) => {
      console.log('mins spent', minutesSpent);
      if (preferences.playSoundEffects) playNotification();

      // Capture the current mode at the time of completion to avoid race conditions
      const currentMode = mode;
      const repeatCount = parseInt(timerSettings.REPEAT.value);
      const countsTowardStats = minutesSpent >= MIN_FOCUS_MINUTES;

      // Stop session for authenticated users in FOCUS mode
      if (
        status === 'authenticated' &&
        sessionIDref.current &&
        currentMode === 'FOCUS'
      ) {
        console.log('do we make it here?');
        try {
          await stopSession(
            sessionIDref.current,
            minutesSpent,
            true,
            countsTowardStats,
            accessToken
          );
          sessionIDref.current = null;
        } catch (err) {
          console.error('Failed to completed session in backend:', err);
        }
      }

      // Handle mode transitions based on current mode
      if (currentMode === 'FOCUS') {
        completeFocusSession(minutesSpent, countsTowardStats);

        if (currentCycle >= repeatCount) {
          setMode('RECOVER');
        } else {
          setMode('BREAK');
        }
      } else if (currentMode === 'BREAK') {
        nextCycle();
        setMode('FOCUS');
      } else if (currentMode === 'RECOVER') {
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
      status,
      accessToken,
      preferences,
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
    getElapsedMinutes,
  } = useTimer(initialDuration, handleTimerComplete);

  const handleStart = useCallback(
    async (duration) => {
      start(duration);

      if (status === 'authenticated' && mode == 'FOCUS') {
        try {
          const plannedDuration =
            duration || parseInt(timerSettings.FOCUS.value);
          const res = await startSession(mode, plannedDuration, accessToken);
          sessionIDref.current = res.session._id;
        } catch (error) {}
      }
    },
    [start, status, mode, timerSettings, accessToken]
  );

  // Auto start next mode when timer is running
  useEffect(() => {
    if (!userStartedRef.current || !preferences.autoStartTimer) return;

    let timerId;
    if (!hasStarted && !isRunning && mode) {
      timerId = setTimeout(() => {
        handleStart(parseInt(timerSettings[mode].value));
      }, 200); // 1 second delay when transitioning
    }
    // Return a cleanup function
    return () => {
      clearTimeout(timerId);
    };
  }, [mode, hasStarted, isRunning, handleStart, timerSettings, preferences]);

  const handleTimerReset = useCallback(() => {
    reset();
    resetCycle();
    setMode('FOCUS');
    userStartedRef.current = false;
  }, [resetCycle, reset]);

  const handleEndMode = useCallback(async () => {
    const minutesSpent = getElapsedMinutes();
    console.log(minutesSpent);
    const countsTowardStats = minutesSpent >= MIN_FOCUS_MINUTES;

    // Capture the current mode to avoid race conditions
    const currentMode = mode;

    if (
      status === 'authenticated' &&
      sessionIDref.current &&
      currentMode === 'FOCUS'
    ) {
      try {
        await stopSession(
          sessionIDref.current,
          minutesSpent,
          false,
          countsTowardStats,
          accessToken
        );
        sessionIDref.current = null;
      } catch (err) {
        console.error('Failed to stop session in backend:', err);
      }
    }

    reset();
    handleTimerComplete(minutesSpent);
  }, [
    reset,
    handleTimerComplete,
    status,
    mode,
    accessToken,
    getElapsedMinutes,
  ]);

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
