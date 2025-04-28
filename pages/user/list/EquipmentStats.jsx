"use client"

import { useState, useEffect } from "react"
import {ArrowRight2} from 'iconsax-react'

// Icons component to render the different icons used in stats cards
const Icon = ({ name, className = "" }) => {
  switch (name) {
    case "database":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
        </svg>
      )
    case "alert-triangle":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      )
    case "tool":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
        </svg>
      )
    case "ban":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
        </svg>
      )
    default:
      return null
  }
}

// StatsCard component for each equipment category
const StatsCard = ({ title, count, icon, color, bgColor }) => {
  return (
    <div className={`rounded-lg p-6 transition-all ${bgColor} flex flex-col dark:bg-opacity-20`}>
      <div className={`${color} mb-4`}>
        <Icon name={icon} className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-1">
        {title}
      </h3>
      <div className="flex items-end justify-between">
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          {count} items
        </p>
      </div>
    </div>
  )
}

// Equipment stats component that can be imported and used in your index.js
export default function EquipmentStats({ statsData }) {
  // Default stats in case none are provided
  const defaultStats = [
    {
      id: "total",
      title: "Total Equipment",
      count: 142,
      icon: "database",
      color: "text-blue-500",
      bgColor: "bg-card-bg"
    },
    {
      id: "maintenance",
      title: "Needs Maintenance",
      count: 17,
      icon: "alert-triangle",
      color: "text-amber-500",
      bgColor: "bg-card-bg"
    },
    {
      id: "working",
      title: "Working",
      count: 8,
      icon: "tool",
      color: "text-emerald-500",
      bgColor: "bg-card-bg"
    },
    {
      id: "outOfService",
      title: "Out of Service",
      count: 5,
      icon: "ban",
      color: "text-red-500",
      bgColor: "bg-card-bg"
    }
  ]

  // Use provided stats or fall back to default stats
  const stats = statsData || defaultStats

  return (
    <>
    <div className='flex items-center gap-2 mb-8 text-neutral-950 dark:text-neutral-50'>
            Dashboard <ArrowRight2 size="14" color="#697689"/> Equipment
            </div>
    
            <h2 className='font-russo text-neutral-950 dark:text-neutral-100 text-xl mb-5'>Equipment Management</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        
        {stats.map((stat) => (
          <StatsCard 
            key={stat.id}
            title={stat.title}
            count={stat.count}
            icon={stat.icon}
            color={stat.color}
            bgColor={stat.bgColor}
          />
        ))}
      </div>
    
    </>


  )
}