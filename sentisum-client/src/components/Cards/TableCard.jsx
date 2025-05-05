import React from 'react';
import StaticGraphForCardRow from '../Graphs/StaticGraphForCardRow';
import { useModal } from '../../context/ModalContext';

const TableCard = ({ data, columns, dateRange }) => {
  const { openModal } = useModal();

  const handleRowClick = (item) => {
    // Prepare graph data and ticket data for the selected row
    const graphData = {
      currentTrend: item.currentTrend,
      previousTrend: item.previousTrend,
    };

    openModal({
      graphData,
      title: item.name,
      description: 'Breakdown of 50 conversations with Volume',
      dateRange: dateRange,
    });
  };

  return (
    <div className="p-4 bg-white w-full h-full overflow-auto">
      <table className="text-left w-full">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="py-2 text-gray-600 font-medium">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="hover:bg-gray-100 transition-colors duration-200"
              onClick={() => handleRowClick(item)}
            >
              <td className="py-2">{item.name}</td>
              <td className="py-2">{item.currentValue}</td>
              <td
                className={`py-2 flex items-center ${
                  item.change > 0 ? 'text-green-500' : 'text-red-500'
                }`}
              >
                <div className="flex items-center">
                  <span
                    className={`${
                      item.change > 0 ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {item.change > 0 ? '▲' : '▼'}
                  </span>
                  <span className="ml-1">{Math.abs(item.change)}</span>
                </div>
                <StaticGraphForCardRow
                  currentTrend={item.currentTrend}
                  previousTrend={item.previousTrend}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableCard;
