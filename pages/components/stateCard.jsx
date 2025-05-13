"use client"
import { useRouter } from "next/navigation" // Import useRouter from next/navigation for App Router
import { useLanguage } from "../translations/contexts/languageContext"
import { useDarkMode } from "../darkLightMode/darkModeContext"

const StateCards = ({ cardsData }) => {
  const { t } = useLanguage()
  const { isDarkMode } = useDarkMode()
  const router = useRouter() // Initialize the router

  // Default data if none is provided
  const defaultCardsData = [
    {
      id: "users",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      title: t("dashboard", "cards", "users", "title"),
      count: t("dashboard", "cards", "users", "count"),
      buttonText: t("dashboard", "cards", "users", "button"),
      path: "/user/list",
    },
    {
      id: "technicians",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      title: t("dashboard", "cards", "technicians", "title"),
      count: t("dashboard", "cards", "technicians", "count"),
      buttonText: t("dashboard", "cards", "technicians", "button"),
      path: "/user/list",
    },
    {
      id: "requests",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
      title: t("dashboard", "cards", "requests", "title"),
      count: t("dashboard", "cards", "requests", "count"),
      buttonText: t("dashboard", "cards", "requests", "button"),
      path: "/request/list",
    },
  ]


  const cards = cardsData || defaultCardsData
  // Handle navigation
  const handleNavigation = (path) => {
    router.push(path)
  }

  return (
    <>
      <h1 className="text-2xl font-russo mb-8 text-neutral-990 dark:text-white">{t("dashboard", "activeRequests")}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {cards.map((card) => (
          <div key={card.id} className="bg-card-bg dark:bg-card-bg-dark p-6 rounded-lg">
            <div className="mb-1 bg-card-bg dark:bg-card-bg-dark w-min p-2 rounded-full">{card.icon}</div>
            <h2 className="text-xl font-semibold text-neutral-990 dark:text-white mb-1">{card.title}</h2>
            <p className="text-sm font-inter font-normal text-neutral-500 dark:text-neutral-500-dark mb-4">
              {card.count}
            </p>
            <button
              className="bg-primary-500 rounded-lg hover:bg-blue-600 text-white px-4 py-2 text-sm font-inter font-medium transition duration-300"
              onClick={() => handleNavigation(card.path)}
            >
              {card.buttonText}
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

export default StateCards