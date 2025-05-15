import React from 'react';
import ShimmerUI from './ShimmerUI';
import { TicketData } from '../interfaces/dashboardInterface';

// Define the interface for the component's props
interface ConversationsProps {
  ticketData: TicketData[] | null; // Array of ticket data or null (if loading)
}

const Conversations: React.FC<ConversationsProps> = ({ ticketData }) => {
  return (
    <div className="w-2/5 p-6 overflow-auto bg-white shadow-md rounded-lg">
      <h3 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">
        Conversations
      </h3>
      <ul>
        {ticketData ? (
          ticketData.map((ticket, index) => (
            <li
              key={index}
              className="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
            >
              <div className="text-sm text-gray-700 mb-1">
                <span className="font-semibold">Ticket ID:</span>{' '}
                {ticket.ticketId}
              </div>
              <div className="text-sm text-gray-700 mb-1">
                <span className="font-semibold">Source:</span> {ticket.source}
              </div>
              <div className="text-base text-gray-800 mt-2 italic">
                {ticket.message}
              </div>
              <div className="text-xs text-gray-500 mt-2">
                {ticket.timestamp ? ticket.timestamp : 'Invalid Date'}
              </div>
            </li>
          ))
        ) : (
          <ShimmerUI width="100%" height="75px" numberOfShimmers={5} />
        )}
      </ul>
    </div>
  );
};

export default Conversations;
