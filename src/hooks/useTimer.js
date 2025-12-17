import { useEffect, useState, useRef, useCallback } from 'react';

export const useTimer = () => {
  const workerRef = useRef(null);
  const [remaining, setRemaining] = useState(1500); // UI displays, add default value later can be customized or changed
  const [isRunning, setIsRunning] = useState(false); // Disable the start button, etc

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
        setRemaining(0);
        setIsRunning(false);
      }
    };

    return () => {
      workerRef.current?.terminate(); // If current worker exists, clear on unmount
    };
  }, []);

  // Avoid creating a new function every render
  const start = useCallback((duration) => {
    setIsRunning(true);
    workerRef.current?.postMessage({ type: 'START', duration });
  }, []);

  const stop = useCallback(() => {
    setIsRunning(false);
    workerRef.current?.postMessage({ type: 'STOP' });
  }, []);

  return {
    remaining,
    isRunning,
    start,
    stop,
  };
};
