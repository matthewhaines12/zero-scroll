import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
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
          {payload[0].value} minutes
        </p>
        <p className="text-text-muted text-xs mt-1">
          {payload[0].payload.hourBucket}
        </p>
      </div>
    );
  }
  return null;
};

const FocusHoursChart = ({ data, mode = 'FOCUS' }) => {
  // Define bar color based on current mode
  const barColor =
    mode === 'BREAK' || mode === 'RECOVER' ? '#1aff99' : '#00d4ff';

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
        <BarChart
          data={data}
          margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" opacity={0.1} />
          <XAxis
            dataKey="hourBucket"
            stroke="#8892a6"
            tick={{ fill: '#8892a6', fontSize: 12 }}
            interval="preserveStartEnd"
            label={{
              value: 'Hours',
              position: 'insideBottom',
              offset: -5,
              fill: '#8892a6',
              fontSize: 12,
            }}
          />
          <YAxis
            stroke="#8892a6"
            tick={{ fill: '#8892a6', fontSize: 12 }}
            label={{
              value: 'Minutes',
              angle: -90,
              position: 'insideLeft',
              fill: '#8892a6',
              fontSize: 12,
              style: { textAnchor: 'middle' },
            }}
          />
          <Tooltip
            content={<CustomTooltip mode={mode} />}
            cursor={{
              fill: barColor,
              opacity: 0.1,
            }}
          />
          <Bar dataKey="minutes" fill={barColor} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FocusHoursChart;
