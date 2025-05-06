"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useLanguage } from "../../translations/contexts/languageContext"
import Sidebar from "../../components/sidebar"
import { MapPin, ImageIcon } from "lucide-react"
import FormField from "../../components/form_components/form_field"
import DropdownField from "../../components/form_components/dropdown_field"
import AutocompleteField from "../../components/form_components/autocomplete_field"
import Toast from "../../components/form_components/toast"
import DateField from "@/pages/components/form_components/date_field"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"

// API base URL - replace with your actual backend URL
const API_BASE_URL = "http://localhost:5000"

// Main Component
export default function TaskAddForm({ request = null }) {
  const { t } = useLanguage()
  const formInitialized = useRef(false)
  const router = useRouter()
  const params = useParams()
  const requestId = params?.id || "" // Get ID directly from params
  console.log("Request ID:", requestId)

  // State for toast notifications
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  })

  // Form state
  const [task, setTask] = useState({
    name: "",
    assignTo: "",
    status: "",
    deadline: "",
    report: "",
    equipmentCode: "",
    location: "",
    description: "",
    priority: "",
    type: "",
    requestCode: "", // Added request code field
  })

  // Equipment state
  const [equipmentList, setEquipmentList] = useState([])
  const [allEquipment, setAllEquipment] = useState([])
  const [isLoadingEquipment, setIsLoadingEquipment] = useState(false)
  const [selectedEquipment, setSelectedEquipment] = useState(null)

  // Users state
  const [usersList, setUsersList] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [isLoadingUsers, setIsLoadingUsers] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [userSearchTerm, setUserSearchTerm] = useState("")

  // Photo state - just for display
  const [photoUrl, setPhotoUrl] = useState("")

  // Form validation
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Available options for dropdowns
  const statusOptions = [
    t("taskForm", "statusOptions", 0),
    t("taskForm", "statusOptions", 1),
    t("taskForm", "statusOptions", 2),
    t("taskForm", "statusOptions", 3),
    t("taskForm", "statusOptions", 4),
  ]

  // Define priority options with lowercase values to match backend ENUM
  const priorityOptions = ["low", "medium", "high"]

  // Define intervention types that match the backend ENUM values
  const taskTypes = ["repair", "maintenance", "replacement"]

  // Fetch equipment data from backend
  useEffect(() => {
    const fetchEquipment = async () => {
      setIsLoadingEquipment(true)
      try {
        const response = await axios.get(`${API_BASE_URL}/equipments`)

        // Format equipment data for autocomplete
        const formattedEquipment = response.data.map((eq) => ({
          id: eq.id,
          code: eq.inventorie_code || eq.inventory_code || `EQ-${eq.id}`, // Fix: Check both spellings and fallback
          name: eq.type || eq.name || "Unknown Equipment",
          location: eq.location || eq.localisation || "Unknown Location",
        }))
        console.log("Formatted Equipment:", formattedEquipment)
        setAllEquipment(formattedEquipment)
        setEquipmentList(formattedEquipment)
      } catch (error) {
        console.error("Error fetching equipment:", error)
        // Fallback to empty array if API fails
        setAllEquipment([])
        setEquipmentList([])
      } finally {
        setIsLoadingEquipment(false)
      }
    }

    fetchEquipment()
  }, [])

  // Fetch users data from backend
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoadingUsers(true)
      try {
        const response = await axios.get(`${API_BASE_URL}/users`)

        // Format users data for autocomplete
        const formattedUsers = response.data.map((user) => ({
          id: user.id,
          code: user.employee_id || `TECH-${user.id}`, // Use employee_id as code or generate one
          name: user.full_name || `${user.first_name || ""} ${user.last_name || ""}`.trim() || "Unknown User",
          location: user.role || user.department || "Technician", // Role or department as location
        }))

        setAllUsers(formattedUsers)
        setUsersList(formattedUsers)
      } catch (error) {
        console.error("Error fetching users:", error)
        // Fallback to empty array if API fails
        setAllUsers([])
        setUsersList([])
      } finally {
        setIsLoadingUsers(false)
      }
    }

    fetchUsers()
  }, [])

  // Fetch request data if requestId is provided in URL
  useEffect(() => {
    const fetchRequestData = async () => {
      if (requestId && !formInitialized.current) {
        setIsLoading(true)
        try {
          // Fetch request data from backend
          const response = await axios.get(`${API_BASE_URL}/requests/${requestId}`)
          const requestData = response.data
          console.log("Request Data:", requestData)

          if (requestData) {
            // Initialize task with request data
            const initialTask = {
              name: requestData.title || "",
              assignTo: "",
              status: requestData.req_status || "Not Started",
              deadline: "",
              report: "",
              equipmentCode: "", // We'll set this after finding the equipment
              location: requestData.localisation || "",
              description: requestData.description || "",
              priority: requestData.priority || "medium", // Use lowercase priority
              type: requestData.type || "repair", // Default to repair if not specified
              requestCode: requestData.request_code || "", // Add request code
            }

            // Set photo URL if available
            if (requestData.picture) {
              setPhotoUrl(requestData.picture)
              console.log("Existing photo set:", requestData.picture)
            }

            // Find equipment if equipment_id is provided
            if (requestData.equipment_id && allEquipment.length > 0) {
              console.log("Looking for equipment with ID:", requestData.equipment_id)
              const equipment = allEquipment.find((eq) => eq.id == requestData.equipment_id)

              if (equipment) {
                console.log("Found equipment:", equipment)
                setSelectedEquipment(equipment)
                initialTask.equipmentCode = equipment.code
                initialTask.location = equipment.location || initialTask.location
              } else {
                console.log("Equipment not found in list")
              }
            }

            setTask(initialTask)
            formInitialized.current = true
          }
        } catch (error) {
          console.error("Error fetching request data:", error)
          showToast(t("taskForm", "toast", "requestFetchError") || "Failed to fetch request data", "error")
        } finally {
          setIsLoading(false)
        }
      }
    }

    // Only fetch if we have equipment data and a requestId
    if (allEquipment.length > 0) {
      fetchRequestData()
    }
  }, [requestId, t, allEquipment])

  // Initialize form with request data if provided - ONLY ONCE
  useEffect(() => {
    if (request && !formInitialized.current && allEquipment.length > 0) {
      // Find equipment if equipment_id is provided
      let selectedEq = null
      if (request.equipment_id) {
        selectedEq = allEquipment.find((eq) => eq.id == request.equipment_id)
      }

      const initialTask = {
        name: request.title || "",
        assignTo: "",
        status: "Not Started",
        deadline: "",
        report: "",
        equipmentCode: selectedEq ? selectedEq.code : "",
        location: request.location || (selectedEq ? selectedEq.location : ""),
        description: request.description || "",
        priority: request.priority || "medium", // Use lowercase priority
        type: request.type || "repair", // Default to repair if not specified
        requestCode: request.request_code || "", // Add request code
      }

      setTask(initialTask)

      if (selectedEq) {
        setSelectedEquipment(selectedEq)
      }

      // Set photo if available
      if (request.picture) {
        setPhotoUrl(request.picture)
      }

      formInitialized.current = true
    }
  }, [request, allEquipment])

  // Map urgency level to priority (ensure lowercase values)
  const mapUrgencyToPriority = (urgencyLevel) => {
    if (!urgencyLevel) return "medium"

    const urgencyMap = {
      low: "low",
      medium: "medium",
      high: "high",
      Low: "low",
      Medium: "medium",
      High: "high",
    }

    return urgencyMap[urgencyLevel] || "medium"
  }

  // Filter equipment based on location input
  useEffect(() => {
    const filterEquipment = async () => {
      setIsLoadingEquipment(true)
      try {
        // If location is provided, filter equipment by location
        if (task.location.trim() && allEquipment.length > 0) {
          const locationLower = task.location.toLowerCase()
          const filteredEquipment = allEquipment.filter((equipment) =>
            equipment.location.toLowerCase().includes(locationLower),
          )
          setEquipmentList(filteredEquipment)
        } else {
          // If no location filter, show all equipment
          setEquipmentList(allEquipment)
        }
      } catch (error) {
        console.error("Error filtering equipment:", error)
        showToast(t("taskForm", "toast", "equipmentError"), "error")
      } finally {
        setIsLoadingEquipment(false)
      }
    }

    filterEquipment()
  }, [task.location, allEquipment, t])

  // Filter users based on search term
  useEffect(() => {
    const filterUsers = async () => {
      setIsLoadingUsers(true)
      try {
        if (!userSearchTerm.trim() || allUsers.length === 0) {
          setUsersList(allUsers)
        } else {
          const searchTermLower = userSearchTerm.toLowerCase()
          const filteredUsers = allUsers.filter(
            (user) =>
              user.name.toLowerCase().includes(searchTermLower) ||
              user.location.toLowerCase().includes(searchTermLower) ||
              user.code.toLowerCase().includes(searchTermLower),
          )
          setUsersList(filteredUsers)
        }
      } catch (error) {
        console.error("Error filtering users:", error)
        showToast(t("taskForm", "toast", "userError"), "error")
      } finally {
        setIsLoadingUsers(false)
      }
    }

    filterUsers()
  }, [userSearchTerm, allUsers, t])

  const handleInputChange = useCallback(
    (field, value) => {
      setTask((prev) => ({ ...prev, [field]: value }))
      // Clear error for this field when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: null }))
      }
    },
    [errors],
  )

  const handleEquipmentSelect = useCallback(
    (code, equipment) => {
      setTask((prev) => {
        // If location is empty and equipment is selected, auto-populate location
        if (equipment) {
          return {
            ...prev,
            equipmentCode: code,
            location: equipment.location || prev.location,
          }
        }
        return { ...prev, equipmentCode: code }
      })

      setSelectedEquipment(equipment || null)

      // Clear error if present
      if (errors.equipmentCode) {
        setErrors((prev) => ({ ...prev, equipmentCode: null }))
      }
    },
    [errors],
  )

  const handleUserSelect = useCallback(
    (code, user) => {
      setTask((prev) => ({ ...prev, assignTo: code }))
      setSelectedUser(user || null)

      // Clear error if present
      if (errors.assignTo) {
        setErrors((prev) => ({ ...prev, assignTo: null }))
      }
    },
    [errors],
  )

  const handleUserSearch = useCallback((value) => {
    setUserSearchTerm(value)
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

  const validateForm = useCallback(() => {
    const newErrors = {}

    // Required fields with translated error messages
    if (!task.name.trim()) newErrors.name = t("taskForm", "validation", "nameRequired")
    if (!task.assignTo) newErrors.assignTo = t("taskForm", "validation", "assignToRequired")
    if (!task.status) newErrors.status = t("taskForm", "validation", "statusRequired")
    if (!task.deadline) newErrors.deadline = t("taskForm", "validation", "deadlineRequired")
    if (!task.equipmentCode) newErrors.equipmentCode = t("taskForm", "validation", "equipmentCodeRequired") // Fix: error key should match field name
    if (!task.priority) newErrors.priority = t("taskForm", "validation", "priorityRequired")
    if (!task.type) newErrors.type = t("taskForm", "validation", "taskTypeRequired")
    if (!task.location.trim()) newErrors.location = t("taskForm", "validation", "locationRequired")
    if (!task.description.trim()) newErrors.description = t("taskForm", "validation", "descriptionRequired")

    return newErrors
  }, [task, t])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formErrors = validateForm()
    setErrors(formErrors)

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true)

      try {
        // Determine which requestId to use
        const targetRequestId = requestId || (request && request.id)

        if (!targetRequestId) {
          throw new Error("No request ID provided")
        }

        // Get the actual equipment ID if we have the equipment object
        // IMPORTANT: We need to send the equipment ID to the backend, not the code
        const equipmentId = selectedEquipment ? selectedEquipment.id : null

        if (!equipmentId) {
          throw new Error("No equipment selected")
        }

        // Create intervention data object matching backend requirements
        const interventionData = {
          technician_id: selectedUser?.id,
          intv_status: task.status,
          deadline: task.deadline,
          intervention_type: task.type, // Fixed: Use task.type for intervention_type
          report: task.report,

          // These fields will update the request
          title: task.name,
          description: task.description,
          localisation: task.location,
          equipment_id: equipmentId, // Use the actual ID, not the code
          priority: task.priority, // Now using lowercase priority
          picture: photoUrl || null, // Use the existing photo URL
          request_code: task.requestCode, // Added request code
        }

        console.log("Intervention Data:", interventionData)
        console.log("Target Request ID:", targetRequestId)

        // Call the API to create intervention from request
        const response = await axios.post(
          `${API_BASE_URL}/interventions/from-request/${targetRequestId}`,
          interventionData,
          {
            headers: {
              "Content-Type": "application/json",
              // Add authorization header if needed
              // 'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          },
        )

        // Show success message
        showToast(t("taskForm", "toast", "createSuccess"), "success")

        // Redirect to interventions list or details page after successful creation
        setTimeout(() => {
          router.push("/interventions")
        }, 2000)
      } catch (error) {
        console.error("Error creating intervention:", error)
        showToast(error.response?.data?.message || error.message || t("taskForm", "toast", "error"), "error")
      } finally {
        setIsSubmitting(false)
      }
    } else {
      showToast(t("taskForm", "toast", "error"), "error")
    }
  }

  // Current user for sidebar
  const currentUser = {
    name: "BOULAMI Amira",
    role: "admin",
    initials: "BA",
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-900">
        <Sidebar
          activeItem={"tasks"}
          userRole={currentUser.role}
          userName={currentUser.name}
          userInitials={currentUser.initials}
        />
        <div className="flex items-center justify-center w-full">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-neutral-600 dark:text-neutral-300">{t("common", "loading")}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-900">
      {/* Toast Notification */}
      <Toast message={toast.message} type={toast.type} visible={toast.visible} onClose={hideToast} />

      {/* Show sidebar */}
      <Sidebar
        activeItem={"tasks"}
        userRole={currentUser.role}
        userName={currentUser.name}
        userInitials={currentUser.initials}
      />

      {/* Main content */}
      <div className="pt-14 md:pt-0 flex overflow-y-auto pb-8 w-full bg-neutral-50 dark:bg-neutral-990">
        <div className="px-4 sm:px-10 lg:px-20 w-full">
          <div className="flex flex-col items-start gap-6 mb-6 pt-6 text-neutral-950 dark:text-neutral-100">
            <div className="text-sm flex items-center font-inter">
              <span>{t("taskForm", "breadcrumb", "dashboard")}</span>
              <span className="mx-2 text-lg">›</span>
              <span>{t("taskForm", "breadcrumb", "tasks")}</span>
              <span className="mx-2 text-lg">›</span>
              <span>{t("taskForm", "breadcrumb", "addTask")}</span>
            </div>
            <h1 className="text-xl lg:text-2xl font-russo">
              {t("taskForm", "title", "add")}
              {task.requestCode && <span className="ml-2 text-lg font-normal text-gray-500">#{task.requestCode}</span>}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {/* Task Details Section */}
            <div className="space-y-6">
              <h2 className="text-lg font-russo text-neutral-950 dark:text-neutral-100">
                {t("taskForm", "sections", "taskDetails")}
              </h2>

              <FormField
                title={t("taskForm", "fields", "name", "label")}
                placeholder={t("taskForm", "fields", "name", "placeholder")}
                value={task.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                error={errors.name}
                required={true}
              />
              <div className="grid grid-cols-2 gap-4">
                <AutocompleteField
                  title={t("taskForm", "fields", "assignTo", "label")}
                  placeholder={t("taskForm", "fields", "assignTo", "placeholder")}
                  value={task.assignTo}
                  onChange={handleUserSelect}
                  options={usersList}
                  error={errors.assignTo}
                  required={true}
                  loading={isLoadingUsers}
                  emptyMessage={t("taskForm", "fields", "assignTo", "noPersonnelMessage")}
                  noMatchMessage={t("taskForm", "fields", "assignTo", "noMatchMessage")}
                />

                {/* drop down for the task type */}
                <DropdownField
                  title={t("taskForm", "fields", "taskType", "label")}
                  value={task.type}
                  onChange={(value) => handleInputChange("type", value)}
                  options={taskTypes}
                  error={errors.type}
                  required={true}
                  placeholder={t("taskForm", "fields", "taskType", "placeholder")}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <DateField
                  title={t("taskForm", "fields", "deadline", "label")}
                  value={task.deadline}
                  onChange={(e) => handleInputChange("deadline", e.target.value)}
                  error={errors.deadline}
                  required={true}
                />

                <DropdownField
                  title={t("taskForm", "fields", "status", "label")}
                  value={task.status}
                  onChange={(value) => handleInputChange("status", value)}
                  options={statusOptions}
                  error={errors.status}
                  required={true}
                  placeholder={t("taskForm", "fields", "status", "placeholder")}
                />
              </div>

              <FormField
                title={t("taskForm", "fields", "report", "label")}
                placeholder={t("taskForm", "fields", "report", "placeholder")}
                value={task.report}
                onChange={(e) => handleInputChange("report", e.target.value)}
                isTextarea={true}
                error={errors.report}
              />
            </div>

            {/* Request Information Section */}
            <div className="space-y-6 mt-4">
              <h2 className="text-lg font-russo text-neutral-950 dark:text-neutral-100">
                {t("taskForm", "sections", "requestInfo")}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AutocompleteField
                  title={t("taskForm", "fields", "equipmentCode", "label")}
                  placeholder={t("taskForm", "fields", "equipmentCode", "placeholder")}
                  value={task.equipmentCode}
                  onChange={handleEquipmentSelect}
                  options={equipmentList}
                  error={errors.equipmentCode}
                  required={true}
                  loading={isLoadingEquipment}
                  emptyMessage={t("taskForm", "fields", "equipmentCode", "noEquipmentMessage")}
                  noMatchMessage={t("taskForm", "fields", "equipmentCode", "noMatchMessage")}
                />

                <FormField
                  title={t("taskForm", "fields", "location", "label")}
                  placeholder={t("taskForm", "fields", "location", "placeholder")}
                  value={task.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  icon={<MapPin size={16} />}
                  error={errors.location}
                  comment={t("taskForm", "fields", "location", "comment")}
                />
              </div>

              <FormField
                title={t("taskForm", "fields", "description", "label")}
                placeholder={t("taskForm", "fields", "description", "placeholder")}
                value={task.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                isTextarea={true}
                error={errors.description}
                required={true}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DropdownField
                  title={t("taskForm", "fields", "priority", "label")}
                  value={task.priority}
                  onChange={(value) => handleInputChange("priority", value)}
                  options={priorityOptions}
                  error={errors.priority}
                  required={true}
                  placeholder={t("taskForm", "fields", "priority", "placeholder")}
                />

                {/* Display photo if available */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    {t("taskForm", "fields", "photos", "label") || "Photo"}
                  </label>
                  <div className="mt-1 flex items-center">
                    {photoUrl ? (
                      <div className="relative w-32 h-32 rounded-md overflow-hidden border border-neutral-200 dark:border-neutral-700">
                        <img
                          src={photoUrl || "/placeholder.svg"}
                          alt="Request photo"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-32 h-32 bg-neutral-100 dark:bg-neutral-800 rounded-md border border-neutral-200 dark:border-neutral-700">
                        <ImageIcon className="w-8 h-8 text-neutral-400" />
                        <span className="ml-2 text-sm text-neutral-500 dark:text-neutral-400">No photo</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`h-10 w-32 mr-3 text-sm bg-blue-500 text-white font-medium rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 transition-colors ${
                  isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {t("taskForm", "actions", "creating")}
                  </span>
                ) : (
                  t("taskForm", "actions", "create")
                )}
              </button>

              <button
                type="button"
                onClick={() => router.back()}
                className="h-10 w-32 text-neutral-900 dark:text-neutral-300 text-sm font-medium bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 transition-colors"
              >
                {t("taskForm", "actions", "cancel")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
