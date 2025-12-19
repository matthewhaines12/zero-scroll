import { useTimerState } from '../../context/TimerContext';
import { TIMER_LENGTH } from '../../services/utils/constants';

const TimerDisplay = () => {
  const { remaining } = useTimerState();

  const totalTime = TIMER_LENGTH;
  const size = 420;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  const progress = remaining / totalTime;
  const strokeDashoffset = circumference * (1 - progress);

  // Converts remaining time in secconds to Minutes:Seconds
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-center ">
      <svg
        width={size}
        height={size}
        className="absolute pointer-events-none"
        style={{ transform: 'rotate(-90deg)' }}
      >
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-400"
        />

        {/* Foreground circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="text-neon-focus break:text-neon-break"
        />
      </svg>

      <h2 className="font-timer text-8xl">{formatTime(remaining)}</h2>
    </div>
  );
};

export default TimerDisplay;
