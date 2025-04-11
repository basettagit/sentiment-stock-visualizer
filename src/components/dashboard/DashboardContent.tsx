
import React from 'react';
import SentimentOverviewCard from '../SentimentOverviewCard';
import SectorPerformanceChart from '../SectorPerformanceChart';
import AverageReturnsCard from '../AverageReturnsCard';
import CCIvsReturnsChart from '../CCIvsReturnsChart';
import CorrelationSummaryCard from '../CorrelationSummaryCard';
import SectorComparisonTable from '../SectorComparisonTable';

interface DashboardContentProps {
  sentimentValues: {
    cciValue: number;
    cciChange: number;
    cciYearAvg: number;
    cciYearChange: number;
  };
  sectorPerformanceData: Array<{
    name: string;
    return: number;
    color: string;
  }>;
  selectedSector: string;
  sectorData: {
    avgReturn: number;
    avgReturnChange: number;
    volatility: number;
    volatilityChange: number;
  };
  historicalChartData: Array<{
    date: string;
    cci: number;
    return: number;
  }>;
  correlations: Record<string, number>;
  sectorComparisonData: Array<{
    id: number;
    name: string;
    iconColor: string;
    avgReturn: number;
    volatility: number;
    correlation: number;
  }>;
  onSectorChange: (sector: string) => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  sentimentValues,
  sectorPerformanceData,
  selectedSector,
  sectorData,
  historicalChartData,
  correlations,
  sectorComparisonData,
  onSectorChange
}) => {
  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-1">
          <SentimentOverviewCard 
            cciValue={sentimentValues.cciValue}
            cciChange={sentimentValues.cciChange}
            cciYearAvg={sentimentValues.cciYearAvg}
            cciYearChange={sentimentValues.cciYearChange}
          />
        </div>
        <div className="md:col-span-2">
          <SectorPerformanceChart data={sectorPerformanceData} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-1">
          <AverageReturnsCard 
            returnValue={sectorData.avgReturn}
            returnChange={sectorData.avgReturnChange}
            sector={selectedSector}
          />
        </div>
        <div className="md:col-span-2 row-span-2">
          <CCIvsReturnsChart 
            data={historicalChartData}
            selectedSector={selectedSector}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <CorrelationSummaryCard 
            correlations={correlations}
            selectedSector={selectedSector}
            onSectorChange={onSectorChange}
          />
        </div>
        <div className="md:col-span-2">
          <SectorComparisonTable data={sectorComparisonData} />
        </div>
      </div>
    </main>
  );
};

export default DashboardContent;
