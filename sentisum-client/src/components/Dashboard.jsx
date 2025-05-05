import React, { useEffect, useState } from 'react';
import StaticGrid from './StaticGrid';
import Card from './Cards/Card';
import TableCard from './Cards/TableCard';
import { getDashboardData } from '../../apis/dashboardAPI';
import { getCardsLayout } from '../utils/cardUtils';
import { ModalProvider, useModal } from '../context/ModalContext';
import GraphWithConversationModal from './Modal/GraphWithConversationModal';
import ShimmerUI from './ShimmerUI';

const DashboardContent = () => {
  const [dashboard, setDashboard] = useState(null);
  const [cards, setCards] = useState(null);
  const [dateRange, setDateRange] = useState({});
  const [layout, setLayout] = useState([]);
  const [loading, setLoading] = useState(true);
  const { modalState, closeModal } = useModal();

  useEffect(() => {
    getDashboardData(setDashboard);
  }, []);

  useEffect(() => {
    if (dashboard) {
      const cards = dashboard.dashboard.cards.filter(
        (card) => card.type === 'H'
      );
      setLayout(getCardsLayout(cards));
      setCards(cards);
      setDateRange(dashboard.dashboard.dateRange);
    }
  }, [dashboard]);

  useEffect(() => {
    if (
      cards &&
      layout &&
      cards.length !== 0 &&
      cards.length === layout.length
    ) {
      setLoading(false);
    }
  }, [layout, cards]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {!loading ? (
        <StaticGrid layout={layout} onLayoutChange={setLayout}>
          {cards.map((card) => (
            <div key={card.id}>
              <Card title={card.title}>
                {card.type === 'H' && (
                  <TableCard
                    data={card.data}
                    columns={card.columns}
                    dateRange={dateRange}
                  />
                )}
              </Card>
            </div>
          ))}
        </StaticGrid>
      ) : (
        <ShimmerUI
          width="700px"
          height="400px"
          numberOfShimmers={2}
          alignment="horizontal"
        />
      )}

      {/* Render the modal */}
      {modalState.isOpen && (
        <GraphWithConversationModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          graphData={modalState.graphData}
          ticketData={modalState.ticketData}
          title={modalState.title}
          description={modalState.description}
          metrics={modalState.metrics}
          dateRange={modalState.dateRange}
        />
      )}
    </div>
  );
};

const Dashboard = () => (
  <ModalProvider>
    <DashboardContent />
  </ModalProvider>
);

export default Dashboard;
