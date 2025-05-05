import React from 'react';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { buildGraphData } from '../../utils/graphUtils';

const StaticGraphForCardRow = ({ currentTrend, previousTrend }) => {
  // Combine currentTrend and previousTrend into a single dataset
  const data = buildGraphData(currentTrend, previousTrend);
  return (
    <div className="w-60 h-20 mt-10">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          {/* <CartesianGrid strokeDasharray="3 3" vertical={false} /> */}
          <XAxis dataKey="date" hide />
          <YAxis hide />
          <Tooltip />
          {/* Current Trend (Solid Line) */}
          <Line
            type="monotone"
            dataKey="currentValue"
            stroke="#4F46E5" // Blue color
            strokeWidth={2}
            dot={false}
          />
          {/* Previous Trend (Dashed Line) */}
          <Line
            type="monotone"
            dataKey="previousValue"
            stroke="#9CA3AF" // Gray color
            strokeWidth={2}
            dot={false}
            strokeDasharray="5 5" // Dashed line
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StaticGraphForCardRow;
