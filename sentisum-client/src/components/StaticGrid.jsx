import React from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import { sanitizeLayoutComingFromGrid } from '../utils/cardUtils';
import { updateLayoutAPI } from '../../apis/layoutAPI';

const StaticGrid = ({ layout, onLayoutChange, children }) => {
  const handleResizeOrDropStop = (layout) => {
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
    >
      {children}
    </GridLayout>
  );
};

export default StaticGrid;
