// const ticketData = [
//     { id: "10322591", source: "API", message: "se cerró el juego", timestamp: "07:30 PM" },
//     { id: "10322587", source: "API", message: "se cerró el estúpido juego", timestamp: "07:30 PM" },
//     { id: "10322586", source: "API", message: "the game is backed", timestamp: "07:30 PM" },
//   ];

//   metrics: [
//     { label: "Volume", value: "8,102" },
//     { label: "Sentiment", value: "5%" },
//     { label: "Percent of Tickets", value: "14%" },
//     { label: "CSAT", value: "94%" },
//   ],
export const buildGraphData = (currentTrend, previousTrend) =>
  currentTrend.map((item, index) => ({
    date: new Date(item.date).toLocaleDateString(), // Ensure date is formatted as a string
    currentValue: item.value,
    previousValue: previousTrend[index]?.value || null,
  }));

export const modifyTicketData = (ticketData) => {
  return ticketData.randomConversations.map((ticket) => ({
    ticketId: ticket.id,
    source: ticket.source.charAt(0).toUpperCase() + ticket.source.slice(1), // Capitalize first letter,
    message: ticket.message,
    timestamp: new Date(ticket.timestamp).toLocaleString('en-US', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).replace(',', ' -'), // Format as "Oct 07 - hh:mm AM/PM"
  }));
};

export const modifyMetricsData = (data) => {
  return [
    { label: 'Volume', value: data.totalConversations },
    { label: 'NSAT', value: parseInt(data.nsatPercentage, 10) + '%' },
    { label: 'Percent of Tickets', value: '14%' },
    { label: 'Sentiment', value: '5%' },
  ];
};
