"use client"

import { useRef } from "react"

import { useState, useEffect, useCallback } from "react"
import { useLanguage } from "../../translations/contexts/languageContext"
import Sidebar from "../../components/sidebar"
import { Calendar, Info, MapPin, AlertTriangle, Check, ChevronDown, X } from "lucide-react"

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

// DateField Component
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
    );
  };

// Form Section Component
const FormSection = ({ title, children }) => {
    return (
      <div className="flex flex-col gap-3">
        {title && <h2 className="text-base lg:text-lg font-russo text-neutral-950 dark:text-neutral-100">{title}</h2>}
        {children}
      </div>
    )
  }

// Main Component
export default function EquipmentAddForm() {
  const { t } = useLanguage()

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
  })

  // Form validation
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Available options for dropdowns
  const typeOptions = ["Mechanical", "Electrical", "Hydraulic", "Pneumatic", "Electronic", "Other"]
  const categoryOptions = ["Production", "Maintenance", "Safety", "Quality Control", "Logistics", "Office"]
  const statusOptions = ["Operational", "Under Maintenance", "Out of Service", "Pending Installation", "Retired"]

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
        await new Promise((resolve) => setTimeout(resolve, 1000))

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
        })
      } catch (error) {
        console.error("Error adding equipment:", error)
        showToast(error.message || "Failed to add equipment", "error")
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
      <div className="pt-14 md:pt-0 flex overflow-y-auto pb-8 w-full bg-neutral-50 dark:bg-neutral-990">
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
                  options={typeOptions.map(type => t("equipmentEdit", "typeOptions", typeOptions.indexOf(type)))}
                  error={errors.type}
                  required={true}
                  placeholder={t("equipmentEdit", "fields", "typePlaceholder")}
                />
  
                <DropdownField
                  title={t("equipmentEdit", "fields", "category")}
                  value={equipment.category}
                  onChange={(value) => handleInputChange("category", value)}
                  options={categoryOptions.map(category => t("equipmentEdit", "categoryOptions", categoryOptions.indexOf(category)))}
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
                  icon={<MapPin size={16} />}
                  error={errors.location}
                  required={true}
                />
  
                <DropdownField
                  title={t("equipmentEdit", "fields", "status")}
                  value={equipment.status}
                  onChange={(value) => handleInputChange("status", value)}
                  options={statusOptions.map(status => t("equipmentEdit", "statusOptions", statusOptions.indexOf(status)))}
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
                    {t("equipmentEdit", "actions", "creating")}
                  </span>
                ) : (
                  t("equipmentEdit", "actions", "create")
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
        </div>
      </div>
    </div>
  )
}
