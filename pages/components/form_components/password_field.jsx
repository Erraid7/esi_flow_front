
import React, { useEffect, useState } from "react"
import { Eye, EyeOff, AlertTriangle } from "lucide-react"
import { useLanguage } from '../../translations/contexts/languageContext';

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

  export default PasswordField;