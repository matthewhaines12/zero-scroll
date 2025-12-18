// Web Worker for timer logic - runs in a separate threat, avoiding re-renders and timer drifts
// Web Worker --> sends time --> React UI
let intervalID = null;
let endTime = 0;
let remainingSec = 0;

const tick = () => {
  const remainingMS = endTime - Date.now();
  remainingSec = Math.max(0, Math.ceil(remainingMS / 1000));

  self.postMessage({ remainingSec });

  if (remainingSec <= 0) {
    clearInterval(intervalID);
    intervalID = null;
    self.postMessage({ done: true });
  }
};

// Worker listens for messages from react
self.onmessage = (event) => {
  const { type, duration } = event.data;

  switch (type) {
    case 'START': {
      // If fresh start, initialize remaining time
      if (duration !== undefined) {
        remainingSec = duration;
      }

      endTime = Date.now() + remainingSec * 1000;

      if (!intervalID) {
        tick();
        intervalID = setInterval(tick, 1000);
      }
      break;
    }

    case 'PAUSE': {
      if (intervalID) {
        clearInterval(intervalID);
        intervalID = null;
      }
      break;
    }

    case 'RESET': {
      clearInterval(intervalID);
      intervalID = null;
      remainingSec = 0;
      break;
    }
  }
};
