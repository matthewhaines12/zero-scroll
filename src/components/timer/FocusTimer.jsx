import TimerDisplay from './TimerDisplay';
import SessionDisplay from './SessionDisplay';
import TimerSettings from './TimerSettings';
import Modal from '../ui/Modal';
import { Play, Pause, CircleSmall, Timer } from 'lucide-react';
import { useTaskContext } from '../../context/TaskContext';
import { useTimerControl } from '../../context/TimerContext';
import { useModeContext } from '../../context/ModeContext';
import {
  PRIORITY_COLORS,
  TIMER_LENGTH,
  MODES,
} from '../../services/utils/constants';
import { useState } from 'react';

const FocusTimer = () => {
  const { isRunning, hasStarted, start, pause, reset } = useTimerControl();
  const { activeTask } = useTaskContext();
  const { mode, setMode } = useModeContext();
  const [showSettings, setShowSettings] = useState(false);

  const handleToggle = () => {
    if (isRunning) {
      pause();
    } else if (!hasStarted) {
      start(TIMER_LENGTH);
    } else {
      start();
    }
  };

  return (
    <article
      className={`${MODES[mode]} relative flex flex-col gap-6 items-center w-full p-6 overflow-hidden`}
    >
      <button
        onClick={() => setShowSettings(true)}
        className="absolute left-6 top-6 hover:opacity-85 cursor-pointer text-text-base bg-surface-1/50 p-2 rounded-full"
      >
        <Timer size={32} />
      </button>

      <Modal isOpen={showSettings} onClose={() => setShowSettings(false)}>
        <TimerSettings onClose={() => setShowSettings(false)}></TimerSettings>
      </Modal>

      <header className="flex flex-col items-center mb-6 min-h-18">
        <h2 className="font-timer text-neon-focus text-3xl uppercase drop-shadow-neon-focus break:text-neon-break break:drop-shadow-neon-break">
          Current Target
        </h2>

        <p className="text-lg text-text-base/90 mt-1 flex items-center gap-2">
          {activeTask && (
            <>
              <CircleSmall
                className={`shrink-0 rounded-full ${
                  PRIORITY_COLORS[activeTask?.priority]
                }`}
                size={20}
              />
              {activeTask?.title}
            </>
          )}
        </p>
      </header>
      <div className="relative flex items-center justify-center w-[420px] h-[420px] ">
        <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center ">
          <p className="font-timer tracking-wider text-text-muted text-xs">
            {isRunning ? 'FLOW STATE' : 'READY'}
          </p>

          <TimerDisplay />

          <div className="flex p-1 bg-black/40 rounded-full border border-white/5">
            <button
              onClick={() => setMode('FOCUS')}
              className={`px-4 py-2 text-xs font-bold rounded-full cursor-pointer
              ${
                mode === 'FOCUS'
                  ? 'bg-white/10 text-neon-focus'
                  : 'text-gray-500 hover:text-text-base'
              }
              `}
            >
              FOCUS
            </button>
            <button
              onClick={() => setMode('BREAK')}
              className={`px-4 py-2 text-xs font-bold rounded-full cursor-pointer
                ${
                  mode === 'BREAK'
                    ? 'bg-white/10 text-neon-break'
                    : 'text-gray-500 hover:text-text-base'
                }
                `}
            >
              BREAK
            </button>
          </div>
        </div>
      </div>

      <SessionDisplay isRunning={isRunning} mode={mode} />
      <div className="mt-2 flex flex-col gap-8">
        <button
          type="button"
          onClick={handleToggle}
          className={`inline-flex items-center justify-center gap-2 px-10 py-4 rounded-2xl text-xl font-timer uppercase font-bold hover:opacity-85 cursor-pointer ${
            isRunning
              ? 'bg-surface-1 border border-neon-focus text-neon-focus break:border-neon-break break:text-neon-break'
              : 'bg-text-base text-primary-dark'
          }`}
        >
          {isRunning ? <Pause /> : <Play />}
          {isRunning ? 'Pause' : hasStarted ? 'Resume' : 'Start'}
        </button>

        {!isRunning && hasStarted && (
          <button
            onClick={() => reset()}
            className="bg-surface-1 border border-text-base  py-4 rounded-2xl font-bold cursor-pointer hover:opacity-85"
          >
            RESET
          </button>
        )}
      </div>
    </article>
  );
};

export default FocusTimer;
