
import React from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const Charts = () => {
  const [activeMenuItem, setActiveMenuItem] = React.useState('charts');
  
  // Dati di esempio per i grafici
  const monthlyData = [
    { name: 'Jan', technology: 4000, energy: 2400, healthcare: 2400, finance: 1800 },
    { name: 'Feb', technology: 3000, energy: 1398, healthcare: 2210, finance: 2400 },
    { name: 'Mar', technology: 2000, energy: 9800, healthcare: 2290, finance: 3200 },
    { name: 'Apr', technology: 2780, energy: 3908, healthcare: 2000, finance: 2500 },
    { name: 'May', technology: 1890, energy: 4800, healthcare: 2181, finance: 2800 },
    { name: 'Jun', technology: 2390, energy: 3800, healthcare: 2500, finance: 3100 },
    { name: 'Jul', technology: 3490, energy: 4300, healthcare: 2100, finance: 2900 },
  ];

  const correlationData = [
    { name: '2018', technology: 0.65, energy: 0.45, healthcare: 0.32, finance: 0.58 },
    { name: '2019', technology: 0.68, energy: 0.48, healthcare: 0.35, finance: 0.62 },
    { name: '2020', technology: 0.72, energy: 0.42, healthcare: 0.38, finance: 0.59 },
    { name: '2021', technology: 0.76, energy: 0.52, healthcare: 0.41, finance: 0.64 },
    { name: '2022', technology: 0.71, energy: 0.55, healthcare: 0.45, finance: 0.68 },
    { name: '2023', technology: 0.75, energy: 0.58, healthcare: 0.48, finance: 0.72 },
    { name: '2024', technology: 0.79, energy: 0.62, healthcare: 0.52, finance: 0.75 },
  ];

  const volatilityData = [
    { name: 'Jan', technology: 12.5, energy: 15.3, healthcare: 8.7, finance: 11.2 },
    { name: 'Feb', technology: 13.8, energy: 14.2, healthcare: 9.3, finance: 12.5 },
    { name: 'Mar', technology: 14.2, energy: 16.8, healthcare: 8.9, finance: 13.1 },
    { name: 'Apr', technology: 15.1, energy: 18.2, healthcare: 9.5, finance: 12.8 },
    { name: 'May', technology: 14.8, energy: 17.5, healthcare: 10.2, finance: 13.5 },
    { name: 'Jun', technology: 15.5, energy: 19.2, healthcare: 9.8, finance: 14.2 },
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
            <h1 className="text-2xl font-bold mb-6">Sector Performance Charts</h1>

            <Tabs defaultValue="returns" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="returns">Returns Over Time</TabsTrigger>
                <TabsTrigger value="correlations">CCI Correlations</TabsTrigger>
                <TabsTrigger value="volatility">Volatility Comparison</TabsTrigger>
              </TabsList>

              <TabsContent value="returns" className="w-full">
                <div className="mb-4 text-dashboard-light-gray">
                  Monthly sector returns compared across different markets
                </div>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#4A4A4A" />
                      <XAxis dataKey="name" tick={{ fill: '#B0B0B0', fontSize: 12 }} />
                      <YAxis tickFormatter={(value) => `${value}%`} tick={{ fill: '#B0B0B0', fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#2A2A2A',
                          border: 'none',
                          borderRadius: 8,
                          color: '#fff',
                        }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="technology" stroke="#8884d8" activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="energy" stroke="#82ca9d" activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="healthcare" stroke="#ffc658" activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="finance" stroke="#ff7300" activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="correlations" className="w-full">
                <div className="mb-4 text-dashboard-light-gray">
                  CCI vs. Sector Return correlations by year
                </div>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={correlationData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#4A4A4A" />
                      <XAxis dataKey="name" tick={{ fill: '#B0B0B0', fontSize: 12 }} />
                      <YAxis domain={[0, 1]} tick={{ fill: '#B0B0B0', fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#2A2A2A',
                          border: 'none',
                          borderRadius: 8,
                          color: '#fff',
                        }}
                      />
                      <Legend />
                      <Area type="monotone" dataKey="technology" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                      <Area type="monotone" dataKey="energy" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                      <Area type="monotone" dataKey="healthcare" stroke="#ffc658" fill="#ffc658" fillOpacity={0.3} />
                      <Area type="monotone" dataKey="finance" stroke="#ff7300" fill="#ff7300" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="volatility" className="w-full">
                <div className="mb-4 text-dashboard-light-gray">
                  Monthly volatility (%) for each sector
                </div>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={volatilityData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#4A4A4A" />
                      <XAxis dataKey="name" tick={{ fill: '#B0B0B0', fontSize: 12 }} />
                      <YAxis tickFormatter={(value) => `${value}%`} tick={{ fill: '#B0B0B0', fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#2A2A2A',
                          border: 'none',
                          borderRadius: 8,
                          color: '#fff',
                        }}
                      />
                      <Legend />
                      <Bar dataKey="technology" fill="#8884d8" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="energy" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="healthcare" fill="#ffc658" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="finance" fill="#ff7300" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Charts;
