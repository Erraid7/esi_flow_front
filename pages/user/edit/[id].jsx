"use client"

import { useState, useEffect, useRef } from "react"
import { useLanguage } from "../../../pages/translations/contexts/languageContext"
import Sidebar from "../../components/sidebar"
import axios from "axios"
import { useRouter, useParams } from "next/navigation"
import { Mail, Phone, School, ChevronDown, Eye, EyeOff, Bell, X, Check, AlertTriangle, ShieldHalf } from "lucide-react"

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
  const params = useParams()

  // Safely access the ID parameter with a fallback
  const userId = params?.id || ""

  // State for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // State for toast notifications
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  })

  // Form state
  const [user, setUser] = useState({
    id: "",
    full_name: "",
    email: "",
    phone: "",
    role: "",
    profession: "",
    bio: "",
  })

  // Original user data for comparison
  const [originalUser, setOriginalUser] = useState(null)

  // Password state
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [changePassword, setChangePassword] = useState(false)

  // Form validation
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Available options for dropdowns
  const professionOptions = [
    "teacher",
    "security",
    "cleaning",
    "student",
    "researcher",
    "IT Technician",
    "Network Technician",
    "Server Administrator",
    "Security Technician",
    "Electrical Technician",
    "Mechanical Technician",
    "Multimedia Technician",
    "Lab Technician",
    "HVAC Technician",
    "Plumber",
    "Carpenter",
    "Painter",
    "Gardener",
    "Driver",
    "Office Equipment Technician",
    "other",
  ]

  const roleOptions = ["admin", "technician", "personal"]

  // Update user ID when params change
  useEffect(() => {
    if (params?.id) {
      setUser((prev) => ({ ...prev, id: params.id }))
    }
  }, [params])

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      // Only fetch if we have a valid userId
      if (!userId) {
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        // Use relative path for API endpoint
        const response = await axios.get(`http://localhost:5000/users/${userId}`)
        const userData = response.data

        setUser({
          id: userId,
          full_name: userData.full_name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          role: userData.role || "",
          profession: userData.profession || "",
          bio: userData.bio || "",
        })

        setOriginalUser({
          full_name: userData.full_name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          role: userData.role || "",
          profession: userData.profession || "",
          bio: userData.bio || "",
        })

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching user data:", error)
        showToast("Failed to load user data", "error")
        setIsLoading(false)
      }
    }

    if (userId) {
      fetchUserData()
    }
  }, [userId])

  const handleInputChange = (field, value) => {
    setUser({ ...user, [field]: value })
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: null })
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
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

    // Email format validation (only if email is provided)
    if (user.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      newErrors.email = t("userEdit", "validation", "validEmail")
    }

    // Password validation (only if changing password)
    if (changePassword) {
      if (!password) {
        newErrors.password = t("userEdit", "validation", "requiredField", {
          field: t("userEdit", "fields", "password"),
        })
      } else if (password.length < 8) {
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

    // Validate that we have a user ID
    if (!user.id) {
      showToast("User ID is missing", "error")
      return
    }

    const formErrors = validateForm()
    setErrors(formErrors)

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true)

      try {
        // Create update data object with only changed fields
        const updateData = { id: user.id }

        // Only include fields that have changed
        if (originalUser && user.full_name !== originalUser.full_name) updateData.full_name = user.full_name
        if (originalUser && user.email !== originalUser.email) updateData.email = user.email
        if (originalUser && user.phone !== originalUser.phone) updateData.phone = user.phone
        if (originalUser && user.bio !== originalUser.bio) updateData.bio = user.bio
        if (originalUser && user.role !== originalUser.role) updateData.role = user.role
        if (originalUser && user.profession !== originalUser.profession) updateData.profession = user.profession

        // Add sendWelcomeEmail to the update data
        updateData.sendWelcomeEmail = switchValue

        // Add password if it's being changed
        if (changePassword && password) {
          updateData.password = password
        }

        // Only proceed if there are changes to submit
        if (Object.keys(updateData).length > 1 || (changePassword && password)) {
          // Using axios to send the request to our API route - use relative path
          const response = await axios.put(`http://localhost:5000/auth/edit-user/${userId}`, updateData)

          // Update original user data with new values
          setOriginalUser({
            full_name: user.full_name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            profession: user.profession,
            bio: user.bio,
          })

          // Reset password fields
          setPassword("")
          setConfirmPassword("")
          setChangePassword(false)

          // Show success message
          showToast("User updated successfully", "success")
        } else {
          showToast("No changes to save", "info")
        }
      } catch (error) {
        console.error("Update error:", error)

        // Get error message from axios response if available
        const errorMessage = error.response?.data?.message || "Failed to update user"
        showToast(errorMessage, "error")
      } finally {
        setIsSubmitting(false)
      }
    } else {
      showToast(t("userEdit", "toast", "error"), "error")
    }
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

  const [switchValue, setSwitchValue] = useState(false)
  const handleSwitchChange = (field, value) => {
    setSwitchValue(value)
  }

  const [requirePasswordSwitch, setRequirePasswordSwitch] = useState(false)
  const handlepassChange = (field, value) => {
    setRequirePasswordSwitch(value)
  }

  const currentUser = {
    name: "MEHDAOUI Lokman",
    role: "admin",
    initials: "AD",
  }
  // const getCurrentUser = () => {
  //   if (typeof window === 'undefined') {
  //     // Prevent running on server
  //     return true;
  //   }

  //   try {
  //     const token = localStorage.getItem('token');
  //     if (!token) {
  //       return {
  //         name: "Guest User",
  //         role: "personal",
  //         initials: "GU",
  //       };
  //     }

  //     const parsed = JSON.parse(token); // Make sure it's valid JSON

  //     const name = parsed.full_name || "Unknown User";
  //     const role = parsed.role || "personal";

  //     const initials = name
  //       .split(' ')
  //       .map(part => part[0])
  //       .join('')
  //       .substring(0, 2)
  //       .toUpperCase();

  //     return {
  //       name,
  //       role,
  //       initials
  //     };
  //   } catch (error) {
  //     console.error("Error decoding token:", error);
  //     return {
  //       name: "Error User",
  //       role: "personal",
  //       initials: "EU",
  //     };
  //   }
  // };

  // const currentUser = getCurrentUser();

  // Get current user informationconst currentUser = getCurrentUser();
  return (
    <div className="flex min-h-screen bg-red dark:bg-neutral-900">
      {/* Toast Notification */}
      <Toast message={toast.message} type={toast.type} visible={toast.visible} onClose={hideToast} />
      <Sidebar activeItem={"users"} userRole={currentUser.role} userName={currentUser.name} userInitials="AD" />
      {/* Main content */}
      <div className="flex overflow-y-auto pb-8 w-full bg-neutral-50 dark:bg-neutral-990">
        <div className="px-4 sm:px-10 lg:px-20 w-full">
          <div className="flex flex-col items-start gap-6 mb-6 pt-6 text-neutral-950 dark:text-neutral-100">
            <div className="text-sm flex items-center font-inter">
              <span>{t("userEdit", "breadcrumb", "users")}</span>
              <span className="mx-2 text-lg">›</span>
              <span>{t("userEdit", "breadcrumb", "edit")}</span>
            </div>
            <h1 className="text-xl lg:text-2xl font-russo">{t("userEdit", "breadcrumb", "edit")}</h1>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {/* Basic Information */}
            <FormSection title={t("userEdit", "sections", "basicInfo")}>
              <div className="flex flex-col gap-4">
                <FormField
                  title={t("userEdit", "fields", "fullName")}
                  placeholder="Enter full name"
                  value={user.full_name}
                  onChange={(e) => handleInputChange("full_name", e.target.value)}
                  error={errors.full_name}
                />

                <FormField
                  title={t("userEdit", "fields", "email")}
                  placeholder="Enter email address"
                  value={user.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  icon={<Mail size={16} />}
                  error={errors.email}
                />

                <FormField
                  title={t("userEdit", "fields", "phone")}
                  placeholder="Enter phone number"
                  value={user.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  icon={<Phone size={16} />}
                  error={errors.phone}
                />

                <FormField
                  title="Bio"
                  placeholder="Enter user bio"
                  value={user.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  isTextarea={true}
                  error={errors.bio}
                />
              </div>
            </FormSection>

            {/* Profession & Role */}
            <div className="">
              {/* Role & Permissions */}
              <FormSection title="Role & Profession">
                <DropdownField
                  title={t("userEdit", "fields", "role")}
                  value={user.role}
                  onChange={(value) => handleInputChange("role", value)}
                  icon={<span className="text-neutral-50 dark:text-neutral-990 font-russo text-base">AD</span>}
                  iconBg="flex items-center justify-center bg-[#2EA95C] outline outline-[5px] outline-[#2EA95C25] rounded-full h-9 w-9"
                  updateText="Select user role"
                  description="Set the permissions and access level for this user"
                  options={roleOptions}
                  error={errors.role}
                />

                <DropdownField
                  title={t("userEdit", "fields", "profession")}
                  value={user.profession}
                  onChange={(value) => handleInputChange("profession", value)}
                  icon={<School size={24} strokeWidth={2} className="text-primary-500" />}
                  iconBg="bg-[#284CFF] bg-opacity-5 p-2 rounded rounded-lg"
                  updateText="Select user profession"
                  options={professionOptions}
                  error={errors.profession}
                />
              </FormSection>
            </div>

            {/* Password Section */}
            <FormSection title={t("userEdit", "sections", "accountSetup")}>

              
                <div className="flex gap-3 flex-col">
                  <PasswordField
                    title={t("userEdit", "fields", "password")}
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      if (errors.password) setErrors({ ...errors, password: null })
                      if (errors.confirmPassword && e.target.value === confirmPassword) {
                        setErrors({ ...errors, confirmPassword: null })
                      }
                    }}
                    error={errors.password}
                    required={true}
                  />

                  <PasswordField
                    title={t("userEdit", "fields", "confirmPassword")}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    comment="Password must be at least 8 characters with uppercase, numbers, and special characters"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value)
                      if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: null })
                    }}
                    error={errors.confirmPassword}
                    required={true}
                  />
                </div>
           
            </FormSection>

            <FormSection>
              <div className="flex flex-col gap-6">
                {/* Send Email Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center bg-card-bg rounded-lg h-10 w-10">
                      <Mail size={25} className="text-neutral-50 dark:text-[#0f0f11] fill-primary-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        {t("userEdit", "sendMail")}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {t("userEdit", "sendMailComment")}
                      </p>
                    </div>
                  </div>

                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={switchValue}
                      onChange={(e) => handleSwitchChange("role", e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#2EA95C50] dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500 relative" />
                  </label>
                </div>

                {/* Password Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center bg-card-bg rounded-lg h-10 w-10">
                      <ShieldHalf
                        strokeWidth={2}
                        size={25}
                        className="text-neutral-50 dark:text-[#0f0f11] fill-primary-500"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        {t("userEdit", "requirePassword")}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {t("userEdit", "requirePasswordComment")}
                      </p>
                    </div>
                  </div>

                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={requirePasswordSwitch}
                      onChange={(e) => handlepassChange("role", e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#2EA95C50] dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500 relative" />
                  </label>
                </div>
              </div>
            </FormSection>

            {/* Form Actions */}
            <div className="flex justify-end mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`h-10 w-32 mr-3 text-sm bg-primary-500 text-neutral-50 font-inter font-medium rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 transition-colors ${
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
                    {t("userEdit", "actions", "saving")}
                  </span>
                ) : (
                  t("userEdit", "actions", "save")
                )}
              </button>

              <button
                type="button"
                onClick={() => router.back()}
                className="h-10 w-32 text-neutral-900 dark:text-neutral-300 text-sm font-inter font-semibold bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 transition-colors"
              >
                {t("userEdit", "actions", "cancel")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
