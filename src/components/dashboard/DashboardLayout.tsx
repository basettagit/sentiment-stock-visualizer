
import React from 'react';
import DashboardHeader from '../DashboardHeader';
import DashboardSidebar from '../DashboardSidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeMenuItem: string;
  setActiveMenuItem: (item: string) => void;
  selectedSector: string;
  cciValue: number;
  cciChange: number;
  avgReturn: number;
  avgReturnChange: number;
  volatility: number;
  volatilityChange: number;
  onRefresh: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeMenuItem,
  setActiveMenuItem,
  selectedSector,
  cciValue,
  cciChange,
  avgReturn,
  avgReturnChange,
  volatility,
  volatilityChange,
  onRefresh
}) => {
  return (
    <div className="flex h-screen bg-dashboard-dark-bg">
      <DashboardSidebar 
        activeItem={activeMenuItem} 
        onItemClick={setActiveMenuItem} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader 
          selectedSector={selectedSector}
          cciValue={cciValue}
          cciChange={cciChange}
          avgReturn={avgReturn}
          avgReturnChange={avgReturnChange}
          volatility={volatility}
          volatilityChange={volatilityChange}
          onRefresh={onRefresh}
        />
        
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
