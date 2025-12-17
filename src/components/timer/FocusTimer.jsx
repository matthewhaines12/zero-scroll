import TimerDisplay from './TimerDisplay';
import { Play, Pause } from 'lucide-react';
import { useTaskContext } from '../../context/TaskContext';
import { useTimerControl } from '../../context/TimerContext';
import { useRef } from 'react';

const FocusTimer = () => {
  const renderCount = useRef(0);
  renderCount.current += 1;
  console.log(`Focus timer rendered ${renderCount.current} times`);

  const { isRunning, start, stop } = useTimerControl();
  const { activeTask } = useTaskContext();

  const handleToggle = () => {
    isRunning ? stop() : start(25 * 60);
  };

  return (
    <article className="flex flex-col items-center justify-center w-full p-6 overflow-hidden">
      <header className="flex flex-col items-center mb-6">
        <h2 className="font-timer text-neon-focus text-3xl uppercase drop-shadow-[0_0_5px_rgba(0,240,255,0.5)]">
          Current Target
        </h2>
        <p className="text-text-muted text-xl mt-1">{activeTask?.title}</p>
      </header>

      <div className="flex flex-col items-center justify-center border-8 border-neon-focus rounded-full h-100 w-100">
        <TimerDisplay />

        <div>
          <button className="bg-accent-purple">Test</button>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <button
          type="button"
          onClick={handleToggle}
          // className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 font rounded-2xl text-2xl font-timer uppercase font-bold hover:opacity-85 cursor-pointer"
          className={`inline-flex items-center justify-center gap-2 px-10 py-4 rounded-2xl text-xl font-timer uppercase font-bold hover:opacity-85 cursor-pointer ${
            isRunning ? 'bg-surface-2' : 'bg-white text-black'
          }`}
        >
          {isRunning ? <Pause /> : <Play />}
          {isRunning ? 'Pause' : 'Start'}
        </button>
      </div>
    </article>
  );
};

export default FocusTimer;
