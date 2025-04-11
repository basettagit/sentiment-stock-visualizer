
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { MoreHorizontal } from 'lucide-react';

interface CCIvsReturnsChartProps {
  data: Array<{
    date: string;
    cci: number;
    return: number;
  }>;
  selectedSector: string;
}

const CCIvsReturnsChart: React.FC<CCIvsReturnsChartProps> = ({ data, selectedSector }) => {
  // Format date for X-axis - modified to return a string instead of number
  const formatXAxis = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.getFullYear().toString(); // Convert number to string
  };
  
  // Only show year labels every 5 years
  const filterTicks = (value: any, index: number) => index % 10 === 0;

  return (
    <div className="dashboard-card h-full">
      <div className="dashboard-title">
        CCI vs {selectedSector} Returns Trend
        <MoreHorizontal size={16} className="text-dashboard-light-gray" />
      </div>
      <div className="h-[250px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={data}
            margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#4A4A4A" />
            <XAxis 
              dataKey="date"
              tickFormatter={formatXAxis}
              tick={{ fill: '#B0B0B0', fontSize: 12 }}
              axisLine={{ stroke: '#4A4A4A' }}
              tickLine={false}
              interval={10}
            />
            <YAxis 
              yAxisId="left"
              orientation="left"
              tick={{ fill: '#B0B0B0', fontSize: 12 }}
              axisLine={{ stroke: '#4A4A4A' }}
              tickLine={false}
              domain={[80, 120]}
              label={{ value: 'CCI', angle: -90, position: 'insideLeft', fill: '#B0B0B0', fontSize: 12 }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              tick={{ fill: '#B0B0B0', fontSize: 12 }}
              axisLine={{ stroke: '#4A4A4A' }}
              tickLine={false}
              domain={[-30, 30]}
              label={{ value: 'Return %', angle: 90, position: 'insideRight', fill: '#B0B0B0', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#2A2A2A',
                border: 'none',
                borderRadius: 8,
                color: '#fff'
              }}
              formatter={(value, name) => [
                name === 'cci' ? value : `${value}%`,
                name === 'cci' ? 'Consumer Confidence Index' : 'Return'
              ]}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Legend 
              wrapperStyle={{ bottom: 0, fontSize: 12 }}
              formatter={(value) => (
                <span style={{ color: value === 'cci' ? '#34C759' : '#FFD700' }}>
                  {value === 'cci' ? 'Consumer Confidence Index' : 'Returns'}
                </span>
              )}
            />
            <Line 
              yAxisId="left"
              type="monotone"
              dataKey="cci"
              stroke="#34C759"
              strokeWidth={2}
              dot={{ r: 2, fill: '#34C759' }}
              activeDot={{ r: 6, fill: '#34C759' }}
              name="cci"
              isAnimationActive={true}
            />
            <Line 
              yAxisId="right"
              type="monotone"
              dataKey="return"
              stroke="#FFD700"
              strokeWidth={2}
              dot={{ r: 2, fill: '#FFD700' }}
              activeDot={{ r: 6, fill: '#FFD700' }}
              name="return"
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CCIvsReturnsChart;
