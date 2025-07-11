"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "../translations/contexts/languageContext"
import PasswordField from "../components/form_components/password_field"
import { AlertTriangle, CheckCircle, Mail, Lock, KeyRound, ArrowLeft } from "lucide-react"
import axios from "axios"

// Configure axios base URL - you should set this to your Express backend URL
const API_URL = "https://esiflow2.onrender.com/auth"
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Password strength validation
export const validatePasswordStrength = (password) => {
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

// Alert component for errors and success messages
const Alert = ({ type, message }) => {
  const bgColor = type === "error" ? "bg-red-100 dark:bg-red-900/30" : "bg-green-100 dark:bg-green-900/30"
  const textColor = type === "error" ? "text-red-700 dark:text-red-300" : "text-green-700 dark:text-green-300"
  const Icon = type === "error" ? AlertTriangle : CheckCircle

  return (
    <div className={`mb-4 p-3 ${bgColor} ${textColor} rounded-lg text-xs md:text-sm flex items-start`}>
      <Icon size={16} className="mr-2 mt-0.5 flex-shrink-0" />
      <span>{message}</span>
    </div>
  )
}

// ForgotPasswordModal Component
export const ForgotPasswordModal = ({ onClose, onContinue }) => {
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isValid, setIsValid] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailInputRef, setEmailInputRef] = useState(null)

  // Focus email input on mount
  useEffect(() => {
    if (emailInputRef) {
      emailInputRef.focus()
    }
  }, [emailInputRef])

  // Validate email whenever it changes
  useEffect(() => {
    validateEmail()
  }, [email])

  const validateEmail = () => {
    setError("")

    if (!email || email.trim() === "") {
      setIsValid(false)
      return
    }

    if (!EMAIL_REGEX.test(email)) {
      setError(t("forgotPassword", "invalidEmail"))
      setIsValid(false)
      return
    }

    setIsValid(true)
  }

  const handleContinueClick = async () => {
    validateEmail()
    if (isValid) {
      setIsSubmitting(true)
      try {
        // Call the Express backend directly using axios
        const response = await api.post("/forgot-password", { email })

        // If successful, move to the next step with the email
        console.log("Response:", response.data)
        if (response.data.success) {
          onContinue(email)
        } else {
          setError(t("forgotPassword", "emailNotFound"))
        }
      } catch (error) {
        console.error("Error in forgot-password:", error)
        setError(error.response?.data?.message || error.message || t("forgotPassword", "emailNotFound"))
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && isValid) {
      handleContinueClick()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 md:p-0">
      <div className="bg-neutral-50 dark:bg-neutral-990 rounded-lg p-4 md:p-6 w-full max-w-sm md:max-w-lg">
        <h2 className="font-russo text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-neutral-950 dark:text-neutral-100 text-left">
          {t("forgotPassword", "title")}
        </h2>
        <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 mb-4 md:mb-6 mt-4 md:mt-8">
          {t("forgotPassword", "description")}
        </p>

        {error && <Alert type="error" message={error} />}

        <div className="mb-4">
          <label
            htmlFor="reset-email"
            className="block mb-2 text-xs md:text-sm font-medium pl-4 text-neutral-950 dark:text-neutral-100"
          >
            {t("forgotPassword", "emailLabel")}
          </label>
          <div className="relative">
            <input
              id="reset-email"
              ref={setEmailInputRef}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-10 pr-4 py-2 md:py-3 bg-neutral-100 dark:bg-[#212529] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-300 placeholder-neutral-400 text-neutral-950 dark:text-neutral-100"
              placeholder={t("forgotPassword", "emailPlaceholder")}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={16} className="text-neutral-500 dark:text-neutral-400" />
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={onClose}
            className="flex-1 border border-neutral-200 dark:border-neutral-800 text-neutral-950 dark:text-neutral-100 p-2 rounded-lg transition duration-300 font-bold hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs md:text-base"
          >
            {t("forgotPassword", "cancelButton")}
          </button>
          <button
            onClick={handleContinueClick}
            disabled={!isValid || isSubmitting}
            className={`flex-1 p-2 md:p-3 rounded-lg transition duration-300 font-bold text-xs md:text-base ${
              isValid && !isSubmitting
                ? "bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400 dark:text-neutral-950 text-neutral-100"
                : "bg-neutral-300 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 cursor-not-allowed"
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
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {t("forgotPassword", "sending")}
              </span>
            ) : (
              t("forgotPassword", "continueButton")
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

// VerificationModal Component with automatic code input
export const VerificationModal = ({ email, onClose, onVerify }) => {
  const { t } = useLanguage()
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState("")
  const [isValid, setIsValid] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [isResending, setIsResending] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [inputRefs, setInputRefs] = useState([])

  // Initialize input refs
  useEffect(() => {
    setInputRefs(Array(6).fill(null))
  }, [])

  // Focus first input on mount
  useEffect(() => {
    if (inputRefs[0]) {
      inputRefs[0].focus()
    }
  }, [inputRefs])

  // Countdown timer for resend code
  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft])

  // Validate code whenever it changes
  useEffect(() => {
    validateCode()
  }, [verificationCode])

  const validateCode = () => {
    setError("")
    const isComplete = verificationCode.every((digit) => digit !== "")
    setIsValid(isComplete)
  }

  const handleCodeChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return

    if (value.length <= 1) {
      const newCode = [...verificationCode]
      newCode[index] = value
      setVerificationCode(newCode)

      // Auto-focus next input
      if (value && index < 5 && inputRefs[index + 1]) {
        inputRefs[index + 1].focus()
      }
    }
  }

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (verificationCode[index] === "" && index > 0 && inputRefs[index - 1]) {
        // If current input is empty and backspace is pressed, focus previous input
        inputRefs[index - 1].focus()
      }
    }
    // Handle left arrow
    else if (e.key === "ArrowLeft" && index > 0 && inputRefs[index - 1]) {
      inputRefs[index - 1].focus()
    }
    // Handle right arrow
    else if (e.key === "ArrowRight" && index < 5 && inputRefs[index + 1]) {
      inputRefs[index + 1].focus()
    }
    // Handle enter key
    else if (e.key === "Enter" && isValid) {
      handleVerifyClick()
    }
    // Handle paste
    else if (e.key === "v" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      navigator.clipboard.readText().then((text) => {
        // Filter out non-numeric characters and take only the first 6 digits
        const pastedCode = text.replace(/\D/g, "").slice(0, 6).split("")

        // Fill the verification code array with the pasted digits
        const newCode = [...verificationCode]
        for (let i = 0; i < pastedCode.length; i++) {
          if (i < 6) {
            newCode[i] = pastedCode[i]
          }
        }

        setVerificationCode(newCode)

        // Focus the appropriate input based on how many digits were pasted
        const focusIndex = Math.min(pastedCode.length, 5)
        if (inputRefs[focusIndex]) {
          inputRefs[focusIndex].focus()
        }
      })
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text")
    const pastedCode = pastedData.replace(/\D/g, "").slice(0, 6).split("")

    if (pastedCode.length > 0) {
      const newCode = [...verificationCode]
      for (let i = 0; i < pastedCode.length; i++) {
        if (i < 6) {
          newCode[i] = pastedCode[i]
        }
      }

      setVerificationCode(newCode)

      // Focus the appropriate input based on how many digits were pasted
      const focusIndex = Math.min(pastedCode.length, 5)
      if (inputRefs[focusIndex]) {
        inputRefs[focusIndex].focus()
      }
    }
  }

  const handleVerifyClick = async () => {
    validateCode()
    if (isValid) {
      setIsSubmitting(true)
      try {
        // Combine the verification code digits into a single string
        const code = verificationCode.join("")
        console.log("Verification code:", code)
        console.log("Email:", email)

        // Call the Express backend directly using axios
        const response = await api.post("/verify-reset-code", { email, code })

        // If successful, move to the next step
        onVerify(email)
      } catch (error) {
        console.error("Error in verify-reset-code:", error)
        setError(error.response?.data?.message || error.message || t("verification", "invalidCode"))
      } finally {
        setIsSubmitting(false)
      }
    } else {
      setError(t("verification", "incompleteCode"))
    }
  }

  const handleResendCode = async () => {
    if (timeLeft > 0) return

    setIsResending(true)
    try {
      // Call the Express backend directly using axios
      const response = await api.post("/resend-reset-code", { email })

      // Reset timer
      setTimeLeft(60)
      setError("")

      // Show success message
      setError(t("verification", "codeSent"))
    } catch (error) {
      console.error("Error in resend-reset-code:", error)
      setError(error.response?.data?.message || error.message || t("verification", "resendFailed"))
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 md:p-0">
      <div className="bg-neutral-50 dark:bg-neutral-990 rounded-lg p-4 md:p-6 w-full max-w-sm md:max-w-lg">
        <div className="flex items-center mb-4">
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors mr-2"
          >
            <ArrowLeft size={20} className="text-neutral-950 dark:text-neutral-100" />
          </button>
          <h2 className="text-2xl md:text-4xl font-russo font-bold text-neutral-950 dark:text-neutral-100">
            {t("verification", "title")}
          </h2>
        </div>

        <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 mb-4 md:mb-6 mt-4 md:mt-8">
          {t("verification", "description").replace("{email}", email)}
        </p>

        {error && <Alert type={error === t("verification", "codeSent") ? "success" : "error"} message={error} />}

        <div className="flex justify-center gap-1 md:gap-2 my-4 md:my-6">
          {verificationCode.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs[index] = el;
              }}
              id={`code-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-8 h-10 md:w-10 md:h-12 text-center bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-300 text-neutral-950 dark:text-neutral-100"
            />
          ))}
        </div>

        <div className="text-center mb-4">
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">{t("verification", "didNotReceive")}</p>
          <button
            onClick={handleResendCode}
            disabled={timeLeft > 0 || isResending}
            className={`text-xs font-medium ${
              timeLeft > 0 || isResending
                ? "text-neutral-400 dark:text-neutral-600 cursor-not-allowed"
                : "text-primary-600 dark:text-primary-400 hover:underline"
            }`}
          >
            {isResending
              ? t("verification", "resending")
              : timeLeft > 0
                ? `${t("verification", "resendIn")} ${timeLeft}s`
                : t("verification", "resendButton")}
          </button>
        </div>

        <button
          onClick={handleVerifyClick}
          disabled={!isValid || isSubmitting}
          className={`w-full p-2 md:p-3 rounded-lg transition duration-300 font-bold text-xs md:text-base ${
            isValid && !isSubmitting
              ? "bg-primary-600 hover:bg-primary-700 dark:bg-primary-300 dark:hover:bg-primary-400 dark:text-neutral-950 text-neutral-100"
              : "bg-neutral-300 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white dark:text-neutral-950"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {t("verification", "verifying")}
            </span>
          ) : (
            t("verification", "verifyButton")
          )}
        </button>
      </div>
    </div>
  )
}

// NewPasswordModal Component
export const NewPasswordModal = ({ email, onClose, onSubmit }) => {
  const { t } = useLanguage()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isValid, setIsValid] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [passwordInputRef, setPasswordInputRef] = useState(null)

  // Focus password input on mount
  useEffect(() => {
    if (passwordInputRef) {
      passwordInputRef.focus()
    }
  }, [passwordInputRef])

  // Validate passwords whenever they change
  useEffect(() => {
    validatePasswords()
  }, [password, confirmPassword])

  const validatePasswords = () => {
    setError("")

    // Check password strength
    const strength = validatePasswordStrength(password)

    if (!password) {
      setIsValid(false)
      return
    }

    if (!strength.isValid) {
      setIsValid(false)
      return
    }

    if (!confirmPassword) {
      setIsValid(false)
      return
    }

    if (password !== confirmPassword) {
      setIsValid(false)
      return
    }

    setIsValid(true)
  }

  const handleSubmit = async () => {
    // Reset error
    setError("")

    // Validate password strength
    const strength = validatePasswordStrength(password)

    if (!strength.isValid) {
      setError(t("newPassword", "passwordRequirements"))
      return
    }

    if (password !== confirmPassword) {
      setError(t("newPassword", "passwordsDoNotMatch"))
      return
    }

    // If validation passes, call the onSubmit function
    setIsSubmitting(true)
    try {
      // Call the Express backend directly using axios
      const response = await api.post("/reset-password", { email, password })

      // If successful, move to the next step
      onSubmit(password)
    } catch (error) {
      console.error("Error in reset-password:", error)
      setError(error.response?.data?.message || error.message || t("newPassword", "resetFailed"))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 md:p-0">
      <div className="bg-neutral-50 dark:bg-neutral-990 rounded-lg p-4 md:p-6 w-full max-w-sm md:max-w-lg">
        <div className="flex items-center mb-4">
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors mr-2"
          >
            <ArrowLeft size={20} className="text-neutral-950 dark:text-neutral-100" />
          </button>
          <h2 className="font-russo text-2xl md:text-4xl font-bold text-neutral-950 dark:text-neutral-100">
            {t("newPassword", "title")}
          </h2>
        </div>

        <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 mb-4 md:mb-6 mt-4 md:mt-8">
          {t("newPassword", "description")}
        </p>

        {error && <Alert type="error" message={error} />}

        <div className="mb-4">
          <PasswordField
            title={t("newPassword", "passwordLabel")}
            placeholder={t("newPassword", "passwordPlaceholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={null}
            inputRef={setPasswordInputRef}
            icon={<Lock size={16} className="text-neutral-500 dark:text-neutral-400" />}
          />
        </div>

        <div className="mb-6">
          <PasswordField
            title={t("newPassword", "confirmPasswordLabel")}
            placeholder={t("newPassword", "confirmPasswordPlaceholder")}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={null}
            icon={<KeyRound size={16} className="text-neutral-500 dark:text-neutral-400" />}
            showStrengthIndicator={false}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!isValid || isSubmitting}
          className={`w-full p-2 md:p-3 rounded-lg transition duration-300 font-bold text-xs md:text-base ${
            isValid && !isSubmitting
              ? "bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400 dark:text-neutral-950 text-neutral-100"
              : "bg-neutral-300 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white dark:text-neutral-950"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {t("newPassword", "resetting")}
            </span>
          ) : (
            t("newPassword", "resetButton")
          )}
        </button>
      </div>
    </div>
  )
}

// SuccessModal Component
export const SuccessModal = ({ onClose }) => {
  const { t } = useLanguage()

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 md:p-0">
      <div className="bg-neutral-50 dark:bg-neutral-990 rounded-lg p-4 md:p-6 w-full max-w-sm md:max-w-lg">
        <h2 className="text-2xl md:text-4xl font-russo text-center font-bold mb-2 text-neutral-950 dark:text-neutral-100">
          {t("success", "title")}
        </h2>
        <div className="flex justify-center mb-4">
          <div className="flex justify-center mb-2 md:mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-16 h-16 md:w-20 md:h-20 fill-neutral-950 dark:fill-neutral-100"
            >
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </div>
        </div>
        <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 mb-4 md:mb-6 text-center">
          {t("success", "description")}
        </p>

        <button
          onClick={onClose}
          className="w-full bg-primary-600 hover:bg-primary-700 dark:bg-primary-300 dark:hover:bg-primary-400 dark:text-neutral-950 text-neutral-100 p-2 md:p-3 rounded-lg transition duration-300 font-bold text-xs md:text-base"
        >
          {t("success", "backButton")}
        </button>
      </div>
    </div>
  )
}

// Main component to manage the password reset flow
export const PasswordResetFlow = () => {
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [currentStep, setCurrentStep] = useState("forgot")

  const handleClose = () => {
    // In a real app, this would close the modal or navigate back
    setCurrentStep("forgot")
    setEmail("")
  }

  const handleContinue = (submittedEmail) => {
    // Store the email received from the ForgotPasswordModal
    setEmail(submittedEmail)
    setCurrentStep("verification")
  }

  const handleVerify = () => {
    // Move to new password step
    setCurrentStep("newPassword")
  }

  const handleSubmit = (password) => {
    // Move to success step
    setCurrentStep("success")
  }

  return (
    <>
      {currentStep === "forgot" && (
        <ForgotPasswordModal onClose={handleClose} onContinue={handleContinue} />
      )}

      {currentStep === "verification" && (
        <VerificationModal email={email} onClose={() => setCurrentStep("forgot")} onVerify={handleVerify} />
      )}

      {currentStep === "newPassword" && (
        <NewPasswordModal email={email} onClose={() => setCurrentStep("verification")} onSubmit={handleSubmit} />
      )}

      {currentStep === "success" && <SuccessModal onClose={handleClose} />}
    </>
  )
}

export default function Placeholder() {
  return null;
}
