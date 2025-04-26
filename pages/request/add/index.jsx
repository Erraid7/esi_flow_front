"use client"

import { useState, useEffect, useCallback } from "react"
import { useLanguage } from "../../translations/contexts/languageContext"
import Sidebar from "../../components/sidebar"
import { AlertCircle, MapPin } from 'lucide-react'
import FormField from "../../components/form_components/form_field"
import DropdownField from "../../components/form_components/dropdown_field"
import AutocompleteField from "../../components/form_components/autocomplete_field"
import PhotoUpload from "../../components/form_components/photoupload_field"
import Toast from "../../components/form_components/toast"
import FormSection from "../../components/form_components/form_section"

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
]

// Main Component
export default function RequestAddForm() {
  const { t } = useLanguage()

  // State for toast notifications
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  })

  // Form state
  const [request, setRequest] = useState({
    title: "",
    location: "",
    equipmentCode: "",
    description: "",
    urgencyLevel: "",
  })

  // Equipment state
  const [equipmentList, setEquipmentList] = useState([])
  const [isLoadingEquipment, setIsLoadingEquipment] = useState(false)
  const [selectedEquipment, setSelectedEquipment] = useState(null)

  // Photos state
  const [photos, setPhotos] = useState([])
  const [deletedPhotos, setDeletedPhotos] = useState([])

  // Form validation
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Available options for dropdowns with translations
  const urgencyLevelOptions = [
    t("requestForm", "urgencyLevels", "low"),
    t("requestForm", "urgencyLevels", "medium"),
    t("requestForm", "urgencyLevels", "high"),
  ]

  // Filter equipment based on location input
  useEffect(() => {
    const filterEquipment = async () => {
      setIsLoadingEquipment(true)
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300))

        let filteredEquipment = [...mockEquipmentData]
        
        // If location is provided, filter equipment by location
        if (request.location.trim()) {
          const locationLower = request.location.toLowerCase()
          filteredEquipment = mockEquipmentData.filter(
            equipment => equipment.location.toLowerCase().includes(locationLower)
          )
        }

        setEquipmentList(filteredEquipment)
      } catch (error) {
        console.error("Error filtering equipment:", error)
        showToast(t("requestForm", "toast", "equipmentFetchError"), "error")
      } finally {
        setIsLoadingEquipment(false)
      }
    }

    filterEquipment()
  }, [request.location, t])

  const handleInputChange = useCallback(
    (field, value) => {
      setRequest((prev) => ({ ...prev, [field]: value }))
      // Clear error for this field when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: null }))
      }
    },
    [errors],
  )

  const handleEquipmentSelect = useCallback(
    (code, equipment) => {
      setRequest((prev) => {
        // If location is empty and equipment is selected, auto-populate location
        if (!prev.location && equipment) {
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
    if (!request.title.trim()) newErrors.title = t("requestForm", "validation", "titleRequired")
    if (!request.description.trim()) newErrors.description = t("requestForm", "validation", "descriptionRequired")
    if (!request.urgencyLevel) newErrors.urgencyLevel = t("requestForm", "validation", "urgencyLevelRequired")
    if (!request.equipmentCode) newErrors.equipmentCode = t("requestForm", "validation", "equipmentRequired")
    // Location is now optional since it can be auto-populated

    return newErrors
  }, [request, t])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formErrors = validateForm()
    setErrors(formErrors)

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true)

      try {
        // Create request data object matching backend requirements
        const formData = new FormData()
        formData.append("title", request.title)
        formData.append("location", request.location)
        formData.append("equipmentCode", request.equipmentCode)
        formData.append("description", request.description)
        formData.append("urgencyLevel", request.urgencyLevel)

        // Append equipment details if available
        if (selectedEquipment) {
          formData.append("equipmentName", selectedEquipment.name)
          formData.append("equipmentId", selectedEquipment.id)
        }

        // Append photos if any
        photos.forEach((photo, index) => {
          formData.append(`photo${index}`, photo.file)
        })

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Show success message
        showToast(t("requestForm", "toast", "success"), "success")

        // Reset form
        setRequest({
          title: "",
          location: "",
          equipmentCode: "",
          description: "",
          urgencyLevel: "",
        })
        setPhotos([])
        setSelectedEquipment(null)
      } catch (error) {
        console.error("Error submitting request:", error)
        showToast(error.message || t("requestForm", "toast", "submitError"), "error")
      } finally {
        setIsSubmitting(false)
      }
    } else {
      showToast(t("requestForm", "toast", "error"), "error")
    }
  }

  // Current user for sidebar
  const currentUser = {
    name: "BOULAMI Amira",
    role: "personal",
    initials: "BA",
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-900">
      {/* Toast Notification */}
      <Toast message={toast.message} type={toast.type} visible={toast.visible} onClose={hideToast} />

      {/* Show sidebar */}
      <Sidebar
        activeItem={"requests"}
        userRole={currentUser.role}
        userName={currentUser.name}
        userInitials={currentUser.initials}
      />

      {/* Main content */}
      <div className="pt-14 md:pt-0 flex overflow-y-auto pb-8 w-full bg-neutral-50 dark:bg-neutral-990">
        <div className="px-4 sm:px-10 lg:px-20 w-full">
          <div className="flex flex-col items-start gap-6 mb-6 pt-6 text-neutral-950 dark:text-neutral-100">
            <div className="text-sm flex items-center font-inter">
              <span>{t("requestForm", "breadcrumb", "dashboard")}</span>
              <span className="mx-2 text-lg">›</span>
              <span>{t("requestForm", "breadcrumb", "myRequests")}</span>
              <span className="mx-2 text-lg">›</span>
              <span>{t("requestForm", "breadcrumb", "newRequest")}</span>
            </div>
            <h1 className="text-xl lg:text-2xl font-russo">{t("requestForm", "title")}</h1>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {/* Form Header */}
            <FormSection
              title={t("requestForm", "header", "title")}
              description={t("requestForm", "header", "description")}
              icon={<AlertCircle size={20} />}
            >
              {/* Empty section with just the title and description */}
            </FormSection>

            {/* Request Details */}
            <div className="space-y-6">
              <FormField
                title={t("requestForm", "fields", "requestTitle", "label")}
                placeholder={t("requestForm", "fields", "requestTitle", "placeholder")}
                value={request.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                error={errors.title}
                required={true}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AutocompleteField
                  title={t("requestForm", "fields", "equipmentCode", "label")}
                  placeholder={t("requestForm", "fields", "equipmentCode", "placeholder")}
                  value={request.equipmentCode}
                  onChange={handleEquipmentSelect}
                  options={equipmentList}
                  error={errors.equipmentCode}
                  required={true}
                  loading={isLoadingEquipment}
                  emptyMessage={t("requestForm", "fields", "equipmentCode", "noEquipmentMessage")}
                  noMatchMessage={t("requestForm", "fields", "equipmentCode", "noMatchMessage")}
                />

                <FormField
                  title={t("requestForm", "fields", "location", "label")}
                  placeholder={t("requestForm", "fields", "location", "placeholder")}
                  value={request.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  icon={<MapPin size={16} />}
                  error={errors.location}
                  comment={t("requestForm", "fields", "location", "comment") || "Filter equipment by location or leave empty"}
                />
              </div>

              <FormField
                title={t("requestForm", "fields", "description", "label")}
                placeholder={t("requestForm", "fields", "description", "placeholder")}
                value={request.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                isTextarea={true}
                error={errors.description}
                required={true}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PhotoUpload
                  title={t("requestForm", "fields", "photos", "label")}
                  addButtonText={t("requestForm", "fields", "photos", "addButton")}
                  maxPhotosText={t("requestForm", "fields", "photos", "maxPhotos").replace("{count}", "3")}
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

                <DropdownField
                  title={t("requestForm", "fields", "urgencyLevel", "label")}
                  value={request.urgencyLevel}
                  onChange={(value) => handleInputChange("urgencyLevel", value)}
                  options={urgencyLevelOptions}
                  error={errors.urgencyLevel}
                  required={true}
                  placeholder={t("requestForm", "fields", "urgencyLevel", "placeholder")}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`h-10 w-auto px-6 mr-3 text-sm bg-blue-500 text-white font-medium rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 transition-colors ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""}`}
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
                    {t("requestForm", "actions", "submitting")}
                  </span>
                ) : (
                  t("requestForm", "actions", "submit")
                )}
              </button>

              <button
                type="button"
                className="h-10 w-32 text-neutral-900 dark:text-neutral-300 text-sm font-medium bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 transition-colors"
              >
                {t("requestForm", "actions", "cancel")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}