"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"
import { useLanguage } from "../../../pages/translations/contexts/languageContext"

import Sidebar from "../../components/sidebar"
import { Calendar, Info, MapPin, AlertTriangle, Check, ChevronDown, X, Loader2 } from "lucide-react"

// Toast Notification Component
const Toast = ({ message, type, visible, onClose }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [visible, onClose])

  if (!visible) return null

  const bgColor = type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-blue-500"

  const icon =
    type === "success" ? <Check size={20} /> : type === "error" ? <AlertTriangle size={20} /> : <Info size={20} />

  return (
    <div
      className={`fixed top-4 right-4 ${bgColor} text-white p-4 rounded shadow-lg flex items-center z-50 animate-fade-in`}
    >
      <div className="mr-3">{icon}</div>
      <p>{message}</p>
      <button onClick={onClose} className="ml-4">
        <X size={16} />
      </button>
    </div>
  )
}

// FormField Component
const FormField = ({
  title,
  placeholder,
  value,
  onChange,
  icon,
  comment,
  type = "text",
  onIconClick,
  isTextarea = false,
  error = null,
  required = false,
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {title && (
        <label className="block text-sm font-inter text-neutral-950 dark:text-neutral-100">
          {title} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        {isTextarea ? (
          <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full text-sm px-4 py-3 border ${error ? "border-red-300 bg-red-50" : "border-none bg-[#E7E7E7] dark:bg-neutral-950"} rounded-lg shadow-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all text-neutral-990 dark:text-neutral-100 min-h-24`}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full text-sm px-4 py-3 border ${error ? "border-red-300 bg-red-50" : "border-none bg-neutral-100 dark:bg-neutral-950"} rounded-lg shadow-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all text-neutral-990 dark:text-neutral-100 `}
          />
        )}

        {icon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-950" onClick={onIconClick}>
            {icon}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <AlertTriangle size={12} className="mr-1" />
          {error}
        </p>
      )}

      {comment && !error && <div className="text-xs text-neutral-800 mt-1">{comment}</div>}
    </div>
  )
}

// DropdownField Component with Click Outside
const DropdownField = ({
  title,
  value,
  onChange,
  options = [],
  error = null,
  required = false,
  placeholder = "Select an option",
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleSelect = (option) => {
    onChange(option)
    setIsOpen(false)
  }

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="flex flex-col gap-2" ref={dropdownRef}>
      {title && (
        <label className="block text-sm font-inter text-neutral-950 dark:text-neutral-100">
          {title} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <div
          className={`flex items-center justify-between border ${error ? "border-red-300 bg-red-50" : "border-none bg-neutral-100 dark:bg-neutral-950"} rounded-lg p-3 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors shadow-sm`}
          onClick={toggleDropdown}
        >
          <span
            className={`text-sm ${value ? "text-neutral-990 dark:text-neutral-100" : "text-neutral-400 dark:text-neutral-400"}`}
          >
            {value || placeholder}
          </span>
          <ChevronDown
            size={18}
            className={`text-neutral-990 dark:text-neutral-100 transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""}`}
          />
        </div>

        {isOpen && options.length > 0 && (
          <ul className="absolute w-full mt-1 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
            {options.map((option, index) => (
              <li
                key={index}
                className={`px-4 py-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 cursor-pointer ${value === option ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : "dark:text-neutral-200"}`}
                onClick={() => handleSelect(option)}
              >
                <div className="flex items-center">
                  {value === option && <Check size={16} className="mr-2 text-blue-500" />}
                  <span className={value === option ? "ml-0" : "ml-6"}>{option}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
          <AlertTriangle size={12} className="mr-1" />
          {error}
        </p>
      )}
    </div>
  )
}

const DateField = ({ title, value, onChange, error = null, required = false, placeholder = "MM/DD/YYYY" }) => {
  return (
    <div className="flex flex-col gap-2">
      {title && (
        <label className="block text-sm font-inter text-neutral-950 dark:text-neutral-100">
          {title} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          type="date"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full text-sm px-4 py-3 pr-10 border ${
            error ? "border-red-300 bg-red-50" : "border-none bg-neutral-100 dark:bg-neutral-950"
          } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all text-neutral-950 dark:text-neutral-100
          [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer`}
        />
        <Calendar
          size={18}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 dark:text-neutral-400 pointer-events-none"
        />
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <AlertTriangle size={12} className="mr-1" />
          {error}
        </p>
      )}
    </div>
  )
}

// Form Section Component
const FormSection = ({ title, children }) => {
  return (
    <div className="flex flex-col gap-3">
      {title && <h2 className="text-base lg:text-lg font-russo text-neutral-950 dark:text-neutral-100">{title}</h2>}
      {children}
    </div>
  )
}

// Helper function to format dates for input fields
const formatDateForInput = (dateString) => {
  if (!dateString) return ""

  try {
    // Parse the date string from the backend
    const date = new Date(dateString)

    // Check if the date is valid
    if (isNaN(date.getTime())) return ""

    // Format as YYYY-MM-DD for the date input
    return date.toISOString().split("T")[0]
  } catch (error) {
    console.error("Error formatting date:", error)
    return ""
  }
}

// Main Component
export default function EquipmentEditForm() {
  const { t } = useLanguage()
  const params = useParams()
  const router = useRouter()
  const equipmentId = params?.id || ""

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
    inventorie_code: "",
    type: "",
    category: "",
    acquisition_date: "",
    date_of_commissioning: "",
    localisation: "",
    eqp_status: "",
    documentation: "",
  })

  // Form validation
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Available options for dropdowns based on the database model
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

  const statusOptions = ["working", "needs_maintenance", "out_of_service"]

  // Fetch equipment data
  useEffect(() => {
    const fetchEquipment = async () => {
      if (!equipmentId) return

      setIsLoading(true)
      try {
        const response = await axios.get(`http://localhost:5000/equipments/${equipmentId}`)

        // Format dates for the date input fields
        const formattedData = {
          ...response.data,
          acquisition_date: formatDateForInput(response.data.acquisition_date),
          date_of_commissioning: formatDateForInput(response.data.date_of_commissioning),
        }

        setEquipment(formattedData)
      } catch (error) {
        console.error("Error fetching equipment:", error)
        showToast("Failed to load equipment data", "error")
      } finally {
        setIsLoading(false)
      }
    }

    fetchEquipment()
  }, [equipmentId])

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
    if (!equipment.inventorie_code?.trim()) newErrors.inventorie_code = t("equipmentEdit", "validation", "codeRequired")
    if (!equipment.type) newErrors.type = t("equipmentEdit", "validation", "typeRequired")
    if (!equipment.category) newErrors.category = t("equipmentEdit", "validation", "categoryRequired")
    if (!equipment.acquisition_date)
      newErrors.acquisition_date = t("equipmentEdit", "validation", "acquisitionRequired")
    if (!equipment.date_of_commissioning)
      newErrors.date_of_commissioning = t("equipmentEdit", "validation", "commissioningRequired")
    if (!equipment.localisation?.trim()) newErrors.localisation = t("equipmentEdit", "validation", "locationRequired")
    if (!equipment.eqp_status) newErrors.eqp_status = t("equipmentEdit", "validation", "statusRequired")

    return newErrors
  }, [equipment, t])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formErrors = validateForm()
    setErrors(formErrors)

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true)

      try {
        // Send update request to the API
        await axios.put(`http://localhost:5000/equipments/${equipmentId}`, equipment)

        // Show success message
        showToast("Equipment updated successfully", "success")

        // Redirect to equipment list after a short delay
        setTimeout(() => {
          router.push("/equipment/list")
        }, 2000)
      } catch (error) {
        console.error("Error updating equipment:", error)
        showToast(error.response?.data?.error || "Failed to update equipment", "error")
      } finally {
        setIsSubmitting(false)
      }
    } else {
      showToast("Please fill in all required fields", "error")
    }
  }

  const handleCancel = () => {
    router.push("/equipment/list")
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
      <div className="pt-14 md:pt-0 flex overflow-y-auto pb-8 w-full bg-neutral-50 dark:bg-neutral-990">
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
                    value={equipment.inventorie_code}
                    onChange={(e) => handleInputChange("inventorie_code", e.target.value)}
                    error={errors.inventorie_code}
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
                    value={equipment.acquisition_date}
                    onChange={(e) => handleInputChange("acquisition_date", e.target.value)}
                    error={errors.acquisition_date}
                    required={true}
                  />

                  <DateField
                    title={t("equipmentEdit", "fields", "commissioning")}
                    value={equipment.date_of_commissioning}
                    onChange={(e) => handleInputChange("date_of_commissioning", e.target.value)}
                    error={errors.date_of_commissioning}
                    required={true}
                  />

                  <FormField
                    title={t("equipmentEdit", "fields", "location")}
                    placeholder={t("equipmentEdit", "fields", "locationPlaceholder")}
                    value={equipment.localisation}
                    onChange={(e) => handleInputChange("localisation", e.target.value)}
                    icon={<MapPin size={16} />}
                    error={errors.localisation}
                    required={true}
                  />

                  <DropdownField
                    title={t("equipmentEdit", "fields", "status")}
                    value={equipment.eqp_status}
                    onChange={(value) => handleInputChange("eqp_status", value)}
                    options={statusOptions}
                    error={errors.eqp_status}
                    required={true}
                    placeholder={t("equipmentEdit", "fields", "statusPlaceholder")}
                  />
                </div>

                <FormField
                  title={t("equipmentEdit", "fields", "documentation")}
                  placeholder={t("equipmentEdit", "fields", "descriptionPlaceholder")}
                  value={equipment.documentation}
                  onChange={(e) => handleInputChange("documentation", e.target.value)}
                  isTextarea={true}
                  error={errors.documentation}
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
                  onClick={handleCancel}
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
