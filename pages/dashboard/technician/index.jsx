"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import DynamicPieChart from "../../components/pie"
import Sidebar from "../../components/sidebar"
import { Plus, Shield, X, AlertTriangle, Loader2 } from "lucide-react"
import { useLanguage } from "../../translations/contexts/languageContext"
import { useDarkMode } from "../../darkLightMode/darkModeContext"
import DynamicTable from "../../components/dynamicTable1"

export default function Dashboard() {
  const { t } = useLanguage()
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const { isDarkMode } = useDarkMode()
  const [tasks, setTasks] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userRole, setUserRole] = useState("")
  const [progressPercentage, setProgressPercentage] = useState(0)
  const [currentUser, setCurrentUser] = useState({
    id: null,
    name: "bendifallah Rami",
    role: "technician",
  })

  // Toast notification state
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  })

  // Delete confirmation dialog
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const API_BASE_URL = "https://esi-flow-back.onrender.com"

  // Get current user from localStorage - moved to useEffect
  const getCurrentUser = () => {
    if (typeof window === "undefined") return { id: null, role: "user" }

    try {
      const userString = localStorage.getItem("user")
      if (userString) {
        return JSON.parse(userString)
      }
      return { id: null, role: "user" }
    } catch (error) {
      console.error("Error getting user from localStorage:", error)
      return { id: null, role: "user" }
    }
  }

  // Initialize user data from localStorage
  useEffect(() => {
    const user = getCurrentUser()
    setCurrentUser({
      id: user.id,
      name: user.full_name || user.name,
      role: user.role,
    })
  }, [])

  // Check if mobile on client side
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640)
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024)
    }

    // Initial check
    checkScreenSize()

    // Add event listener
    window.addEventListener("resize", checkScreenSize)

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  // Show notification function
  const showToast = (message, type = "success") => {
    setToast({
      visible: true,
      message,
      type,
    })
    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }))
    }, 3000)
  }

  // Fetch all tasks from backend
  const fetchTasks = async () => {
    try {
      setLoading(true)
      const user = getCurrentUser()

      if (user) setUserRole(user.role);

      // Get interventions assigned to the current technician
      const response = await axios.get(`${API_BASE_URL}/interventions/technician/${user.id}`)

      if (response.data && Array.isArray(response.data)) {
        // Store all tasks
        setTasks(response.data)
        setFilteredTasks(response.data)

        // Calculate progress based on the most recent task
        if (response.data.length > 0) {
          calculateProgress(response.data)
        }
      }
    } catch (err) {
      console.error("Error fetching tasks:", err)
      showToast("Failed to load tasks. Please try again.", "error")
    } finally {
      setLoading(false)
    }
  }

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks()
  }, [])

  // Calculate progress percentage based on task status
  const calculateProgress = (tasksList) => {
    if (!tasksList || tasksList.length === 0) {
      setProgressPercentage(0)
      return
    }

    // Sort tasks by updated_at to get the most recent one
    const sortedTasks = [...tasksList].sort(
      (a, b) => new Date(b.updated_at || b.date_creation) - new Date(a.updated_at || a.date_creation),
    )

    const latestTask = sortedTasks[0]

    // Assign percentage based on status
    const statusPercentages = {
      "To Do": 10,
      "In Progress": 50,
      Pendding: 75, // Using the exact spelling from your model
      Completed: 100,
      Cancelled: 0,
    }

    setProgressPercentage(statusPercentages[latestTask.intv_status] || 0)
  }

  // Process data for pie chart - using intervention_type instead of priority
  const getPieChartData = () => {
    if (!filteredTasks || filteredTasks.length === 0) {
      return [
        { name: t("dashboard", "charts", "priority", "high"), value: 0 },
        { name: t("dashboard", "charts", "priority", "medium"), value: 0 },
        { name: t("dashboard", "charts", "priority", "low"), value: 0 },
      ]
    }

    // Count tasks by intervention_type
    const typeCounts = {
      Repair: 0,
      Maintenance: 0,
      Replacement: 0,
    }

    filteredTasks.forEach((task) => {
      if (task.intervention_type && typeCounts.hasOwnProperty(task.intervention_type)) {
        typeCounts[task.intervention_type]++
      }
    })

    // Map intervention types to priority labels for display
    return [
      { name: t("dashboard", "charts", "priority", "high"), value: typeCounts.Repair },
      { name: t("dashboard", "charts", "priority", "medium"), value: typeCounts.Maintenance },
      { name: t("dashboard", "charts", "priority", "low"), value: typeCounts.Replacement },
    ]
  }

  // Navigate to report page
  const handleReportClick = () => {
    router.push("/task/list")
  }

  // Handle adding a new task
  const handleAddTask = useCallback(() => {
    router.push("/tasks/new")
  }, [router])

  // Format tasks data for the table
  const formatTasksForTable = useCallback(async () => {
    if (!filteredTasks || filteredTasks.length === 0) {
      return []
    }

    // Create an array to store the formatted data
    const formattedData = []

    // Process each intervention
    for (const intervention of filteredTasks) {
      try {
        // Fetch the associated request
        let request = null
        try {
          const requestResponse = await axios.get(`${API_BASE_URL}/requests/${intervention.request_id}`)
          request = requestResponse.data
        } catch (requestError) {
          console.error(`Error fetching request for intervention ${intervention.id}:`, requestError)
          // Continue with minimal data if request fetch fails
        }

        // Format the date if it exists
        let formattedDeadline = "N/A"
        if (intervention.deadline) {
          const deadlineDate = new Date(intervention.deadline)
          formattedDeadline = deadlineDate.toISOString().split("T")[0]
        }

        // Map the data to the table structure
        formattedData.push({
          "Task name": request?.title || "Untitled Task",
          Location: request?.localisation || "N/A",
          Responsible: currentUser.name || "Unassigned",
          Priority: request?.priority || "Medium",
          Deadline: formattedDeadline,
          Status: intervention.intv_status || "To Do",
          id: intervention.id,
          // Store only the IDs if needed for reference
          intervention_id: intervention.id,
          request_id: intervention.request_id,
        })
      } catch (error) {
        console.error(`Error processing intervention ${intervention.id}:`, error)
      }
    }

    return formattedData
  }, [filteredTasks, currentUser.name])

  // Handle edit task
  const handleEditTask = (row) => {
    router.push(`/task/edit/${row.id}`)
  }

  // Show delete confirmation
  const confirmDelete = (row) => {
    setDeleteConfirm(row)
  }

  // Handle delete task
  const handleDelete = async () => {
    if (!deleteConfirm) return

    try {
      // Get the original ID from the row
      const id = deleteConfirm.id

      // Make the API call to delete the intervention
      await axios.delete(`${API_BASE_URL}/interventions/${id}`)

      // Refresh the data
      fetchTasks()
      showToast("Task deleted successfully", "success")

      // Close the confirmation dialog
      setDeleteConfirm(null)
    } catch (err) {
      console.error("Error deleting task:", err)
      showToast("Failed to delete task. Please try again.", "error")
    }
  }

  // Progress Card Component
  const ProgressCard = () => {
    const progress = progressPercentage

    return (
      <div className="bg-card-bg rounded-lg p-4 sm:p-6 shadow-sm w-full h-full">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <button className="text-black p-1.5 sm:p-2 bg-card-bg rounded-full">
            <Plus size={isMobile ? 16 : 20} className="text-blue-500" />
          </button>
          <h2 className="text-lg sm:text-xl font-russo dark:text-neutral-100">
            {t("dashboard", "technician", "lastTaskProgress")}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6">{t("dashboard", "technician", "progress")}</p>
        <div className="flex justify-end mb-2">
          <span className="font-bold text-xl sm:text-2xl dark:text-neutral-100">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2.5">
          <div
            className="bg-blue-500 h-2 sm:h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    )
  }

  // Report Card Component
  const ReportCard = () => {
    return (
      <div className="bg-card-bg rounded-lg p-4 sm:p-6 shadow-sm w-full h-full">
        <div className="flex items-center gap-3 sm:gap-4 mb-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-200 flex items-center justify-center dark:bg-card-bg">
            <Shield size={16} className="text-blue-500 " />
          </div>
          <h2 className="text-lg sm:text-xl font-russo dark:text-neutral-100">
            {t("dashboard", "technician", "makeReport")}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-gray-400 mb-6 sm:mb-8">
          {t("dashboard", "technician", "clickAndDiscover")}
        </p>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white font-inter font-medium px-3 py-1.5 sm:px-4 sm:py-2 text-sm rounded-lg"
            onClick={handleReportClick}
          >
            {t("dashboard", "technician", "makeReport")}
          </button>
        </div>
      </div>
    )
  }

  // State for table data
  const [tableData, setTableData] = useState([])
  const [loadingTable, setLoadingTable] = useState(true)

  // Load table data
  useEffect(() => {
    const loadTableData = async () => {
      if (filteredTasks.length > 0) {
        setLoadingTable(true)
        try {
          const formattedData = await formatTasksForTable()
          setTableData(formattedData)
        } catch (error) {
          console.error("Error formatting table data:", error)
        } finally {
          setLoadingTable(false)
        }
      } else {
        setTableData([])
        setLoadingTable(false)
      }
    }

    loadTableData()
  }, [filteredTasks, formatTasksForTable])

  return (
    <div className="pt-14 lg:pt-0 flex mt min-h-screen bg-neutral-50 dark:bg-neutral-990 px-2 sm:px-4 md:px-6 lg:px-20">
      {/* Sidebar - hidden on mobile */}
      <div className="block">
        <Sidebar activeItem={"dashboard"} />
      </div>

      {/* Notification component */}
      {toast.visible && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center p-4 mb-4 rounded-lg shadow-md ${
            toast.type === "success"
              ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
              : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
          }`}
        >
          <div className="text-sm font-medium">{toast.message}</div>
          <button
            type="button"
            className="ml-4 -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8 focus:ring-2 focus:ring-gray-300"
            onClick={() => setToast((prev) => ({ ...prev, visible: false }))}
          >
            <X className="w-5 h-5" />
            <span className="sr-only">Close</span>
          </button>
        </div>
      )}

      {/* Delete confirmation dialog */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6 max-w-md w-full">
            <div className="flex items-center text-amber-500 mb-4">
              <AlertTriangle className="h-6 w-6 mr-2" />
              <h3 className="text-lg font-medium text-neutral-900 dark:text-white">Confirm Deletion</h3>
            </div>

            <div className="mb-6 text-neutral-700 dark:text-neutral-300">
              <p>Are you sure you want to delete this task?</p>
              <div className="mt-4 p-4 bg-neutral-100 dark:bg-neutral-700 rounded-md">
                <p>
                  <strong>Task:</strong> {deleteConfirm["Task name"]}
                </p>
                <p>
                  <strong>Status:</strong> {deleteConfirm.Status}
                </p>
                <p>
                  <strong>Responsible:</strong> {deleteConfirm.Responsible}
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 w-full max-w-full overflow-x-hidden">
        {/* Header with responsive padding and font size */}
        <div className="flex items-center p-4 sm:p-6 md:p-10">
          <h2 className="font-russo text-xl sm:text-2xl md:text-3xl dark:text-neutral-100">
            {t("dashboard", "technician", "title")}
          </h2>
        </div>

        {/* Main content with responsive padding */}
        <div className=" p-2 sm:p-4 md:p-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                {/* Left side - Pie Chart - full width on mobile */}
                <div className="w-full lg:w-1/2">
                  <div>
                    <DynamicPieChart
                      data={getPieChartData()}
                      colors={["#FF4C61", "#FFC233", "#4CB5F5"]}
                      title={t("dashboard", "technician", "mostFrequentIssues")}
                      chartType="pie"
                      height={isMobile ? 200 : isTablet ? 240 : 270}
                      cardWidth="100%"
                    />
                  </div>
                </div>

                {/* Right side - Cards with responsive gap */}
                <div className="w-full lg:w-1/2 flex flex-col gap-4 sm:gap-6">
                  <ProgressCard />
                  <ReportCard />
                </div>
              </div>

              {/* Tasks Table */}
              <div className="mt-6 overflow-x-auto">
                <div className="min-w-full">
                  {loadingTable ? (
                    <div className="flex justify-center items-center h-64">
                      <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
                      <span className="ml-2 text-neutral-600 dark:text-neutral-300">Loading tasks...</span>
                    </div>
                  ) : (
                    <DynamicTable
                      data={tableData}
                      isDarkMode={isDarkMode}
                      title={t("dashboard", "tasks", "title") || "My Tasks"}
                      columnConfig={{
                        "Task name": { title: t("tasksList", "tablehead", 1) },
                        Location: { title: t("tasksList", "tablehead", 2) },
                        Responsible: { title: t("tasksList", "tablehead", 3) },
                        Priority: { title: t("tasksList", "tablehead", 4) },
                        Deadline: { title: t("tasksList", "tablehead", 5) },
                        Status: { title: t("tasksList", "tablehead", 6) },
                        id: { hidden: true },
                        intervention_id: { hidden: true },
                        request_id: { hidden: true },
                      }}
                      dropdownFields={["Priority", "Status"]}
                      onEdit={handleEditTask}
                      showDeleteAction={userRole === "Admin"} // Show delete action only for Admin
                      onDelete={confirmDelete}
                      styled={["Priority", "Status"]}
                      showAddButton={false}
                      refreshData={fetchTasks}
                      emptyStateMessage={t("dashboard", "tasks", "noTasks") || "No tasks assigned to you"}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
