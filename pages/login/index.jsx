"use client"

import { useState } from "react"
import { useLanguage } from "../translations/contexts/languageContext"
import { useDarkMode } from "../darkLightMode/darkModeContext"
import { Eye, EyeSlash } from "iconsax-react"
import { ForgotPasswordModal, VerificationModal, NewPasswordModal, SuccessModal } from "./forgot-password-modals"

const Login = () => {
  const { t } = useLanguage()
  const { isDarkMode } = useDarkMode()

  const [formData, setFormData] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)

  // States for forgot password flow
  const [resetEmail, setResetEmail] = useState("")
  
  // Use a single state to track which modal is currently shown
  // null means no modal is shown
  // possible values: null, "forgot", "verification", "newPassword", "success"
  const [currentModal, setCurrentModal] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  // Forgot password handlers
  const handleForgotPasswordClick = (e) => {
    e.preventDefault()
    setResetEmail(formData.email || "")
    setCurrentModal("forgot")
  }

  const handleContinue = () => {
    setCurrentModal("verification")
  }

  const handleVerify = () => {
    setCurrentModal("newPassword")
  }

  const handlePasswordReset = (newPassword) => {
    console.log("Password reset with:", newPassword)
    setCurrentModal("success")
  }

  const handleBackToLogin = () => {
    setCurrentModal(null)
  }

  const handleCloseModal = () => {
    setCurrentModal(null)
  }

  return (
    <section className="flex flex-col-reverse justify-between lg:flex-row h-full bg-neutral-50 p-4 lg:p-0 dark:bg-neutral-990">
      <div className="flex lg:hidden justify-center gap-3 items-center py-3 px-4">
        <img src={isDarkMode ? "/login/logo-1-dark.svg" : "/login/logo13.svg"} alt="Logo" />
        <img src={isDarkMode ? "/login/esi_white.svg" : "/login/esi_dark.svg"} alt="ESI Logo" />
      </div>
      {/* Left Side - Form Section */}
      <div className="flex flex-col gap-24 w-full lg:w-1/2 sm:px-12 lg:px-16 py-10">
        <div className="hidden lg:flex justify-between items-center">
          <img src={isDarkMode ? "/login/logo-1-dark.svg" : "/login/logo13.svg"} alt="Logo" />
          <img src={isDarkMode ? "/login/esi_white.svg" : "/login/esi_dark.svg"} alt="ESI Logo" />
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl font-russo mb-6 text-neutral-950 dark:text-neutral-100">
            {t("login", "title")}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium pl-4 text-neutral-950 dark:text-neutral-100"
              >
                {t("login", "ph1")}
              </label>
              <input
                id="email"
                name="email"
                type="text"
                placeholder={t("login", "input1")}
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 lg:py-4 bg-neutral-100 dark:bg-neutral-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-300 placeholder-neutral-400 text-neutral-950 dark:text-neutral-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium pl-4 text-neutral-950 dark:text-neutral-100"
              >
                {t("login", "ph2")}
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t("login", "input2")}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 lg:py-4 bg-neutral-100 dark:bg-neutral-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-300 placeholder-neutral-400 text-neutral-950 dark:text-neutral-100"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-4 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye size="20" variant="Bold" color={isDarkMode ? "#F8F9FA" : "#5E636F"} />
                  ) : (
                    <EyeSlash size="20" variant="Bold" color={isDarkMode ? "#F8F9FA" : "#5E636F"} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <label className="flex items-center text-neutral-950 dark:text-neutral-100">
                <input type="checkbox" className="mr-2" />
                {t("login", "remember")}
              </label>
              <a
                href="#"
                onClick={handleForgotPasswordClick}
                className="text-primary-600 dark:text-primary-300 hover:underline"
              >
                {t("login", "forgot")}
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 hover:dark:bg-primary-400 dark:bg-primary-300 dark:text-neutral-950 text-neutral-100 p-3 rounded-lg transition duration-300 font-bold"
            >
              {t("login", "button")}
            </button>
          </form>
        </div>
      </div>

      {/* Right Side - Glassmorphism Section */}
      <div className='flex h-[200px] lg:h-screen bg-cover bg-center w-full lg:w-1/2 bg-[url("/login/glassmorphism.svg")] justify-center items-center rounded-md lg:rounded-none'>
        <div className="w-[200px] lg:w-[526px] h-[115px] lg:h-[302px] backdrop-blur-sm bg-white/15 rounded-3xl flex justify-center items-center">
          <img src="/login/logo-12-dark.svg" alt="ESI Flow" className="hidden lg:block" />
          <img src="/login/logo12-res.svg" alt="ESI Flow" className="block lg:hidden" />
        </div>
      </div>

      {/* Forgot Password Modals - Only show one modal at a time based on currentModal state */}
      {currentModal === "forgot" && (
        <ForgotPasswordModal
          email={resetEmail}
          setEmail={setResetEmail}
          onClose={handleCloseModal}
          onContinue={handleContinue}
        />
      )}

      {currentModal === "verification" && (
        <VerificationModal 
          onClose={handleCloseModal} 
          onVerify={handleVerify} 
        />
      )}

      {currentModal === "newPassword" && (
        <NewPasswordModal 
          onClose={handleCloseModal} 
          onSubmit={handlePasswordReset} 
        />
      )}

      {currentModal === "success" && (
        <SuccessModal onClose={handleBackToLogin} />
      )}
    </section>
  )
}

export default Login