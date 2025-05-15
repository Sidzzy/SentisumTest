import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceArea,
} from 'recharts';
import { buildGraphData } from '../../utils/graphUtils';
import { useModal } from '../../context/ModalContext';
import CustomTooltip from './graph-components/CustomTooltip';

const LineGraphWithDrillDown = ({ graphData }) => {
  const rootData = buildGraphData(
    graphData.currentTrend,
    graphData.previousTrend
  );
  const [data, setData] = useState(rootData);
  const [history, setHistory] = useState([]); // Maintain history of graph states
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(null);
  const [endX, setEndX] = useState(null);
  const { updateModalData } = useModal();

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.activeLabel); // Capture the starting x-axis value
  };

  const handleMouseMove = (e) => {
    if (isDragging && e.activeLabel) {
      setEndX(e.activeLabel); // Update the ending x-axis value while dragging
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);

    if (startX !== null && endX !== null) {
      // Determine the actual range (smallest to largest)
      const [minX, maxX] = startX < endX ? [startX, endX] : [endX, startX];

      // Save the current state to history before zooming in
      setHistory((prevHistory) => [...prevHistory, data]);

      // Filter the data to include only points between minX and maxX
      const filteredData = data.filter(
        (point) => point.date >= minX && point.date <= maxX
      );
      setData(filteredData);
      updateModalData({
        dateRange: {
          start: new Date(minX.split('/').reverse().join('-')).toISOString(),
          end: new Date(maxX.split('/').reverse().join('-')).toISOString(),
        },
      });
    }

    // Reset start and end points
    setStartX(null);
    setEndX(null);
  };

  const handleBack = () => {
    if (history.length > 0) {
      // Revert to the previous state
      const previousState = history[history.length - 1];
      setData(previousState);
      updateModalData({
        dateRange: {
          start: new Date(
            previousState[0].date.split('/').reverse().join('-')
          ).toISOString(),
          end: new Date(
            previousState[previousState.length - 1].date
              .split('/')
              .reverse()
              .join('-')
          ).toISOString(),
        },
      });
      // Remove the last state from history
      setHistory((prevHistory) => prevHistory.slice(0, -1));
    }
  };

  const calculateYDomain = (filteredData) => {
    const allValues = filteredData.flatMap((point) => [
      point.currentValue,
      point.previousValue,
    ]);
    const minY = Math.min(...allValues);
    const maxY = Math.max(...allValues);
    const margin = (maxY - minY) * 0.1; // Add 10% margin to both top and bottom

    // Calculate consistent step size for labels divisible by 10
    const range = maxY - minY;
    const step = Math.ceil(range / 5 / 10) * 10; // Ensure step is divisible by 10
    const adjustedMinY = Math.floor((minY - margin) / step) * step;
    const adjustedMaxY = Math.ceil((maxY + margin) / step) * step;

    return [adjustedMinY, adjustedMaxY];
  };
  // Calculate the y-axis domain dynamically based on the current data
  const yDomain = calculateYDomain(data);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          style={{ cursor: isDragging ? 'crosshair' : 'pointer' }}
          onMouseDown={(e) => {
            handleMouseDown(e);
          }}
          onMouseMove={(e) => {
            handleMouseMove(e);
          }}
          onMouseUp={(e) => {
            handleMouseUp(e);
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis
            dataKey="date"
            stroke="#6b7280"
            tick={{
              fontSize: 12,
              fill: '#374151',
              fontFamily: 'Arial, sans-serif',
            }}
            tickFormatter={(date) => {
              const [day, month] = date.includes('-')
                ? date.split('-').reverse()
                : date.split('/');
              const monthNames = [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ];
              return `${day} ${monthNames[parseInt(month, 10) - 1]}`;
            }}
            tickLine={false}
            axisLine={{ stroke: '#d1d5db' }}
          />

          <YAxis
            domain={yDomain}
            stroke="#6b7280"
            tick={{
              fontSize: 12,
              fill: '#374151',
              fontFamily: 'Arial, sans-serif',
            }}
            tickLine={false}
            tickFormatter={(value, index) => {
              return index === 0 ? '' : value;
            }}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip isDragging={isDragging} />} />
          <defs>
            <linearGradient id="currentTrendGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9CB9FF" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#4F46E5" stopOpacity={0} />
            </linearGradient>
          </defs>

          <Area
            type="monotone"
            dataKey="currentValue"
            stroke="#9CB9FF"
            fill="url(#currentTrendGradient)"
            strokeWidth={2}
          />

          <Area
            type="monotone"
            dataKey="previousValue"
            stroke="#9CA3AF"
            fill="url(#previousTrendGradient)"
            strokeWidth={2}
            strokeDasharray="5 5"
          />

          {isDragging && startX && endX && (
            <ReferenceArea
              x1={startX}
              x2={endX}
              strokeOpacity={0.3}
              fill="#4F46E5"
              fillOpacity={0.2}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
      {history.length > 0 && (
        <button
          onClick={handleBack}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all"
        >
          ← Back
        </button>
      )}
    </div>
  );
};

export default LineGraphWithDrillDown;