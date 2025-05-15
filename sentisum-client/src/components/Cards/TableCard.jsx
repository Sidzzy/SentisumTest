import React from 'react';
import StaticGraphForCardRow from '../Graphs/StaticGraphForCardRow';
import { useModal } from '../../context/ModalContext';

const TableCard = ({ data, columns, dateRange }) => {
  const { openModal } = useModal();

  const handleRowClick = (item) => {
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
    <div className="p-4 w-full h-full overflow-auto">
      <table className="w-full border-collapse rounded-lg">
        <thead className="sticky top-0 z-10 rounded-xl ">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="py-3 px-4 text-sm font-medium capitalize text-gray-600  text-left border-b border-gray-200"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className={`transition-all duration-200 cursor-pointer ${
                index !== data.length - 1 ? 'border-b border-gray-200' : ''
              } hover:bg-white hover:shadow-lg`}
              onClick={() => handleRowClick(item)}
            >
              <td className="py-3 px-4 text-gray-800">
                {item.name}
              </td>
              <td className="py-3 px-4 text-gray-800">
                {item.currentValue}
              </td>
              <td
                className={`py-3 px-4 flex items-center gap-2 space-x-2 ${
                  item.change > 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                <span className="text-lg">
                  {item.change > 0 ? '▲' : '▼'}
                </span>
                <span className="font-medium">{Math.abs(item.change)}</span>
                <div className="">
                  <StaticGraphForCardRow
                    currentTrend={item.currentTrend}
                    previousTrend={item.previousTrend}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableCard;