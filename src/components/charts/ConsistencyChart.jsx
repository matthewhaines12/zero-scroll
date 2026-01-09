import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { formatChartDate } from '../../services/utils/formateDate';

// Custom tooltip component with theme-aware styling
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
          {payload[0].payload.date}
        </p>
      </div>
    );
  }
  return null;
};

const ConsistencyChart = ({ data, mode = 'FOCUS' }) => {
  // Define line color based on current mode
  const lineColor =
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
        <LineChart
          data={data}
          margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" opacity={0.1} />
          <XAxis
            dataKey="date"
            tickFormatter={formatChartDate}
            stroke="#8892a6"
            tick={{ fill: '#8892a6', fontSize: 12 }}
            interval="preserveStartEnd"
            label={{
              value: 'Date',
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
              stroke: lineColor,
              strokeWidth: 1,
              strokeDasharray: '3 3',
            }}
            label={{
              value: 'Focus Minutes',
              position: 'insideLeft',
              angle: -90,
              fill: '#8a94a6',
              fontSize: 12,
            }}
            labelFormatter={formatChartDate}
          />
          <Line
            type="monotone"
            dataKey="minutes"
            stroke={lineColor}
            strokeWidth={2.5}
            dot={{ r: 3, fill: lineColor, strokeWidth: 0 }}
            activeDot={{
              r: 5,
              fill: lineColor,
              stroke: '#0a0f1a',
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ConsistencyChart;
