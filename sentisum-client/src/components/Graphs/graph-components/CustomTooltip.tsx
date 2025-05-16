import React from 'react';
import { TooltipProps } from 'recharts'; // Import types from recharts

// Helper function to format dates as "DD MON"
const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0'); // Ensure 2-digit day
  const month = date.toLocaleString('default', { month: 'short' }); // Get short month name
  return `${day} ${month}`;
};

// Helper function to subtract days from a date
const subtractDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
};

// Define the interface for the component's props
interface CustomTooltipProps extends TooltipProps<number, string> {
  isDragging?: boolean; // Optional boolean to indicate if dragging is happening
  graphContainerRef: React.RefObject<HTMLDivElement>; // Ref for the graph container
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  coordinate,
  isDragging = false,
  graphContainerRef,
}) => {
  if (active && payload && payload.length && !isDragging) {
    const current = payload.find((p) => p.dataKey === 'currentValue');
    const previous = payload.find((p) => p.dataKey === 'previousValue');
    const percentageChange =
      previous && current
        ? (
            (((current.value || 0) - (previous.value || 0)) /
              (previous.value || 1)) *
            100
          ).toFixed(2)
        : null;

    // Format dates manually
    const currentDate = formatDate(
      new Date(payload[0]?.payload?.date.split('/').reverse().join('/'))
    ); // Convert dd/mm/yyyy to yyyy-mm-dd and format as DD MON
    const previousDate = formatDate(
      subtractDays(
        new Date(payload[0]?.payload?.date.split('/').reverse().join('/')),
        7
      )
    ); // Subtract 7 days for previous date

    // Get container dimensions
    const containerWidth = graphContainerRef.current?.offsetWidth || 0; // Use the ref to get the container width

    // Tooltip dimensions
    const tooltipWidth = 200; // Approximate width of the tooltip
    const tooltipHeight = 100; // Approximate height of the tooltip

    // Calculate adjusted positions to prevent overflow
    let adjustedLeft = (coordinate?.x || 0) - tooltipWidth / 2;
    let adjustedTop = (coordinate?.y || 0) - tooltipHeight - 10; // Position above the point with some margin

    // Clamp the tooltip within the container boundaries
    if (adjustedLeft < 0) adjustedLeft = 0; // Prevent overflow on the left
    if (adjustedLeft + tooltipWidth > containerWidth)
      adjustedLeft = containerWidth - tooltipWidth; // Prevent overflow on the right
    if (adjustedTop < 0) adjustedTop = (coordinate?.y || 0) + 10; // If above boundary, position below the point

    return (
      <div
        className="bg-gray-800 text-white p-4 rounded-lg shadow-lg"
        style={{
          zIndex: 200,
          position: 'absolute',
          top: `${adjustedTop}px`,
          left: `${adjustedLeft}px`,
          whiteSpace: 'nowrap',
        }}
      >
        {/* Current Period */}
        <div className="flex items-center mb-2">
          <div
            className="w-5.5 h-0.5 bg-blue-500 mr-2"
            style={{ backgroundColor: '#9CB9FF' }}
          ></div>
          <div>
            <div className="text-sm">
              <span className="font-medium">{currentDate}:</span>{' '}
              {current?.value}
            </div>
            {percentageChange && (
              <div
                className={`text-xs ${
                  parseInt(percentageChange) > 0
                    ? 'text-green-400'
                    : 'text-red-400'
                }`}
              >
                {parseInt(percentageChange) > 0 ? '+' : ''}
                {percentageChange}% from previous period
              </div>
            )}
          </div>
        </div>
        {/* Previous Period */}
        <div className="flex items-center">
          <div className="mr-2" style={{ color: '#9CA3AF' }}>
            ---
          </div>
          <div>
            <div className="text-sm">
              <span className="font-medium">{previousDate}:</span>{' '}
              {previous?.value}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
