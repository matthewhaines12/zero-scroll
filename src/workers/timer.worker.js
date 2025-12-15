// Web Worker for timer logic - run's in a separate threat, avoiding re-renders and timer drifts
// Web Worker --> sends time --> React UI
let intervalID = null;
let endTime = 0;

// Worker listens for messages from react
self.onmessage = (event) => {
  const { type, duration } = event.data;

  if (type === 'START') {
    endTime = Date.now() + duration * 1000;

    // Run every second
    intervalID = setInterval(() => {
      const remainingMS = endTime - Date.now();
      const remainingSec = Math.max(0, Math.ceil(remainingMS / 1000));

      self.postMessage({ remainingSec });

      if (remainingSec <= 0) {
        clearInterval(intervalID);
        intervalID = null;
        self.postMessage({ done: true });
      }
    }, 1000);
  }

  if (type === 'STOP') {
    if (intervalID) {
      clearInterval(intervalID);
      intervalID = null;
    }
  }
};
