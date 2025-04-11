
import React, { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';

interface CorrelationSummaryProps {
  correlations: Record<string, number>;
  onSectorChange: (sector: string) => void;
  selectedSector: string;
}

const CorrelationSummaryCard: React.FC<CorrelationSummaryProps> = ({
  correlations,
  onSectorChange,
  selectedSector
}) => {
  const sectors = Object.keys(correlations);

  return (
    <div className="dashboard-card h-full">
      <div className="dashboard-title">
        Correlation Summary
        <MoreHorizontal size={16} className="text-dashboard-light-gray" />
      </div>
      
      <div className="flex items-center mb-4">
        <div className="dashboard-value">
          {correlations[selectedSector].toFixed(2)}
        </div>
      </div>
      
      <div className="dashboard-subtitle mb-6">
        CCI vs {selectedSector} Returns
      </div>
      
      <div className="flex flex-wrap gap-2">
        {sectors.map((sector) => (
          <button
            key={sector}
            className={`sector-button ${sector === selectedSector ? 'active' : ''}`}
            onClick={() => onSectorChange(sector)}
          >
            {sector}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CorrelationSummaryCard;
