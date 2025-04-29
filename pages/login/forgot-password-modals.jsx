"use client"

import { useState } from "react"
import { useLanguage } from "../translations/contexts/languageContext"

const ForgotPasswordModal = ({ email, setEmail, onClose, onContinue }) => {
  const { t } = useLanguage();
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 md:p-0">
      <div className="bg-neutral-50 dark:bg-neutral-990 rounded-lg p-4 md:p-6 w-full max-w-sm md:max-w-lg">
        <h2 className="font-russo text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-neutral-950 dark:text-neutral-100 text-left">
          {t("forgotPassword", "title")}
        </h2>
        <p className="text-xs md:text-sm text-neutral-300 dark:text-neutral-400 mb-4 md:mb-6 text-center mt-4 md:mt-8">
          {t("forgotPassword", "description")}
        </p>
        <div className="mb-4">
          <label
            htmlFor="reset-email"
            className="block mb-2 text-xs md:text-sm font-medium pl-4 text-neutral-950 dark:text-neutral-100"
          >
            {t("forgotPassword", "emailLabel")}
          </label>
          <input
            id="reset-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 md:py-3 bg-neutral-100 dark:bg-[#212529] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-300 placeholder-neutral-400 text-neutral-950 dark:text-neutral-100"
            placeholder={t("forgotPassword", "emailPlaceholder")}
          />
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={onClose}
            className="flex-1 border border-neutral-200 dark:border-neutral-800 text-neutral-950 dark:text-neutral-100 p-2 rounded-lg transition duration-300 font-bold hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs md:text-base"
          >
            {t("forgotPassword", "cancelButton")}
          </button>
          <button
            onClick={onContinue}
            className="flex-1 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400 dark:text-neutral-950 text-neutral-100 p-2 md:p-3 rounded-lg transition duration-300 font-bold text-xs md:text-base"
          >
            {t("forgotPassword", "continueButton")}
          </button>
        </div>
      </div>
    </div>
  )
}

const VerificationModal = ({ onClose, onVerify }) => {
  const { t } = useLanguage();
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""])

  const handleCodeChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...verificationCode]
      newCode[index] = value
      setVerificationCode(newCode)

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`)
        if (nextInput) nextInput.focus()
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 md:p-0">
      <div className="bg-neutral-50 dark:bg-neutral-990 rounded-lg p-4 md:p-6 w-full max-w-sm md:max-w-lg">
        <h2 className="text-2xl md:text-4xl font-russo font-bold mb-2 md:mb-4 text-left pl-2 md:pl-5 text-neutral-950 dark:text-neutral-100">
          {t("verification", "title")}
        </h2>
        <p className="text-xs md:text-sm text-neutral-400 dark:text-neutral-400 mb-4 md:mb-6 text-center mt-4 md:mt-8">
          {t("verification", "description")}
        </p>

        <div className="flex justify-center gap-1 md:gap-2 my-4 md:my-6">
          {verificationCode.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              className="w-8 h-10 md:w-10 md:h-12 text-center bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-300 text-neutral-950 dark:text-neutral-100"
            />
          ))}
        </div>

        <button
          onClick={onVerify}
          className="w-full bg-primary-600 hover:bg-primary-700 dark:bg-primary-300 dark:hover:bg-primary-400 dark:text-neutral-950 text-neutral-100 p-2 md:p-3 rounded-lg transition duration-300 font-bold text-xs md:text-base"
        >
          {t("verification", "verifyButton")}
        </button>
      </div>
    </div>
  )
}

const SuccessModal = ({ onClose }) => {
  const { t } = useLanguage();
  
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

export { ForgotPasswordModal, VerificationModal, SuccessModal }