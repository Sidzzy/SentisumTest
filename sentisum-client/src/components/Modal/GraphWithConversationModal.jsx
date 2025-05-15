import React, { useEffect } from 'react';
import LineGraphWithDrillDown from '../Graphs/LineGraphWithDrillDown';
import { getConversationData } from '../../../apis/conversationAPI';
import { modifyTicketData, modifyMetricsData } from '../../utils/graphUtils';
import Conversations from '../Conversations';
import MetricsCardSmall from '../Cards/MetricsCardSmall';

const dataCache = new Map();

async function fetchData(setTicketData, setMetrics, dateRange, graphData) {
  setTicketData(null);
  setMetrics(null);
  const dateRangeKey = `${dateRange.start.split('T')[0]}-${dateRange.end.split('T')[0]}`;

  if (!dataCache.has(dateRangeKey)) {
    const newData = await getConversationData(dateRange.start, dateRange.end);
    dataCache.set(dateRangeKey, newData);
  }

  const data = dataCache.get(dateRangeKey);
  setTimeout(() => {
    setTicketData(modifyTicketData(data));
    setMetrics(modifyMetricsData(data, graphData));
  }, 100); // Simulate loading delay
}

const GraphWithConversationModal = ({
  isOpen,
  onClose,
  graphData,
  title,
  description,
  dateRange,
}) => {
  const [ticketData, setTicketData] = React.useState(null);
  const [metrics, setMetrics] = React.useState(null);
  const [showTooltip, setShowTooltip] = React.useState(true);
  useEffect(() => {
    fetchData(setTicketData, setMetrics, dateRange, graphData);
  }, [dateRange, graphData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-20 bg-black/60 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-2xl w-4/5 h-4/5 overflow-hidden flex flex-col relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex justify-center items-center z-30 hover:bg-gray-100"
        >
          <span className="text-gray-500 hover:text-gray-700 transition-colors text-md">
            ✖
          </span>
        </button>

        {/* Informative Header */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-medium text-gray-800">{title}</h2>
          <p className="text-sm text-gray-600">{description}</p>
        </div>

        {/* Content */}
        <div className="flex h-full overflow-auto">
          {/* Left Section: Graph and Metrics */}
          <div className="w-3/5 p-6 border-r border-gray-200 flex flex-col">
            {/* Metrics */}
            <MetricsCardSmall metrics={metrics} />

            {/* Graph */}
            <div className="h-full w-full mt-8 relative">
              {/* Tooltip */}
              {showTooltip && (
                <div
                  className="absolute -top-10 right-0 bg-gray-50 text-gray-700 px-4 py-2 rounded-lg shadow-md flex items-center animate-slide-in"
                  style={{ animation: 'slideIn 1s ease-out' }}
                >
                  <span className="text-sm">
                    Drag on the graph to drill-down
                  </span>
                  <button
                    onClick={() => setShowTooltip(false)}
                    className="ml-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    ✖
                  </button>
                </div>
              )}
              <div className="h-64 flex justify-center items-center rounded-xl bg-gray-50">
                <LineGraphWithDrillDown graphData={graphData} />
              </div>
            </div>
          </div>
          {/* Right Section: Conversations */}
          <Conversations ticketData={ticketData} />
        </div>
      </div>
    </div>
  );
};

export default GraphWithConversationModal;
