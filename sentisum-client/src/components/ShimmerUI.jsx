import React from 'react';

const ShimmerUI = ({
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
