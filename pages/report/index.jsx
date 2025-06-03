"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import DynamicTable from "../components/dynamicTable1"
import Sidebar from "../components/sidebar"
import { useDarkMode } from "../darkLightMode/darkModeContext"
import { ArrowRight2 } from "iconsax-react"
import { useLanguage } from "../translations/contexts/languageContext"
import {
  Clock,
  Activity,
  CheckCircle,
  ListTodo,
  AlertCircle,
  X,
  AlertTriangle,
  Loader2,
  Box,
  Settings,
  XCircle,
  Users,
  UserCog,
  ClipboardList,
} from "lucide-react"
import { Card } from "../components/cards"
import { useRouter } from "next/navigation"

// Define your API base URL
const API_URL = "https://esi-flow-back.onrender.com"

export default function ReportPage() {
  const { t } = useLanguage()
  const { isDarkMode } = useDarkMode()
  const router = useRouter()
  const [userRole, setUserRole] = useState("")

  // State for data
  const [userData, setUserData] = useState([])
  const [taskData, setTaskData] = useState([])
  const [equipmentData, setEquipmentData] = useState([])
  const [requestData, setRequestData] = useState([])

  // Loading states
  const [loadingTasks, setLoadingTasks] = useState(true)
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [loadingEquipment, setLoadingEquipment] = useState(true)
  const [loadingRequests, setLoadingRequests] = useState(true)

  // Error states
  const [taskError, setTaskError] = useState(null)
  const [userError, setUserError] = useState(null)
  const [equipmentError, setEquipmentError] = useState(null)
  const [requestError, setRequestError] = useState(null)

  // Notification system
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  })

  // Delete confirmation dialog
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [deleteType, setDeleteType] = useState(null) // 'task', 'user', 'equipment', 'request'

  // State for storing statistics
  const [taskStats, setTaskStats] = useState({
    pending: 0,
    inProgress: 0,
    completed: 0,
    toDo: 0,
  })

  const [equipmentStats, setEquipmentStats] = useState({
    totalEquipment: 0,
    needsMaintenance: 0,
    working: 0,
    outOfService: 0,
  })

  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    maintenanceTeam: 0,
    administrators: 0,
  })

  const [requestStats, setRequestStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    completedRequests: 0,
  })

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

  // Fetch user data from localStorage on mount
  useEffect(() => {
    try {
      const userData = localStorage.getItem("user")
      if (userData) {
        const parsedData = JSON.parse(userData)
        setUserRole(parsedData.role)
      }
    } catch (error) {
      console.error("Error loading user data from localStorage:", error)
    }
  }, [])

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return null

    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    } catch (error) {
      console.error("Error formatting date:", error)
      return dateString
    }
  }

  // Fetch tasks data
  const fetchTasks = async () => {
    try {
      setLoadingTasks(true)
      // Get all interventions if the current user is an admin
      // If not, get only the interventions assigned to the current user
      let interventionsData = []
      // get the current user from local storage
      const user = JSON.parse(localStorage.getItem("user"))

      if (user.role === "Admin") {
        const response = await axios.get(`${API_URL}/interventions`)
        interventionsData = response.data
      } else if (user.role === "Technician") {
        // Get only the interventions assigned to the current user
        const response = await axios.get(`${API_URL}/interventions/technician/${user.id}`)
        interventionsData = response.data
      }

      // Create an array to store the formatted data
      const formattedData = []

      // Process each intervention
      for (const intervention of interventionsData) {
        let request = null // Declare request variable
        try {
          // Fetch the associated request
          const requestResponse = await axios.get(`${API_URL}/requests/${intervention.request_id}`)
          request = requestResponse.data

          // Get technician info if available
          let technicianName = "Unassigned"
          if (intervention.technician_id) {
            try {
              const techResponse = await axios.get(`${API_URL}/users/${intervention.technician_id}`)
              technicianName = techResponse.data.full_name || "Unassigned"
            } catch (techError) {
              console.error("Error fetching technician:", techError)
            }
          }

          // Format the date if it exists
          let formattedDeadline = "N/A"
          if (intervention.deadline) {
            const deadlineDate = new Date(intervention.deadline)
            formattedDeadline = deadlineDate.toISOString().split("T")[0]
          }

          // Map the data to the table structure
          formattedData.push({
            "Task name": request.title || "Untitled Task",
            Location: request.localisation || "N/A",
            Responsible: technicianName,
            Priority: request.priority || "Medium",
            Deadline: formattedDeadline,
            Status: intervention.intv_status || "To Do",
            id: intervention.id,
            // Store only the IDs if needed for reference
            intervention_id: intervention.id,
            request_id: intervention.request_id,
          })
        } catch (requestError) {
          console.error(`Error fetching request for intervention ${intervention.id}:`, requestError)
          // Add intervention with minimal data if request fetch fails
          formattedData.push({
            "Task name": "Unknown Task",
            Location: "N/A",
            Responsible: "Unassigned",
            Priority: "Medium",
            Deadline: intervention.deadline ? new Date(intervention.deadline).toISOString().split("T")[0] : "N/A",
            Status: intervention.intv_status || "To Do",
            id: intervention.id,
            intervention_id: intervention.id,
            request_id: intervention.request_id,
          })
        }
      }

      setTaskData(formattedData)
      calculateTaskStats(formattedData)
    } catch (err) {
      console.error("Error fetching tasks:", err)
      setTaskError("Failed to load tasks. Please try again later.")
      showToast("Failed to load tasks. Please try again.", "error")
    } finally {
      setLoadingTasks(false)
    }
  }

  // Fetch equipment data
  const fetchEquipment = async () => {
    try {
      setLoadingEquipment(true)
      const response = await axios.get(`${API_URL}/equipments`)

      // Process the data to ensure consistent field names
      const processedData = response.data.map((item) => ({
        id: item.id,
        "Inventory Code": item.inventorie_code || `INV${item.id.toString().padStart(4, "0")}`,
        Type: item.type || "Unknown",
        Category: item.category || "Unknown",
        Location: item.localisation || "Unknown",
        "Acquisition date": formatDate(item.acquisition_date) || "Unknown",
        Status: item.eqp_status || "Unknown",
      }))

      setEquipmentData(processedData)

      // Calculate statistics
      const totalEquipment = processedData.length
      const needsMaintenance = processedData.filter(
        (item) => item.Status === "Needs Maintenance" || item.Status === "Needs Maintenance",
      ).length
      const working = processedData.filter((item) => item.Status === "Working").length
      const outOfService = processedData.filter((item) => item.Status === "Out of service").length

      setEquipmentStats({
        totalEquipment,
        needsMaintenance,
        working,
        outOfService,
      })
    } catch (err) {
      console.error("Error fetching equipment:", err)
      setEquipmentError("Failed to load equipment. Please try again later.")
      showToast("Failed to load equipment. Please try again.", "error")
    } finally {
      setLoadingEquipment(false)
    }
  }

  // Fetch users data
  const fetchUsers = async () => {
    try {
      setLoadingUsers(true)
      const response = await axios.get(`${API_URL}/users`)

      // Process the data
      const processedData = response.data.map((user) => ({
        id: user.id,
        name: user.full_name || "Unknown",
        profession: user.profession || "Unknown",
        email: user.email || "Unknown",
        phoneNumber: user.phone || "Unknown",
        role: user.role || "Unknown",
      }))

      setUserData(processedData)

      // Calculate statistics
      const totalUsers = processedData.length
      const maintenanceTeam = processedData.filter((user) => user.role === "Technician").length
      const administrators = processedData.filter((user) => user.role === "Admin").length

      setUserStats({
        totalUsers,
        maintenanceTeam,
        administrators,
      })
    } catch (err) {
      console.error("Error fetching users:", err)
      setUserError("Failed to load users. Please try again later.")
      showToast("Failed to load users. Please try again.", "error")
    } finally {
      setLoadingUsers(false)
    }
  }

  // Fetch requests data
  const fetchRequests = async () => {
    try {
      setLoadingRequests(true)
      const user = JSON.parse(localStorage.getItem("user"))

      const response = await axios.get(
        user.role === "Admin" ? `${API_URL}/requests` : `${API_URL}/requests/user/${user.id}`,
      )

      // Process the data
      const processedData = response.data.map((request) => {
        // Extract requester name directly from the nested requester object
        const requesterName = request.requester && request.requester.full_name ? request.requester.full_name : "Unknown"

        // Extract inventory code or other equipment info from the nested equipment object
        const inventoryCode = request.equipment && request.equipment.id ? `INV-${request.equipment.id}` : "N/A"

        // Extract location safely
        const location =
          request.localisation ||
          (request.equipment && typeof request.equipment.localisation === "string"
            ? request.equipment.localisation
            : "N/A")

        // Format date
        let createdAt = "N/A"
        if (request.created_at) {
          try {
            createdAt = new Date(request.created_at).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          } catch (error) {
            console.error("Error formatting date:", error)
            createdAt = String(request.created_at)
          }
        }

        return {
          id: request.id,
          req_code: request.request_code || "N/A",
          title: request.title || "No Title",
          location: location,
          requestedBy: requesterName,
          urgency: request.priority || "N/A",
          status: request.req_status || "N/A",
          createdAt: createdAt,
          inventoryCode: inventoryCode,
          description: request.description || "No description",
        }
      })

      setRequestData(processedData)

      // Calculate statistics
      const totalRequests = processedData.length
      const pendingRequests = processedData.filter((request) => request.status === "Reviewing").length
      const completedRequests = processedData.filter(
        (request) => request.status === "Accepted" || request.status === "Refused",
      ).length

      setRequestStats({
        totalRequests,
        pendingRequests,
        completedRequests,
      })
    } catch (err) {
      console.error("Error fetching requests:", err)
      setRequestError("Failed to load requests. Please try again later.")
      showToast("Failed to load requests. Please try again.", "error")
    } finally {
      setLoadingRequests(false)
    }
  }

  // Calculate statistics based on the tasks data
  const calculateTaskStats = (data) => {
    const stats = {
      pending: 0,
      inProgress: 0,
      completed: 0,
      toDo: 0,
    }

    data.forEach((item) => {
      const status = item.Status.toLowerCase()
      if (status.includes("pend")) {
        stats.pending++
      } else if (status.includes("progress")) {
        stats.inProgress++
      } else if (status.includes("complet")) {
        stats.completed++
      } else if (status.includes("to do")) {
        stats.toDo++
      }
    })

    setTaskStats(stats)
  }

  // Fetch all data on component mount
  useEffect(() => {
    fetchTasks()
    fetchEquipment()
    fetchUsers()
    fetchRequests()
  }, [])

  // Handle edit functions
  const handleEditTask = (row) => {
    router.push(`/task/edit/${row.id}`)
  }

  const handleEditEquipment = (row) => {
    router.push(`/equipment/edit/${row.id}`)
  }

  const handleEditUser = (row) => {
    router.push(`/users/edit/${row.id}`)
  }

  const handleEditRequest = (row) => {
    router.push(`/requests/edit/${row.id}`)
  }

  // Show delete confirmation
  const confirmDelete = (row, type) => {
    setDeleteConfirm(row)
    setDeleteType(type)
  }

  // Handle delete
  const handleDelete = async () => {
    if (!deleteConfirm) return

    try {
      // Get the original ID from the row
      const id = deleteConfirm.id

      if (deleteType === "task") {
        // Make the API call to delete the intervention
        await axios.delete(`${API_URL}/interventions/${id}`)
        // Refresh the data
        fetchTasks()
        showToast("Task deleted successfully", "success")
      } else if (deleteType === "equipment") {
        await axios.delete(`${API_URL}/equipments/${id}`)
        fetchEquipment()
        showToast("Equipment deleted successfully", "success")
      } else if (deleteType === "user") {
        await axios.delete(`${API_URL}/users/${id}`)
        fetchUsers()
        showToast("User deleted successfully", "success")
      } else if (deleteType === "request") {
        await axios.delete(`${API_URL}/requests/${id}`)
        fetchRequests()
        showToast("Request deleted successfully", "success")
      }

      // Close the confirmation dialog
      setDeleteConfirm(null)
      setDeleteType(null)
    } catch (err) {
      console.error(`Error deleting ${deleteType}:`, err)
      showToast(`Failed to delete ${deleteType}. Please try again.`, "error")
    }
  }

  // Generate stats cards data
  const taskStatsCards = [
    {
      title: t("reportPage", "stats", "pending"),
      count: taskStats.pending,
      increase: "Tasks",
      icon: <Clock className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
    {
      title: t("reportPage", "stats", "inProgress"),
      count: taskStats.inProgress,
      increase: "Tasks",
      icon: <Activity className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
    {
      title: t("reportPage", "stats", "completed"),
      count: taskStats.completed,
      increase: "Tasks",
      icon: <CheckCircle className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
    {
      title: t("reportPage", "stats", "toDo"),
      count: taskStats.toDo,
      increase: "Tasks",
      icon: <ListTodo className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
  ]

  const equipmentStatsCards = [
    {
      title: t("reportPage", "stats", "totalEquipment"),
      count: equipmentStats.totalEquipment,
      increase: "Items",
      icon: <Box className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
    {
      title: t("reportPage", "stats", "needsMaintenance"),
      count: equipmentStats.needsMaintenance,
      increase: "Items",
      icon: <Settings className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
    {
      title: t("reportPage", "stats", "working"),
      count: equipmentStats.working,
      increase: "Items",
      icon: <CheckCircle className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
    {
      title: t("reportPage", "stats", "outOfService"),
      count: equipmentStats.outOfService,
      increase: "Items",
      icon: <XCircle className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
  ]

  const userStatsCards = [
    {
      title: t("reportPage", "stats", "totalUsers"),
      count: userStats.totalUsers,
      increase: "Users",
      icon: <Users className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
    {
      title: t("reportPage", "stats", "maintenanceTeam"),
      count: userStats.maintenanceTeam,
      increase: "Technicians",
      icon: <Settings className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
    {
      title: t("reportPage", "stats", "administrators"),
      count: userStats.administrators,
      increase: "Admins",
      icon: <UserCog className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
  ]

  const requestStatsCards = [
    {
      title: t("reportPage", "stats", "totalRequests"),
      count: requestStats.totalRequests,
      increase: "Requests",
      icon: <ClipboardList className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
    {
      title: t("reportPage", "stats", "pendingRequests"),
      count: requestStats.pendingRequests,
      increase: "Requests",
      icon: <Clock className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
    {
      title: t("reportPage", "stats", "completedRequests"),
      count: requestStats.completedRequests,
      increase: "Requests",
      icon: <CheckCircle className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
  ]

  return (
    <div className="flex flex-col md:flex-row bg-neutral-50 dark:bg-neutral-990 min-h-screen">
      <div>
        <Sidebar activeItem={"reports"} />
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
              <p>Are you sure you want to delete this {deleteType}?</p>
              <div className="mt-4 p-4 bg-neutral-100 dark:bg-neutral-700 rounded-md">
                {deleteType === "task" && (
                  <>
                    <p>
                      <strong>Task:</strong> {deleteConfirm["Task name"]}
                    </p>
                    <p>
                      <strong>Status:</strong> {deleteConfirm.Status}
                    </p>
                    <p>
                      <strong>Responsible:</strong> {deleteConfirm.Responsible}
                    </p>
                  </>
                )}
                {deleteType === "equipment" && (
                  <>
                    <p>
                      <strong>Inventory Code:</strong> {deleteConfirm["Inventory Code"]}
                    </p>
                    <p>
                      <strong>Type:</strong> {deleteConfirm.Type}
                    </p>
                    <p>
                      <strong>Status:</strong> {deleteConfirm.Status}
                    </p>
                  </>
                )}
                {deleteType === "user" && (
                  <>
                    <p>
                      <strong>Name:</strong> {deleteConfirm.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {deleteConfirm.email}
                    </p>
                    <p>
                      <strong>Role:</strong> {deleteConfirm.role}
                    </p>
                  </>
                )}
                {deleteType === "request" && (
                  <>
                    <p>
                      <strong>Title:</strong> {deleteConfirm.title}
                    </p>
                    <p>
                      <strong>Requested By:</strong> {deleteConfirm.requestedBy}
                    </p>
                    <p>
                      <strong>Status:</strong> {deleteConfirm.status}
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                onClick={() => {
                  setDeleteConfirm(null)
                  setDeleteType(null)
                }}
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

      <div className="w-full px-4 py-4">
        <div>

          <div className="text-sm flex items-center font-inter">
              <span>{t("reportPage", "path", "dashboard")}</span>
              <span className="mx-2 text-lg">›</span>
              <span>{t("reportPage", "path", "reports")}</span>
            </div>

          {/* Title with border */}
          <div className="inline-block w-full my-6">
            <h1 className="text-3xl font-russo text-neutral-950 dark:text-neutral-50">{t("reportPage", "title")}</h1>
          </div>
        </div>

        {/* Task Statistics */}
        <div className="mb-8">
          <h2 className="text-2xl font-russo text-neutral-950 dark:text-neutral-50 mb-4">
            {t("reportPage", "sections", "taskStats")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            {taskStatsCards.map((stat, index) => (
              <Card key={index} title={stat.title} count={stat.count} increase={stat.increase} icon={stat.icon} />
            ))}
          </div>
        </div>

        {/* Tasks Table */}
        <div className="mb-8">

          {loadingTasks ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
              <span className="ml-2 text-neutral-600 dark:text-neutral-300">Loading tasks...</span>
            </div>
          ) : taskError ? (
            <div className="flex justify-center items-center h-64 text-red-500">
              <AlertCircle className="mr-2" />
              <span>{taskError}</span>
            </div>
          ) : (
            <DynamicTable
              data={taskData}
              isDarkMode={isDarkMode}
              title={t("reportPage", "tables", "tasks", "title")}
              columnConfig={{
                "Task name": { title: t("reportPage", "tables", "tasks", "columns", "taskName") },
                Location: { title: t("reportPage", "tables", "tasks", "columns", "location") },
                Responsible: { title: t("reportPage", "tables", "tasks", "columns", "responsible") },
                Priority: { title: t("reportPage", "tables", "tasks", "columns", "priority") },
                Deadline: { title: t("reportPage", "tables", "tasks", "columns", "deadline") },
                Status: { title: t("reportPage", "tables", "tasks", "columns", "status") },
                id: { hidden: true },
                intervention_id: { hidden: true },
                request_id: { hidden: true },
              }}
              addButtonText={t("reportPage", "tables", "tasks", "addButton")}
              dropdownFields={["Priority", "Status"]}
              onEdit={handleEditTask}
              onDelete={(row) => confirmDelete(row, "task")}
              styled={["Priority", "Status"]}
              showAddButton={userRole === "Admin"}
              refreshData={fetchTasks}
            />
          )}
        </div>

        {/*add a line to seperate the sections */}
        <hr className="my-10 border-t-4 border-neutral-200 dark:border-neutral-700 rounded" />


        {/* Equipment Statistics */}
        <div className="mb-8">
          <h2 className="text-2xl font-russo text-neutral-950 dark:text-neutral-50 mb-4">
            {t("reportPage", "sections", "equipmentStats")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            {equipmentStatsCards.map((stat, index) => (
              <Card key={index} title={stat.title} count={stat.count} increase={stat.increase} icon={stat.icon} />
            ))}
          </div>
        </div>

        {/* Equipment Table */}
        <div className="mb-8">

          {loadingEquipment ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
              <span className="ml-2 text-neutral-600 dark:text-neutral-300">Loading equipment...</span>
            </div>
          ) : equipmentError ? (
            <div className="flex justify-center items-center h-64 text-red-500">
              <AlertCircle className="mr-2" />
              <span>{equipmentError}</span>
            </div>
          ) : (
            <DynamicTable
              data={equipmentData}
              isDarkMode={isDarkMode}
              title={t("reportPage", "tables", "equipment", "title")}
              columnConfig={{
                id: { hidden: true },
                "Inventory Code": { title: t("reportPage", "tables", "equipment", "columns", "inventoryCode") },
                Type: { title: t("reportPage", "tables", "equipment", "columns", "type") },
                Category: { title: t("reportPage", "tables", "equipment", "columns", "category") },
                Location: { title: t("reportPage", "tables", "equipment", "columns", "location") },
                "Acquisition date": { title: t("reportPage", "tables", "equipment", "columns", "acquisitionDate") },
                Status: { title: t("reportPage", "tables", "equipment", "columns", "status") },
              }}
              addButtonText={t("reportPage", "tables", "equipment", "addButton")}
              dropdownFields={["Type", "Category", "Status", "Location"]}
              onEdit={handleEditEquipment}
              onDelete={(row) => confirmDelete(row, "equipment")}
              styled={["Status"]}
              showAddButton={userRole === "Admin"}
              refreshData={fetchEquipment}
            />
          )}
        </div>

        {/*add a line to seperate the sections */}
        <hr className="my-10 border-t-4 border-neutral-200 dark:border-neutral-700 rounded" />

        {/* User Statistics */}
        <div className="mb-8">
          <h2 className="text-2xl font-russo text-neutral-950 dark:text-neutral-50 mb-4">
            {t("reportPage", "sections", "userStats")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {userStatsCards.map((stat, index) => (
              <Card key={index} title={stat.title} count={stat.count} increase={stat.increase} icon={stat.icon} />
            ))}
          </div>
        </div>

        {/* Users Table */}
        <div className="mb-8">
          
          {loadingUsers ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
              <span className="ml-2 text-neutral-600 dark:text-neutral-300">Loading users...</span>
            </div>
          ) : userError ? (
            <div className="flex justify-center items-center h-64 text-red-500">
              <AlertCircle className="mr-2" />
              <span>{userError}</span>
            </div>
          ) : (
            <DynamicTable
              data={userData}
              isDarkMode={isDarkMode}
              title={t("reportPage", "tables", "users", "title")}
              columnConfig={{
                id: { hidden: true },
                name: { title: t("reportPage", "tables", "users", "columns", "name") },
                profession: { title: t("reportPage", "tables", "users", "columns", "profession") },
                email: { title: t("reportPage", "tables", "users", "columns", "email") },
                phoneNumber: { title: t("reportPage", "tables", "users", "columns", "phoneNumber") },
                role: { title: t("reportPage", "tables", "users", "columns", "role") },
              }}
              addButtonText={t("reportPage", "tables", "users", "addButton")}
              dropdownFields={["role", "profession"]}
              onEdit={handleEditUser}
              onDelete={(row) => confirmDelete(row, "user")}
              styled={["role"]}
              showAddButton={userRole === "Admin"}
              refreshData={fetchUsers}
            />
          )}
        </div>

        {/*add a line to seperate the sections */}
        <hr className="my-10 border-t-4 border-neutral-200 dark:border-neutral-700 rounded" />

        {/* Request Statistics */}
        <div className="mb-8">
          <h2 className="text-2xl font-russo text-neutral-950 dark:text-neutral-50 mb-4">
            {t("reportPage", "sections", "requestStats")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {requestStatsCards.map((stat, index) => (
              <Card key={index} title={stat.title} count={stat.count} increase={stat.increase} icon={stat.icon} />
            ))}
          </div>
        </div>

        {/* Requests Table */}
        <div className="mb-8">
          
          {loadingRequests ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
              <span className="ml-2 text-neutral-600 dark:text-neutral-300">Loading requests...</span>
            </div>
          ) : requestError ? (
            <div className="flex justify-center items-center h-64 text-red-500">
              <AlertCircle className="mr-2" />
              <span>{requestError}</span>
            </div>
          ) : (
            <DynamicTable
              data={requestData}
              isDarkMode={isDarkMode}
              title={t("reportPage", "tables", "requests", "title")}
              columnConfig={{
                id: { hidden: true },
                req_code: { title: t("reportPage", "tables", "requests", "columns", "requestCode") },
                title: { title: t("reportPage", "tables", "requests", "columns", "title") },
                location: { title: t("reportPage", "tables", "requests", "columns", "location") },
                requestedBy: { title: t("reportPage", "tables", "requests", "columns", "requestedBy") },
                urgency: { title: t("reportPage", "tables", "requests", "columns", "urgencyLevel") },
                status: { title: t("reportPage", "tables", "requests", "columns", "status") },
                createdAt: { hidden: true },
                inventoryCode: { hidden: true },
                description: { hidden: true },
              }}
              addButtonText={t("reportPage", "tables", "requests", "addButton")}
              dropdownFields={["urgency", "status"]}
              onEdit={handleEditRequest}
              onDelete={(row) => confirmDelete(row, "request")}
              styled={["status", "urgency"]}
              showAddButton={userRole === "Admin"}
              refreshData={fetchRequests}
            />
          )}
        </div>
      </div>
    </div>
  )
}
