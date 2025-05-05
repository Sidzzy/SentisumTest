import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceArea,
} from 'recharts';
import { buildGraphData } from '../../utils/graphUtils';
import { useModal } from '../../context/ModalContext';

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

  return (
    <div className="w-full h-full flex flex-col items-center">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="currentValue"
            stroke="#4F46E5" // Blue color
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="previousValue"
            stroke="#9CA3AF" // Gray color
            strokeWidth={2}
            dot={false}
            strokeDasharray="5 5" // Dashed line
          />
          {/* Highlight the selected range */}
          {isDragging && startX && endX && (
            <ReferenceArea
              x1={startX}
              x2={endX}
              strokeOpacity={0.3}
              fill="#4F46E5"
              fillOpacity={0.2}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
      {/* Back Button */}
      {history.length > 0 && (
        <button
          onClick={handleBack}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition-colors"
        >
          ← Back
        </button>
      )}
    </div>
  );
};

export default LineGraphWithDrillDown;
