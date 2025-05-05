import React from 'react';

const ShimmerUI = ({
  width = '100px',
  height = '50px',
  bgColor = 'bg-gray-300',
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
          className={`animate-pulse ${bgColor} rounded`}
          style={{
            width: width,
            height: height,
          }}
        ></div>
      ))}
    </div>
  );
};

export default ShimmerUI;
