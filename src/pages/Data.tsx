
import React from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';

const Data = () => {
  const [activeMenuItem, setActiveMenuItem] = React.useState('data');
  
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
          <div className="dashboard-card p-8 flex items-center justify-center">
            <h1 className="text-3xl font-bold">Data Page</h1>
            <p className="text-dashboard-light-gray mt-4">This page will contain raw data tables and exports.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Data;
