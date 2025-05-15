import React from 'react';

const Card = ({ title, children }) => {
  return (
    <div className="bg-white border border-gray-300 bg-gradient-to-r from-blue-50 to-white rounded-lg shadow-md flex flex-col h-full">
      <div className="text-lg font-bold mb-2 cursor-move drag-handle p-4 hover:bg-blue-50">
        {title}
      </div>
      {children}
    </div>
  );
};

export default Card;
