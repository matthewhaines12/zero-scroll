import { useTimerState } from '../../context/TimerContext';

const TimerDisplay = () => {
  const { remaining } = useTimerState();

  // Converts remaining time in secconds to Minutes:Seconds
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  return <h2 className="font-timer text-8xl mb-6">{formatTime(remaining)}</h2>;
};

export default TimerDisplay;
