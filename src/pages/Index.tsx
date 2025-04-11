
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import DashboardContent from '../components/dashboard/DashboardContent';
import { useDashboardData } from '../hooks/useDashboardData';

const Index = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('home');
  const [selectedSector, setSelectedSector] = useState('Technology');
  
  // Use our custom hook to fetch and transform data
  const { 
    isLoading,
    handleRefresh,
    sentimentValues,
    sectorPerformanceData,
    sectorData,
    historicalChartData,
    correlations,
    sectorComparisonData
  } = useDashboardData(selectedSector);

  // Handle sector selection from header dropdown or correlation summary card
  const handleSectorChange = (newSector: string) => {
    setSelectedSector(newSector);
  };

  useEffect(() => {
    if (isLoading) {
      toast.info('Loading dashboard data...');
    }
  }, [isLoading]);

  return (
    <DashboardLayout
      activeMenuItem={activeMenuItem}
      setActiveMenuItem={setActiveMenuItem}
      selectedSector={selectedSector}
      cciValue={sentimentValues.cciValue}
      cciChange={sentimentValues.cciChange}
      avgReturn={sectorData.avgReturn}
      avgReturnChange={sectorData.avgReturnChange}
      volatility={sectorData.volatility}
      volatilityChange={sectorData.volatilityChange}
      onRefresh={handleRefresh}
    >
      <DashboardContent
        sentimentValues={sentimentValues}
        sectorPerformanceData={sectorPerformanceData}
        selectedSector={selectedSector}
        sectorData={sectorData}
        historicalChartData={historicalChartData}
        correlations={correlations}
        sectorComparisonData={sectorComparisonData}
        onSectorChange={handleSectorChange}
      />
    </DashboardLayout>
  );
};

export default Index;
