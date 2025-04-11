
import React from 'react';
import { MoreHorizontal } from 'lucide-react';

interface SentimentOverviewProps {
  cciValue: number;
  cciChange: number;
  cciYearAvg: number;
  cciYearChange: number;
}

const SentimentOverviewCard: React.FC<SentimentOverviewProps> = ({
  cciValue,
  cciChange,
  cciYearAvg,
  cciYearChange
}) => {
  const isPositiveChange = cciChange >= 0;
  const isPositiveYearChange = cciYearChange >= 0;

  return (
    <div className="dashboard-card gradient-green h-full">
      <div className="dashboard-title">
        Sentiment Overview
        <MoreHorizontal size={16} className="text-white" />
      </div>
      
      <div className="dashboard-subtitle">
        Consumer Confidence Index (CCI)
      </div>
      
      <div className="flex items-center mb-3">
        <div className="dashboard-value">
          {cciValue.toFixed(1)}
        </div>
        <div className={isPositiveChange ? "dashboard-positive" : "dashboard-negative"}>
          {isPositiveChange ? '↑' : '↓'} {Math.abs(cciChange).toFixed(1)}%
        </div>
      </div>
      
      <div className="dashboard-small uppercase mb-4">
        VS LAST MONTH
      </div>
      
      <div className="mt-4">
        <div className="text-dashboard-light-gray text-sm">
          Avg CCI This Year
        </div>
        
        <div className="flex items-center">
          <div className="text-2xl font-semibold text-white">
            {cciYearAvg.toFixed(1)}
          </div>
          <div className={isPositiveYearChange ? "dashboard-positive" : "dashboard-negative"}>
            {isPositiveYearChange ? '↑' : '↓'} {Math.abs(cciYearChange).toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentOverviewCard;
