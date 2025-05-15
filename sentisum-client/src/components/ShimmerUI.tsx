import React from 'react';

// Define the interface for the component's props
interface ShimmerUIProps {
  width?: string; // Width of each shimmer (default: '100px')
  height?: string; // Height of each shimmer (default: '50px')
  bgColor?: string; // Background color class for the shimmer (default: 'bg-gray-300')
  shimmerColor?: string; // Shimmer animation color class (default: 'bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300')
  numberOfShimmers?: number; // Number of shimmer elements to render (default: 1)
  alignment?: 'vertical' | 'horizontal'; // Alignment of the shimmer elements (default: 'vertical')
}

const ShimmerUI: React.FC<ShimmerUIProps> = ({
  width = '100px',
  height = '50px',
  bgColor = 'bg-gray-300',
  shimmerColor = 'bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300',
  numberOfShimmers = 1,
  alignment = 'vertical',
}) => {
  return (
    <div
      className={`flex ${alignment === 'vertical' ? 'flex-col' : 'flex-row'} gap-4`}
    >
      {Array.from({ length: numberOfShimmers }).map((_, index) => (
        <div
          key={index}
          className={`relative overflow-hidden rounded ${bgColor}`}
          style={{
            width: width,
            height: height,
          }}
        >
          <div
            className={`absolute inset-0 animate-shimmer ${shimmerColor}`}
            style={{
              backgroundSize: '200% 100%',
            }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default ShimmerUI;
