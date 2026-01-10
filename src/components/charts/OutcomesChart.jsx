import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

// Custom tooltip component with theme styling
const CustomTooltip = ({ active, payload, mode }) => {
  if (active && payload && payload.length) {
    const borderColor =
      mode === 'BREAK' || mode === 'RECOVER'
        ? 'border-neon-break/50'
        : 'border-neon-focus/50';
    const shadowColor =
      mode === 'BREAK' || mode === 'RECOVER'
        ? 'shadow-neon-glow-break-small'
        : 'shadow-neon-glow-focus-small';

    return (
      <div
        className={`bg-surface-1 ${borderColor} ${shadowColor} border rounded-lg p-3`}
      >
        <p className="text-text-base text-sm font-semibold">
          {payload[0].name}
        </p>
        <p className="text-text-muted text-xs mt-1">
          {payload[0].value} sessions
        </p>
      </div>
    );
  }
  return null;
};

const OutcomesChart = ({ data, mode = 'FOCUS' }) => {
  // Define colors based on mode - 3 shades from bright to darker
  const colors =
    mode === 'BREAK' || mode === 'RECOVER'
      ? ['#1aff99', '#14cc7a', '#0d995c'] // Break mode greens
      : ['#00d4ff', '#00a8cc', '#007a99']; // Focus mode blues

  // Handle null/undefined data to prevent errors
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-[250px]">
        <p className="text-text-muted text-sm">No data available</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={(entry) => `${entry.value}`}
            labelLine={{ stroke: '#8892a6' }}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip mode={mode} />} />
          <Legend
            wrapperStyle={{ color: '#8892a6', fontSize: '12px' }}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OutcomesChart;
