"use client"

import DynamicPieChart from "./pie"
import Sidebar from "../../components/sidebar"
import { Menu, Plus } from 'lucide-react'
import { useLanguage } from "../../translations/contexts/languageContext"
import { useEffect, useState } from "react"

export default function Dashboard() {
  const { t } = useLanguage()
  const [isMobile, setIsMobile] = useState(false)
  
  // Check if mobile on client side
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Initial check
    checkIfMobile()
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile)
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  // Data for the pie chart
  const pieData = [
    { name: t("dashboard", "charts", "priority", "high"), value: 400 },
    { name: t("dashboard", "charts", "priority", "medium"), value: 200 },
    { name: t("dashboard", "charts", "priority", "low"), value: 100 },
  ]

  // Current user for sidebar
  const currentUser = {
    name: "bendifallah Rami",
    role: "technician",
    initials: "BA",
  }

  // Progress Card Component
  const ProgressCard = () => {
    const progress = 66

    return (
      <div className="bg-card-bg rounded-lg p-4 sm:p-6 shadow-sm w-full h-full">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <button className="text-black p-1.5 sm:p-2 bg-card-bg rounded-full">
            <Plus size={isMobile ? 16 : 20} className="text-blue-500" />
          </button>
          <h2 className="text-lg sm:text-xl font-russo">{t("dashboard", "technician", "lastTaskProgress")}</h2>
        </div>
        <p className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6">{t("dashboard", "technician", "clickAndDiscover")}</p>
        <div className="flex justify-end mb-2">
          <span className="font-bold text-xl sm:text-2xl">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2.5">
          <div className="bg-blue-500 h-2 sm:h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    )
  }

  // Report Card Component
  const ReportCard = () => {
    return (
      <div className="bg-card-bg rounded-lg p-4 sm:p-6 shadow-sm w-full h-full">
        <div className="flex items-center gap-3 sm:gap-4 mb-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-200"></div>
          <h2 className="text-lg sm:text-xl font-russo">{t("dashboard", "technician", "makeReport")}</h2>
        </div>
        <p className="text-xs sm:text-sm text-gray-400 mb-6 sm:mb-8">{t("dashboard", "technician", "clickAndDiscover")}</p>
        <div className="flex justify-end">
          <button className="bg-blue-500 text-white font-inter font-medium px-3 py-1.5 sm:px-4 sm:py-2 text-sm rounded-lg">
            {t("dashboard", "technician", "makeReport")}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-neutral-50 dark:bg-neutral-990 overflow-hidden px-4 sm:px-4 md:px-6 lg:px-20">
      {/* Sidebar - hidden on mobile */}
      <div className=" md:block">
        <Sidebar
          activeItem={"dashboard"}
          userRole={currentUser.role}
          userName={currentUser.name}
          userInitials={currentUser.initials}
        />
      </div>
      
      <div className="flex-1 overflow-auto">
        {/* Header with responsive padding and font size */}
        <div className="flex items-center p-4 sm:p-6 md:p-10">
          {isMobile && (
            <button 
              className="mr-3 text-gray-700"
              onClick={() => {
                // Implement your sidebar toggle logic here
              }}
            >
            
            </button>
          )}
          <h2 className="font-russo text-xl sm:text-2xl md:text-3xl">
            {t("dashboard", "technician", "title")}
          </h2>
        </div>
        
        {/* Main content with responsive padding */}
        <div className="p-2 sm:p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
            {/* Left side - Pie Chart - full width on mobile */}
            <div className="w-full md:w-1/2">
              <div>
                <DynamicPieChart
                  data={pieData}
                  colors={["#FF4C61", "#FFC233", "#4CB5F5"]}
                  title={t("dashboard", "technician", "mostFrequentIssues")}
                  chartType="pie"
                  height={isMobile ? 220 : 270}
                  cardWidth="100%"
                />
              </div>
            </div>

            {/* Right side - Cards with responsive gap */}
            <div className="w-full md:w-1/2 flex flex-col gap-4 sm:gap-6">
              <ProgressCard />
              <ReportCard />
            </div>
          </div>
        </div>
      </div>
      
     
    </div>
  )
}