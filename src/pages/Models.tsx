
import React, { useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';

const Models = () => {
  const [activeMenuItem, setActiveMenuItem] = React.useState('models');
  
  // Dati di esempio per i modelli
  const regressionData = [
    { x: 65, y: 73, z: 30 },
    { x: 72, y: 78, z: 45 },
    { x: 85, y: 89, z: 60 },
    { x: 93, y: 95, z: 40 },
    { x: 78, y: 82, z: 35 },
    { x: 88, y: 87, z: 50 },
    { x: 75, y: 71, z: 25 },
    { x: 81, y: 83, z: 55 },
    { x: 69, y: 67, z: 30 },
    { x: 91, y: 92, z: 65 },
  ];

  const forecastData = [
    { name: 'Jan', actual: 4000, forecast: 4100, confidence: [3800, 4400] },
    { name: 'Feb', actual: 3000, forecast: 3200, confidence: [2900, 3500] },
    { name: 'Mar', actual: 2000, forecast: 2100, confidence: [1800, 2400] },
    { name: 'Apr', actual: 2780, forecast: 2850, confidence: [2650, 3050] },
    { name: 'May', actual: 1890, forecast: 2000, confidence: [1700, 2300] },
    { name: 'Jun', actual: 2390, forecast: 2500, confidence: [2250, 2750] },
    { name: 'Jul', actual: null, forecast: 3000, confidence: [2700, 3300] },
    { name: 'Aug', actual: null, forecast: 3200, confidence: [2850, 3550] },
    { name: 'Sep', actual: null, forecast: 3400, confidence: [3000, 3800] },
  ];

  const sensitivityData = [
    { name: '0', baseline: 2400, scenario1: 2400, scenario2: 2400, scenario3: 2400 },
    { name: '1', baseline: 2500, scenario1: 2800, scenario2: 2200, scenario3: 2000 },
    { name: '2', baseline: 2600, scenario1: 3300, scenario2: 2100, scenario3: 1700 },
    { name: '3', baseline: 2700, scenario1: 3800, scenario2: 1900, scenario3: 1500 },
    { name: '4', baseline: 2800, scenario1: 4200, scenario2: 1800, scenario3: 1300 },
    { name: '5', baseline: 2900, scenario1: 4500, scenario2: 1600, scenario3: 1200 },
    { name: '6', baseline: 3000, scenario1: 4800, scenario2: 1400, scenario3: 1100 },
  ];

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
            <h1 className="text-2xl font-bold mb-6">Statistical Models</h1>

            <Tabs defaultValue="regression" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="regression">Regression Analysis</TabsTrigger>
                <TabsTrigger value="forecasting">Forecast Models</TabsTrigger>
                <TabsTrigger value="sensitivity">Sensitivity Analysis</TabsTrigger>
              </TabsList>

              <TabsContent value="regression" className="w-full">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="p-4 col-span-1 lg:col-span-2">
                    <h2 className="text-lg font-semibold mb-4">CCI vs Return Regression</h2>
                    <div className="text-dashboard-light-gray mb-4">
                      Scatter plot showing the relationship between Consumer Confidence Index and Sector Returns
                    </div>
                    <div className="h-[350px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart
                          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#4A4A4A" />
                          <XAxis 
                            type="number" 
                            dataKey="x" 
                            name="CCI" 
                            unit="" 
                            domain={[60, 100]}
                            tick={{ fill: '#B0B0B0', fontSize: 12 }} 
                          />
                          <YAxis 
                            type="number" 
                            dataKey="y" 
                            name="Return" 
                            unit="%" 
                            domain={[60, 100]}
                            tick={{ fill: '#B0B0B0', fontSize: 12 }} 
                          />
                          <ZAxis 
                            type="number"
                            dataKey="z"
                            range={[60, 300]}
                            name="Volume"
                          />
                          <Tooltip 
                            cursor={{ strokeDasharray: '3 3' }} 
                            formatter={(value, name) => [`${value}${name === 'Return' ? '%' : ''}`, name]}
                            contentStyle={{
                              backgroundColor: '#2A2A2A',
                              border: 'none',
                              borderRadius: 8,
                              color: '#fff',
                            }}
                          />
                          <Legend />
                          <Scatter name="Tech Sector" data={regressionData} fill="#8884d8" />
                        </ScatterChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>
                  
                  <Card className="p-4">
                    <h2 className="text-lg font-semibold mb-4">Statistical Summary</h2>
                    <div className="space-y-4">
                      <div>
                        <p className="text-dashboard-light-gray">R-Squared Value</p>
                        <p className="text-xl font-medium">0.876</p>
                      </div>
                      <div>
                        <p className="text-dashboard-light-gray">P-Value</p>
                        <p className="text-xl font-medium">0.0023</p>
                      </div>
                      <div>
                        <p className="text-dashboard-light-gray">Standard Error</p>
                        <p className="text-xl font-medium">1.45%</p>
                      </div>
                      <div>
                        <p className="text-dashboard-light-gray">Coefficient</p>
                        <p className="text-xl font-medium">1.28</p>
                      </div>
                      <div>
                        <p className="text-dashboard-light-gray">Model Equation</p>
                        <p className="text-sm font-medium">Return = 1.28 × CCI - 42.5</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      Run Advanced Analysis
                    </Button>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="forecasting" className="w-full">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="p-4 col-span-1 lg:col-span-2">
                    <h2 className="text-lg font-semibold mb-4">3-Month Return Forecast</h2>
                    <div className="text-dashboard-light-gray mb-4">
                      Forecast model with 95% confidence interval
                    </div>
                    <div className="h-[350px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={forecastData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#4A4A4A" />
                          <XAxis dataKey="name" tick={{ fill: '#B0B0B0', fontSize: 12 }} />
                          <YAxis tick={{ fill: '#B0B0B0', fontSize: 12 }} />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: '#2A2A2A',
                              border: 'none',
                              borderRadius: 8,
                              color: '#fff',
                            }}
                          />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="actual" 
                            stroke="#8884d8" 
                            strokeWidth={2} 
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                            name="Actual"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="forecast" 
                            stroke="#82ca9d" 
                            strokeWidth={2}
                            strokeDasharray="5 5"  
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                            name="Forecast"
                          />
                          {/* Confidence interval area */}
                          {/* We would need a more complex setup for the confidence interval band */}
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>
                  
                  <Card className="p-4">
                    <h2 className="text-lg font-semibold mb-4">Forecast Summary</h2>
                    <div className="space-y-4">
                      <div>
                        <p className="text-dashboard-light-gray">Next Month Forecast</p>
                        <p className="text-xl font-medium">3.0%</p>
                      </div>
                      <div>
                        <p className="text-dashboard-light-gray">Confidence Interval</p>
                        <p className="text-xl font-medium">±0.3%</p>
                      </div>
                      <div>
                        <p className="text-dashboard-light-gray">Historical Accuracy</p>
                        <p className="text-xl font-medium">86%</p>
                      </div>
                      <div>
                        <p className="text-dashboard-light-gray">Model Type</p>
                        <p className="text-xl font-medium">ARIMA</p>
                      </div>
                      <div>
                        <p className="text-dashboard-light-gray">Last Updated</p>
                        <p className="text-sm font-medium">Apr 11, 2025, 08:30 AM</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      Update Forecast
                    </Button>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="sensitivity" className="w-full">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="p-4 col-span-1 lg:col-span-2">
                    <h2 className="text-lg font-semibold mb-4">CCI Sensitivity Analysis</h2>
                    <div className="text-dashboard-light-gray mb-4">
                      Impact of different CCI scenarios on sector returns
                    </div>
                    <div className="h-[350px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={sensitivityData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#4A4A4A" />
                          <XAxis dataKey="name" tick={{ fill: '#B0B0B0', fontSize: 12 }} />
                          <YAxis tick={{ fill: '#B0B0B0', fontSize: 12 }} />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: '#2A2A2A',
                              border: 'none',
                              borderRadius: 8,
                              color: '#fff',
                            }}
                          />
                          <Legend />
                          <Line type="monotone" dataKey="baseline" stroke="#8884d8" name="Baseline" />
                          <Line type="monotone" dataKey="scenario1" stroke="#82ca9d" name="Bull Case" />
                          <Line type="monotone" dataKey="scenario2" stroke="#ffc658" name="Bear Case" />
                          <Line type="monotone" dataKey="scenario3" stroke="#ff7300" name="Recession" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>
                  
                  <Card className="p-4">
                    <h2 className="text-lg font-semibold mb-4">Scenario Descriptions</h2>
                    <div className="space-y-4">
                      <div>
                        <p className="text-dashboard-light-gray">Baseline Scenario</p>
                        <p className="text-sm">CCI continues current trend, moderate growth.</p>
                      </div>
                      <div>
                        <p className="text-dashboard-light-gray">Bull Case Scenario</p>
                        <p className="text-sm">CCI increases by 15% due to improved consumer sentiment.</p>
                      </div>
                      <div>
                        <p className="text-dashboard-light-gray">Bear Case Scenario</p>
                        <p className="text-sm">CCI decreases by 10% due to market uncertainty.</p>
                      </div>
                      <div>
                        <p className="text-dashboard-light-gray">Recession Scenario</p>
                        <p className="text-sm">CCI falls by 20% due to economic downturn.</p>
                      </div>
                      <div>
                        <p className="text-dashboard-light-gray">Most Likely Outcome</p>
                        <p className="text-sm font-medium">Baseline scenario (65% probability)</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      Create Custom Scenario
                    </Button>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Models;
