"use client"

import { useState, useEffect } from "react"
import { ArrowUp, ChevronRight, Home, Users, Settings, PenTool } from "lucide-react"
import axios from "axios"


export default function UserManagement() {
  // State for storing data from API
  const [userData, setUserData] = useState({
    totalUsers: 0,
    maintenanceTeam: 0,
    administrators: 0,
    loading: true,
    error: null
  })

  // Function to fetch users data
  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      const users = response.data;
      
      // Calculate user statistics
      const totalUsers = users.length;
      const maintenanceTeam = users.filter(user => user.role === "maintenance").length;
      const administrators = users.filter(user => user.role === "admin").length;
      
      setUserData({
        totalUsers,
        maintenanceTeam,
        administrators,
        loading: false,
        error: null
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUserData(prev => ({
        ...prev,
        loading: false,
        error: "Failed to load user data"
      }));
    }
  }

  // Fetch data when component mounts
  useEffect(() => {
    fetchUserData();
  }, []);

  // Generate stats cards data based on API response
  const stats = [
    {
      title: "Total Users",
      count: userData.totalUsers,
      increase: 6, // You could calculate this dynamically with historical data
      icon: <Users className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
    {
      title: "Maintenance Team",
      count: userData.maintenanceTeam,
      increase: 0,
      icon: <PenTool className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
    {
      title: "Administrators",
      count: userData.administrators,
      increase: 2,
      icon: <Settings className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
  ]

  return (
    <div className="bg-neutral-50 dark:bg-neutral-990">
      {/* Breadcrumb navigation */}
      <div className="px-6 py-4 flex items-center text-sm text-neutral-600 dark:text-neutral-400">
        <a href="#" className="hover:text-neutral-950 dark:hover:text-neutral-50 flex items-center">
          <Home className="h-4 w-4 mr-1 text-neutral-950 dark:text-white" />
          Dashboard
        </a>
        <ChevronRight className="h-4 w-4 mx-2 text-neutral-950 dark:text-white" />
        <a href="#" className="hover:text-neutral-950 dark:hover:text-neutral-50">
          Mes demandes
        </a>
        <ChevronRight className="h-4 w-4 mx-2 text-neutral-950 dark:text-white" />
        <span className="text-neutral-950 dark:text-neutral-50 font-medium">Nouvelle demande</span>
      </div>

      {/* Main content */}
      <div className="px-6 pb-8">
        <h1 className="text-2xl font-bold text-neutral-950 dark:text-neutral-50 mb-6">User Management</h1>

        {/* Loading and error states */}
        {userData.loading && (
          <div className="text-center py-6">
            <p className="text-neutral-600 dark:text-neutral-400">Loading user data...</p>
          </div>
        )}

        {userData.error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-lg mb-6">
            <p>{userData.error}</p>
            <button 
              onClick={fetchUserData}
              className="text-sm underline mt-2 text-red-600 dark:text-red-300"
            >
              Try again
            </button>
          </div>
        )}

        {/* Stats cards */}
        {!userData.loading && !userData.error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6 transition-all hover:shadow-md"
              >
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{stat.title}</h2>
                  {stat.icon}
                </div>
                <div className="flex items-end">
                  <span className="text-3xl font-bold text-neutral-950 dark:text-neutral-50">{stat.count}</span>
                  <div className="flex items-center ml-3 mb-1">
                    <ArrowUp className="h-3 w-3 text-primary-500 dark:text-primary-400 mr-0.5" />
                    <span className="text-sm font-medium text-primary-500 dark:text-primary-400">{stat.increase}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}