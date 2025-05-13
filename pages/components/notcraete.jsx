"use client"
import { useLanguage } from "../translations/contexts/languageContext"
import { useDarkMode } from '../darkLightMode/darkModeContext'
import { useRouter } from 'next/navigation'

const NotificationAndCreateUserCards = () => {
  const { t } = useLanguage()
  const { isDarkMode } = useDarkMode()
  const router = useRouter()

  // Navigation handlers
  const goToNotifications = () => {
    router.push('/notif')
  }

  const goToCreateUser = () => {
    router.push('/user/add')
  }

  return (
    <div className="grid grid-rows-2 gap-6">
      {/* My notification card */}
      <div className="bg-card-bg dark:bg-card-bg-dark p-6 rounded-lg shadow-sm">
        {/* Icon and Title in a vertical stack */}
        <div className="flex flex-col mb-20">
          <div className="text-blue-500 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-russo mb-4 dark:text-white">{t("dashboard", "notifications", "title")}</h3>
        </div>

        {/* Button in the bottom right */}
        <div className="flex justify-end">
          <button 
            onClick={goToNotifications}
            className="bg-primary-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg text-sm font-medium transition duration-300"
          >
            {t("dashboard", "notifications", "button")}
          </button>
        </div>
      </div>

      {/* Create new user card */}
      <div className="bg-card-bg dark:bg-card-bg-dark p-6 rounded-lg shadow-sm">
        {/* Icon and Title in a vertical stack */}
        <div className="flex flex-col mb-4">
          <div className="text-blue-500 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="text-2xl font-russo mb-1 dark:text-white">{t("dashboard", "createUser", "title")}</h3>
        </div>

        {/* Subtitle text */}
        <div className="text-gray-400 dark:text-gray-500 mb-8">{t("dashboard", "createUser", "description")}</div>

        {/* Button in the bottom right */}
        <div className="flex justify-end">
          <button 
            onClick={goToCreateUser}
            className="bg-primary-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg text-sm font-medium transition duration-300 flex items-center"
          >
            {t("dashboard", "createUser", "button")}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotificationAndCreateUserCards