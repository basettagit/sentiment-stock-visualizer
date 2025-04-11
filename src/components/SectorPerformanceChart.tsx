
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { MoreHorizontal } from 'lucide-react';

interface SectorPerformanceProps {
  data: Array<{
    name: string;
    return: number;
    color: string;
  }>;
}

const SectorPerformanceChart: React.FC<SectorPerformanceProps> = ({ data }) => {
  return (
    <div className="dashboard-card h-full">
      <div className="dashboard-title">
        Sector Performance
        <MoreHorizontal size={16} className="text-dashboard-light-gray" />
      </div>
      <div className="h-[150px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#4A4A4A" />
            <XAxis
              dataKey="name"
              tick={{ fill: '#B0B0B0', fontSize: 12 }}
              axisLine={{ stroke: '#4A4A4A' }}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(value) => `${value}%`}
              tick={{ fill: '#B0B0B0', fontSize: 12 }}
              axisLine={{ stroke: '#4A4A4A' }}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
              contentStyle={{
                backgroundColor: '#2A2A2A',
                border: 'none',
                borderRadius: 8,
                color: '#fff',
              }}
              formatter={(value) => [`${value}%`, 'Return']}
            />
            <Bar
              dataKey="return"
              fill="#4A4A4A"
              radius={[4, 4, 0, 0]}
              barSize={24}
              isAnimationActive={true}
            >
              {data.map((entry, index) => (
                <Bar
                  key={`bar-${index}`}
                  dataKey="return"
                  fill={entry.color}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SectorPerformanceChart;
