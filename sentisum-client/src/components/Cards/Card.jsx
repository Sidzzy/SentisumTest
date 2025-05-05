import React from 'react';

const Card = ({ title, children }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4 flex flex-col h-full">
      <div className="text-lg font-bold mb-2 cursor-move drag-handle">
        {title}
      </div>
      {children}
    </div>
  );
};

export default Card;
