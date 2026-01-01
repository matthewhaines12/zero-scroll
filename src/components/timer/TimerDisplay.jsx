import { useTimerState } from '../../context/TimerContext';

const SIZE = 380;
const STROKE_WIDTH = 10;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CENTER = SIZE / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// Converts remaining time in secconds to Minutes:Seconds
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs
    .toString()
    .padStart(2, '0')}`;
};

const TimerDisplay = () => {
  const { remaining, totalDuration } = useTimerState();

  const totalTime = totalDuration;
  const progress = remaining / totalTime;
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  return (
    <div className="flex items-center justify-center ">
      <svg
        width={SIZE}
        height={SIZE}
        className="absolute pointer-events-none"
        style={{ transform: 'rotate(-90deg)' }}
      >
        {/* Background circle */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          stroke="currentColor"
          strokeWidth={STROKE_WIDTH}
          fill="none"
          className="text-gray-400"
        />

        {/* Foreground circle */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          stroke="currentColor"
          strokeWidth={STROKE_WIDTH}
          fill="none"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={strokeDashoffset}
          className="text-neon-focus break:text-neon-break"
        />
      </svg>

      <h2 className="font-timer text-8xl select-none">
        {formatTime(remaining)}
      </h2>
    </div>
  );
};

export default TimerDisplay;
