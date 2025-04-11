
import React, { useState } from 'react';
import { MoreHorizontal, ArrowUpDown } from 'lucide-react';

interface SectorData {
  id: number;
  name: string;
  iconColor: string;
  avgReturn: number;
  volatility: number;
  correlation: number;
}

interface SectorComparisonTableProps {
  data: SectorData[];
}

type SortField = 'avgReturn' | 'volatility' | 'correlation';
type SortOrder = 'asc' | 'desc';

const SectorComparisonTable: React.FC<SectorComparisonTableProps> = ({ data }) => {
  const [sortField, setSortField] = useState<SortField>('avgReturn');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const valueA = a[sortField];
    const valueB = b[sortField];
    
    return sortOrder === 'asc' 
      ? valueA - valueB 
      : valueB - valueA;
  });

  return (
    <div className="dashboard-card h-full">
      <div className="dashboard-title">
        Sector Comparison
        <MoreHorizontal size={16} className="text-dashboard-light-gray" />
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full mt-4">
          <thead>
            <tr className="text-left">
              <th className="table-header w-8">#</th>
              <th className="table-header">Sector</th>
              <th className="table-header cursor-pointer" onClick={() => handleSort('avgReturn')}>
                <div className="flex items-center">
                  Avg Return
                  {sortField === 'avgReturn' && (
                    <ArrowUpDown size={14} className="ml-1" />
                  )}
                </div>
              </th>
              <th className="table-header cursor-pointer" onClick={() => handleSort('volatility')}>
                <div className="flex items-center">
                  Volatility
                  {sortField === 'volatility' && (
                    <ArrowUpDown size={14} className="ml-1" />
                  )}
                </div>
              </th>
              <th className="table-header cursor-pointer" onClick={() => handleSort('correlation')}>
                <div className="flex items-center">
                  CCI Correlation
                  {sortField === 'correlation' && (
                    <ArrowUpDown size={14} className="ml-1" />
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item) => (
              <tr key={item.id} className="table-row">
                <td className="table-cell text-dashboard-light-gray">
                  {String(item.id).padStart(2, '0')}
                </td>
                <td className="table-cell">
                  <div className="flex items-center">
                    <div 
                      className="w-6 h-6 rounded-full mr-2"
                      style={{ backgroundColor: item.iconColor }}
                    ></div>
                    {item.name}
                  </div>
                </td>
                <td className="table-cell">
                  {item.avgReturn.toFixed(1)}%
                </td>
                <td className="table-cell">
                  {item.volatility.toFixed(1)}%
                </td>
                <td className="table-cell">
                  {item.correlation.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SectorComparisonTable;
