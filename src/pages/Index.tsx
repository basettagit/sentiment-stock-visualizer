
import React, { useState, useEffect } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import SentimentOverviewCard from '../components/SentimentOverviewCard';
import SectorPerformanceChart from '../components/SectorPerformanceChart';
import AverageReturnsCard from '../components/AverageReturnsCard';
import CCIvsReturnsChart from '../components/CCIvsReturnsChart';
import CorrelationSummaryCard from '../components/CorrelationSummaryCard';
import SectorComparisonTable from '../components/SectorComparisonTable';
import { 
  fetchStockQuote, 
  fetchRetailSales,
  fetchMonthlyTimeSeries,
  sectorETFs,
  calculateSentimentIndex,
  StockQuote,
  RetailSalesData,
  TimeSeriesData
} from '../services/alphaVantageService';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

const Index = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('home');
  const [selectedSector, setSelectedSector] = useState('Technology');
  const sectorColors = {
    'Technology': '#FFD700',
    'Healthcare': '#FF3B30',
    'Financial': '#34C759',
    'Energy': '#FFA500',
    'Consumer': '#00CED1',
  };

  // Fetch retail sales data (for CCI)
  const { 
    data: retailSalesData,
    isLoading: loadingRetailSales,
    refetch: refetchRetailSales
  } = useQuery({
    queryKey: ['retailSales'],
    queryFn: fetchRetailSales,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  // Fetch sector ETF quotes
  const { 
    data: sectorQuotes,
    isLoading: loadingQuotes,
    refetch: refetchQuotes
  } = useQuery({
    queryKey: ['sectorQuotes'],
    queryFn: async () => {
      const symbols = Object.values(sectorETFs);
      const quotes = await Promise.all(
        symbols.map(symbol => fetchStockQuote(symbol).catch(() => null))
      );
      
      return quotes.filter(quote => quote !== null) as StockQuote[];
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  // Fetch historical data for selected sector
  const { 
    data: sectorHistorical,
    isLoading: loadingHistorical,
    refetch: refetchHistorical
  } = useQuery({
    queryKey: ['sectorHistorical', selectedSector],
    queryFn: () => fetchMonthlyTimeSeries(sectorETFs[selectedSector as keyof typeof sectorETFs]),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  // Handle refresh button click
  const handleRefresh = () => {
    toast.info('Refreshing data...');
    refetchRetailSales();
    refetchQuotes();
    refetchHistorical();
  };

  // Handle sector selection from header dropdown
  const handleSectorChange = (newSector: string) => {
    setSelectedSector(newSector);
  };

  // Transform data for UI components
  const getSentimentValues = () => {
    if (!retailSalesData || retailSalesData.length < 12) {
      return {
        cciValue: 100,
        cciChange: 0,
        cciYearAvg: 100,
        cciYearChange: 0
      };
    }

    const currentCCI = calculateSentimentIndex(retailSalesData.slice(0, 6));
    const lastMonthCCI = calculateSentimentIndex(retailSalesData.slice(1, 7));
    const cciChange = ((currentCCI - lastMonthCCI) / lastMonthCCI) * 100;
    
    const currentYearCCI = calculateSentimentIndex(retailSalesData.slice(0, 12));
    const lastYearCCI = calculateSentimentIndex(retailSalesData.slice(12, 24));
    const cciYearChange = ((currentYearCCI - lastYearCCI) / lastYearCCI) * 100;
    
    return {
      cciValue: currentCCI,
      cciChange,
      cciYearAvg: currentYearCCI,
      cciYearChange
    };
  };

  const getSectorPerformanceData = () => {
    if (!sectorQuotes || sectorQuotes.length < Object.keys(sectorETFs).length) {
      return [];
    }

    return Object.entries(sectorETFs).map(([name, symbol]) => {
      const quote = sectorQuotes.find(q => q.symbol === symbol);
      return {
        name: name.substring(0, 4), // Abbreviate names for chart
        return: quote ? quote.changePercent : 0,
        color: sectorColors[name as keyof typeof sectorColors]
      };
    });
  };

  const getSelectedSectorData = () => {
    if (!sectorQuotes) {
      return { avgReturn: 0, avgReturnChange: 0, volatility: 0, volatilityChange: 0 };
    }
    
    const symbol = sectorETFs[selectedSector as keyof typeof sectorETFs];
    const quote = sectorQuotes.find(q => q.symbol === symbol);
    
    if (!quote) {
      return { avgReturn: 0, avgReturnChange: 0, volatility: 0, volatilityChange: 0 };
    }
    
    return {
      avgReturn: quote.changePercent,
      avgReturnChange: quote.changePercent * 0.8, // Mock last year comparison
      volatility: Math.abs(quote.high - quote.low) / quote.price * 100,
      volatilityChange: -5 + Math.random() * 10 // Mock volatility change
    };
  };

  const getHistoricalChartData = () => {
    if (!sectorHistorical || !retailSalesData) {
      return [];
    }
    
    // Create a sequence of months with CCI (sentiment) and returns
    return sectorHistorical.map((item, index) => {
      const date = item.date;
      const monthlyReturn = ((item.close - item.open) / item.open) * 100;
      
      // Calculate a mock CCI value based on the month
      // In a real scenario, we would match actual CCI data with the correct dates
      const cciIndex = index % retailSalesData.length;
      const mockCci = 90 + Math.random() * 30; // Random value between 90-120
      
      return {
        date,
        cci: mockCci,
        return: monthlyReturn
      };
    });
  };

  const getCorrelationData = () => {
    return {
      'Technology': 0.75,
      'Healthcare': 0.62,
      'Financial': 0.81,
      'Energy': 0.45,
      'Consumer': 0.53
    };
  };

  const getSectorComparisonData = () => {
    if (!sectorQuotes) {
      return [];
    }
    
    const correlations = getCorrelationData();
    
    return Object.entries(sectorETFs).map(([name, symbol], index) => {
      const quote = sectorQuotes.find(q => q.symbol === symbol);
      
      if (!quote) {
        return {
          id: index + 1,
          name,
          iconColor: sectorColors[name as keyof typeof sectorColors],
          avgReturn: 0,
          volatility: 0,
          correlation: correlations[name as keyof typeof correlations] || 0
        };
      }
      
      return {
        id: index + 1,
        name,
        iconColor: sectorColors[name as keyof typeof sectorColors],
        avgReturn: quote.changePercent,
        volatility: Math.abs(quote.high - quote.low) / quote.price * 100,
        correlation: correlations[name as keyof typeof correlations] || 0
      };
    });
  };
  
  const sentimentValues = getSentimentValues();
  const sectorPerformanceData = getSectorPerformanceData();
  const { avgReturn, avgReturnChange, volatility, volatilityChange } = getSelectedSectorData();
  const historicalChartData = getHistoricalChartData();
  const correlations = getCorrelationData();
  const sectorComparisonData = getSectorComparisonData();

  const isLoading = loadingRetailSales || loadingQuotes || loadingHistorical;

  useEffect(() => {
    if (isLoading) {
      toast.info('Loading dashboard data...');
    }
  }, [isLoading]);

  return (
    <div className="flex h-screen bg-dashboard-dark-bg">
      <DashboardSidebar activeItem={activeMenuItem} onItemClick={setActiveMenuItem} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader 
          selectedSector={selectedSector}
          cciValue={sentimentValues.cciValue}
          cciChange={sentimentValues.cciChange}
          avgReturn={avgReturn}
          avgReturnChange={avgReturnChange}
          volatility={volatility}
          volatilityChange={volatilityChange}
          onRefresh={handleRefresh}
        />
        
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
                returnValue={avgReturn}
                returnChange={avgReturnChange}
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
                onSectorChange={setSelectedSector}
              />
            </div>
            <div className="md:col-span-2">
              <SectorComparisonTable data={sectorComparisonData} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
