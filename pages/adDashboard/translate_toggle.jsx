"use client"
import { useLanguage } from "../translations/contexts/languageContext"

const LanguageToggle = () => {
  const { t, toggleLanguage } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
    >
      {t("common", "toggleLanguage")}
    </button>
  )
}

export default LanguageToggle
