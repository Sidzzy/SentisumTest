import React, { useEffect, useState } from 'react';
import StaticGrid from './StaticGrid';
import Card from './Cards/Card';
import TableCard from './Cards/TableCard';
import { getDashboardData } from '../../apis/dashboardAPI';
import { getCardsLayout } from '../utils/cardUtils';
import { ModalProvider, useModal } from '../context/ModalContext';
import GraphWithConversationModal from './Modal/GraphWithConversationModal';
import ShimmerUI from './ShimmerUI';
import MonthlyTarget from './Cards/MonthlyTargetCard';
import {
  LayoutItem,
  DateRange,
  DashboardCard,
  DashboardData,
} from '../interfaces/dashboardInterface';

const DashboardContent: React.FC = () => {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [cards, setCards] = useState<DashboardCard[] | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const [layout, setLayout] = useState<LayoutItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { modalState, closeModal } = useModal();

  useEffect(() => {
    getDashboardData(setDashboard);
  }, []);

  useEffect(() => {
    if (dashboard) {
      const filteredCards = dashboard.dashboard.cards.filter(
        (card) => card.type === 'H' || card.type === 'MT'
      );
      setLayout(getCardsLayout(filteredCards));
      setCards(filteredCards);
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
    <div className="p-10 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {!loading ? (
        <StaticGrid
          layout={layout}
          onLayoutChange={(newLayout) => setLayout(newLayout as LayoutItem[])}
        >
          {cards?.map((card) => (
            <div key={card.id}>
              <Card title={card.title} subtitle={card.subtitle}>
                {card.type === 'H' && card.data && card.columns && (
                  <TableCard
                    data={card.data}
                    columns={card.columns}
                    dateRange={dateRange!}
                  />
                )}
                {card.type === 'MT' && <MonthlyTarget />}
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
          title={modalState.title}
          description={modalState.description}
          dateRange={modalState.dateRange}
        />
      )}
    </div>
  );
};

const Dashboard: React.FC = () => (
  <ModalProvider>
    <DashboardContent />
  </ModalProvider>
);

export default Dashboard;
