
import React, { useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, FileSpreadsheet, Filter } from 'lucide-react';

const Data = () => {
  const [activeMenuItem, setActiveMenuItem] = React.useState('data');
  const [selectedTab, setSelectedTab] = useState('returns');
  
  // Dati di esempio per le tabelle
  const returnsData = [
    { id: 1, date: '2024-04-01', technology: 2.4, energy: 1.8, healthcare: 0.9, finance: 1.6, consumer: 1.2 },
    { id: 2, date: '2024-03-01', technology: 3.1, energy: -0.8, healthcare: 1.2, finance: 2.3, consumer: 0.7 },
    { id: 3, date: '2024-02-01', technology: -1.2, energy: 2.6, healthcare: 0.5, finance: -0.8, consumer: 1.5 },
    { id: 4, date: '2024-01-01', technology: 4.5, energy: 3.2, healthcare: 2.1, finance: 1.9, consumer: 2.2 },
    { id: 5, date: '2023-12-01', technology: 2.8, energy: 1.5, healthcare: 1.7, finance: 2.2, consumer: 1.3 },
    { id: 6, date: '2023-11-01', technology: 1.9, energy: -0.5, healthcare: 2.2, finance: 1.5, consumer: 0.8 },
    { id: 7, date: '2023-10-01', technology: -0.7, energy: 1.2, healthcare: 0.3, finance: -0.4, consumer: 0.2 },
    { id: 8, date: '2023-09-01', technology: 3.4, energy: 2.1, healthcare: 1.8, finance: 2.5, consumer: 1.7 },
    { id: 9, date: '2023-08-01', technology: 2.2, energy: 1.7, healthcare: 1.4, finance: 1.8, consumer: 1.1 },
    { id: 10, date: '2023-07-01', technology: 1.6, energy: 2.4, healthcare: 0.8, finance: 1.2, consumer: 1.4 },
  ];

  const correlationsData = [
    { id: 1, period: 'YTD', technology: 0.78, energy: 0.45, healthcare: 0.62, finance: 0.71, consumer: 0.58 },
    { id: 2, period: '1Y', technology: 0.75, energy: 0.52, healthcare: 0.59, finance: 0.68, consumer: 0.61 },
    { id: 3, period: '3Y', technology: 0.72, energy: 0.48, healthcare: 0.64, finance: 0.65, consumer: 0.57 },
    { id: 4, period: '5Y', technology: 0.68, energy: 0.51, healthcare: 0.61, finance: 0.62, consumer: 0.55 },
    { id: 5, period: '10Y', technology: 0.65, energy: 0.49, healthcare: 0.58, finance: 0.59, consumer: 0.52 },
  ];

  const volatilityData = [
    { id: 1, period: 'YTD', technology: 18.5, energy: 22.4, healthcare: 14.2, finance: 16.8, consumer: 15.3 },
    { id: 2, period: '1Y', technology: 19.2, energy: 24.1, healthcare: 13.8, finance: 17.5, consumer: 14.9 },
    { id: 3, period: '3Y', technology: 21.5, energy: 26.8, healthcare: 15.5, finance: 18.2, consumer: 16.4 },
    { id: 4, period: '5Y', technology: 20.8, energy: 25.3, healthcare: 14.9, finance: 17.8, consumer: 15.6 },
    { id: 5, period: '10Y', technology: 19.5, energy: 23.7, healthcare: 14.1, finance: 16.9, consumer: 14.8 },
  ];

  const handleExportCSV = (dataType) => {
    let data;
    let filename;
    
    if (dataType === 'returns') {
      data = returnsData;
      filename = 'sector_returns_data.csv';
    } else if (dataType === 'correlations') {
      data = correlationsData;
      filename = 'sector_correlations_data.csv';
    } else if (dataType === 'volatility') {
      data = volatilityData;
      filename = 'sector_volatility_data.csv';
    }
    
    // Logica di esportazione CSV
    console.log(`Exporting ${filename}...`);
  };

  const handleExportExcel = (dataType) => {
    let data;
    let filename;
    
    if (dataType === 'returns') {
      data = returnsData;
      filename = 'sector_returns_data.xlsx';
    } else if (dataType === 'correlations') {
      data = correlationsData;
      filename = 'sector_correlations_data.xlsx';
    } else if (dataType === 'volatility') {
      data = volatilityData;
      filename = 'sector_volatility_data.xlsx';
    }
    
    // Logica di esportazione Excel
    console.log(`Exporting ${filename}...`);
  };
  
  return (
    <div className="flex h-screen bg-dashboard-dark-bg">
      <DashboardSidebar activeItem={activeMenuItem} onItemClick={setActiveMenuItem} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader 
          selectedSector="Technology"
          cciValue={100}
          cciChange={0}
          avgReturn={0}
          avgReturnChange={0}
          volatility={0}
          volatilityChange={0}
          onRefresh={() => {}}
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="dashboard-card p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Sector Data Tables</h1>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleExportCSV(selectedTab)}
                >
                  <Download size={16} className="mr-2" />
                  Export CSV
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleExportExcel(selectedTab)}
                >
                  <FileSpreadsheet size={16} className="mr-2" />
                  Export Excel
                </Button>
              </div>
            </div>

            <Tabs defaultValue="returns" onValueChange={setSelectedTab} className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="returns">Monthly Returns</TabsTrigger>
                <TabsTrigger value="correlations">CCI Correlations</TabsTrigger>
                <TabsTrigger value="volatility">Volatility Data</TabsTrigger>
              </TabsList>

              <TabsContent value="returns" className="w-full">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Date</TableHead>
                        <TableHead>Technology (%)</TableHead>
                        <TableHead>Energy (%)</TableHead>
                        <TableHead>Healthcare (%)</TableHead>
                        <TableHead>Finance (%)</TableHead>
                        <TableHead>Consumer (%)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {returnsData.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.date}</TableCell>
                          <TableCell>{row.technology.toFixed(1)}</TableCell>
                          <TableCell>{row.energy.toFixed(1)}</TableCell>
                          <TableCell>{row.healthcare.toFixed(1)}</TableCell>
                          <TableCell>{row.finance.toFixed(1)}</TableCell>
                          <TableCell>{row.consumer.toFixed(1)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="correlations" className="w-full">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Period</TableHead>
                        <TableHead>Technology</TableHead>
                        <TableHead>Energy</TableHead>
                        <TableHead>Healthcare</TableHead>
                        <TableHead>Finance</TableHead>
                        <TableHead>Consumer</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {correlationsData.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.period}</TableCell>
                          <TableCell>{row.technology.toFixed(2)}</TableCell>
                          <TableCell>{row.energy.toFixed(2)}</TableCell>
                          <TableCell>{row.healthcare.toFixed(2)}</TableCell>
                          <TableCell>{row.finance.toFixed(2)}</TableCell>
                          <TableCell>{row.consumer.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="volatility" className="w-full">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Period</TableHead>
                        <TableHead>Technology (%)</TableHead>
                        <TableHead>Energy (%)</TableHead>
                        <TableHead>Healthcare (%)</TableHead>
                        <TableHead>Finance (%)</TableHead>
                        <TableHead>Consumer (%)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {volatilityData.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.period}</TableCell>
                          <TableCell>{row.technology.toFixed(1)}</TableCell>
                          <TableCell>{row.energy.toFixed(1)}</TableCell>
                          <TableCell>{row.healthcare.toFixed(1)}</TableCell>
                          <TableCell>{row.finance.toFixed(1)}</TableCell>
                          <TableCell>{row.consumer.toFixed(1)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Data;
