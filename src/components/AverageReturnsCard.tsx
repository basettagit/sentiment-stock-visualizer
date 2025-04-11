
import React from 'react';
import { MoreHorizontal } from 'lucide-react';

interface AverageReturnsProps {
  returnValue: number;
  returnChange: number;
  sector: string;
}

const AverageReturnsCard: React.FC<AverageReturnsProps> = ({
  returnValue,
  returnChange,
  sector
}) => {
  const isPositiveChange = returnChange >= 0;

  return (
    <div className="dashboard-card h-full">
      <div className="dashboard-title">
        {sector} Average Returns
        <MoreHorizontal size={16} className="text-dashboard-light-gray" />
      </div>
      
      <div className="flex items-center mb-3">
        <div className="dashboard-value">
          {returnValue.toFixed(1)}%
        </div>
        <div className={isPositiveChange ? "dashboard-positive" : "dashboard-negative"}>
          {isPositiveChange ? '↑' : '↓'} {Math.abs(returnChange).toFixed(2)}%
        </div>
      </div>
      
      <div className="dashboard-small uppercase">
        VS LAST YEAR
      </div>
    </div>
  );
};

export default AverageReturnsCard;
