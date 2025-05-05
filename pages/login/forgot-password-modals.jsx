"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "../translations/contexts/languageContext"
import { Eye, EyeSlash } from "iconsax-react"
import { useDarkMode } from "../darkLightMode/darkModeContext"

const ForgotPasswordModal = ({ email, setEmail, onClose, onContinue }) => {
  const { t } = useLanguage();
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);
  
  // Validate email whenever it changes
  useEffect(() => {
    validateEmail();
  }, [email]);
  
  const validateEmail = () => {
    setError("");
    
    if (!email || email.trim() === "") {
      setIsValid(false);
      return;
    }
    
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(t("forgotPassword", "invalidEmail"));
      setIsValid(false);
      return;
    }
    
    setIsValid(true);
  };
  
  const handleContinueClick = () => {
    validateEmail();
    if (isValid) {
      onContinue();
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 md:p-0">
      <div className="bg-neutral-50 dark:bg-neutral-990 rounded-lg p-4 md:p-6 w-full max-w-sm md:max-w-lg">
        <h2 className="font-russo text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-neutral-950 dark:text-neutral-100 text-left">
          {t("forgotPassword", "title")}
        </h2>
        <p className="text-xs md:text-sm text-neutral-300 dark:text-neutral-400 mb-4 md:mb-6 text-center mt-4 md:mt-8">
          {t("forgotPassword", "description")}
        </p>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-xs md:text-sm">
            {error}
          </div>
        )}
        
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
            onClick={handleContinueClick}
            disabled={!isValid}
            className={`flex-1 p-2 md:p-3 rounded-lg transition duration-300 font-bold text-xs md:text-base ${
              isValid 
                ? "bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400 dark:text-neutral-950 text-neutral-100" 
                : "bg-neutral-300 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 cursor-not-allowed"
            }`}
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
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);
  
  // Validate code whenever it changes
  useEffect(() => {
    validateCode();
  }, [verificationCode]);
  
  const validateCode = () => {
    setError("");
    
    // Check if all digits are filled
    const isComplete = verificationCode.every(digit => digit !== "");
    
    if (!isComplete) {
      setIsValid(false);
      return;
    }
    
    setIsValid(true);
  };

  const handleCodeChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };
  
  const handleVerifyClick = () => {
    validateCode();
    if (isValid) {
      onVerify();
    } else {
      setError(t("verification", "incompleteCode"));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 md:p-0">
      <div className="bg-neutral-50 dark:bg-neutral-990 rounded-lg p-4 md:p-6 w-full max-w-sm md:max-w-lg">
        <h2 className="text-2xl md:text-4xl font-russo font-bold mb-2 md:mb-4 text-left pl-2 md:pl-5 text-neutral-950 dark:text-neutral-100">
          {t("verification", "title")}
        </h2>
        <p className="text-xs md:text-sm text-neutral-400 dark:text-neutral-400 mb-4 md:mb-6 text-center mt-4 md:mt-8">
          {t("verification", "description")}
        </p>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-xs md:text-sm">
            {error}
          </div>
        )}

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
          onClick={handleVerifyClick}
          disabled={!isValid}
          className={`w-full p-2 md:p-3 rounded-lg transition duration-300 font-bold text-xs md:text-base ${
            isValid 
              ? "bg-primary-600 hover:bg-primary-700 dark:bg-primary-300 dark:hover:bg-primary-400 dark:text-neutral-950 text-neutral-100" 
              : "bg-neutral-300 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 cursor-not-allowed"
          }`}
        >
          {t("verification", "verifyButton")}
        </button>
      </div>
    </div>
  )
}

const NewPasswordModal = ({ onClose, onSubmit }) => {
  const { t } = useLanguage();
  const { isDarkMode } = useDarkMode();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isValid, setIsValid] = useState(false);
  
  // Validate passwords whenever they change
  useEffect(() => {
    validatePasswords();
  }, [password, confirmPassword]);
  
  const validatePasswords = () => {
    setError("");
    
    if (!password || password.length < 8) {
      setIsValid(false);
      return;
    }
    
    if (!confirmPassword) {
      setIsValid(false);
      return;
    }
    
    if (password !== confirmPassword) {
      setIsValid(false);
      return;
    }
    
    setIsValid(true);
  };
  
  const handleSubmit = () => {
    // Reset error
    setError("");
    
    // Validate passwords
    if (password.length < 8) {
      setError(t("newPassword", "passwordTooShort"));
      return;
    }
    
    if (password !== confirmPassword) {
      setError(t("newPassword", "passwordsDoNotMatch"));
      return;
    }
    
    // If validation passes, call the onSubmit function
    onSubmit(password);
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 md:p-0">
      <div className="bg-neutral-50 dark:bg-neutral-990 rounded-lg p-4 md:p-6 w-full max-w-sm md:max-w-lg">
        <h2 className="font-russo text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-neutral-950 dark:text-neutral-100 text-left">
          {t("newPassword", "title")}
        </h2>
        <p className="text-xs md:text-sm text-neutral-300 dark:text-neutral-400 mb-4 md:mb-6 text-center mt-4 md:mt-8">
          {t("newPassword", "description")}
        </p>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-xs md:text-sm">
            {error}
          </div>
        )}
        
        <div className="mb-4">
          <label
            htmlFor="new-password"
            className="block mb-2 text-xs md:text-sm font-medium pl-4 text-neutral-950 dark:text-neutral-100"
          >
            {t("newPassword", "passwordLabel")}
          </label>
          <div className="relative">
            <input
              id="new-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 md:py-3 bg-neutral-100 dark:bg-[#212529] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-300 placeholder-neutral-400 text-neutral-950 dark:text-neutral-100"
              placeholder={t("newPassword", "passwordPlaceholder")}
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
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 pl-4">
            {t("newPassword", "passwordRequirements")}
          </p>
        </div>
        
        <div className="mb-4">
          <label
            htmlFor="confirm-password"
            className="block mb-2 text-xs md:text-sm font-medium pl-4 text-neutral-950 dark:text-neutral-100"
          >
            {t("newPassword", "confirmPasswordLabel")}
          </label>
          <div className="relative">
            <input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 md:py-3 bg-neutral-100 dark:bg-[#212529] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-300 placeholder-neutral-400 text-neutral-950 dark:text-neutral-100"
              placeholder={t("newPassword", "confirmPasswordPlaceholder")}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-4 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <Eye size="20" variant="Bold" color={isDarkMode ? "#F8F9FA" : "#5E636F"} />
              ) : (
                <EyeSlash size="20" variant="Bold" color={isDarkMode ? "#F8F9FA" : "#5E636F"} />
              )}
            </button>
          </div>
        </div>
        
        <div className="flex gap-2 mt-4">
          <button
            onClick={onClose}
            className="flex-1 border border-neutral-200 dark:border-neutral-800 text-neutral-950 dark:text-neutral-100 p-2 rounded-lg transition duration-300 font-bold hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs md:text-base"
          >
            {t("newPassword", "cancelButton")}
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className={`flex-1 p-2 md:p-3 rounded-lg transition duration-300 font-bold text-xs md:text-base ${
              isValid 
                ? "bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400 dark:text-neutral-950 text-neutral-100" 
                : "bg-neutral-300 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 cursor-not-allowed"
            }`}
          >
            {t("newPassword", "resetButton")}
          </button>
        </div>
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

export { ForgotPasswordModal, VerificationModal, NewPasswordModal, SuccessModal };