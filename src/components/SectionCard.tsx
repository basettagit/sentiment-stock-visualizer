
import React, { ReactNode } from 'react';

interface SectionCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`dashboard-card h-full ${className}`}>
      <div className="dashboard-title mb-4">
        {title}
      </div>
      {children}
    </div>
  );
};

export default SectionCard;
