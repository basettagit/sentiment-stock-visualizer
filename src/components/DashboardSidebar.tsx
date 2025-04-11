
import React from 'react';
import { Home, LineChart, Database, Settings, PieChart } from 'lucide-react';

interface DashboardSidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activeItem,
  onItemClick
}) => {
  const menuItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'charts', icon: LineChart, label: 'Charts' },
    { id: 'data', icon: Database, label: 'Data' },
    { id: 'models', icon: PieChart, label: 'Models' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <aside className="bg-dashboard-dark-bg w-16 min-h-screen flex flex-col items-center pt-6 border-r border-dashboard-dark-gray">
      {menuItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            className={`sidebar-icon ${activeItem === item.id ? 'active' : ''}`}
            onClick={() => onItemClick(item.id)}
            title={item.label}
          >
            <Icon size={20} />
          </button>
        );
      })}
    </aside>
  );
};

export default DashboardSidebar;
