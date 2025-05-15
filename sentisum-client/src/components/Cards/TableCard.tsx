import React from 'react';
import StaticGraphForCardRow from '../Graphs/StaticGraphForCardRow';
import { useModal } from '../../context/ModalContext';
import { getTrendChangePercentage } from '../../utils/cardUtils';
import { DateRange, TableDataItem } from '../../interfaces/dashboardInterface';

interface TableCardProps {
  data: TableDataItem[]; // Array of data items
  columns: string[]; // Array of column names
  dateRange: DateRange; // Date range object
}

const TableCard: React.FC<TableCardProps> = ({ data, columns, dateRange }) => {
  const { openModal } = useModal();

  const handleRowClick = (item: TableDataItem) => {
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
    <div className="p-4 pt-0 w-full h-full overflow-auto">
      <table className="w-full border-collapse rounded-lg table-fixed">
        <thead className="z-10 rounded-xl">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="py-3 px-4 text-sm font-medium capitalize text-gray-600 text-left border-b border-gray-200"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            const trendChange = getTrendChangePercentage(item);
            return (
              <tr
                key={index}
                className={`transition-all duration-200 cursor-pointer ${
                  index !== data.length - 1 ? 'border-b border-gray-200' : ''
                } hover:bg-white hover:shadow-lg`}
                onClick={() => handleRowClick(item)}
              >
                <td className="py-3 px-4 text-gray-800">{item.name}</td>
                <td className="py-3 px-6 text-gray-800">{item.currentValue}</td>
                <td
                  className={`pr-4 flex grow items-center space-x-2 ${
                    trendChange <= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  <span className="text-lg">{trendChange > 0 ? '▲' : '▼'}</span>
                  <span className="font-medium">
                    {Math.ceil(Math.abs(trendChange))}%
                  </span>
                  <div className="flex-grow">
                    <StaticGraphForCardRow
                      currentTrend={item.currentTrend}
                      previousTrend={item.previousTrend}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableCard;
