import React, { useEffect } from 'react';
import LineGraphWithDrillDown from '../Graphs/LineGraphWithDrillDown';
import { getConversationData } from '../../../apis/conversationAPI';
import { modifyTicketData, modifyMetricsData } from '../../utils/graphUtils';
import ShimmerUI from '../ShimmerUI';

const dataCache = new Map();

async function fetchData(setTicketData, setMetrics, dateRange) {
  const dateRangeKey = `${dateRange.start.split('T')[0]}-${dateRange.end.split('T')[0]}`;

  if (!dataCache.has(dateRangeKey)) {
    const newData = await getConversationData(dateRange.start, dateRange.end);
    dataCache.set(dateRangeKey, newData);
  }

  const data = dataCache.get(dateRangeKey);
  setTicketData(modifyTicketData(data));
  setMetrics(modifyMetricsData(data));
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
  useEffect(() => {
    fetchData(setTicketData, setMetrics, dateRange);
  }, [dateRange]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 fixed inset-0 z-20 bg-black/50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-3/5 h-3/5 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <div>
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            ✖
          </button>
        </div>

        {/* Content */}
        <div className="flex h-full overflow-auto">
          {/* Left Section: Graph and Metrics */}
          <div className="w-2/3 p-4 border-r">
            {/* Metrics */}
            <div className="grid grid-cols-4 gap-4 mb-4 w-full">
              {metrics ? (
                metrics.map((metric, index) => (
                  <div
                    key={index}
                    className="p-2 bg-gray-100 rounded-lg text-center"
                  >
                    <h3 className="text-lg font-bold">{metric.value}</h3>
                    <p className="text-sm text-gray-500">{metric.label}</p>
                  </div>
                ))
              ) : (
                <ShimmerUI
                  width="100%"
                  numberOfShimmers={4}
                  alignment="horizontal"
                />
              )}
            </div>

            {/* Graph */}
            <div className="h-64">
              <LineGraphWithDrillDown graphData={graphData} />
            </div>
          </div>

          {/* Right Section: Ticket Data */}
          <div className="w-1/3 p-4 mb-10 overflow-auto">
            <h3 className="text-md font-semibold mb-2">Conversations</h3>
            <ul>
              {ticketData ? (
                ticketData.map((ticket, index) => (
                  <li key={index} className="mb-4 border-b pb-2">
                    <div className="text-sm text-gray-500">
                      Ticket ID: {ticket.id}
                    </div>
                    <div className="text-sm text-gray-500">
                      Source: {ticket.source}
                    </div>
                    <div className="text-sm">{ticket.message}</div>
                    <div className="text-xs text-gray-400">
                      {ticket.timestamp}
                    </div>
                  </li>
                ))
              ) : (
                <ShimmerUI width="100%" height="75px" numberOfShimmers={5} />
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphWithConversationModal;
