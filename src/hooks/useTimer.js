import { useEffect, useState, useRef, useCallback } from 'react';
import { TIMER_LENGTH } from '../services/utils/constants';

export const useTimer = () => {
  const workerRef = useRef(null);
  const [remaining, setRemaining] = useState(TIMER_LENGTH);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Run once when the component using the hook mounts and create the worker
  useEffect(() => {
    workerRef.current = new Worker(
      new URL('../workers/timer.worker.js', import.meta.url)
    );

    // Handle messages from worker
    workerRef.current.onmessage = (event) => {
      if (event.data.remainingSec !== undefined) {
        setRemaining(event.data.remainingSec);
      }

      if (event.data.done) {
        setRemaining(TIMER_LENGTH);
        setIsRunning(false);
        setHasStarted(false);
      }
    };

    return () => {
      workerRef.current?.terminate(); // If current worker exists, clear on unmount
    };
  }, []);

  // Avoid creating a new function every render
  const start = useCallback((duration) => {
    setIsRunning(true);

    if (duration !== undefined) {
      duration *= 60;
      setHasStarted(true);
    }

    workerRef.current?.postMessage(
      duration !== undefined ? { type: 'START', duration } : { type: 'START' }
    );
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
    workerRef.current?.postMessage({ type: 'PAUSE' });
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setHasStarted(false);
    setRemaining(TIMER_LENGTH);
    workerRef.current?.postMessage({ type: 'RESET' });
  }, []);

  return {
    remaining,
    isRunning,
    hasStarted,
    start,
    pause,
    reset,
  };
};
