
import React from 'react';
import { Home, LineChart, Database, Settings, PieChart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardSidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activeItem,
  onItemClick
}) => {
  const menuItems = [
    { id: 'home', icon: Home, label: 'Home', path: '/' },
    { id: 'charts', icon: LineChart, label: 'Charts', path: '/charts' },
    { id: 'data', icon: Database, label: 'Data', path: '/data' },
    { id: 'models', icon: PieChart, label: 'Models', path: '/models' },
    { id: 'settings', icon: Settings, label: 'Settings', path: '/settings' }
  ];

  return (
    <aside className="bg-dashboard-dark-bg w-16 min-h-screen flex flex-col items-center pt-6 border-r border-dashboard-dark-gray">
      {menuItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.id}
            to={item.path}
            className={`sidebar-icon ${activeItem === item.id ? 'active' : ''}`}
            onClick={() => onItemClick(item.id)}
            title={item.label}
          >
            <Icon size={20} />
          </Link>
        );
      })}
    </aside>
  );
};

export default DashboardSidebar;
