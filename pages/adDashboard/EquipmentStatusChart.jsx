import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';

const EquipmentStatusChart = () => {
  const data = [
    { name: 'Cancelled', count: 65, color: '#FFB6C1' },
    { name: 'In Progress', count: 55, color: '#FFE4B5' },
    { name: 'Pending', count: 78, color: '#FFFACD' },
    { name: 'Completed', count: 88, color: '#BAFAD0' },
    { name: 'To Do', count: 50, color: '#ADD8E6' }
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart 
        data={data} 
        margin={{ 
          top: 5, 
          right: 10, 
          left: 0, 
          bottom: 5 
        }}
      >
        <XAxis 
          dataKey="name" 
          tick={{ fontSize: 10 }} 
          interval={0}
          tickMargin={5}
        />
        <YAxis 
          tick={{ fontSize: 10 }}
          tickMargin={5}
        />
        <Tooltip
          contentStyle={{ 
            backgroundColor: '#fff', 
            borderRadius: '8px', 
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)' 
          }}
        />
        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default EquipmentStatusChart;