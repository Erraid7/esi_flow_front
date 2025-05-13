"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import DynamicPieChart from "../../components/pie"
import Sidebar from "../../components/sidebar"
import { Menu, Plus, Bell } from "lucide-react"
import { useLanguage } from "../../translations/contexts/languageContext"
import { useDarkMode } from "../../darkLightMode/darkModeContext"
import DynamicTable from "../../components/dynamicTable1"

export default function PersonalDashboard() {
  const { t } = useLanguage()
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  const { isDarkMode } = useDarkMode()
  const [tasks, setTasks] = useState([])
  const [requests, setRequests] = useState([])
  const [userRequests, setUserRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [progressPercentage, setProgressPercentage] = useState(0)
  const [currentUser, setCurrentUser] = useState({
    id: null,
    name: "hannachi anes",
    role: "personal",
    initials: "HA",
  })

  const API_BASE_URL = "https://esi-flow-back.onrender.com"

  // Get current user from localStorage
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
      name: user.name || "hannachi anes",
      role: user.role || "personal",
      initials: user.name
        ? user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
        : "HA",
    })
  }, [])

  // Check if mobile on client side
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Fetch all tasks and requests from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Get current user
        const user = getCurrentUser()

        if (!user.id) {
          throw new Error("User not authenticated")
        }

        // Get all interventions (tasks)
        const interventionsResponse = await axios.get(`${API_BASE_URL}/interventions`)

        // Get all requests
        const requestsResponse = await axios.get(`${API_BASE_URL}/requests`)

        if (
          interventionsResponse.data &&
          Array.isArray(interventionsResponse.data) &&
          requestsResponse.data &&
          Array.isArray(requestsResponse.data)
        ) {
          const allTasks = interventionsResponse.data
          const allRequests = requestsResponse.data

          setTasks(allTasks)
          setRequests(allRequests)

          // Filter requests made by the current user
          const userRequestsList = allRequests.filter((request) => request.requester_id === user.id)
          setUserRequests(userRequestsList)

          // Find the latest request that has a task
          if (userRequestsList.length > 0 && allTasks.length > 0) {
            calculateProgress(userRequestsList, allTasks)
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err)
        setError(err.message || "Failed to fetch data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Calculate progress percentage based on the latest request's task status
  const calculateProgress = (userRequests, allTasks) => {
    if (!userRequests || userRequests.length === 0 || !allTasks || allTasks.length === 0) {
      setProgressPercentage(0)
      return
    }

    // Sort requests by creation date (newest first)
    const sortedRequests = [...userRequests].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

    // Find the latest request that has a task
    let latestRequestWithTask = null
    let latestTask = null

    for (const request of sortedRequests) {
      const relatedTask = allTasks.find((task) => task.request_id === request.id)
      if (relatedTask) {
        latestRequestWithTask = request
        latestTask = relatedTask
        break
      }
    }

    if (!latestTask) {
      setProgressPercentage(0)
      return
    }

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

  // Process data for pie chart - count tasks by status for the user's requests
  const getPieChartData = () => {
    if (!userRequests || userRequests.length === 0 || !tasks || tasks.length === 0) {
      return [
        { name: t("dashboard", "personal", "requestStatuses", "completed"), value: 0 },
        { name: t("dashboard", "personal", "requestStatuses", "pending"), value: 0 },
        { name: t("dashboard", "personal", "requestStatuses", "toDo"), value: 0 },
        { name: t("dashboard", "personal", "requestStatuses", "inProgress"), value: 0 },
        { name: t("dashboard", "personal", "requestStatuses", "canceled"), value: 0 },
      ]
    }

    // Get all request IDs made by the user
    const userRequestIds = userRequests.map((req) => req.id)

    // Filter tasks related to user's requests
    const userTasks = tasks.filter((task) => userRequestIds.includes(task.request_id))

    // Count tasks by status
    const statusCounts = {
      Completed: 0,
      Pendding: 0, // Using the exact spelling from your model
      "To Do": 0,
      "In Progress": 0,
      Cancelled: 0,
    }

    userTasks.forEach((task) => {
      if (statusCounts.hasOwnProperty(task.intv_status)) {
        statusCounts[task.intv_status]++
      }
    })

    // Map to the expected format for the pie chart
    return [
      { name: t("dashboard", "personal", "requestStatuses", "completed"), value: statusCounts["Completed"] },
      { name: t("dashboard", "personal", "requestStatuses", "pending"), value: statusCounts["Pendding"] },
      { name: t("dashboard", "personal", "requestStatuses", "toDo"), value: statusCounts["To Do"] },
      { name: t("dashboard", "personal", "requestStatuses", "inProgress"), value: statusCounts["In Progress"] },
      { name: t("dashboard", "personal", "requestStatuses", "canceled"), value: statusCounts["Cancelled"] },
    ]
  }

  // Navigate to notifications page
  const handleNotificationClick = () => {
    router.push("/notif")
  }

  // Format requests data for the table
  const formatRequestsForTable = useCallback(() => {
    if (!userRequests || userRequests.length === 0) {
      return []
    }

    return userRequests.map((request) => {
      // Format date
      const formattedDate = request.created_at ? new Date(request.created_at).toLocaleDateString() : "N/A"

      return {
        id: request.id,
        inventoryCode: request.request_code || "N/A",
        title: request.title || "No Title",
        location: request.localisation || "N/A",
        requestedBy: currentUser.name,
        urgency: request.priority || "Medium",
        status: request.req_status || "Pending",
        createdAt: formattedDate,
        
        description: request.description || "",
        // Add any other fields needed for the table
      }
    })
  }, [userRequests, currentUser.name])

  // Handle request edit
  const handleEdit = useCallback(
    (requestId) => {
      router.push(`/requests/edit/${requestId}`)
    },
    [router],
  )

  // Handle request delete confirmation
  const confirmDelete = useCallback((requestId) => {
    // Implement your delete confirmation logic here
    console.log("Confirm delete request:", requestId)
  }, [])

  // Handle adding a new request
  const handleAddRequest = useCallback(() => {
    router.push("/request/add")
  }, [router])

  // Progress Card Component
  const ProgressCard = () => {
    const progress = progressPercentage

    return (
      <div className="bg-card-bg rounded-lg p-4 sm:p-6 shadow-sm w-full h-full">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <button className="text-black p-1.5 sm:p-2 bg-card-bg rounded-full">
            <Plus size={isMobile ? 16 : 20} className="text-blue-500" />
          </button>
          <h2 className="text-lg sm:text-xl font-russo dark:text-neutral-100">{t("dashboard", "personal", "lastRequestProgress")}</h2>
        </div>
        <p className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6">
          {t("dashboard", "personal", "clickAndDiscover")}
        </p>
        <div className="flex justify-end mb-2">
          <span className="font-bold text-xl sm:text-2xl">{progress}%</span>
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

  // Notification Card Component
  const NotificationCard = () => {
    return (
      <div className="bg-card-bg rounded-lg p-4 sm:p-6 shadow-sm w-full h-full">
        <div className="flex items-center gap-3 sm:gap-4 mb-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-200  dark:bg-card-bg flex items-center justify-center">
            <Bell size={16} className="text-blue-500" />
          </div>
          <h2 className="text-lg sm:text-xl font-russo dark:text-neutral-100">{t("dashboard", "personal", "myNotification")}</h2>
        </div>
        <p className="text-xs sm:text-sm text-gray-400 mb-6 sm:mb-8">
          {t("dashboard", "personal", "clickAndDiscover")}
        </p>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white font-inter font-medium px-3 py-1.5 sm:px-4 sm:py-2 text-sm rounded-lg"
            onClick={handleNotificationClick}
          >
            {t("dashboard", "personal", "viewNotification")}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-14 lg:pt-0 flex min-h-screen bg-neutral-50 dark:bg-neutral-990 overflow-hidden px-4 sm:px-4 md:px-6 lg:px-6">
      {/* Sidebar - hidden on mobile */}
      <div className="md:block">
        <Sidebar
          activeItem={"dashboard"}/>
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
              <Menu size={24} />
            </button>
          )}
          <h2 className="font-russo text-xl sm:text-2xl md:text-3xl dark:text-neutral-100">{t("dashboard", "personal", "title")}</h2>
        </div>

        {/* Main content with responsive padding */}
        <div className="p-2 sm:p-4 md:p-6">
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
              <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
                {/* Left side - Pie Chart - full width on mobile */}
                <div className="w-full md:w-1/2">
                  <div>
                    <DynamicPieChart
                      data={getPieChartData()}
                      colors={["#34D399", "#FFC233", "#A78BFA", "#4CB5F5", "#FF4C61"]}
                      title={t("dashboard", "personal", "requestStatus")}
                      chartType="donut"
                      height={isMobile ? 220 : 270}
                      cardWidth="100%"
                    />
                  </div>
                </div>

                {/* Right side - Cards with responsive gap */}
                <div className="w-full md:w-1/2 flex flex-col gap-4 sm:gap-6">
                  <ProgressCard />
                  <NotificationCard />
                </div>
              </div>

              {/* Requests Table */}
              <div className="mt-6">
                <DynamicTable
                  data={formatRequestsForTable()}
                  isDarkMode={isDarkMode}
                  title={t("requestList", "searchbar", "title") || "Request List"}
                  columnConfig={{
                    id: { hidden: true }, // Hide ID column
                    title: { title: t("requestList", "columns", "title") || "Title" },
                    location: { title: t("requestList", "columns", "location") || "Location" },
                    requestedBy: { title: t("requestList", "columns", "requestedBy") || "Requested By" },
                    urgency: { title: t("requestList", "columns", "urgencyLevel") || "Urgency" },
                    status: { title: t("requestList", "columns", "status") || "Status" },
                    createdAt: { title: t("requestList", "columns", "createdAt") || "Created At" },
                    inventoryCode: { title: t("requestList", "columns", "inventoryCode") || "Inventory Code" },
                    description: { hidden: true }, // Hide description column
                    _equipment: { hidden: true }, // Hide equipment object
                    _requester: { hidden: true }, // Hide requester object
                    Actions : { hidden: true }, // Hide action column
                    
                
                  }}
                  
                  addButtonText={t("requestList", "searchbar", "addButton") || "Add Request"}
                  dropdownFields={["urgency", "status"]}
                  onEdit={handleEdit}
                  onDelete={confirmDelete}
                  onAddNew={handleAddRequest}
                  styled={["status", "urgency"]}
                  emptyStateMessage={t("requestList", "emptyState") || "No requests found"}
                  withSearch 
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}