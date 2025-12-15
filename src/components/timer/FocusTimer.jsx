// Main entry point for timer
import TimerDisplay from './TimerDisplay';
import { Play, Pause } from 'lucide-react';
import { useTimerContext } from '../../context/TimerContext';

const FocusTimer = () => {
  const { remaining, isRunning, start, stop } = useTimerContext();

  const handleToggle = () => {
    if (isRunning) {
      stop();
    } else {
      start(25 * 60);
    }
  };

  // Converts remaining time in secconds to Minutes:Seconds
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <article className="flex flex-col items-center justify-center w-full p-6 overflow-hidden">
      <header className="flex flex-col items-center mb-6">
        <h2 className="font-timer text-neon-focus text-3xl uppercase drop-shadow-[0_0_5px_rgba(0,240,255,0.5)]">
          Focus Timer
        </h2>
        <p className="text-text-muted text-xs mt-1">CURRENT SESSION</p>
        {/* Optional show task here - not sure */}
      </header>

      <TimerDisplay time={formatTime(remaining)} />

      <div className="mt-6">
        <button
          type="button"
          onClick={handleToggle}
          className="inline-flex items-center justify-center gap-2 bg-white text-black px-5 py-3 font rounded-2xl text-2xl font-timer uppercase font-bold hover:opacity-85 cursor-pointer"
        >
          {isRunning ? <Pause /> : <Play />}
          {isRunning ? 'Pause' : 'Start'}
        </button>
      </div>
    </article>
  );
};

export default FocusTimer;
