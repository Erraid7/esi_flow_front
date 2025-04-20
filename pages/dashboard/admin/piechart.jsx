import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const PriorityRequestChart = () => {
    const data = [
        { name: 'High Priority', value: 60, color: '#FC4E68' },
        { name: 'Medium Priority', value: 30, color: '#FFCC33' },
        { name: 'Low Priority', value: 10, color: '#36A2EB' }
    ];

    const COLORS = ['#FFB6C1', '#FFE4B5', '#ADD8E6'];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={90} // Keep only outerRadius for a simple pie chart
                    paddingAngle={0}
                    dataKey="value"
                    strokeWidth={0} // Remove stroke for cleaner look
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip
                    formatter={(value) => [`${value}%`, 'Requests']}
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
                />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default PriorityRequestChart;
