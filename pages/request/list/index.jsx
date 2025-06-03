"use client"

import { useState, useEffect, useCallback, use } from "react"
import axios from "axios"
import DynamicTable from "../../components/dynamicTable1"
import Sidebar from "../../components/sidebar"
import { useDarkMode } from "../../darkLightMode/darkModeContext"
import { ClipboardList, Clock, CheckCircle, AlertTriangle } from "lucide-react"
import { ArrowRight2 } from "iconsax-react"
import { useLanguage } from "../../translations/contexts/languageContext"
import { Card } from "../../components/cards"
import { useRouter } from "next/navigation"
import Toast from "@/pages/components/form_components/toast"

export default function RequestListPage() {
  const { t } = useLanguage()
  const { isDarkMode } = useDarkMode()
  const router = useRouter()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, request: null })
  const [userRole, setUserRole] = useState("")

  // State for toast notifications
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  })

  // State for storing request statistics
  const [requestStats, setRequestStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    completedRequests: 0,
    loading: true,
    error: null,
  })

  // Fetch all requests from the API
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true)
        // Fetch all requests if the user is an admin
        // if not, fetch only the requests requsted by the user
        const user = JSON.parse(localStorage.getItem("user"))
        if (!user) {
          console.error("User not found in local storage")
          return
        }
        setUserRole(user.role)
        const response = await axios.get(
          user.role === "Admin"
            ? "https://esi-flow-back.onrender.com/requests"
            : `https://esi-flow-back.onrender.com/requests/user/${user.id}`
        )
        console.log("Fetched requests:", response.data)

        // sort the requests by created_at date in descending order
        response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        

        // Process the data to include all required information
        const processedData = response.data.map((request) => {
          // Extract requester name directly from the nested requester object
          const requesterName =
            request.requester && request.requester.full_name ? request.requester.full_name : "Unknown"

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

          // Make sure all fields are primitive values (strings, numbers) not objects
          return {
            id: request.id,
            req_code: request.request_code|| "N/A",
            title: request.title || "No Title",
            location: location,
            requestedBy: requesterName,
            urgency: request.priority || "N/A",
            status: request.req_status || "N/A",
            createdAt: createdAt,
            inventoryCode: inventoryCode,
            description: request.description || "No description",
            // Store these as hidden fields but don't render them directly
            _equipment: request.equipment, // underscore prefix to indicate it's not for direct rendering
            _requester: request.requester, // underscore prefix to indicate it's not for direct rendering
          }
        })

        setData(processedData)
        console.log("Processed data:", processedData)

        // Calculate statistics
        const totalRequests = processedData.length
        const pendingRequests = processedData.filter(
          (request) => request.status === "Reviewing"
        ).length
        const completedRequests = processedData.filter((request) => request.status === "Accepted" || request.status === "Refused").length

        setRequestStats({
          totalRequests,
          pendingRequests,
          completedRequests,
          loading: false,
          error: null,
        })

        setLoading(false)
      } catch (error) {
        console.error("Error fetching requests:", error)
        setRequestStats((prev) => ({
          ...prev,
          loading: false,
          error: "Failed to fetch requests",
        }))
        setLoading(false)
      }
    }

    fetchRequests()
  }, [])

  const showToast = useCallback((message, type = "success") => {
    setToast({
      visible: true,
      message,
      type,
    })
  }, [])
  
  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }))
  }, [])

  // Handle edit request
  const handleEdit = (row) => {
    router.push(`edit/${row.id}`)
  }

  // Handle add request
  const handleadd = () => {
    router.push(`add`)
  }

  // Handle delete confirmation
  const confirmDelete = (row) => {
    setDeleteModal({ isOpen: true, request: row })
  }

  // Handle actual deletion
  const handleDelete = async () => {
    try {
      const row = deleteModal.request
      if (!row) return

      await axios.delete(`https://esi-flow-back.onrender.com/requests/${row.id}`)

      // Remove the deleted request from the state
      setData((prevData) => prevData.filter((request) => request.id !== row.id))

      // Update statistics
      setRequestStats((prev) => ({
        ...prev,
        totalRequests: prev.totalRequests - 1,
        pendingRequests:
          row.status === "Reviewing" ? prev.pendingRequests - 1 : prev.pendingRequests,
        completedRequests: row.status === "Accepted" ? prev.completedRequests - 1 : prev.completedRequests,
      }))

      // Close modal
      setDeleteModal({ isOpen: false, request: null })
      showToast("Request deleted successfully", "success")
    } catch (error) {
      console.error("Error deleting request:", error)
      alert("Failed to delete request")
      setDeleteModal({ isOpen: false, request: null })
    }
  }

  // Handle accept request
  const handleAccept = async (row) => {
    router.push(`/task/add?requestId=${row.id}`)
  }

  // Handle reject request
  const handleReject = async (row) => {
    try {
      const updatedRequest = { ...row, status: "Refused" }
      updatedRequest.req_status = "Refused"
      
      const response = await axios.put(`https://esi-flow-back.onrender.com/requests/${row.id}`, updatedRequest)
      console.log("API response:", response.data)
      setData((prevData) =>
        prevData.map((request) => (request.id === row.id ? updatedRequest : request))
      )
      setRequestStats((prev) => ({
        ...prev,
        pendingRequests: prev.pendingRequests - 1,
        completedRequests: prev.completedRequests + 1,
      }))
      showToast("Request rejected successfully", "success")
    } catch (error) {
      console.error("Error rejecting request:", error)
      alert("Failed to reject request")
    }
  }

  // Generate stats cards data
  const stats = [
    {
      title: t("requestList", "cards", "totalRequests") || "Total Requests",
      count: requestStats.totalRequests,
      increase: "Requests", 
      icon: <ClipboardList className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
    {
      title: t("requestList", "cards", "pendingRequests") || "Pending Requests",
      count: requestStats.pendingRequests,
      increase: "Requests", 
      icon: <Clock className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
    {
      title: t("requestList", "cards", "completedRequests") || "Completed Requests",
      count: requestStats.completedRequests,
      increase: "Requests", 
      icon: <CheckCircle className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
  ]

  // Custom delete confirmation modal
  const DeleteConfirmationModal = () => {
    if (!deleteModal.isOpen) return null
    const request = deleteModal.request

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div
          className={`bg-white dark:bg-neutral-800 rounded-lg shadow-lg max-w-md w-full p-6 ${isDarkMode ? "border border-neutral-700" : "border border-neutral-200"}`}
        >
          <div className="flex items-center mb-4">
            <div className="mr-4 bg-red-100 dark:bg-red-900/30 p-2 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-medium text-neutral-900 dark:text-white">
              {t("equipmentList", "deleteConfirm") || "Confirm Deletion"}
            </h3>
          </div>

          <div className="mb-6">
            <p className="text-neutral-700 dark:text-neutral-300 mb-4">
              {`Are you sure you want to delete the request "${request?.title || ""}"? This action cannot be undone.`}
            </p>

            <div className="bg-neutral-100 dark:bg-neutral-700/50 p-3 rounded-md mb-4">
              <div className="grid grid-cols-2 gap-2">
                <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Title:</span>
                <span className="text-sm text-neutral-900 dark:text-white">{request?.title}</span>

                <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Requested By:</span>
                <span className="text-sm text-neutral-900 dark:text-white">{request?.requestedBy}</span>

                <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Status:</span>
                <span className="text-sm text-neutral-900 dark:text-white">{request?.status}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setDeleteModal({ isOpen: false, request: null })}
              className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-neutral-800 dark:text-white rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
            >
              Delete Request
            </button>
          </div>
        </div>
      </div>
    )
  }
  

  return (
    <div className="flex flex-col md:flex-row bg-neutral-50 dark:bg-neutral-990 min-h-screen">
      {/* Toast Notification */}
      <Toast message={toast.message} type={toast.type} visible={toast.visible} onClose={hideToast} />
      <div>
      <Sidebar activeItem={"requests"}/>
      </div>

      <div className="w-full px-4 py-4">
          <div className="flex flex-col items-start gap-6 mb-6 pt-6 text-neutral-950 dark:text-neutral-100">
            <div className="text-sm flex items-center font-inter">
              <span>{t("requestList", "path", "dashboard")}</span>
              <span className="mx-2 text-lg">›</span>
              <span>{t("requestList", "path", "requests")}</span>
            </div>
            <h1 className="text-xl lg:text-2xl font-russo">{t("requestList", "cards", "title")}</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {stats.map((stat, index) => (
              <Card key={index} title={stat.title} count={stat.count} increase={stat.increase} icon={stat.icon} />
            ))}
          </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <DynamicTable
            data={data}
            isDarkMode={isDarkMode}
            title={t("requestList", "searchbar", "title") || "Request List"}
            columnConfig={{
              id: { hidden: true }, // Hide ID column
              req_code: { title: t("requestList", "columns", "requestCode") || "Request Code" },
              title: { title: t("requestList", "columns", "title") || "Title" },
              location: { title: t("requestList", "columns", "location") || "Location" },
              requestedBy: { title: t("requestList", "columns", "requestedBy") || "Requested By" },
              urgency: { title: t("requestList", "columns", "urgencyLevel") || "Urgency" },
              status: { title: t("requestList", "columns", "status") || "Status" },
              createdAt: { hidden: true }, // Hide createdAt column
              inventoryCode: { hidden: true }, // Hide inventoryCode column
              description: { hidden: true }, // Hide description column
              _equipment: { hidden: true }, // Hide equipment object
              _requester: { hidden: true }, // Hide requester object
            }}
            addButtonText={t("requestList", "searchbar", "addButton") || "Add Request"}
            dropdownFields={["urgency", "status"]}
            showAcceptAction= {userRole === "Admin"} // Show accept action only for admin
            showRefuseAction= {userRole === "Admin"} // Show reject action only for admin
            showDeleteAction={userRole === "Admin"} // Show delete action only for admin
            onEdit={handleEdit}
            onDelete={confirmDelete} // Changed to open the confirmation modal
            onAddNew={handleadd} // Added onAddNew prop for adding new users
            statusField="status"
            reviewingStatus="Reviewing"
            // Add the accept and reject functions if the user is an admin
            onAccepte={handleAccept}
            onRefuse={handleReject}
            styled={["status", "urgency"]}
          />
        )}

        {/* Render the delete confirmation modal */}
        <DeleteConfirmationModal />
      </div>
    </div>
  )
}
