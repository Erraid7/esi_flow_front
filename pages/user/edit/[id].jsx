"use client"

import { useState, useEffect, useRef } from "react"
import { useLanguage } from "../../translations/contexts/languageContext"
import Sidebar from "../../components/sidebar"
import axios from "axios"
import { useRouter } from "next/navigation"
import {
  Mail,
  Phone,
  School,
} from "lucide-react"
import Toast from "../../components/form_components/toast"
import FormField from "../../components/form_components/form_field"
import DropdownField from "../../components/form_components/dropdown_field"
import PasswordField from "../../components/form_components/password_field"
import FormSection from "../../components/form_components/form_section"
import Info from "../../components/form_components/info_icon"

// Main Component
export default function UserEditForm() {
  const { t, toggleLanguage } = useLanguage()
  const router = useRouter()

  // Get user ID from URL (assuming URL structure like /users/edit/123)
  const [userId, setUserId] = useState(null)
  
  useEffect(() => {
    // Extract user ID from URL path
    const path = window.location.pathname
    const pathSegments = path.split('/')
    const id = pathSegments[pathSegments.length - 1]
    
    // Check if ID is numeric to ensure it's a valid ID
    if (!isNaN(id)) {
      setUserId(id)
    }
  }, [])

  // Define isMobile state
  const [isMobile, setIsMobile] = useState(false)
  
  // State for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeItem, setActiveItem] = useState("users")

  // Current user for sidebar
  const currentUser = {
    name: "MEHDAOUI Lokman",
    role: "admin",
    initials: "AD"
  }

  // State for user data
  const [user, setUser] = useState({
    full_name: "",
    email: "",
    phone: "",
    biography: "",
    profession: "",
    role: "",
  })
  console.log(user)

  // Loading and error states
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)

  // Password state
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // Form validation
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Toast notification state
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  })

  // Available options for dropdowns
  const professionOptions = ["Teacher", "Administrator", "Engineer", "Technician", "Manager", "Other"]
  const roleOptions = ["Admin", "User", "Editor", "Viewer", "Moderator"]

  // Check if on mobile on mount and when window size changes
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  // Fetch user data from backend when userId is available
  useEffect(() => {
    if (userId) {
      fetchUserData(userId)
    }
  }, [userId])

  // Function to fetch user data
  const fetchUserData = async (id) => {
    setIsLoading(true)
    setLoadError(null)
    
    try {
      const response = await axios.get(`http://localhost:5000/users/${id}`)
      
      // Map backend data to form fields
      const userData = response.data
      setUser({
        full_name: userData.full_name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        biography: userData.bio || "",
        profession: userData.profession || "",
        role: userData.role || "",
      })
    } catch (error) {
      console.error("Error fetching user data:", error)
      setLoadError("Failed to load user data. Please try again later.")
      showToast("Failed to load user data", "error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    setUser({ ...user, [field]: value })
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: null })
    }
  }

  const showToast = (message, type = "success") => {
    setToast({
      visible: true,
      message,
      type,
    })
  }

  const hideToast = () => {
    setToast({ ...toast, visible: false })
  }

  const validateForm = () => {
    const newErrors = {}

    // Required fields
    if (!user.full_name.trim())
      newErrors.full_name = t("userEdit", "validation", "requiredField")
    if (!user.email.trim())
      newErrors.email = t("userEdit", "validation", "requiredField")
    if (!user.phone.trim())
      newErrors.phone = t("userEdit", "validation", "requiredField")

    // Email format
    if (user.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      newErrors.email = t("userEdit", "validation", "validEmail")
    }

    // Password validation if password is being changed
    if (password) {
      if (password.length < 8) {
        newErrors.password = "Password must be at least 8 characters"
      } else if (!/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
        newErrors.password = "Password must include uppercase, numbers, and special characters"
      }

      if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
      }
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formErrors = validateForm()
    setErrors(formErrors)

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true)

      try {
        // Map form data back to API format
        const userData = {
          name: user.full_name,
          email: user.email,
          phone: user.phone,
          biography: user.biography,
          profession: user.profession,
          role: user.role,
        }

        // Add password only if it was provided
        if (password) {
          userData.password = password
        }

        // Send update to backend
        await axios.put(`http://localhost:5000/users/${userId}`, userData)
        
        showToast(t("userEdit", "toast", "success"), "success")
        
        // Reset password fields after successful update
        setPassword("")
        setConfirmPassword("")
      } catch (error) {
        console.error("Error updating user:", error)
        showToast(t("userEdit", "toast", "error"), "error")
      } finally {
        setIsSubmitting(false)
      }
    } else {
      showToast(t("userEdit", "toast", "error"), "error")
    }
  }

  const handleCancel = () => {
    // Navigate back to users list
    router.push("/users")
  }

  // Handle body overflow when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isMobileMenuOpen])

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-900">
      {/* Toast Notification */}
      <Toast message={toast.message} type={toast.type} visible={toast.visible} onClose={hideToast} />

      {/* Show sidebar for desktop or when mobile menu is open */}
      <Sidebar 
        activeItem={activeItem}
        userRole={currentUser.role}
        userName={currentUser.name}
        userInitials={currentUser.initials}
      />

      {/* Main content */}
      <div className="pt-14 lg:pt-0 flex overflow-y-auto pb-8 w-full bg-neutral-50 dark:bg-neutral-990">
        <div className="px-4 sm:px-10 lg:px-20">
          <div className="flex flex-col items-start gap-6 mb-6 pt-6 text-neutral-950 dark:text-neutral-100">
            <div className="text-sm flex items-center font-inter">
              <span>{t("userEdit", "breadcrumb", "users")}</span>
              <span className="mx-2 text-lg">›</span>
              <span>{t("userEdit", "breadcrumb", "users")}</span>
            </div>
            <h1 className="text-xl lg:text-2xl font-russo">{t("userEdit", "title")}</h1>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          ) : loadError ? (
            <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded relative mb-6">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {loadError}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              {/* Basic Information */}
              <FormSection title={t("userEdit", "sections", "basicInfo")}>
                <div className="flex flex-col gap-4">
                  <FormField
                    title={t("userEdit", "fields", "fullName")}
                    value={user.full_name}
                    onChange={(e) => handleInputChange("full_name", e.target.value)}
                    error={errors.full_name}
                    required={true}
                  />

                  <FormField
                    title={t("userEdit", "fields", "email")}
                    value={user.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    icon={<Mail size={16} />}
                    comment={t("userEdit", "fields", "emailComment")}
                    error={errors.email}
                    required={true}
                  />

                  <FormField
                    title={t("userEdit", "fields", "phone")}
                    value={user.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    icon={<Phone size={16} />}
                    comment={t("userEdit", "fields", "phoneComment")}
                    error={errors.phone}
                    required={true}
                  />

                  <FormField
                    title={t("userEdit", "fields", "biography")}
                    value={user.biography}
                    onChange={(e) => handleInputChange("biography", e.target.value)}
                    isTextarea={true}
                  />
                </div>
              </FormSection>

              {/* Profession & Role */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Profession */}
                <FormSection>
                  <DropdownField
                    title={t("userEdit", "fields", "profession")}
                    value={user.profession}
                    onChange={(value) => handleInputChange("profession", value)}
                    icon={<School size={24} strokeWidth={2} className="text-primary-500" />}
                    iconBg="bg-[#284CFF] bg-opacity-5 p-2 rounded rounded-lg"
                    updateText={t("userEdit", "fields", "professionUpdate")}
                    options={professionOptions}
                  />
                </FormSection>

                {/* Role & Permissions */}
                <FormSection>
                  <DropdownField
                    title={t("userEdit", "fields", "role")}
                    value={user.role}
                    onChange={(value) => handleInputChange("role", value)}
                    icon={<span className="text-neutral-50 dark:text-neutral-990 font-russo text-base ">AD</span>}
                    iconBg="flex items-center justify-center bg-[#2EA95C] outline outline-[5px] outline-[#2EA95C25] rounded-full h-9 w-9"
                    updateText={t("userEdit", "fields", "roleUpdate")}
                    description={t("userEdit", "fields", "roleDescription")}
                    options={roleOptions}
                  />
                </FormSection>
              </div>

              {/* Account Setup */}
              <FormSection title={t("userEdit", "sections", "accountSetup")}>
                <div className="text-sm text-gray-600 dark:text-gray-300 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-md flex items-start">
                  <Info size={20} className="text-blue-500 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                  <p>{t("userEdit", "fields", "emailComment")}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PasswordField
                    title={t("userEdit", "fields", "password")}
                    placeholder={t("userEdit", "fields", "passwordPlaceholder")}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      if (errors.password) setErrors({ ...errors, password: null })
                      if (errors.confirmPassword && e.target.value === confirmPassword) {
                        setErrors({ ...errors, confirmPassword: null })
                      }
                    }}
                    comment={t("userEdit", "fields", "passwordComment")}
                    error={errors.password}
                  />

                  <PasswordField
                    title={t("userEdit", "fields", "confirmPassword")}
                    placeholder={t("userEdit", "fields", "confirmPasswordPlaceholder")}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value)
                      if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: null })
                    }}
                    error={errors.confirmPassword}
                  />
                </div>
              </FormSection>

              {/* Form Actions */}
              <div className="flex justify-end mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`h-10 min-w-32 w-fit px-2 mr-3 text-sm bg-primary-500 text-neutral-50 font-inter font-medium rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 transition-colors ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
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
                      {t("userEdit", "actions", "saving")}
                    </span>
                  ) : (
                    t("userEdit", "actions", "save")
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  className="h-10 w-32 text-neutral-900 dark:text-neutral-300 text-sm font-inter font-semibold bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 transition-colors"
                >
                  {t("userEdit", "actions", "cancel")}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}