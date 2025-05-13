'use client';

import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function DynamicPieChart({
  data = [],
  colors = ['#FF6384', '#FFCE56', '#36A2EB'],
  width = '100%',
  height = 300,
  title = 'Most frequent issues',
  chartType = 'donut',
  cardWidth = '400px', // NEW: control card width
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check screen size on mount
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768); // Mobile if <= 768px
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false); // Collapse by default in mobile
    } else {
      setIsOpen(true); // Open by default in desktop
    }
  }, [isMobile]);

  const toggleOpen = () => setIsOpen(!isOpen);

  const outerRadius = 100;
  const innerRadius = chartType === 'donut' ? 50 : 0;

  return (
    <div
      className="rounded-xl p-4 md:p-6 bg-card-bg flex flex-col h-full"
      style={{ width: cardWidth }}
    >
      {/* Header */}
      <div
        onClick={isMobile ? toggleOpen : undefined}
        className={`flex justify-between items-center ${isMobile ? 'cursor-pointer' : ''}`}
      >
        <h2 className=" md:text-2xl text-neutral-990  font-russo dark:text-white">
          {title}
        </h2>
        {isMobile && (
          isOpen ? (
            <ChevronUp size={20} className="text-neutral-900" />
          ) : (
            <ChevronDown size={20} className="text-neutral-900" />
          )
        )}
      </div>

      {/* Content */}
      {isOpen && (
        <div className="flex flex-col items-center mt-6 transition-all duration-300 ease-in-out">
          <div style={{ width: '100%', height }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={outerRadius}
                  innerRadius={innerRadius}
                  label={false}
                  paddingAngle={0}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Custom Legends */}
          <div className="flex flex-wrap gap-6 justify-center mt-8 ">
            {data.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: colors[index % colors.length] }}
                ></div>
                <span className="text-sm font-medium text-neutral-900 font-inter dark:text-white">
                  {entry.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}