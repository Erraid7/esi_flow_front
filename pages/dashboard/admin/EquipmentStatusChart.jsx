"use client"

import { useState, useEffect, } from "react"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts"
import { ChevronDown, ChevronUp, Route } from "lucide-react" // Assuming you're using lucide-react for icons
import { useRouter } from "next/navigation" // Import useRouter from next/navigation for App Router

const EquipmentStatusChart = ({ data, title = "Task Status" }) => {
  // State for mobile detection and dropdown
  const [isMobile, setIsMobile] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const router = useRouter() // Initialize the router

  // Default data if none is provided
  const chartData = data || [
    { name: "Cancelled", count: 65, color: "#FFB6C1" },
    { name: "In Progress", count: 55, color: "#FFE4B5" },
    { name: "Pending", count: 78, color: "#FFFACD" },
    { name: "Completed", count: 88, color: "#BAFAD0" },
    { name: "To Do", count: 50, color: "#ADD8E6" },
  ]

  // Effect to detect mobile screen and set initial state
  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileView = window.innerWidth < 768
      setIsMobile(isMobileView)
      // On desktop, always keep it open
      if (!isMobileView) {
        setIsOpen(true)
      }
    }

    // Set initial state
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  return (
    <div className="bg-card-bg dark:bg-card-bg-dark rounded-lg p-6 h-full">
      {/* Title with dropdown toggle for mobile */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-russo text-neutral-990 dark:text-white">{title}</h3>
        {isMobile && (
          <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <ChevronUp className="text-gray-600 dark:text-gray-400" size={20} />
            ) : (
              <ChevronDown className="text-gray-600 dark:text-gray-400" size={20} />
            )}
          </div>
        )}
      </div>

      {/* Chart content - shown/hidden based on isOpen state */}
      {isOpen && (
        <>
          <div className="h-64 mt-4 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} tickMargin={5} />
                <YAxis tick={{ fontSize: 10 }} tickMargin={5} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mb-4">
            {chartData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-neutral-950 dark:text-gray-300">{item.name}</span>
              </div>
            ))}
          </div>

          {/* Optional button */}
          <div className="flex justify-end">
            <button 
            className="bg-primary-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-300"
            onClick={() => router.push("/task/list")}
            >
              View Details
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default EquipmentStatusChart