const PrevDaysToggle = ({ value, onChange }) => {
  const ranges = [7, 14, 30];

  return (
    <div className="inline-flex gap-1 bg-surface-2 rounded-xl p-1 border border-surface-2">
      {ranges.map((days) => (
        <button
          key={days}
          onClick={() => onChange(days)}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
            value === days
              ? 'bg-neon-focus text-primary-dark shadow-neon-glow-focus-small break:bg-neon-break break:shadow-neon-glow-break-small'
              : 'text-text-muted hover:text-text-base hover:bg-surface-1/50'
          }`}
        >
          {days}d
        </button>
      ))}
    </div>
  );
};

export default PrevDaysToggle;
