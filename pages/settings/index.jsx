"use client"

import { useState, useEffect, useRef } from "react"
import { useLanguage } from "../translations/contexts/languageContext"
import { useDarkMode } from "../darkLightMode/darkModeContext"
import Sidebar from "../components/sidebar"
import { useRouter } from "next/navigation"
import {
  SettingsIcon,
  User,
  Globe,
  Moon,
  Sun,
  Mail,
  Bell,
  Info,
  Code,
  Server,
  Database,
  Clock,
  Phone,
  School,
  Heart,
  X,
  Camera,
  UserCircle,
} from "lucide-react"
import Toast from "../components/form_components/toast"
import FormField from "../components/form_components/form_field"
import DropdownField from "../components/form_components/dropdown_field"
import PasswordField from "../components/form_components/password_field"
import FormSection from "../components/form_components/form_section"
import InfoIcon from "../components/form_components/info_icon"

// Toggle Switch Component
const ToggleSwitch = ({ label, isChecked, onChange, icon, description }) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
      <div className="flex flex-col">
        <div className="flex items-center">
          {icon && <div className="mr-3 text-primary-500">{icon}</div>}
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
        </div>
        {description && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-8">{description}</p>}
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" checked={isChecked} onChange={onChange} className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
      </label>
    </div>
  )
}

// System Info Item Component
const SystemInfoItem = ({ label, value, icon }) => {
  return (
    <div className="flex items-start py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <div className="text-primary-500 mr-3 mt-0.5">{icon}</div>
      <div>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{value}</p>
      </div>
    </div>
  )
}

// Tab Component
const Tab = ({ active, label, icon, onClick }) => {
  return (
    <button
      className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
        active
          ? "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300"
          : "text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800"
      }`}
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  )
}

// Profile Picture Component
const ProfilePicture = ({ profileImage, setProfileImage }) => {
  const fileInputRef = useRef(null)

  const handleImageClick = () => {
    fileInputRef.current.click()
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = (e) => {
    e.stopPropagation()
    setProfileImage(null)
  }

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="relative group cursor-pointer" onClick={handleImageClick}>
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary-100 dark:border-primary-900 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          {profileImage ? (
            <img src={profileImage || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <UserCircle size={120} className="text-gray-400 dark:text-gray-600" />
          )}
        </div>

        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <Camera size={24} className="text-white" />
        </div>

        {profileImage && (
          <button
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Click to upload profile picture</p>
    </div>
  )
}

// Main Settings Page Component
export default function SettingsPage() {
  const { t, language, toggleLanguage } = useLanguage()
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("general")
  const [profileImage, setProfileImage] = useState(null)

  // Toast state
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  })

  // General settings state
  const [generalSettings, setGeneralSettings] = useState({
    theme: isDarkMode ? "dark" : "light",
    language: language,
    emailNotifications: true,
    reminderNotifications: true,
    securityAlerts: true,
    autoSave: false,
    dataSharing: false,
  })

  // User info state
  const [user, setUser] = useState({
    full_name: "",
    email: "",
    phone: "",
    biography: "",
    profession: "",
    role: "",
  })

  // Password state
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // Form validation
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Available options for dropdowns
  const professionOptions = ["Teacher", "Administrator", "Engineer", "Technician", "Manager", "Other"]
  const roleOptions = ["Admin", "User", "Technician"]

  // Update theme and language when they change in context
  useEffect(() => {
    setGeneralSettings((prev) => ({
      ...prev,
      theme: isDarkMode ? "dark" : "light",
      language: language,
    }))
  }, [isDarkMode, language])

  // Load user data from localStorage on mount
  useEffect(() => {
    const loadUserData = () => {
      try {
        const userData = localStorage.getItem("userData")
        if (userData) {
          const parsedData = JSON.parse(userData)
          setUser({
            full_name: parsedData.full_name || "",
            email: parsedData.email || "",
            phone: parsedData.phone || "",
            biography: parsedData.biography || "",
            profession: parsedData.profession || "",
            role: parsedData.role || "",
          })

          // Load profile image if exists
          if (parsedData.profileImage) {
            setProfileImage(parsedData.profileImage)
          }
        }
      } catch (error) {
        console.error("Error loading user data from localStorage:", error)
        showToast(t("settings","toast","loadError"), "error")
      }
    }

    loadUserData()
  }, [t])

  // Handle general settings changes
  const handleGeneralSettingChange = (setting, value) => {
    setGeneralSettings((prev) => ({
      ...prev,
      [setting]: value,
    }))

    // Apply theme and language changes immediately
    if (setting === "theme") {
      toggleDarkMode()
    } else if (setting === "language") {
      toggleLanguage()
    }
  }

  // Handle user info changes
  const handleUserInfoChange = (field, value) => {
    setUser((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }))
    }
  }

  // Show toast notification
  const showToast = (message, type = "success") => {
    setToast({
      visible: true,
      message,
      type,
    })
  }

  // Hide toast notification
  const hideToast = () => {
    setToast((prev) => ({ ...prev, visible: false }))
  }

  // Validate user info form
  const validateUserInfoForm = () => {
    const newErrors = {}

    // Required fields
    if (!user.full_name.trim()) newErrors.full_name = t("userEdit","validation","requiredField")
    if (!user.email.trim()) newErrors.email = t("userEdit","validation","requiredField")
    if (!user.phone.trim()) newErrors.phone = t("userEdit","validation","requiredField")

    // Email format
    if (user.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      newErrors.email = t("userEdit","validation","validEmail")
    }

    // Password validation if password is being changed
    if (password) {
      if (password.length < 8) {
        newErrors.password = t("settings","validation","passwordLength")
      } else if (!/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
        newErrors.password = t("settings","validation","passwordComplexity")
      }

      if (password !== confirmPassword) {
        newErrors.confirmPassword = t("settings","validation","passwordsMatch")
      }
    }

    return newErrors
  }

  // Handle save general settings
  const handleSaveGeneralSettings = () => {
    try {
      // In a real app, you would save the settings to a backend
      localStorage.setItem("generalSettings", JSON.stringify(generalSettings))
      showToast(t("settings","toast","generalSuccess"), "success")
    } catch (error) {
      console.error("Error saving general settings:", error)
      showToast(t("settings","toast","generalError"), "error")
    }
  }

  // Handle save user info
  const handleSaveUserInfo = (e) => {
    e.preventDefault()

    const formErrors = validateUserInfoForm()
    setErrors(formErrors)

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true)

      try {
        // Save user data to localStorage
        const userData = {
          ...user,
          password: password ? password : undefined,
          profileImage: profileImage,
        }
        localStorage.setItem("userData", JSON.stringify(userData))

        showToast(t("settings","toast","userSuccess"), "success")

        // Reset password fields after successful update
        setPassword("")
        setConfirmPassword("")
      } catch (error) {
        console.error("Error updating user:", error)
        showToast(t("settings","toast","userError"), "error")
      } finally {
        setIsSubmitting(false)
      }
    } else {
      showToast(t("settings","toast","formErrors"), "error")
    }
  }

  // Current user for sidebar
  const currentUser = {
    name: "MEHDAOUI Lokman",
    role: "admin",
    initials: "AD",
  }

  return (
    <div className="flex min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Toast Notification */}
      <Toast message={toast.message} type={toast.type} visible={toast.visible} onClose={hideToast} />

      {/* Sidebar */}
      <Sidebar
        activeItem={"settings"}
        userRole={currentUser.role}
        userName={currentUser.name}
        userInitials={currentUser.initials}
      />

      {/* Main content */}
      <div className="pt-14 lg:pt-0 flex overflow-y-auto pb-8 w-full bg-neutral-50 dark:bg-neutral-990">
        <div className="px-4 sm:px-10 lg:px-20 w-full">
          <div className="flex flex-col items-start gap-6 mb-6 pt-6 text-neutral-950 dark:text-neutral-100">
            <div className="text-sm flex items-center font-inter">
              <span>{t("settings","breadcrumb","dashboard")}</span>
              <span className="mx-2 text-lg">›</span>
              <span>{t("settings","breadcrumb","settings")}</span>
            </div>
            <h1 className="text-xl lg:text-2xl font-russo">{t("settings","title")}</h1>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap space-x-2 mb-6">
            <Tab
              active={activeTab === "general"}
              label={t("settings","tabs","general")}
              icon={<SettingsIcon size={16} />}
              onClick={() => setActiveTab("general")}
            />
            <Tab
              active={activeTab === "user"}
              label={t("settings","tabs","user")}
              icon={<User size={16} />}
              onClick={() => setActiveTab("user")}
            />
            <Tab
              active={activeTab === "system"}
              label={t("settings","tabs","system")}
              icon={<Info size={16} />}
              onClick={() => setActiveTab("system")}
            />
          </div>

          {/* Tab Content */}
          <div className="bg-neutral-50 dark:bg-neutral-990 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700">
            {/* General Settings Tab */}
            {activeTab === "general" && (
              <div className="p-6 flex flex-col gap-6">
                <FormSection title={t("settings","general","systemPreferences")}>
                  {/* Theme Setting */}
                  <ToggleSwitch
                    label={t("settings","general","darkMode")}
                    isChecked={generalSettings.theme === "dark"}
                    onChange={() =>
                      handleGeneralSettingChange("theme", generalSettings.theme === "dark" ? "light" : "dark")
                    }
                    icon={generalSettings.theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
                    description={t("settings","general","darkModeDescription")}
                  />

                  {/* Language Setting */}
                  <DropdownField
                    title={t("settings","general","language")}
                    value={generalSettings.language === "en" ? "English" : "Français"}
                    onChange={(value) => {
                      const langCode = value === "English" ? "en" : value === "Français" ? "fr" : "ar"
                      handleGeneralSettingChange("language", langCode)
                    }}
                    icon={<Globe size={18} className="text-primary-500" />}
                    iconBg="bg-[#284CFF] bg-opacity-5 p-2 rounded rounded-lg"
                    options={["English", "Français"]}
                    updateText={t("settings","general","languageDescription")}
                  />
                </FormSection>

                <FormSection title={t("settings","general","notifications")} className="mt-6">
                  {/* Email Notifications */}
                  <ToggleSwitch
                    label={t("settings","general","emailNotifications")}
                    isChecked={generalSettings.emailNotifications}
                    onChange={() =>
                      handleGeneralSettingChange("emailNotifications", !generalSettings.emailNotifications)
                    }
                    icon={<Mail size={18} />}
                    description={t("settings","general","emailNotificationsDescription")}
                  />

                  {/* Reminder Notifications */}
                  <ToggleSwitch
                    label={t("settings","general","reminderNotifications")}
                    isChecked={generalSettings.reminderNotifications}
                    onChange={() =>
                      handleGeneralSettingChange("reminderNotifications", !generalSettings.reminderNotifications)
                    }
                    icon={<Bell size={18} />}
                    description={t("settings","general","reminderNotificationsDescription")}
                  />
                </FormSection>

                <FormSection title={t("settings","general","advancedSettings")} className="mt-6">
                  {/* Data Sharing */}
                  <ToggleSwitch
                    label={t("settings","general","dataSharing")}
                    isChecked={generalSettings.dataSharing}
                    onChange={() => handleGeneralSettingChange("dataSharing", !generalSettings.dataSharing)}
                    icon={<Database size={18} />}
                    description={t("settings","general","dataSharingDescription")}
                  />
                </FormSection>

                {/* Save Button */}
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleSaveGeneralSettings}
                    className="h-10 min-w-32 w-fit px-4 text-sm bg-primary-500 text-neutral-50 font-inter font-medium rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 transition-colors"
                  >
                    {t("settings","actions","saveSettings")}
                  </button>
                </div>
              </div>
            )}

            {/* User Information Tab */}
            {activeTab === "user" && (
              <div className="p-6">
                <form onSubmit={handleSaveUserInfo} className="flex flex-col gap-8">
                  {/* Profile Picture */}
                  <ProfilePicture profileImage={profileImage} setProfileImage={setProfileImage} />

                  {/* Basic Information */}
                  <FormSection title={t("settings","user","basicInformation")}>
                    <div className="flex flex-col gap-4">
                      <FormField
                        title={t("settings","user","fullName")}
                        value={user.full_name}
                        onChange={(e) => handleUserInfoChange("full_name", e.target.value)}
                        error={errors.full_name}
                        required={true}
                      />

                      <FormField
                        title={t("settings","user","email")}
                        value={user.email}
                        onChange={(e) => handleUserInfoChange("email", e.target.value)}
                        icon={<Mail size={16} />}
                        comment={t("settings","user","emailComment")}
                        error={errors.email}
                        required={true}
                      />

                      <FormField
                        title={t("settings","user","phone")}
                        value={user.phone}
                        onChange={(e) => handleUserInfoChange("phone", e.target.value)}
                        icon={<Phone size={16} />}
                        comment={t("settings","user","phoneComment")}
                        error={errors.phone}
                        required={true}
                      />

                      <FormField
                        title={t("settings","user","biography")}
                        value={user.biography}
                        onChange={(e) => handleUserInfoChange("biography", e.target.value)}
                        isTextarea={true}
                      />
                    </div>
                  </FormSection>

                  {/* Profession & Role */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Profession */}
                    <FormSection>
                      <DropdownField
                        title={t("settings","user","profession")}
                        value={user.profession}
                        onChange={(value) => handleUserInfoChange("profession", value)}
                        icon={<School size={24} strokeWidth={2} className="text-primary-500" />}
                        iconBg="bg-[#284CFF] bg-opacity-5 p-2 rounded rounded-lg"
                        updateText={t("settings","user","professionUpdate")}
                        options={professionOptions}
                      />
                    </FormSection>

                    {/* Role & Permissions */}
                    <FormSection>
                      <DropdownField
                        title={t("settings","user","role")}
                        value={user.role}
                        onChange={(value) => handleUserInfoChange("role", value)}
                        icon={<span className="text-neutral-50 dark:text-neutral-990 font-russo text-base ">AD</span>}
                        iconBg="flex items-center justify-center bg-[#2EA95C] outline outline-[5px] outline-[#2EA95C25] rounded-full h-9 w-9"
                        updateText={t("settings","user","roleUpdate")}
                        description={t("settings","user","roleDescription")}
                        options={roleOptions}
                      />
                    </FormSection>
                  </div>

                  {/* Account Setup */}
                  <FormSection title={t("settings","user","accountSecurity")}>
                    <div className="text-sm text-gray-600 dark:text-gray-300 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-md flex items-start">
                      <InfoIcon size={20} className="text-blue-500 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                      <p>{t("settings","user","passwordInfo")}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <PasswordField
                        title={t("settings","user","password")}
                        placeholder={t("settings","user","passwordPlaceholder")}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value)
                          if (errors.password) setErrors({ ...errors, password: null })
                          if (errors.confirmPassword && e.target.value === confirmPassword) {
                            setErrors({ ...errors, confirmPassword: null })
                          }
                        }}
                        comment={t("settings","user","passwordComment")}
                        error={errors.password}
                      />

                      <PasswordField
                        title={t("settings","user","confirmPassword")}
                        placeholder={t("settings","user","confirmPasswordPlaceholder")}
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
                      className={`h-10 min-w-32 w-fit px-4 mr-3 text-sm bg-primary-500 text-neutral-50 font-inter font-medium rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 transition-colors ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""}`}
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
                          {t("settings","actions","saving")}
                        </span>
                      ) : (
                        t("settings","actions","saveChanges")
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => router.push(`/dashboard/${currentUser.role}`)}
                      className="h-10 w-32 text-neutral-900 dark:text-neutral-300 text-sm font-inter font-semibold bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 transition-colors"
                    >
                      {t("settings","actions","cancel")}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* System Information Tab */}
            {activeTab === "system" && (
              <div className="p-6">
                <FormSection title={t("settings","system","platformInformation")}>
                  <div className="text-sm text-gray-600 dark:text-gray-300 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-md flex items-start mb-4">
                    <InfoIcon size={20} className="text-blue-500 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                    <p>{t("settings","system","platformDescription")}</p>
                  </div>

                  <SystemInfoItem
                    label={t("settings","system","platformVersion")}
                    value="v1.0.0 (Released: April 15, 2025)"
                    icon={<Code size={18} />}
                  />

                  <SystemInfoItem
                    label={t("settings","system","serverEnvironment")}
                    value="Production"
                    icon={<Server size={18} />}
                  />

                  <SystemInfoItem
                    label={t("settings","system","databaseVersion")}
                    value="PostgreSQL 16.2"
                    icon={<Database size={18} />}
                  />

                  <SystemInfoItem
                    label={t("settings","system","lastUpdate")}
                    value="Mai 05, 2025 at 08:30 AM"
                    icon={<Clock size={18} />}
                  />
                </FormSection>

                <FormSection title={t("settings","system","developmentTeam")} className="mt-6">
                  <SystemInfoItem
                    label={t("settings","system","projectLead")}
                    value="DJEMAI Mohamed Erraid"
                    icon={<User size={18} />}
                  />

                  <SystemInfoItem
                    label={t("settings","system","backendDeveloper")}
                    value="BENDIFALLAH Rami"
                    icon={<User size={18} />}
                  />

                  <SystemInfoItem
                    label={t("settings","system","leadDeveloper")}
                    value="BENKRADIDJA Rayane"
                    icon={<User size={18} />}
                  />

                  <SystemInfoItem
                    label={t("settings","system","uiDesigner")}
                    value="AISSAOUI Dhiaeddine"
                    icon={<User size={18} />}
                  />

                  <SystemInfoItem
                    label={t("settings","system","uiDesigner")}
                    value="HANNACHI Anes"
                    icon={<User size={18} />}
                  />

                  <SystemInfoItem
                    label={t("settings","system","qaEngineer")}
                    value="DOULAMI Amira"
                    icon={<User size={18} />}
                  />
                </FormSection>

                <FormSection title={t("settings","system","supportInformation")} className="mt-6">
                  <SystemInfoItem
                    label={t("settings","system","technicalSupport")}
                    value="support@example.com | +21376262511"
                    icon={<Mail size={18} />}
                  />

                  <SystemInfoItem
                    label={t("settings","system","documentation")}
                    value="https://docs.example.com/platform-guide"
                    icon={<Globe size={18} />}
                  />

                  <div className="flex items-center justify-center mt-6 text-gray-500 dark:text-gray-400 text-sm">
                    <Heart size={16} className="text-red-500 mr-2" />
                    <span>{t("settings","system","madeWithLove")}</span>
                  </div>
                </FormSection>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}