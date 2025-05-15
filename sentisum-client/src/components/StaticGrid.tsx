import React from 'react';
import GridLayout, { Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import { sanitizeLayoutComingFromGrid } from '../utils/cardUtils';
import { updateLayoutAPI } from '../../apis/layoutAPI';
import { LayoutItem } from '../interfaces/dashboardInterface'; // Import the LayoutItem type

// Define the interface for the layout prop

interface StaticGridProps {
  layout: LayoutItem[]; // Array of layout items
  onLayoutChange: (layout: Layout[]) => void; // Callback for layout changes
  children: React.ReactNode; // Children to render inside the grid
}

const StaticGrid: React.FC<StaticGridProps> = ({
  layout,
  onLayoutChange,
  children,
}) => {
  const handleResizeOrDropStop = (layout: Layout[]) => {
    const sanitizedLayout = sanitizeLayoutComingFromGrid(layout);
    updateLayoutAPI(sanitizedLayout);
  };

  return (
    <GridLayout
      className="layout flex"
      layout={layout}
      cols={12}
      rowHeight={50}
      width={window.innerWidth - 30} // Dynamically set to occupy the whole screen width
      onLayoutChange={onLayoutChange}
      onResizeStop={handleResizeOrDropStop} // Triggered when resizing stops
      onDragStop={handleResizeOrDropStop} // Triggered when dragging stops
      draggableHandle=".drag-handle"
      compactType="horizontal" // Enable horizontal compaction
      isResizable={true} // Allow resizing
      isDraggable={true} // Allow dragging
      resizeHandles={['s', 'w', 'e', 'sw', 'se']} // Enable resizing from all borders and corners
    >
      {children}
    </GridLayout>
  );
};

export default StaticGrid;
