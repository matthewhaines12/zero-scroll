import { useEffect, useState, useRef, useCallback } from 'react';

export const useTimer = (initialDuration, onComplete) => {
  const workerRef = useRef(null);
  const startTimeRef = useRef(null);
  const elapsedMsRef = useRef(0);
  const onCompleteRef = useRef(onComplete);

  const [remaining, setRemaining] = useState(initialDuration);
  const [totalDuration, setTotalDuration] = useState(initialDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Keep callback up to date without restarting worker
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Run once when the component using the hook mounts and create the worker
  useEffect(() => {
    workerRef.current = new Worker(
      new URL('../../workers/timer.worker.js', import.meta.url)
    );

    // Handle messages from worker
    workerRef.current.onmessage = (event) => {
      if (event.data.remainingSec !== undefined) {
        setRemaining(event.data.remainingSec);
      }

      if (event.data.done) {
        const elapsedMs = Date.now() - startTimeRef.current;
        const minutesSpent = Math.floor(elapsedMs / 60000);

        console.log('mins spent', minutesSpent);

        elapsedMsRef.current = 0;
        setIsRunning(false);
        setHasStarted(false);

        onCompleteRef.current?.(minutesSpent); // call the completion callback
      }
    };

    return () => {
      workerRef.current?.terminate(); // If current worker exists, clear on unmount
    };
  }, []);

  // Update total duration on settings apply
  useEffect(() => {
    if (!isRunning && !hasStarted) {
      if (initialDuration !== totalDuration) {
        setTotalDuration(initialDuration);
        setRemaining(initialDuration);
      }
    }
  }, [initialDuration, totalDuration, hasStarted, isRunning]);

  // Avoid creating a new function every render
  const start = useCallback((duration) => {
    setIsRunning(true);
    setHasStarted(true);

    const durationInSeconds =
      duration !== undefined ? parseInt(duration) * 60 : totalDuration;
    setTotalDuration(durationInSeconds);

    // Track start time for calculating elapsed time | pause -> resume updates current time
    startTimeRef.current = Date.now() - elapsedMsRef.current;

    workerRef.current?.postMessage({
      type: 'START',
      duration: durationInSeconds,
    });
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);

    // Update elapsed time on pause
    elapsedMsRef.current = Date.now() - startTimeRef.current;

    workerRef.current?.postMessage({ type: 'PAUSE' });
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setHasStarted(false);
    setRemaining(totalDuration);
    elapsedMsRef.current = 0;
    workerRef.current?.postMessage({ type: 'RESET' });
  }, [totalDuration]);

  const getElapsedMinutes = useCallback(() => {
    if (!startTimeRef.current) return 0;
    const currentElapsed = isRunning
      ? Date.now() - startTimeRef.current
      : elapsedMsRef.current;
    return Math.floor(currentElapsed / 60000);
  }, []);

  return {
    remaining,
    totalDuration,
    isRunning,
    hasStarted,
    start,
    pause,
    reset,
    getElapsedMinutes,
  };
};
