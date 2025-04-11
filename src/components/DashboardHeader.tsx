
import React, { useState } from 'react';
import { Search, ChevronDown, BarChart2, RefreshCw } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const [dataSource, setDataSource] = useState<string>("Alpha Vantage");
  
  const sectors = [
    "Technology", 
    "Healthcare", 
    "Financial", 
    "Energy", 
    "Consumer"
  ];
  
  const dataSources = [
    "Alpha Vantage",
    "Yahoo Finance",
    "OECD Database"
  ];
  
  const handleSectorChange = (value: string) => {
    // Handle sector change in parent component
    console.log("Selected sector:", value);
  };
  
  const handleDataSourceChange = (value: string) => {
    setDataSource(value);
  };

  return (
    <header className="flex items-center justify-between px-5 py-4 bg-dashboard-dark-bg border-b border-dashboard-dark-gray">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full gradient-green flex items-center justify-center mr-5">
          <BarChart2 size={20} className="text-white" />
        </div>
      </div>

      <Select onValueChange={handleSectorChange} defaultValue={selectedSector}>
        <SelectTrigger className="w-[180px] bg-dashboard-card-bg border-none text-white">
          <SelectValue placeholder={selectedSector} />
        </SelectTrigger>
        <SelectContent className="bg-dashboard-card-bg text-white border-dashboard-dark-gray">
          {sectors.map((sector) => (
            <SelectItem key={sector} value={sector} className="hover:bg-dashboard-dark-gray">
              {sector} Sector
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <div className="flex items-center space-x-6">
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
          className="flex items-center px-4 py-1 bg-dashboard-card-bg rounded-full mr-2 hover:bg-opacity-80 transition-all"
          onClick={onRefresh}
        >
          <RefreshCw size={14} className="text-dashboard-light-gray mr-2" />
          <span className="text-sm text-white">Refresh Data</span>
        </button>
        
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center px-4 py-1 bg-dashboard-card-bg rounded-full hover:bg-opacity-80 transition-all">
            <Search size={14} className="text-dashboard-light-gray mr-2" />
            <span className="text-sm text-white">Data Source</span>
            <ChevronDown size={14} className="text-dashboard-light-gray ml-2" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-dashboard-card-bg border-dashboard-dark-gray text-white min-w-[200px]">
            {dataSources.map((source) => (
              <DropdownMenuItem 
                key={source}
                onClick={() => handleDataSourceChange(source)}
                className="hover:bg-dashboard-dark-gray focus:bg-dashboard-dark-gray"
              >
                {source}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
