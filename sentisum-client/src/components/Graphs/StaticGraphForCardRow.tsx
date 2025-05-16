import React, { useRef } from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip, YAxis } from 'recharts';
import { buildGraphData } from '../../utils/graphUtils';
import CustomTooltip from './graph-components/CustomTooltip';
import { GraphData } from '../../interfaces/dashboardInterface';

const StaticGraphForCardRow: React.FC<GraphData> = ({
  currentTrend,
  previousTrend,
}) => {
  const graphContainerRef = useRef<HTMLDivElement>(null); // Add a ref for the graph container

  // Combine currentTrend and previousTrend into a single dataset
  const data = buildGraphData(currentTrend, previousTrend);

  // Calculate the y-axis domain dynamically based on the data
  const calculateYDomain = (data) => {
    const allValues = data.flatMap((point) => [
      point.currentValue,
      point.previousValue,
    ]);
    const minY = Math.min(...allValues);
    const maxY = Math.max(...allValues);
    const margin = (maxY - minY) * 0.05; // Add a smaller 5% margin to zoom in further
    return [minY - margin, maxY + margin];
  };

  const yDomain = calculateYDomain(data);

  return (
    <div className="h-20" ref={graphContainerRef}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <Tooltip
            content={
              <CustomTooltip
                graphContainerRef={
                  graphContainerRef as React.RefObject<HTMLDivElement>
                }
              />
            }
          />
          <YAxis domain={yDomain} hide />
          <defs>
            {/* Gradient for Current Trend */}
            <linearGradient
              id="currentTrendGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#9CB9FF" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#4F46E5" stopOpacity={0} />
            </linearGradient>
            {/* Gradient for Previous Trend */}
            <linearGradient
              id="previousTrendGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#9CA3AF" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#9CA3AF" stopOpacity={0} />
            </linearGradient>
          </defs>
          {/* Current Trend (Area with Gradient) */}
          <Area
            type="monotone"
            dataKey="currentValue"
            stroke="#9CB9FF"
            fill="url(#currentTrendGradient)"
            strokeWidth={2}
            isAnimationActive={false}
          />
          {/* Previous Trend (Area with Gradient) */}
          <Area
            type="monotone"
            dataKey="previousValue"
            stroke="#9CA3AF"
            fill="url(#previousTrendGradient)"
            strokeWidth={2}
            strokeDasharray="5 5"
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StaticGraphForCardRow;
