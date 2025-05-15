import React from 'react';
import ShimmerUI from '../ShimmerUI';
import { Metrics } from '../../interfaces/dashboardInterface';

// Define the interface for the component's props
interface MetricsCardSmallProps {
  metrics: Metrics | null; // Array of metrics or null (if loading)
}

const MetricsCardSmall: React.FC<MetricsCardSmallProps> = ({ metrics }) => {
  return (
    <div
      className="flex overflow-x-auto overflow-y-hidden gap-6 h-50"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {metrics ? (
        Object.entries(metrics).map(([key, value], index) => (
          <div
            key={index}
            className="min-w-[10rem] h-30 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-center items-center border border-gray-200"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              {value}
            </h3>
            <p className="text-sm text-gray-500">{key}</p>
          </div>
        ))
      ) : (
        <ShimmerUI width="100%" numberOfShimmers={4} alignment="horizontal" />
      )}
    </div>
  );
};

export default MetricsCardSmall;
