"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useLanguage } from "../../translations/contexts/languageContext"
import Sidebar from "../../components/sidebar"
import { Calendar, MapPin, Users, ChevronDown, AlertCircle, Plus, X } from 'lucide-react'
import FormField from "../../components/form_components/form_field"
import DropdownField from "../../components/form_components/dropdown_field"
import AutocompleteField from "../../components/form_components/autocomplete_field"
import PhotoUpload from "../../components/form_components/photoupload_field"
import Toast from "../../components/form_components/toast"
import FormSection from "../../components/form_components/form_section"
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
export default function TaskAddForm({ request = {
    id: null,
    title: "Maintenance Request",
    urgencyLevel: "medium",
    equipmentCode: "EQ-123456",
    location: "Building A, Floor 3",
    description: "Fix the electrical system in Building A, Floor 3.",
    photos: [],
} }) {
  const { t } = useLanguage()
  const formInitialized = useRef(false)

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

  // Form validation
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Available options for dropdowns
  const statusOptions = ["Not Started", "In Progress", "On Hold", "Completed", "Cancelled"]
  const priorityOptions = ["Low", "Medium", "High", "Critical"]
  const tasktypes = ["Maintenance", "Repair", "Installation", "Inspection"]

  // Initialize form with request data if provided - ONLY ONCE
  useEffect(() => {
    if (request && !formInitialized.current) {
      const initialTask = {
        name: `${request.title || ""}`,
        assignTo: "",
        status: "Not Started",
        deadline: "",
        report: "",
        equipmentCode: request.equipmentCode || "",
        location: request.location || "",
        description: request.description || "",
        priority: mapUrgencyToPriority(request.urgencyLevel) || "Medium",
      }
      
      setTask(initialTask)
      formInitialized.current = true

      // Set photos if available
      if (request.photos && request.photos.length > 0) {
        setPhotos(request.photos)
      }

      // Find equipment if code is provided
      if (request.equipmentCode) {
        const equipment = mockEquipmentData.find(eq => eq.code === request.equipmentCode)
        if (equipment) {
          setSelectedEquipment(equipment)
        }
      }
    }
  }, [request])

  // Map urgency level to priority
  const mapUrgencyToPriority = (urgencyLevel) => {
    if (!urgencyLevel) return null
    
    const urgencyMap = {
      [t("requestForm", "urgencyLevels", "low")]: "Low",
      [t("requestForm", "urgencyLevels", "medium")]: "Medium",
      [t("requestForm", "urgencyLevels", "high")]: "High"
    }
    
    return urgencyMap[urgencyLevel] || "Medium"
  }

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
          filteredEquipment = mockEquipmentData.filter(
            equipment => equipment.location.toLowerCase().includes(locationLower)
          )
        }

        setEquipmentList(filteredEquipment)
      } catch (error) {
        console.error("Error filtering equipment:", error)
        showToast("Failed to load equipment data", "error")
      } finally {
        setIsLoadingEquipment(false)
      }
    }

    filterEquipment()
  }, [task.location])

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
            user => 
              user.name.toLowerCase().includes(searchTermLower) || 
              user.location.toLowerCase().includes(searchTermLower) ||
              user.code.toLowerCase().includes(searchTermLower)
          )
          setUsersList(filteredUsers)
        }
      } catch (error) {
        console.error("Error filtering users:", error)
        showToast("Failed to load users data", "error")
      } finally {
        setIsLoadingUsers(false)
      }
    }

    filterUsers()
  }, [userSearchTerm])

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
        if ( equipment) {
          return {
            ...prev,
            equipmentCode: code,
            location: equipment.location
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

    // Required fields
    if (!task.name.trim()) newErrors.name = "Task name is required"
    if (!task.assignTo) newErrors.assignTo = "Assignment is required"
    if (!task.status) newErrors.status = "Status is required"
    if (!task.deadline) newErrors.deadline = "Deadline is required"
    if (!task.equipmentCode) newErrors.equipmentCode = "Equipment code is required"
    if (!task.priority) newErrors.priority = "Priority is required"
    if (!task.type) newErrors.type = "Task type is required"
    if (!task.location.trim()) newErrors.location = "Location is required"

    return newErrors
  }, [task])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formErrors = validateForm()
    setErrors(formErrors)

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true)

      try {
        // Create task data object matching backend requirements
        const formData = new FormData()
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

        // Append request ID if task was created from a request
        if (request && request.id) {
          formData.append("requestId", request.id)
        }

        // Append photos if any
        photos.forEach((photo, index) => {
          if (photo.file) {
            formData.append(`photo${index}`, photo.file)
          } else if (photo.id) {
            formData.append(`existingPhotos`, photo.id)
          }
        })

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Show success message
        showToast("Task created successfully", "success")

        // Reset form
        setTask({
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
        })
        setPhotos([])
        setSelectedEquipment(null)
        setSelectedUser(null)
        formInitialized.current = false
      } catch (error) {
        console.error("Error creating task:", error)
        showToast(error.message || "Failed to create task", "error")
      } finally {
        setIsSubmitting(false)
      }
    } else {
      showToast("Please fill in all required fields", "error")
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
              <span>Dashboard</span>
              <span className="mx-2 text-lg">›</span>
              <span>Tasks</span>
              <span className="mx-2 text-lg">›</span>
              <span>Add New Task</span>
            </div>
            <h1 className="text-xl lg:text-2xl font-russo">Add New Task</h1>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {/* Task Details Section */}
            <div className="space-y-6">
              <h2 className="text-lg font-russo text-neutral-950 dark:text-neutral-100">Task Details</h2>
              
              <FormField
                title="Task Name"
                placeholder="Enter task name"
                value={task.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                error={errors.name}
                required={true}
              />
                <div className="grid grid-cols-2 gap-4">
                    <AutocompleteField
                    title="Assign To"
                    placeholder="Select personnel or team"
                    value={task.assignTo}
                    onChange={handleUserSelect}
                    options={usersList}
                    error={errors.assignTo}
                    required={true}
                    loading={isLoadingUsers}
                    emptyMessage="No personnel available"
                    noMatchMessage="No matching personnel found"
                    />

                    {/* drop down for the task type */}
                    <DropdownField
                        title="Task Type"
                        value={task.type}
                        onChange={(value) => handleInputChange("type", value)}
                        options={tasktypes}
                        error={errors.type}
                        required={true}
                        placeholder="Select task type"
                    />
                </div>
                

                <div className="grid grid-cols-2 gap-4">
                    <DateField
                        title="Deadline"
                        value={task.deadline}
                        onChange={(e) => handleInputChange("deadline", e.target.value)}
                        error={errors.deadline}
                        required={true}
                    />

                  <DropdownField
                    title="Status"
                    value={task.status}
                    onChange={(value) => handleInputChange("status", value)}
                    options={statusOptions}
                    error={errors.status}
                    required={true}
                    placeholder="Select status"
                  />
                </div>

              <FormField
                title="Report"
                placeholder="Provide detailed description of the maintenance task"
                value={task.report}
                onChange={(e) => handleInputChange("report", e.target.value)}
                isTextarea={true}
                error={errors.report}
              />
            </div>

            {/* Request Information Section */}
            <div className="space-y-6 mt-4">
              <h2 className="text-lg font-russo text-neutral-950 dark:text-neutral-100">Request Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AutocompleteField
                  title="Equipment Code"
                  placeholder="Ex: 123456"
                  value={task.equipmentCode}
                  onChange={handleEquipmentSelect}
                  options={equipmentList}
                  error={errors.equipmentCode}
                  required={true}
                  loading={isLoadingEquipment}
                  emptyMessage="No equipment available"
                  noMatchMessage="No matching equipment found"
                />

                <FormField
                  title="Location"
                  placeholder="Specify location"
                  value={task.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  icon={<MapPin size={16} />}
                  error={errors.location}
                  comment="Filter equipment by location or leave empty"
                />
              </div>

              <FormField
                title="Description"
                placeholder="Provide detailed description of the maintenance task"
                value={task.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                isTextarea={true}
                error={errors.description}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DropdownField
                  title="Priority"
                  value={task.priority}
                  onChange={(value) => handleInputChange("priority", value)}
                  options={priorityOptions}
                  error={errors.priority}
                  required={true}
                  placeholder="Select priority"
                />

                <PhotoUpload
                  title="Photos (optional)"
                  addButtonText="Ajouter des photos"
                  maxPhotosText="Maximum 3 photos"
                  photos={photos}
                  setPhotos={setPhotos}
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
                    Creating...
                  </span>
                ) : (
                  "Create"
                )}
              </button>

              <button
                type="button"
                className="h-10 w-32 text-neutral-900 dark:text-neutral-300 text-sm font-medium bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}