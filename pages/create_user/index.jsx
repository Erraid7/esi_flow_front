"use client"

import { useState, useEffect, useRef } from "react"
import { useLanguage } from "../translations/contexts/languageContext"
import {
  User,
  Shield,
  Mail,
  Phone,
  School,
  ChevronDown,
  Eye,
  EyeOff,
  Settings,
  BarChart2,
  Bell,
  Home,
  LogOut,
  Menu,
  X,
  Check,
  AlertTriangle,
  ShieldHalf 

} from "lucide-react"

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
    type === "success" ? <Check size={20} /> : type === "error" ? <AlertTriangle size={20} /> : <Bell size={20} />

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

// SideNavbar Component
const SideNavbar = ({ activeItem, isMobileMenuOpen, toggleMobileMenu }) => {
  const navItems = [
    { name: "Dashboard", icon: <Home size={18} /> },
    { name: "Requests", icon: <Mail size={18} /> },
    { name: "Equipment", icon: <Shield size={18} /> },
    { name: "Users", icon: <User size={18} /> },
    { name: "Reports", icon: <BarChart2 size={18} /> },
    { name: "Notifications", icon: <Bell size={18} /> },
    { name: "Settings", icon: <Settings size={18} /> },
  ]

  return (
    <>
      {/* Mobile Menu Toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white dark:bg-neutral-900 z-30 border-b border-gray-200 dark:border-neutral-800 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/api/placeholder/80/30" alt="ESI FLOW" className="h-6" />
        </div>
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 focus:outline-none"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar - Desktop */}
      <div className="hidden lg:block w-64 bg-neutral-50 dark:bg-neutral-900 border-r border-gray-200 dark:border-neutral-800 h-screen">
        <div className="p-3 flex items-center justify-center mt-3">
          <img src="/home/hero/logo12.svg" alt="" className="dark:hidden h-1/2 w-1/2" />
        </div>

        <nav className="mt-3 px-3">
          {navItems.map((item) => (
            <div
              key={item.name}
              className={`px-4 py-3 mb-1 rounded-md flex items-center transition-colors duration-150 ${
                activeItem === item.name
                  ? "text-blue-600 bg-blue-50 dark:bg-blue-900/30 font-medium"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800"
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.name}</span>
            </div>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
              <span>AD</span>
            </div>
            <div className="ml-3">
              <div className="text-sm font-medium dark:text-neutral-100">DOULAMI Amira</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Personal</div>
            </div>
            <button className="ml-2 p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`lg:hidden fixed inset-0 z-20 transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}
      >
        <div className="absolute inset-0 bg-gray-600 opacity-75" onClick={toggleMobileMenu}></div>

        <div className="relative bg-white dark:bg-neutral-900 w-80 h-full overflow-y-auto">
          <div className="p-6 border-b border-gray-200 dark:border-neutral-800 flex justify-between items-center">
            <img src="/api/placeholder/80/30" alt="ESI FLOW" className="h-6" />
            <button onClick={toggleMobileMenu}>
              <X size={20} className="text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          <nav className="mt-6 px-3">
            {navItems.map((item) => (
              <div
                key={item.name}
                className={`px-4 py-3 mb-1 rounded-md flex items-center ${
                  activeItem === item.name
                    ? "text-blue-600 bg-blue-50 dark:bg-blue-900/30 font-medium"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800"
                }`}
                onClick={toggleMobileMenu}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </div>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 w-full border-t border-gray-200 dark:border-neutral-800 p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                <span>AD</span>
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium dark:text-neutral-100">DOULAMI Amira</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Personal</div>
              </div>
              <button className="ml-auto p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400">
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
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
  icon,
  iconBg,
  updateText,
  description,
  options = [],
  error = null,
  required = false,
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
    <div className="flex flex-col gap-3" ref={dropdownRef}>
      {title && (
        <h2 className="text-lg font-russo text-neutral-990 dark:text-neutral-100">
          {title} {required && <span className="text-red-500">*</span>}
        </h2>
      )}

      <div className="relative">
        <div
          className={`flex items-center justify-between border ${error ? "border-red-300 bg-red-50 dark:bg-red-900/20" : "border-none"} rounded-lg p-3 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors shadow-sm`}
          onClick={toggleDropdown}
        >
          <div className="flex items-center">
            {icon && <div className={`${iconBg}  mr-2`}>{icon}</div>}

            <div className="flex items-start flex-col text-sm">
              {value && <span className="text-neutral-990 dark:text-neutral-100">{value}</span>}
              {!value && <span className="text-neutral-400 dark:text-neutral-200">{title}</span>}
              <span className="text-xs text-neutral-500 dark:text-neutral-300">{updateText}</span>
            </div>
          </div>
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

      {description && !error && <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{description}</p>}
    </div>
  )
}

// Password Field Component with Strength Meter
const PasswordField = ({ title, placeholder, value, onChange, comment, error = null, required = false }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [strength, setStrength] = useState(0)

  const { t, toggleLanguage } = useLanguage()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  // Calculate password strength
  useEffect(() => {
    if (!value) {
      setStrength(0)
      return
    }

    let score = 0

    // Length
    if (value.length >= 8) score += 1
    if (value.length >= 12) score += 1

    // Complexity
    if (/[A-Z]/.test(value)) score += 1
    if (/[0-9]/.test(value)) score += 1
    if (/[^A-Za-z0-9]/.test(value)) score += 1

    setStrength(score)
  }, [value])

  const getStrengthLabel = () => {
    if (strength === 0) return { label: t("userEdit", "password", "tooWeak"), color: "bg-gray-200" }
    if (strength <= 2) return { label: t("userEdit", "password", "weak"), color: "bg-red-500" }
    if (strength <= 3) return { label: t("userEdit", "password", "fair"), color: "bg-yellow-500" }
    if (strength <= 4) return { label: t("userEdit", "password", "good"), color: "bg-blue-500" }
    return { label: t("userEdit", "password", "strong"), color: "bg-green-500" }
  }

  const strengthInfo = getStrengthLabel()

  return (
    <div className="flex flex-col gap-2">
      {title && (
        <label className="block text-sm font-inter text-neutral-990 dark:text-neutral-100">
          {title} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full text-sm px-4 py-3 border ${error ? "border-red-300 bg-red-50" : "border-none bg-neutral-100 dark:bg-neutral-950"} rounded-lg shadow-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all text-neutral-990 dark:text-neutral-100`}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-950 dark:text-neutral-100 hover:text-neutral-990 dark:hover:text-neutral-50"
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      {value && (
        <div className="mt-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-500 dark:text-gray-400">Strength: {strengthInfo.label}</span>
          </div>
          <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full ${strengthInfo.color} transition-all duration-300 ease-in-out`}
              style={{ width: `${(strength / 5) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <AlertTriangle size={12} className="mr-1" />
          {error}
        </p>
      )}

      {comment && !error && <div className="text-xs text-gray-500 mt-1">{comment}</div>}
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

// Main Component
export default function UserCreateForm() {
  const { t, toggleLanguage } = useLanguage()

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
    fullName: "Djemal Mohamed Emad",
    email: "djemal@esi.dz",
    phone: "(555) 123-4567",
    role: "Admin",
  })

  // Password state
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // Form validation
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Available options for dropdowns
  const professionOptions = ["Teacher", "Administrator", "Engineer", "Technician", "Manager", "Other"]
  const roleOptions = ["Admin", "User", "Editor", "Viewer", "Moderator"]

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

    // Required fields
    if (!user.fullName.trim())
      newErrors.fullName = t("userEdit", "validation", "requiredField", { field: t("userEdit", "fields", "fullName") })
    if (!user.email.trim())
      newErrors.email = t("userEdit", "validation", "requiredField", { field: t("userEdit", "fields", "email") })

    // Email format
    if (user.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      newErrors.email = t("userEdit", "validation", "validEmail")
    }

    // Phone format
    if (user.phone && !/^$$\d{3}$$ \d{3}-\d{4}$/.test(user.phone)) {
      newErrors.phone = "Phone should be in format (XXX) XXX-XXXX"
    }

    // Password validation
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

  const handleSubmit = (e) => {
    e.preventDefault()

    const formErrors = validateForm()
    setErrors(formErrors)

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true)

      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false)
        showToast(t("userEdit", "toast", "success"), "success")

        // Reset password fields after successful update
        setPassword("")
        setConfirmPassword("")
      }, 1000)
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
  const [switchValue, setSwitchValue] = useState(false);
  const handleSwitchChange = (field, value) => { 
    setSwitchValue(value);
  }
  const [requirePasswordSwitch, setRequirePasswordSwitch] = useState(false);

  const handlepassChange = (field, value) => {
    if (field === "role") {
      setRequirePasswordSwitch(value);
    }
    // other logic...
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-900">
      {/* Toast Notification */}
      <Toast message={toast.message} type={toast.type} visible={toast.visible} onClose={hideToast} />

      {/* Sidebar */}
      <SideNavbar activeItem="Users" isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />

      {/* Main content */}
      <div className="flex overflow-y-auto pb-8 w-full bg-neutral-50 dark:bg-neutral-990">
        <div className="px-4 sm:px-10 lg:px-20 w-full">
          <div className="flex flex-col items-start gap-6 mb-6 pt-6 text-neutral-950 dark:text-neutral-100">
            <div className="text-sm flex items-center font-inter">
              <span>{t("userEdit", "breadcrumb", "users")}</span>
              <span className="mx-2 text-lg">›</span>
              <span>{t("userEdit", "breadcrumb", "create")}</span>
            </div>
            <h1 className="text-xl lg:text-2xl font-russo">{t("userEdit", "breadcrumb", "create")}</h1>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {/* Basic Information */}
            <FormSection title={t("userEdit", "sections", "basicInfo")}>
              <div className="flex flex-col gap-4">
                <FormField
                  title={t("userEdit", "fields", "fullName")}
                  placeholder={t("userEdit", "placeholders", "fullName")}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  error={errors.fullName}
                  required={true}
                />

                <FormField
                  title={t("userEdit", "fields", "email")}
                  placeholder={t("userEdit", "placeholders", "email")}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  icon={<Mail size={16} />}
                 
                  error={errors.email}
                  required={true}
                />

                <FormField
                  title={t("userEdit", "fields", "phone")}
                  placeholder={t("userEdit", "placeholders", "phone")}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  icon={<Phone size={16} />}
                 
                  error={errors.phone}
                />

           
              </div>
            </FormSection>

            {/* Profession & Role */}
            <div className="">
              {/* Profession */}
              

              {/* Role & Permissions */}
              <FormSection>
                <DropdownField
                  title={t("userEdit", "fields", "role")}
                  value={user.role}
                  onChange={(value) => handleInputChange("role", value)}
                  icon={<span className="text-neutral-50 dark:text-neutral-990 font-russo text-base ">AD</span>}
                  iconBg="flex items-center justify-center bg-[#2EA95C] outline outline-[5px] outline-[#2EA95C25] rounded-full h-9 w-9"
                  updateText={t("userEdit", "fields", "roleCreate")}
                  description={t("userEdit", "fields", "roleDescription")}
                  options={roleOptions}
                />
              </FormSection>
            </div>

            {/* Account Setup */}
            <FormSection title={t("userEdit", "sections", "accountSetup")}>
           

              <div className="flex  gap-3 flex-col">
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
                  
                  error={errors.password}
                />

                <PasswordField
                  title={t("userEdit", "fields", "confirmPassword")}
                  placeholder={t("userEdit", "fields", "confirmPasswordPlaceholder")}
                  value={confirmPassword}
                  comment={t("userEdit", "fields", "passwordComment")}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: null })
                  }}
                  error={errors.confirmPassword}
                />
              </div>
          
            </FormSection>
            <FormSection>
                <div className="flex flex-col gap-6">
                                {/* Send Email Toggle */}
  <div className="flex items-center justify-between">
  <div className="flex items-center gap-3">
    <div className="flex items-center justify-center bg-card-bg   rounded-lg h-10 w-10">
    <Mail size={25}  className="text-[#151720] fill-primary-500 " />
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
    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#2EA95C50] dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500  relative" />
  </label>
</div>
  {/* Password Toggle */}
  <div className="flex items-center justify-between">
  <div className="flex items-center gap-3">
  <div className="flex items-center justify-center bg-card-bg   rounded-lg h-10 w-10">
  <ShieldHalf strokeWidth={2} size={25}  className="text-[#0f0f11] fill-primary-500 "  />
   
   
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
    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#2EA95C50] dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2EA95C] relative" />
  </label>
</div>
                </div>


    </FormSection>
     
              <FormSection >
                              <DropdownField
                                title={t("userEdit", "fields", "profession")}
                                value={user.profession}
                                onChange={(value) => handleInputChange("profession", value)}
                                icon={<School size={24} strokeWidth={2} className="text-primary-500" />}
                                iconBg="bg-[#284CFF] bg-opacity-5 p-2 rounded rounded-lg"
                                updateText={t("userEdit", "fields", "professionCreate")}
                                options={professionOptions}
                              />
               </FormSection>

            {/* Form Actions - Add dark mode for buttons */}
            <div className="flex justify-end mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`h-10 w-32 mr-3 text-sm bg-primary-500 text-neutral-50 font-inter font-medium rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 transition-colors ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""}`}
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
                  t("userEdit", "actions", "create")
                )}
              </button>

              <button
                type="button"
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


