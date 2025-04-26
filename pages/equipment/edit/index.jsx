"use client"

import { useState, useEffect, useCallback } from "react"
import { useLanguage } from "../../translations/contexts/languageContext"
import Sidebar from "../../components/sidebar"
import { MapPin, Loader2 } from "lucide-react"
import Toast from "../../components/form_components/toast"
import FormField from "../../components/form_components/form_field"
import DropdownField from "../../components/form_components/dropdown_field"
import FormSection from "../../components/form_components/form_section"
import DateField from "../../components/form_components/date_field"

// Main Component
export default function EquipmentEditForm() {
  const { t } = useLanguage()

  // State for toast notifications
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  })

  // Loading state
  const [isLoading, setIsLoading] = useState(true)

  // Form state
  const [equipment, setEquipment] = useState({
    id: "",
    code: "",
    type: "",
    category: "",
    acquisitionDate: "",
    commissioningDate: "",
    location: "",
    status: "",
    description: "",
  })

  // Form validation
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Available options for dropdowns
  const typeOptions = ["Mechanical", "Electrical", "Hydraulic", "Pneumatic", "Electronic", "Other"]
  const categoryOptions = ["Production", "Maintenance", "Safety", "Quality Control", "Logistics", "Office"]
  const statusOptions = ["Operational", "Under Maintenance", "Out of Service", "Pending Installation", "Retired"]

  // Fetch equipment data
  useEffect(() => {
    const fetchEquipment = async () => {
      setIsLoading(true)
      try {
        // In a real application, you would get the equipment ID from the URL or props
        // const equipmentId = params.id or props.equipmentId
        const equipmentId = "123" // Mock ID for demonstration

        // Simulate API call to fetch equipment data
        // In a real application, this would be a fetch call to your API
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data for demonstration
        const mockEquipmentData = {
          id: equipmentId,
          code: "EQ-2023-001",
          type: "Mechanical",
          category: "Production",
          acquisitionDate: "2023-01-15",
          commissioningDate: "2023-02-01",
          location: "Building A, Floor 2",
          status: "Operational",
          description: "High-performance industrial equipment for manufacturing process.",
        }

        setEquipment(mockEquipmentData)
      } catch (error) {
        console.error("Error fetching equipment:", error)
        showToast("Failed to load equipment data", "error")
      } finally {
        setIsLoading(false)
      }
    }

    fetchEquipment()
  }, [])

  const handleInputChange = useCallback(
    (field, value) => {
      setEquipment((prev) => ({ ...prev, [field]: value }))
      // Clear error for this field when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: null }))
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
  
    // Required fields
    if (!equipment.code.trim()) 
      newErrors.code = t("equipmentEdit", "validation", "codeRequired")
    if (!equipment.type) 
      newErrors.type = t("equipmentEdit", "validation", "typeRequired")
    if (!equipment.category) 
      newErrors.category = t("equipmentEdit", "validation", "categoryRequired")
    if (!equipment.acquisitionDate) 
      newErrors.acquisitionDate = t("equipmentEdit", "validation", "acquisitionRequired")
    if (!equipment.commissioningDate) 
      newErrors.commissioningDate = t("equipmentEdit", "validation", "commissioningRequired")
    if (!equipment.location.trim()) 
      newErrors.location = t("equipmentEdit", "validation", "locationRequired")
    if (!equipment.status) 
      newErrors.status = t("equipmentEdit", "validation", "statusRequired")
  
    return newErrors
  }, [equipment, t])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formErrors = validateForm()
    setErrors(formErrors)

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true)

      try {
        // Create equipment data object matching backend requirements
        const equipmentData = {
          id: equipment.id,
          code: equipment.code,
          type: equipment.type,
          category: equipment.category,
          acquisitionDate: equipment.acquisitionDate,
          commissioningDate: equipment.commissioningDate,
          location: equipment.location,
          status: equipment.status,
          description: equipment.description,
        }

        // Simulate API call
        // In a real application, this would be a PUT/PATCH request to your API
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Show success message
        showToast("Equipment updated successfully", "success")
      } catch (error) {
        console.error("Error updating equipment:", error)
        showToast(error.message || "Failed to update equipment", "error")
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
        activeItem={"equipment"}
        userRole={currentUser.role}
        userName={currentUser.name}
        userInitials={currentUser.initials}
      />

      {/* Main content */}
      <div className="pt-14 lg:pt-0 flex overflow-y-auto pb-8 w-full bg-neutral-50 dark:bg-neutral-990">
        <div className="px-4 sm:px-10 lg:px-20 w-full">
          <div className="flex flex-col items-start gap-6 mb-6 pt-6 text-neutral-950 dark:text-neutral-100">
            <div className="text-sm flex items-center font-inter">
              <span>{t("equipmentEdit", "breadcrumb", "equipment")}</span>
              <span className="mx-2 text-lg">›</span>
              <span>{t("equipmentEdit", "breadcrumb", "edit")}</span>
            </div>
            <h1 className="text-xl lg:text-2xl font-russo">{t("equipmentEdit", "title", "edit")}</h1>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <span className="ml-2 text-neutral-600 dark:text-neutral-300">{t("equipmentEdit", "loading")}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              {/* Equipment Information */}
              <FormSection title={t("equipmentEdit", "sections", "equipmentInfo")}>
                <div className="flex flex-col gap-4">
                  <FormField
                    title={t("equipmentEdit", "fields", "code")}
                    placeholder={t("equipmentEdit", "fields", "codePlaceholder")}
                    value={equipment.code}
                    onChange={(e) => handleInputChange("code", e.target.value)}
                    error={errors.code}
                    required={true}
                  />
                </div>
              </FormSection>

              {/* Record Details */}
              <FormSection title={t("equipmentEdit", "sections", "recordDetails")}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DropdownField
                    title={t("equipmentEdit", "fields", "type")}
                    value={equipment.type}
                    onChange={(value) => handleInputChange("type", value)}
                    options={typeOptions}
                    error={errors.type}
                    required={true}
                    placeholder={t("equipmentEdit", "fields", "typePlaceholder")}
                  />

                  <DropdownField
                    title={t("equipmentEdit", "fields", "category")}
                    value={equipment.category}
                    onChange={(value) => handleInputChange("category", value)}
                    options={categoryOptions}
                    error={errors.category}
                    required={true}
                    placeholder={t("equipmentEdit", "fields", "categoryPlaceholder")}
                  />

                  <DateField
                    title={t("equipmentEdit", "fields", "acquisition")}
                    value={equipment.acquisitionDate}
                    onChange={(e) => handleInputChange("acquisitionDate", e.target.value)}
                    error={errors.acquisitionDate}
                    required={true}
                  />

                  <DateField
                    title={t("equipmentEdit", "fields", "commissioning")}
                    value={equipment.commissioningDate}
                    onChange={(e) => handleInputChange("commissioningDate", e.target.value)}
                    error={errors.commissioningDate}
                    required={true}
                  />

                  <FormField
                    title={t("equipmentEdit", "fields", "location")}
                    placeholder={t("equipmentEdit", "fields", "locationPlaceholder")}
                    value={equipment.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    icon={<MapPin size={18} />}
                    error={errors.location}
                    required={true}
                  />

                  <DropdownField
                    title={t("equipmentEdit", "fields", "status")}
                    value={equipment.status}
                    onChange={(value) => handleInputChange("status", value)}
                    options={statusOptions}
                    error={errors.status}
                    required={true}
                    placeholder={t("equipmentEdit", "fields", "statusPlaceholder")}
                  />
                </div>

                <FormField
                  title={t("equipmentEdit", "fields", "description")}
                  placeholder={t("equipmentEdit", "fields", "descriptionPlaceholder")}
                  value={equipment.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  isTextarea={true}
                  error={errors.description}
                />
              </FormSection>

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
                      {t("equipmentEdit", "actions", "updating")}
                    </span>
                  ) : (
                    t("equipmentEdit", "actions", "update")
                  )}
                </button>

                <button
                  type="button"
                  className="h-10 w-32 text-neutral-900 dark:text-neutral-300 text-sm font-medium bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 transition-colors"
                >
                  {t("equipmentEdit", "actions", "cancel")}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
