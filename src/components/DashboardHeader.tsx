
import React from 'react';
import { Search, ChevronDown, BarChart2, RefreshCw } from 'lucide-react';

interface DashboardHeaderProps {
  selectedSector: string;
  cciValue: number;
  cciChange: number;
  avgReturn: number;
  avgReturnChange: number;
  volatility: number;
  volatilityChange: number;
  onRefresh: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  selectedSector,
  cciValue,
  cciChange,
  avgReturn,
  avgReturnChange,
  volatility,
  volatilityChange,
  onRefresh,
}) => {
  return (
    <header className="flex items-center justify-between px-5 py-4 bg-dashboard-dark-bg border-b border-dashboard-dark-gray">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full gradient-green flex items-center justify-center mr-5">
          <BarChart2 size={20} className="text-white" />
        </div>
      </div>

      <div className="flex items-center px-6 py-1 bg-dashboard-card-bg rounded-full">
        <span className="text-white text-base font-medium">{selectedSector} Sector</span>
        <ChevronDown size={16} className="text-dashboard-light-gray ml-2" />
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="circular-indicator">
          <div className="text-sm font-semibold">CCI</div>
          <div className="flex items-center">
            <span className="text-sm font-medium">{cciValue.toFixed(1)}</span>
            <span className={cciChange >= 0 ? "text-xs text-dashboard-green ml-1" : "text-xs text-dashboard-red ml-1"}>
              {cciChange >= 0 ? '↑' : '↓'}{Math.abs(cciChange).toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="circular-indicator">
          <div className="text-sm font-semibold">Return</div>
          <div className="flex items-center">
            <span className="text-sm font-medium">{avgReturn.toFixed(1)}%</span>
            <span className={avgReturnChange >= 0 ? "text-xs text-dashboard-green ml-1" : "text-xs text-dashboard-red ml-1"}>
              {avgReturnChange >= 0 ? '↑' : '↓'}{Math.abs(avgReturnChange).toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="circular-indicator">
          <div className="text-sm font-semibold">Vol</div>
          <div className="flex items-center">
            <span className="text-sm font-medium">{volatility.toFixed(1)}%</span>
            <span className={volatilityChange < 0 ? "text-xs text-dashboard-green ml-1" : "text-xs text-dashboard-red ml-1"}>
              {volatilityChange < 0 ? '↓' : '↑'}{Math.abs(volatilityChange).toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <button 
          className="flex items-center px-4 py-1 bg-dashboard-card-bg rounded-full mr-2"
          onClick={onRefresh}
        >
          <RefreshCw size={14} className="text-dashboard-light-gray mr-2" />
          <span className="text-sm text-white">Refresh Data</span>
        </button>
        
        <div className="flex items-center px-4 py-1 bg-dashboard-card-bg rounded-full">
          <Search size={14} className="text-dashboard-light-gray mr-2" />
          <span className="text-sm text-dashboard-light-gray">Data Source</span>
          <ChevronDown size={14} className="text-dashboard-light-gray ml-2" />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
