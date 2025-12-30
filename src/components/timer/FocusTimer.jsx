import TimerDisplay from './TimerDisplay';
import SessionDisplay from './SessionDisplay';
import TimerSettings from './TimerSettings';
import Modal from '../ui/Modal';
import { Play, Pause, CircleSmall, Timer } from 'lucide-react';
import { useTaskContext } from '../../context/TaskContext';
import { useTimerControl } from '../../context/TimerContext';
import { useModeContext } from '../../context/ModeContext';
import { useSettingsContext } from '../../context/SettingsContext';
import { PRIORITY_COLORS, MODES } from '../../services/utils/constants';
import { useState } from 'react';

const FocusTimer = () => {
  const {
    isRunning,
    hasStarted,
    userStartedRef,
    start,
    pause,
    handleTimerReset,
    handleEndMode,
  } = useTimerControl();
  const { activeTask } = useTaskContext();
  const { mode } = useModeContext();
  const { timerSettings } = useSettingsContext();
  const [showSettings, setShowSettings] = useState(false);

  const repeatCount = parseInt(timerSettings.REPEAT.value);

  const handleToggle = () => {
    if (isRunning) {
      pause();
    } else if (!hasStarted) {
      start(timerSettings[mode].value);
      userStartedRef.current = true;
    } else {
      start();
    }
  };

  return (
    <article
      className={`${MODES[mode]} relative flex flex-col items-center w-full p-8`}
    >
      {/* Settings Button */}
      <button
        onClick={() => setShowSettings(true)}
        disabled={isRunning}
        className="absolute top-5 left-8 hover:opacity-85 cursor-pointer text-text-base bg-surface-2/50 p-3 rounded-full"
      >
        <Timer size={30} />
      </button>

      {/* Settings Modal */}
      <Modal isOpen={showSettings} onClose={() => setShowSettings(false)}>
        <TimerSettings onClose={() => setShowSettings(false)} />
      </Modal>

      {/* Header */}
      <header className="flex flex-col items-center mb-12 min-h-20">
        <h2 className="font-timer text-neon-focus text-3xl uppercase mb-2 drop-shadow-neon-focus break:text-neon-break break:drop-shadow-neon-break">
          Current Target
        </h2>
        {activeTask && (
          <p className="text-lg text-text-base/90 mt-2 flex items-center gap-2">
            <CircleSmall
              className={`mr-1 opacity-80 shrink-0 rounded-full ${
                PRIORITY_COLORS[activeTask.priority]
              }`}
              size={20}
            />
            {activeTask.title}
          </p>
        )}
      </header>

      {/* Timer Display */}
      <div className="relative flex items-center justify-center w-[380px] h-[380px]">
        <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center">
          <p className="font-timer tracking-wider text-text-muted text-xs select-none">
            {isRunning
              ? mode === 'FOCUS'
                ? 'FLOW STATE'
                : mode === 'BREAK'
                ? 'BREAK TIME'
                : mode === 'RECOVER'
                ? 'RECOVER TIMER'
                : 'SESSION'
              : 'READY'}
          </p>

          <TimerDisplay />

          {/* Mode Indicator */}
          <div className="flex p-1 bg-black/40 rounded-full border border-white/5">
            <p
              className={`px-4 py-2 text-xs font-semibold rounded-full select-none ${
                mode === 'FOCUS'
                  ? 'bg-text-base/15 text-neon-focus'
                  : 'text-text-muted'
              }`}
            >
              FOCUS
            </p>
            <p
              className={`px-4 py-2 text-xs font-semibold rounded-full select-none ${
                mode === 'BREAK' || mode === 'RECOVER'
                  ? 'bg-text-base/15 text-neon-break'
                  : 'text-text-muted'
              }`}
            >
              BREAK
            </p>
          </div>
        </div>
      </div>

      {/* Session Display */}
      <div className="mt-6">
        <SessionDisplay
          isRunning={isRunning}
          mode={mode}
          repeatCount={repeatCount}
        />
      </div>

      {/* Control Buttons */}
      <div className="mt-8 flex flex-col gap-6 w-full max-w-xs">
        <button
          type="button"
          onClick={handleToggle}
          className={`w-full inline-flex items-center justify-center gap-2 px-10 py-3 rounded-2xl text-xl font-timer uppercase font-bold hover:opacity-85 cursor-pointer transition-opacity ${
            isRunning
              ? 'bg-surface-1 border border-neon-focus text-neon-focus break:border-neon-break break:text-neon-break'
              : 'bg-text-base text-primary-dark'
          }`}
        >
          {isRunning ? <Pause /> : <Play />}
          {isRunning ? 'Pause' : hasStarted ? 'Resume' : 'Start'}
        </button>

        {!isRunning && hasStarted && (
          <div className="flex gap-3 w-full">
            <button
              onClick={() => handleEndMode()}
              className="flex-1 bg-surface-1 border border-text-base py-3 rounded-2xl font-bold cursor-pointer hover:opacity-85 transition-opacity"
            >
              END {mode}
            </button>
            <button
              onClick={() => handleTimerReset()}
              className="flex-1 bg-surface-1 border border-red-500 text-red-500 py-3 rounded-2xl font-bold cursor-pointer hover:opacity-85 transition-opacity"
            >
              QUIT
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

export default FocusTimer;
