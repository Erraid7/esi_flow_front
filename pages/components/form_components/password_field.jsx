"use client"

import { useState } from "react"
import { Eye, EyeOff, AlertTriangle } from 'lucide-react'
import { useLanguage } from "../../translations/contexts/languageContext"

// Password strength validation function
const validatePasswordStrength = (password) => {
  const hasMinLength = password.length >= 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password)

  return {
    isValid: hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar,
    hasMinLength,
    hasUpperCase,
    hasLowerCase,
    hasNumber,
    hasSpecialChar,
  }
}

const PasswordField = ({
  title,
  placeholder,
  value,
  onChange,
  comment,
  error = null,
  required = false,
  showStrengthIndicator = true,
  inputRef = null,
  icon = null,
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const { t } = useLanguage()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  // Get password strength details
  const strength = validatePasswordStrength(value || "")

  const getStrengthLevel = () => {
    if (!value) return 0

    let score = 0
    if (strength.hasMinLength) score++
    if (strength.hasUpperCase) score++
    if (strength.hasLowerCase) score++
    if (strength.hasNumber) score++
    if (strength.hasSpecialChar) score++

    return score
  }

  const strengthLevel = getStrengthLevel()

  const getStrengthText = () => {
    try {
      if (strengthLevel === 0)
        return {
          text: t("newPassword","strengthEmpty"),
          color: "text-neutral-400",
        }
      if (strengthLevel < 3)
        return {
          text: t("newPassword","strengthWeak"),
          color: "text-red-500",
        }
      if (strengthLevel < 5)
        return {
          text: t("newPassword","strengthMedium"),
          color: "text-yellow-500",
        }
      return {
        text: t("newPassword","strengthStrong"),
        color: "text-green-500",
      }
    } catch (e) {
      // Fallback to userEdit translations
      if (strengthLevel === 0)
        return {
          text: t("userEdit","password","tooWeak"),
          color: "text-neutral-400",
        }
      if (strengthLevel < 3)
        return {
          text: t("userEdit","password","weak"),
          color: "text-red-500",
        }
      if (strengthLevel < 4)
        return {
          text: t("userEdit","password","fair"),
          color: "text-yellow-500",
        }
      return {
        text: t("userEdit","password","strong"),
        color: "text-green-500",
      }
    }
  }

  const { text, color } = getStrengthText()

  return (
    <div className="flex flex-col gap-2">
      {title && (
        <label className="block text-sm font-medium pl-4 text-neutral-950 dark:text-neutral-100">
          {title} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          ref={inputRef}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full ${icon ? "pl-10" : "pl-4"} pr-10 py-2 md:py-3 border ${
            error ? "border-red-300 bg-red-50" : "border-none bg-neutral-100 dark:bg-neutral-950"
          } rounded-lg shadow-sm focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-300 transition-all text-neutral-950 dark:text-neutral-100`}
        />

        {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>}

        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300"
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      {/* Password Strength Indicator */}
      {showStrengthIndicator && value && (
        <div className="mt-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
              {t("newPassword","passwordStrength")}
            </span>
            <span className={`text-xs font-medium ${color}`}>{text}</span>
          </div>
          <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
            <div
              className={`h-full ${
                strengthLevel === 0
                  ? "w-0"
                  : strengthLevel < 3
                    ? "w-1/4 bg-red-500"
                    : strengthLevel < 5
                      ? "w-3/5 bg-yellow-500"
                      : "w-full bg-green-500"
              } transition-all duration-300 ease-in-out`}
            ></div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-3">
            <div
              className={`text-xs ${strength.hasMinLength ? "text-green-500" : "text-neutral-500 dark:text-neutral-400"}`}
            >
              <span className={strength.hasMinLength ? "font-medium" : ""}>
                ✓ {t("newPassword","minLength")}
              </span>
            </div>
            <div
              className={`text-xs ${strength.hasUpperCase ? "text-green-500" : "text-neutral-500 dark:text-neutral-400"}`}
            >
              <span className={strength.hasUpperCase ? "font-medium" : ""}>
                ✓ {t("newPassword","upperCase")}
              </span>
            </div>
            <div
              className={`text-xs ${strength.hasLowerCase ? "text-green-500" : "text-neutral-500 dark:text-neutral-400"}`}
            >
              <span className={strength.hasLowerCase ? "font-medium" : ""}>
                ✓ {t("newPassword","lowerCase")}
              </span>
            </div>
            <div
              className={`text-xs ${strength.hasNumber ? "text-green-500" : "text-neutral-500 dark:text-neutral-400"}`}
            >
              <span className={strength.hasNumber ? "font-medium" : ""}>✓ {t("newPassword","number")}</span>
            </div>
            <div
              className={`text-xs ${strength.hasSpecialChar ? "text-green-500" : "text-neutral-500 dark:text-neutral-400"}`}
            >
              <span className={strength.hasSpecialChar ? "font-medium" : ""}>
                ✓ {t("newPassword","specialChar")}
              </span>
            </div>
          </div>
        </div>
      )}

      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <AlertTriangle size={12} className="mr-1" />
          {error}
        </p>
      )}

      {comment && !error && <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 pl-4">{comment}</div>}
    </div>
  )
}

export default PasswordField