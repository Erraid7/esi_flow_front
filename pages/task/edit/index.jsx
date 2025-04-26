"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useLanguage } from "../../translations/contexts/languageContext"
import Sidebar from "../../components/sidebar"
import { MapPin, Loader2 } from "lucide-react"
import FormField from "../../components/form_components/form_field"
import DropdownField from "../../components/form_components/dropdown_field"
import AutocompleteField from "../../components/form_components/autocomplete_field"
import PhotoUpload from "../../components/form_components/photoupload_field"
import Toast from "../../components/form_components/toast"
import DateField from "@/pages/components/form_components/date_field"

// Mock equipment data
const mockEquipmentData = [
  { id: "1", code: "EQ-001", name: "Projector", location: "Building A, Floor 1" },
  { id: "2", code: "EQ-002", name: "Smart Board", location: "Building A, Floor 1" },
  { id: "3", code: "EQ-003", name: "Computer", location: "Building A, Floor 1" },
  { id: "4", code: "EQ-004", name: "Printer", location: "Building A, Floor 2" },
  { id: "5", code: "EQ-005", name: "Scanner", location: "Building A, Floor 2" },
  { id: "6", code: "EQ-006", name: "Air Conditioner", location: "Building A, Floor 3" },
  { id: "7", code: "EQ-007", name: "Projector", location: "Building A, Floor 3" },
  { id: "8", code: "EQ-008", name: "Microscope", location: "Building B, Floor 1" },
  { id: "9", code: "EQ-009", name: "Laboratory Equipment", location: "Building B, Floor 1" },
  { id: "10", code: "EQ-010", name: "Whiteboard", location: "Building B, Floor 2" },
  { id: "11", code: "EQ-011", name: "Sound System", location: "Building C, Floor 1" },
  { id: "12", code: "EQ-012", name: "Gym Equipment", location: "Gymnasium" },
  { id: "13", code: "EQ-013", name: "Coffee Machine", location: "Cafeteria" },
  { id: "14", code: "EQ-014", name: "Book Scanner", location: "Library" },
  { id: "15", code: "EQ-015", name: "Chemistry Equipment", location: "Laboratory" },
  { id: "16", code: "EQ-123456", name: "Electrical System", location: "Building A, Floor 3" },
]

// Mock users data - formatted for autocomplete
const mockUsersData = [
  { id: "1", code: "JD001", name: "John Doe", location: "Technician" },
  { id: "2", code: "JS002", name: "Jane Smith", location: "Maintenance Manager" },
  { id: "3", code: "RJ003", name: "Robert Johnson", location: "Electrician" },
  { id: "4", code: "SW004", name: "Sarah Williams", location: "Plumber" },
  { id: "5", code: "MB005", name: "Michael Brown", location: "HVAC Specialist" },
  { id: "6", code: "TA006", name: "Team Alpha", location: "Maintenance Team" },
  { id: "7", code: "TB007", name: "Team Beta", location: "Electrical Team" },
]

// Main Component
export default function TaskEditForm({ taskId }) {
  const { t } = useLanguage()
  const formInitialized = useRef(false)

  // Loading state
  const [isLoading, setIsLoading] = useState(true)

  // State for toast notifications
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  })

  // Form state
  const [task, setTask] = useState({
    id: "",
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
    createdAt: "",
    updatedAt: "",
    createdBy: "",
  })

  // Equipment state
  const [equipmentList, setEquipmentList] = useState([])
  const [isLoadingEquipment, setIsLoadingEquipment] = useState(false)
  const [selectedEquipment, setSelectedEquipment] = useState(null)

  // Users state
  const [usersList, setUsersList] = useState(mockUsersData)
  const [isLoadingUsers, setIsLoadingUsers] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [userSearchTerm, setUserSearchTerm] = useState("")

  // Photos state
  const [photos, setPhotos] = useState([])
  const [deletedPhotos, setDeletedPhotos] = useState([])

  // Form validation
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Available options for dropdowns
  const statusOptions = [
    t("taskForm", "statusOptions", 0),
    t("taskForm", "statusOptions", 1),
    t("taskForm", "statusOptions", 2),
    t("taskForm", "statusOptions", 3),
    t("taskForm", "statusOptions", 4),
  ]
  const priorityOptions = [
    t("taskForm", "priorityOptions", 0),
    t("taskForm", "priorityOptions", 1),
    t("taskForm", "priorityOptions", 2),
    t("taskForm", "priorityOptions", 3),
  ]
  const taskTypes = [
    t("taskForm", "taskTypes", 0),
    t("taskForm", "taskTypes", 1),
    t("taskForm", "taskTypes", 2),
  ]

  // Fetch task data
  useEffect(() => {
    const fetchTaskData = async () => {
      setIsLoading(true)
      try {
        // In a real application, you would fetch the task data from your API
        // const response = await fetch(`/api/tasks/${taskId}`);
        // const data = await response.json();

        // For demonstration, we'll use mock data
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

        // Mock task data
        const mockTaskData = {
          id: taskId || "T-123",
          name: "Repair Electrical System in Building A",
          assignTo: "RJ003", // Robert Johnson (Electrician)
          status: t("taskForm", "statusOptions", 1), // In Progress
          deadline: "2023-12-15",
          report:
            "Initial inspection completed. Requires replacement of circuit breakers and rewiring of the main panel.",
          equipmentCode: "EQ-123456",
          location: "Building A, Floor 3",
          description: "Fix the electrical system in Building A, Floor 3. Multiple power outages reported.",
          priority: t("taskForm", "priorityOptions", 2), // High
          type: t("taskForm", "taskTypes", 1), // Maintenance
          createdAt: "2023-11-01T09:30:00Z",
          updatedAt: "2023-11-05T14:45:00Z",
          createdBy: "JS002", // Jane Smith (Maintenance Manager)
        }

        // Mock photos
        const mockPhotos = [
          {
            id: "photo1",
            preview: "/placeholder.svg?height=200&width=200",
            file: null,
          },
        ]

        setTask(mockTaskData)
        setPhotos(mockPhotos)

        // Find the selected equipment
        const equipment = mockEquipmentData.find((eq) => eq.code === mockTaskData.equipmentCode)
        if (equipment) {
          setSelectedEquipment(equipment)
        }

        // Find the selected user
        const user = mockUsersData.find((u) => u.code === mockTaskData.assignTo)
        if (user) {
          setSelectedUser(user)
        }

        formInitialized.current = true
      } catch (error) {
        console.error("Error fetching task data:", error)
        showToast(t("taskForm", "toast", "loadError"), "error")
      } finally {
        setIsLoading(false)
      }
    }

    fetchTaskData()
  }, [taskId, t])

  // Filter equipment based on location input
  useEffect(() => {
    const filterEquipment = async () => {
      setIsLoadingEquipment(true)
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300))

        let filteredEquipment = [...mockEquipmentData]

        // If location is provided, filter equipment by location
        if (task.location.trim()) {
          const locationLower = task.location.toLowerCase()
          filteredEquipment = mockEquipmentData.filter((equipment) =>
            equipment.location.toLowerCase().includes(locationLower),
          )
        }

        setEquipmentList(filteredEquipment)
      } catch (error) {
        console.error("Error filtering equipment:", error)
        showToast(t("taskForm", "toast", "equipmentError"), "error")
      } finally {
        setIsLoadingEquipment(false)
      }
    }

    filterEquipment()
  }, [task.location, t])

  // Filter users based on search term
  useEffect(() => {
    const filterUsers = async () => {
      setIsLoadingUsers(true)
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 200))

        if (!userSearchTerm.trim()) {
          setUsersList(mockUsersData)
        } else {
          const searchTermLower = userSearchTerm.toLowerCase()
          const filteredUsers = mockUsersData.filter(
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
  }, [userSearchTerm, t])

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
            location: equipment.location,
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
    if (!task.equipmentCode) newErrors.equipmentCode = t("taskForm", "validation", "equipmentCodeRequired")
    if (!task.priority) newErrors.priority = t("taskForm", "validation", "priorityRequired")
    if (!task.type) newErrors.type = t("taskForm", "validation", "taskTypeRequired")
    if (!task.location.trim()) newErrors.location = t("taskForm", "validation", "locationRequired")

    return newErrors
  }, [task, t])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formErrors = validateForm()
    setErrors(formErrors)

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true)

      try {
        // Create task data object matching backend requirements
        const formData = new FormData()
        formData.append("id", task.id)
        formData.append("name", task.name)
        formData.append("assignTo", task.assignTo)
        formData.append("status", task.status)
        formData.append("deadline", task.deadline)
        formData.append("report", task.report)
        formData.append("equipmentCode", task.equipmentCode)
        formData.append("location", task.location)
        formData.append("description", task.description)
        formData.append("priority", task.priority)
        formData.append("type", task.type)

        // Append equipment details if available
        if (selectedEquipment) {
          formData.append("equipmentName", selectedEquipment.name)
          formData.append("equipmentId", selectedEquipment.id)
        }

        // Append user details if available
        if (selectedUser) {
          formData.append("assigneeName", selectedUser.name)
          formData.append("assigneeRole", selectedUser.location)
        }

        // Append new photos if any
        photos.forEach((photo, index) => {
          if (photo.file) {
            formData.append(`photo${index}`, photo.file)
          } else if (photo.id) {
            formData.append(`existingPhotos`, photo.id)
          }
        })

        // Append deleted photo IDs if any
        deletedPhotos.forEach((photoId) => {
          formData.append("deletedPhotos", photoId)
        })

        // Simulate API call
        // In a real application, this would be a PUT/PATCH request to your API
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Show success message
        showToast(t("taskForm", "toast", "updateSuccess"), "success")
      } catch (error) {
        console.error("Error updating task:", error)
        showToast(error.message || t("taskForm", "toast", "error"), "error")
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
              <span>{t("taskForm", "breadcrumb", "editTask")}</span>
            </div>
            <h1 className="text-xl lg:text-2xl font-russo">{t("taskForm", "title", "edit")}</h1>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <span className="ml-2 text-neutral-600 dark:text-neutral-300">{t("taskForm", "loading")}</span>
            </div>
          ) : (
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

                  <PhotoUpload
                    title={t("taskForm", "fields", "photos", "label")}
                    addButtonText={t("taskForm", "fields", "photos", "addButton")}
                    maxPhotosText={t("taskForm", "fields", "photos", "maxPhotos")}
                    photos={photos}
                    setPhotos={setPhotos}
                    onDeletePhoto={(photoId) => {
                      if (photoId) {
                        setDeletedPhotos((prev) => [...prev, photoId])
                      }
                    }}
                    maxPhotos={3}
                    error={errors.photos}
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`h-10 w-32 mr-3 text-sm bg-blue-500 text-white font-medium rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 transition-colors ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""}`}
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
                      {t("taskForm", "actions", "updating")}
                    </span>
                  ) : (
                    t("taskForm", "actions", "update")
                  )}
                </button>

                <button
                  type="button"
                  className="h-10 w-32 text-neutral-900 dark:text-neutral-300 text-sm font-medium bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 transition-colors"
                >
                  {t("taskForm", "actions", "cancel")}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
