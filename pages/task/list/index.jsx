"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import DynamicTable from "../../components/dynamicTable"
import Sidebar from "../../components/sidebar"
import { useDarkMode } from "../../darkLightMode/darkModeContext"
import { Clock, Activity, CheckCircle, ListTodo, AlertCircle, X, AlertTriangle } from "lucide-react"
import { ArrowRight2 } from "iconsax-react"
import { useLanguage } from "../../translations/contexts/languageContext"
import { Card } from "../../components/cards"

// Define your API base URL - adjust this to match your backend URL
const API_URL = "https://esi-flow-back.onrender.com"

export default function TasksManagement() {
  const { t } = useLanguage()
  const { isDarkMode } = useDarkMode()
  const router = useRouter()
  const [userRole, setUserRole] = useState("")

  // State for interventions data
  const [interventions, setInterventions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Simple notification system
  const [notification, setNotification] = useState(null)

  // Delete confirmation dialog
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  // State for storing task statistics
  const [taskStats, setTaskStats] = useState({
    pending: 0,
    inProgress: 0,
    completed: 0,
    toDo: 0,
  })

  // Show notification function
  const showNotification = (type, message) => {
    setNotification({ type, message })
    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  // Fetch all interventions with their associated requests
  const fetchInterventions = async () => {
    try {
      setLoading(true)
      // Get all interventions if the current user is an admin
      // If not, get only the interventions assigned to the current user
      let interventionsData = []
      // get the current user from local storage
      const user = JSON.parse(localStorage.getItem("user"))
      setUserRole(user.role)
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
            urgency: request.priority || "Medium",
            Deadline: formattedDeadline,
            intervention_type: intervention.intervention_type || "N/A",
            status: intervention.intv_status || "To Do",
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
            urgency: "Medium",
            Deadline: intervention.deadline ? new Date(intervention.deadline).toISOString().split("T")[0] : "N/A",
            intervention_type: intervention.intervention_type || "N/A",
            status: intervention.intv_status || "To Do",
            id: intervention.id,
            intervention_id: intervention.id,
            request_id: intervention.request_id,
          })
        }
      }

      console.log("Formatted Data:", formattedData)
      setInterventions(formattedData)
      calculateStats(formattedData)
    } catch (err) {
      console.error("Error fetching interventions:", err)
      setError("Failed to load tasks. Please try again later.")
      showNotification("error", "Failed to load tasks. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Calculate statistics based on the interventions data
  const calculateStats = (data) => {
    const stats = {
      pending: 0,
      inProgress: 0,
      completed: 0,
      toDo: 0,
    }

    data.forEach((item) => {
      const status = item.status.toLowerCase()
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

  // Navigate to edit page
  const handleEdit = (row) => {
    router.push(`/task/edit/${row.id}`)
  }

  // Show delete confirmation
  const confirmDelete = (row) => {
    setDeleteConfirm(row)
  }

  // Handle delete intervention
  const handleDelete = async () => {
    if (!deleteConfirm) return

    try {
      // Get the original ID from the row
      const id = deleteConfirm.id

      // Make the API call to delete the intervention
      await axios.delete(`${API_URL}/interventions/${id}`)

      // Show success message
      showNotification("success", "Task deleted successfully")

      // Close the confirmation dialog
      setDeleteConfirm(null)

      // Refresh the data
      fetchInterventions()
    } catch (err) {
      console.error("Error deleting intervention:", err)
      showNotification("error", "Failed to delete task. Please try again.")
    }
  }

  // Handle add new intervention
  const handleAdd = async () => {
    try {
      // Redirect to add page
      router.push("/task/add")
    } catch (err) {
      console.error("Error navigating to add page:", err)
      showNotification("error", "Failed to navigate to add page. Please try again.")
    }
  }

  // Fetch interventions on component mount
  useEffect(() => {
    fetchInterventions()
  }, [])

  // Generate stats cards data
  const stats = [
    {
      title: t("tasksList", "cards", "sub", 1),
      count: taskStats.pending,
      increase: "Tasks",
      icon: <Clock className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
    {
      title: t("tasksList", "cards", "sub", 2),
      count: taskStats.inProgress,
      increase: "Tasks",
      icon: <Activity className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
    {
      title: t("tasksList", "cards", "sub", 3),
      count: taskStats.completed,
      increase: "Tasks",
      icon: <CheckCircle className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
    {
      title: t("tasksList", "cards", "sub", 4),
      count: taskStats.toDo,
      increase: "Tasks",
      icon: <ListTodo className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
  ]

  return (
    <div className="flex flex-col md:flex-row bg-neutral-50 dark:bg-neutral-990 min-h-screen">
      <div>
        <Sidebar activeItem={"tasks"} />
      </div>

      <div className="w-full px-4 py-4">
        {/* Notification component */}
        {notification && (
          <div
            className={`fixed top-4 right-4 z-50 flex items-center p-4 mb-4 rounded-lg shadow-md ${
              notification.type === "success"
                ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
            }`}
          >
            <div className="text-sm font-medium">{notification.message}</div>
            <button
              type="button"
              className="ml-4 -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8 focus:ring-2 focus:ring-gray-300"
              onClick={() => setNotification(null)}
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
                    <strong>Status:</strong> {deleteConfirm.status}
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

        <div>
          <div className="flex items-center gap-2 mb-8 text-neutral-950 dark:text-neutral-50">
            {t("tasksList", "path", 1)} <ArrowRight2 size="14" color="#697689" /> {t("tasksList", "path", 2)}
          </div>
          <h1 className="text-2xl font-bold text-neutral-950 dark:text-neutral-50 mb-6">
            {t("tasksList", "cards", "title")}
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <Card key={index} title={stat.title} count={stat.count} increase={stat.increase} icon={stat.icon} />
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neutral-950 dark:border-white"></div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64 text-red-500">
            <AlertCircle className="mr-2" />
            <span>{error}</span>
          </div>
        ) : (
          <DynamicTable
            data={interventions}
            isDarkMode={isDarkMode}
            title={t("tasksList", "searchbar", "title")}
            columnConfig={{
              "Task name": { title: t("tasksList", "tablehead", 1) },
              Location: { title: t("tasksList", "tablehead", 2) },
              Responsible: { title: t("tasksList", "tablehead", 3) },
              urgency: { title: t("tasksList", "tablehead", 4) },
              Deadline: { title: t("tasksList", "tablehead", 5) },
              intervention_type: { title: t("tasksList", "tablehead", 7) },
              status: { title: t("tasksList", "tablehead", 6) },
              id : { hidden: true }, // Hide password column
              intervention_id : { hidden: true }, // Hide password column
              request_id : { hidden: true }, // Hide password column
            }}
            addButtonText={t("tasksList", "searchbar", "buttons", 3)}
            dropdownFields={["urgency", "status"]}
            onEdit={handleEdit}
            onDelete={confirmDelete} // Changed to show confirmation first
            onAddNew={handleAdd}
            styled={["urgency", "status"]}
            addButtonLink="../../tasks/add" // You might want to handle this differently
            refreshData={fetchInterventions}
            showAddButton={userRole === "Admin"} // Show add button only for Admin
          />
        )}
      </div>
    </div>
  )
}
