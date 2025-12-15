const TimerDisplay = ({ time }) => {
  return (
    <div className="flex justify-center items-center font-timer text-8xl border-7 border-neon-focus rounded-full h-100 w-100">
      {time}
    </div>
  );
};

export default TimerDisplay;
