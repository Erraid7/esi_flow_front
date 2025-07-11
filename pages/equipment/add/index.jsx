"use client"

import { useState, useCallback, useRef } from "react"
import { useLanguage } from "../../translations/contexts/languageContext"
import Sidebar from "../../components/sidebar"
import { MapPin, Calendar, Clock, Upload } from "lucide-react"
import Toast from "../../components/form_components/toast"
import FormField from "../../components/form_components/form_field"
import DropdownField from "../../components/form_components/dropdown_field"
import FormSection from "../../components/form_components/form_section"
import DateField from "../../components/form_components/date_field"
import axios from "axios"
import { useRouter } from "next/navigation"

// Main Component
export default function EquipmentAddForm() {
  const { t } = useLanguage()
  const router = useRouter()
  const fileInputRef = useRef(null)

  // State for toast notifications
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  })

  // Form state
  const [equipment, setEquipment] = useState({
    code: "",
    type: "",
    category: "",
    acquisitionDate: "",
    commissioningDate: "",
    location: "",
    status: "",
    description: "",
    picture: null,
    automaticMaintenanceInterval: "",
    seasonalMaintenanceMonths: [],
  })

  // Preview for uploaded image
  const [imagePreview, setImagePreview] = useState(null)

  // Form validation
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Available options for dropdowns
  const typeOptions = [
    "Lightweight",
    "Heavyweight",
    "Motorcycle",
    "Desktop",
    "Laptop",
    "Server",
    "Router",
    "Switch",
    "Firewall",
    "Projector",
    "Printer",
    "Scanner",
    "Oscilloscope",
    "3D Printer",
    "Desk",
    "Chair",
    "Window",
    "Door",
    "Electromenager",
    "Heating",
    "Radiator",
    "Air Conditioner",
    "Other",
  ]

  // Update the categoryOptions array to match the backend ENUM
  const categoryOptions = [
    "Vehicle",
    "Computing Device",
    "Networking Equipment",
    "Storage Device",
    "Multimedia Equipment",
    "Office Equipment",
    "Laboratory Equipment",
    "Furniture",
    "Building Component",
    "Appliance",
    "HVAC",
    "Other",
  ]

  // Update the statusOptions array to match the backend ENUM
  const statusOptions = ["Working", "Needs Maintenance", "Out of service"]

  // Months for seasonal maintenance
  const monthOptions = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ]

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

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      handleInputChange("picture", file)

      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleMonthToggle = (monthValue) => {
    setEquipment((prev) => {
      const currentMonths = [...prev.seasonalMaintenanceMonths]

      if (currentMonths.includes(monthValue)) {
        // Remove month if already selected
        return {
          ...prev,
          seasonalMaintenanceMonths: currentMonths.filter((m) => m !== monthValue),
        }
      } else {
        // Add month if not selected
        return {
          ...prev,
          seasonalMaintenanceMonths: [...currentMonths, monthValue].sort((a, b) => a - b),
        }
      }
    })
  }

  const handleCancel = () => {
    router.back()
  }

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
    if (!equipment.code.trim()) newErrors.code = t("equipmentEdit", "validation", "codeRequired")
    if (!equipment.type) newErrors.type = t("equipmentEdit", "validation", "typeRequired")
    if (!equipment.category) newErrors.category = t("equipmentEdit", "validation", "categoryRequired")
    if (!equipment.acquisitionDate) newErrors.acquisitionDate = t("equipmentEdit", "validation", "acquisitionRequired")
    if (!equipment.commissioningDate)
      newErrors.commissioningDate = t("equipmentEdit", "validation", "commissioningRequired")
    if (!equipment.location.trim()) newErrors.location = t("equipmentEdit", "validation", "locationRequired")
    if (!equipment.status) newErrors.status = t("equipmentEdit", "validation", "statusRequired")

    // Validate automatic maintenance interval if provided
    if (equipment.automaticMaintenanceInterval && isNaN(equipment.automaticMaintenanceInterval)) {
      newErrors.automaticMaintenanceInterval = "Maintenance interval must be a number"
    }

    return newErrors
  }, [equipment, t])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formErrors = validateForm()
    setErrors(formErrors)

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true)

      try {
        // Create FormData object for file upload
        const formData = new FormData()

        // Add all equipment data to FormData
        formData.append("inventorie_code", equipment.code)
        formData.append("type", equipment.type)
        formData.append("category", equipment.category)
        formData.append("acquisition_date", equipment.acquisitionDate)
        formData.append("date_of_commissioning", equipment.commissioningDate)
        formData.append("localisation", equipment.location)
        formData.append("eqp_status", equipment.status)
        formData.append("documentation", equipment.description)

        // Add new fields
        if (equipment.picture) {
          formData.append("picture", equipment.picture)
        }

        // Convert automaticMaintenanceInterval to integer
        if (equipment.automaticMaintenanceInterval) {
          const intervalValue = Number.parseInt(equipment.automaticMaintenanceInterval, 10)
          formData.append("automatic_maintenance_interval", intervalValue)
        }

        // Handle seasonal maintenance months as integers
        if (equipment.seasonalMaintenanceMonths.length > 0) {
          // Create a proper array for the backend
          const monthsArray = equipment.seasonalMaintenanceMonths.map((month) =>
            typeof month === "string" ? Number.parseInt(month, 10) : month,
          )

          // Use a hidden input approach to send the array
          formData.append("seasonal_maintenance_months", JSON.stringify(monthsArray))
        }

        // Empty maintenance history array
        formData.append("maintenance_history", JSON.stringify([]))

        // Log the form data for debugging
        for (const [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`)
        }

        // Make the API call with FormData
        const response = await axios.post("https://esiflow2.onrender.com/equipments", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })

        // Show success message
        showToast("Equipment added successfully", "success")

        // Reset form
        setEquipment({
          code: "",
          type: "",
          category: "",
          acquisitionDate: "",
          commissioningDate: "",
          location: "",
          status: "",
          description: "",
          picture: null,
          automaticMaintenanceInterval: "",
          seasonalMaintenanceMonths: [],
        })
        setImagePreview(null)
        // Optionally navigate back to equipment list after successful update
        setTimeout(() => router.back(), 2000)
      } catch (error) {
        console.error("Error adding equipment:", error)
        showToast(error.response?.data?.error || error.message || "Failed to add equipment", "error")
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
    <div className="pt-14 lg:pt-0 flex min-h-screen bg-gray-50 dark:bg-neutral-900">
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
              <span>{t("equipmentEdit", "breadcrumb", "add")}</span>
            </div>
            <h1 className="text-xl lg:text-2xl font-russo">{t("equipmentEdit", "title", "add")}</h1>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    comment={t("equipmentEdit", "fields", "codeComment")}
                  />
                </div>
              </FormSection>

              {/* Equipment Image */}
              <FormSection title="Equipment Image">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-neutral-900 dark:text-neutral-200">
                      Equipment Picture
                    </label>

                    <div className="flex items-start gap-4">
                      {/* Image preview */}
                      <div className="w-16 h-16 lg:w-24 lg:h-24 border rounded-lg overflow-hidden flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
                        {imagePreview ? (
                          <img
                            src={imagePreview || "/placeholder.svg"}
                            alt="Equipment preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-neutral-400 flex flex-col items-center justify-center p-2 text-center">
                            <Upload size={24} />
                            <span className="text-xs mt-1">No image</span>
                          </div>
                        )}
                      </div>

                      {/* Upload controls */}
                      <div className="flex flex-col gap-2">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept="image/*"
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current.click()}
                          className="h-9 px-4 text-sm bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-200 font-medium rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-400 transition-colors"
                        >
                          Select Image
                        </button>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          Upload an image of the equipment. If none is provided, a default image will be used.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </FormSection>
            </div>

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

            {/* Maintenance Schedule */}
            <FormSection title="Maintenance Schedule">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Automatic Maintenance Interval */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-neutral-900 dark:text-neutral-200 flex items-center gap-1">
                    <Clock size={16} />
                    Automatic Maintenance Interval (days)
                  </label>
                  <input
                    type="number"
                    min="1"
                    placeholder="e.g., 90 for maintenance every 3 months"
                    value={equipment.automaticMaintenanceInterval}
                    onChange={(e) => {
                      // Ensure it's stored as a number
                      const value = e.target.value === "" ? "" : Number.parseInt(e.target.value, 10)
                      handleInputChange("automaticMaintenanceInterval", value)
                    }}
                    className="h-10 px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    error={errors.automaticMaintenanceInterval}
                  />
                  {errors.automaticMaintenanceInterval && (
                    <p className="text-red-500 text-xs mt-1">{errors.automaticMaintenanceInterval}</p>
                  )}
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Enter the number of days between regular maintenance checks
                  </p>
                </div>

                {/* Seasonal Maintenance Months */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-neutral-900 dark:text-neutral-200 flex items-center gap-1">
                    <Calendar size={16} />
                    Seasonal Maintenance Months
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {monthOptions.map((month) => (
                      <button
                        key={month.value}
                        type="button"
                        onClick={() => handleMonthToggle(Number.parseInt(month.value, 10))}
                        className={`px-3 py-1 text-xs rounded-full transition-colors ${
                          equipment.seasonalMaintenanceMonths.includes(month.value)
                            ? "bg-blue-500 text-white"
                            : "bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
                        }`}
                      >
                        {month.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Select months when seasonal maintenance should be performed
                  </p>
                </div>
              </div>
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
                    {t("equipmentEdit", "actions", "creating")}
                  </span>
                ) : (
                  t("equipmentEdit", "actions", "create")
                )}
              </button>

              <button
                onClick={handleCancel}
                type="button"
                className="h-10 w-32 text-neutral-900 dark:text-neutral-300 text-sm font-medium bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 transition-colors"
              >
                {t("equipmentEdit", "actions", "cancel")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
