import { useEffect, useState, useRef, useCallback } from 'react';

export const useTimer = (initialDuration, onComplete) => {
  const workerRef = useRef(null);
  const [remaining, setRemaining] = useState(initialDuration);
  const [totalDuration, setTotalDuration] = useState(initialDuration);
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
        setIsRunning(false);
        setHasStarted(false);
        onComplete?.(); // call the completion callback
      }
    };

    return () => {
      workerRef.current?.terminate(); // If current worker exists, clear on unmount
    };
  }, [onComplete]);

  // Update timer when duration changes (mode)

  // Avoid creating a new function every render
  const start = useCallback((duration) => {
    setIsRunning(true);

    if (duration !== undefined) {
      const durationInSeconds = parseInt(duration) * 60;
      setTotalDuration(durationInSeconds);
      setHasStarted(true);
      workerRef.current?.postMessage({
        type: 'START',
        duration: durationInSeconds,
      });
    } else {
      workerRef.current?.postMessage({
        type: 'START',
      });
    }
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
    workerRef.current?.postMessage({ type: 'PAUSE' });
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setHasStarted(false);
    setRemaining(totalDuration);
    setTotalDuration(totalDuration);
    workerRef.current?.postMessage({ type: 'RESET' });
  }, [totalDuration]);

  const endMode = useCallback(() => {
    setIsRunning(false);
    setRemaining(totalDuration);
    setTotalDuration(totalDuration);
    workerRef.current?.postMessage({ type: 'RESET' });
  }, [totalDuration]);

  return {
    remaining,
    totalDuration,
    isRunning,
    hasStarted,
    start,
    pause,
    reset,
    endMode,
  };
};
