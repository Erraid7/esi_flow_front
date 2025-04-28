"use client"

import { useState } from "react"
import { ArrowUp, Users, Settings, PenTool, FileText, CheckCircle, XCircle } from "lucide-react"

// Dynamic Card component that can be used for user stats and request stats
export const Card = ({ title, count, icon, increase = null, color = "primary" }) => {
  return (
    <div className="bg-card-bg rounded-lg shadow-sm p-6 transition-all hover:shadow-md">
        
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{title}</h2>
        {icon}
      </div>
      <div className="flex items-end">
        <span className="text-3xl font-bold text-neutral-950 dark:text-neutral-50">{count}</span>
        {increase !== null && (
          <div className="flex items-center ml-3 mb-1">
            <ArrowUp className={`h-3 w-3 text-${color}-500 dark:text-${color}-400 mr-0.5`} />
            <span className={`text-sm font-medium text-${color}-500 dark:text-${color}-400`}>
              {increase}%
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

// Example of how to use the Card component for both user management and maintenance requests
export default function Dashboard() {
  // State for the active tab (user management or maintenance requests)
  const [activeTab, setActiveTab] = useState("users")

  // User management data
  const userStats = [
    {
      title: "Total Users",
      count: 1210,
      increase: 15,
      icon: <Users className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
    {
      title: "Maintenance Team",
      count: 58,
      increase: 10,
      icon: <PenTool className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
    {
      title: "Administrators",
      count: 8,
      increase: 5,
      icon: <Settings className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
  ]

  // Maintenance request data
  const requestStats = [
    {
      title: "Total Request",
      count: 50,
      icon: <FileText className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
    {
      title: "Accepted Request",
      count: 32,
      icon: <CheckCircle className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
    {
      title: "Refused Request",
      count: 18,
      icon: <XCircle className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
  ]

  return (
    <div className="bg-neutral-50 dark:bg-neutral-900 p-6">
      {/* Tabs */}
      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => setActiveTab("users")}
          className={`px-4 py-2 rounded-md ${
            activeTab === "users"
              ? "bg-blue-500 text-white"
              : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
          }`}
        >
          User Management
        </button>
        <button
          onClick={() => setActiveTab("requests")}
          className={`px-4 py-2 rounded-md ${
            activeTab === "requests"
              ? "bg-blue-500 text-white"
              : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
          }`}
        >
          Maintenance Requests
        </button>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-neutral-950 dark:text-neutral-50 mb-6">
        {activeTab === "users" ? "User Management" : "Maintenance Request List"}
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {activeTab === "users"
          ? userStats.map((stat, index) => (
              <Card
                key={index}
                title={stat.title}
                count={stat.count}
                increase={stat.increase}
                icon={stat.icon}
              />
            ))
          : requestStats.map((stat, index) => (
              <Card
                key={index}
                title={stat.title}
                count={stat.count}
                icon={stat.icon}
                increase={null}
              />
            ))}
      </div>
    </div>
  )
}

// How to use the Card component in your UserManagement component:
export function UserManagement() {
  const [userData, setUserData] = useState({
    totalUsers: 1210,
    maintenanceTeam: 58,
    administrators: 8,
    loading: false,
    error: null
  })

  const stats = [
    {
      title: "Total Users",
      count: userData.totalUsers,
      increase: 15,
      icon: <Users className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
    {
      title: "Maintenance Team",
      count: userData.maintenanceTeam,
      increase: 10, 
      icon: <PenTool className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
    {
      title: "Administrators",
      count: userData.administrators,
      increase: 5,
      icon: <Settings className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <Card
          key={index}
          title={stat.title}
          count={stat.count}
          increase={stat.increase}
          icon={stat.icon}
        />
      ))}
    </div>
  )
}

// How to use the Card component in your MaintenanceRequests component:
export function MaintenanceRequests() {
  const [requestData, setRequestData] = useState({
    totalRequests: 50,
    acceptedRequests: 32,
    refusedRequests: 18,
    loading: false,
    error: null
  })

  const stats = [
    {
      title: "Total Request",
      count: requestData.totalRequests,
      icon: <FileText className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
    {
      title: "Accepted Request",
      count: requestData.acceptedRequests,
      icon: <CheckCircle className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
    {
      title: "Refused Request",
      count: requestData.refusedRequests,
      icon: <XCircle className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <Card
          key={index}
          title={stat.title}
          count={stat.count}
          icon={stat.icon}
        />
      ))}
    </div>
  )
}