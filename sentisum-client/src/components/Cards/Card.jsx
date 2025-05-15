import React from 'react';
import CardsDropdown from './CardsDropdown';

const Card = ({ title, subtitle, children }) => {
  return (
    <div className="bg-white border border-gray-300 bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg shadow-md flex flex-col h-full">
      <div className="text-lg mb-2 cursor-move drag-handle p-4 hover:bg-gray-200  tracking-wide flex justify-between">
        <span className="bg-gradient-to-r from-gray-500 to-gray-700 text-transparent bg-clip-text">
          <span
            className="uppercase font-bold"
            style={{ fontFamily: 'Arial, sans-serif', letterSpacing: '1px' }}
          >
            {title}
          </span>
          <div className="">
            {subtitle && (
              <p className="mt-1 text-gray-500 text-sm">{subtitle}</p>
            )}
          </div>
        </span>
        <CardsDropdown />
      </div>
      {children}
    </div>
  );
};

export default Card;
