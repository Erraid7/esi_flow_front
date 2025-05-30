"use client"

import {
  Home,
  Mail,
  Shield,
  User,
  BarChart2,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  CheckCheckIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useLanguage } from "../translations/contexts/languageContext"
import { useDarkMode } from "../darkLightMode/darkModeContext"
import { Sun1, Moon, LanguageCircle } from "iconsax-react"
import { useState, useEffect, useCallback } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { useRouter } from "next/router"

// Tooltip component for collapsed sidebar
const Tooltip = ({ children, text }) => (
  <div className="group relative flex">
    {children}
    <div className="absolute left-12 scale-0 rounded bg-gray-50 dark:bg-gray-800 p-2 text-xs text-gray-800 dark:text-white group-hover:scale-100 transition-all duration-100 z-50 whitespace-nowrap">
      {text}
    </div>
  </div>
)

const Sidebar = ({ activeItem = "dashboard" }) => {
  const { t, toggleLanguage } = useLanguage()
  const router = useRouter()
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [user, setUser] = useState({
    name: "Guest User",
    initials: "GU",
    role: "user",
    profilePicture: null,
  })

  // Add state for notifications
  const [notifications, setNotifications] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  // Function to create API client
  const createApiClient = useCallback(() => {
    return axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || "https://esi-flow-back.onrender.com",
    })
  }, [])

  // Function to get current user
  const getCurrentUser = useCallback(() => {
    try {
      const userString = localStorage.getItem("user")
      if (userString) {
        return JSON.parse(userString)
      }
      return { id: null }
    } catch (error) {
      console.error("Error getting current user:", error)
      return { id: null }
    }
  }, [])

  // Toast notification function (simplified for this example)
  const showToast = useCallback((message, type) => {
    console.log(`${type}: ${message}`)
    // In a real implementation, you would show a toast notification
  }, [])

  // Fetch notifications function
  const fetchNotifications = useCallback(
    async (refresh = false, page = 1) => {
      if (refresh) {
        setIsRefreshing(true)
        setCurrentPage(1)
        page = 1
      } else if (page === 1) {
        setIsLoading(true)
      }

      try {
        const apiClient = createApiClient()
        const user = getCurrentUser()

        if (!user.id) {
          throw new Error("User not authenticated")
        }

        // Get notifications from API
        const response = await apiClient.get("/notifications")
        const notificationsData = response.data

        // Filter notifications for current user
        const userNotifications = notificationsData.filter((notification) => notification.recipient_id === user.id)

        // Process notifications for display
        const processedNotifications = userNotifications.map((notification) => {
          // Determine group based on created_at date
          const createdAt = new Date(notification.created_at)
          const now = new Date()
          const yesterday = new Date(now)
          yesterday.setDate(yesterday.getDate() - 1)
          const weekAgo = new Date(now)
          weekAgo.setDate(weekAgo.getDate() - 7)

          let group = "older"
          if (createdAt.toDateString() === now.toDateString()) {
            group = "today"
          } else if (createdAt.toDateString() === yesterday.toDateString()) {
            group = "yesterday"
          } else if (createdAt > weekAgo) {
            group = "thisWeek"
          }

          let entity_type
          let title

          // Determine entity_type based on notification data
          if (notification.request_id == null && notification.intervention_id == null) {
            entity_type = "System"
            title = "Welcome & Workflow"
          }
          if (notification.request_id && notification.intervention_id == null) {
            entity_type = "request"
            title = "Request is here"
          } else if (notification.intervention_id) {
            entity_type = "intervention"
            title = "New task for you"
          }

          return {
            ...notification,
            seen: notification.seen || false,
            group,
            entity_type,
            title: title || "Notification",
          }
        })

        if (page === 1 || refresh) {
          setNotifications(processedNotifications)
        } else {
          setNotifications((prev) => [...prev, ...processedNotifications])
        }

        // Check if there are more notifications to load
        setHasMore(processedNotifications.length > 0)

        if (refresh) {
          showToast(t("notifications", "toast", "refreshSuccess"), "success")
        }
      } catch (error) {
        console.error("Error fetching notifications:", error)
        showToast(t("notifications", "toast", "fetchError"), "error")

        // If API fails, use mock data for demo purposes
        if (page === 1) {
          const mockNotifications = generateMockNotifications()
          setNotifications(mockNotifications)
          setHasMore(false)
        }
      } finally {
        setIsLoading(false)
        setIsRefreshing(false)
      }
    },
    [t, createApiClient, getCurrentUser, showToast],
  )

  // Mock notifications generator function
  const generateMockNotifications = () => {
    return [
      {
        id: 1,
        title: "Welcome to ESI Flow",
        seen: false,
        group: "today",
        entity_type: "System",
      },
      {
        id: 2,
        title: "New request assigned",
        seen: false,
        group: "today",
        entity_type: "request",
      },
      {
        id: 3,
        title: "Task completed",
        seen: true,
        group: "yesterday",
        entity_type: "intervention",
      },
    ]
  }

  // Fetch notifications on component mount
  useEffect(() => {
    fetchNotifications()
  }, [fetchNotifications])

  // Helper function to get initials from name (fallback if no profile picture)
  const getInitials = (fullName) => {
    if (!fullName) return "GU"

    const nameParts = fullName.split(" ")
    if (nameParts.length >= 2) {
      return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`.toUpperCase()
    }

    return fullName.substring(0, 2).toUpperCase()
  }

  // Add this useEffect to get user data from token
  useEffect(() => {
    const getUserFromToken = () => {
      try {
        // Get token from localStorage
        const tokenString = localStorage.getItem("user")

        if (tokenString) {
          // Parse the JSON string to get the user object
          const userObject = JSON.parse(localStorage.getItem("user"))

          // Extract user info directly from the parsed object
          const fullName = userObject.full_name
          const role = userObject.role || "user"
          const profilePicture = userObject.pictures || null

          // Update user state
          setUser({
            name: fullName,
            initials: getInitials(fullName),
            role: role,
            profilePicture: profilePicture,
          })

          // Fetch notifications for the user
          fetchNotifications()
        }
      } catch (error) {
        console.error("Error getting user from token:", error)
        // Keep default values if there's an error
      }
    }

    getUserFromToken()
  }, [fetchNotifications])

  const handleLogout = async () => {
    try {
      const token = Cookies.get("jwt")

      if (token) {
        // Call the logout endpoint
        console.log("deleting the token...");
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || "https://esi-flow-back.onrender.com"}/auth/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        // Clear the token and local user data
        Cookies.remove("jwt")
        localStorage.clear();

        // Redirect to landing page
        window.location.href = "/"
      } else {
        // No token? Just redirect.
        localStorage.clear();
        window.location.href = "/"
      }
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  // Get navigation items based on user role with dynamic notification counts
  const getNavItems = useCallback(() => {
    // Count unseen notifications
    const unseenNotifications = notifications.filter((notification) => !notification.seen)

    // Count notifications by type
    const requestNotifications = unseenNotifications.filter(
      (notification) => notification.entity_type === "request",
    ).length

    const interventionNotifications = unseenNotifications.filter(
      (notification) => notification.entity_type === "intervention",
    ).length

    const systemNotifications = unseenNotifications.filter(
      (notification) => notification.entity_type === "System",
    ).length

    // Total notification count
    const totalNotifications = unseenNotifications.length

    const items = {
      Admin: [
        { key: "dashboard", link: "dashboard/admin", icon: <Home size={18} />, notificationCount: 0 },
        { key: "requests", link: "request/list", icon: <Mail size={18} />, notificationCount: requestNotifications },
        { key: "equipment", link: "equipment/list", icon: <Shield size={18} />, notificationCount: 0 },
        {
          key: "tasks",
          link: "task/list",
          icon: <CheckCheckIcon size={18} />,
          notificationCount: interventionNotifications,
        },
        { key: "users", link: "user/list", icon: <User size={18} />, notificationCount: 0 },
        { key: "reports", link: "report", icon: <BarChart2 size={18} />, notificationCount: 0 },
        { key: "notifications", link: "notif", icon: <Bell size={18} />, notificationCount: totalNotifications },
        { key: "settings", link: "settings", icon: <Settings size={18} />, notificationCount: 0 },
      ],
      Technician: [
        { key: "dashboard", link: "dashboard/technician", icon: <Home size={18} />, notificationCount: 0 },
        { key: "equipment", link: "equipment/list", icon: <Shield size={18} />, notificationCount: 0 },
        {
          key: "tasks",
          link: "task/list",
          icon: <CheckCheckIcon size={18} />,
          notificationCount: interventionNotifications,
        },
        { key: "requests", link: "request/list", icon: <Mail size={18} />, notificationCount: requestNotifications },
        { key: "notifications", link: "notif", icon: <Bell size={18} />, notificationCount: totalNotifications },
        { key: "settings", link: "settings", icon: <Settings size={18} />, notificationCount: 0 },
      ],
      Personal: [
        { key: "dashboard", link: "dashboard/personal", icon: <Home size={18} />, notificationCount: 0 },
        { key: "requests", link: "request/list", icon: <Mail size={18} />, notificationCount: requestNotifications },
        { key: "notifications", link: "notif", icon: <Bell size={18} />, notificationCount: totalNotifications },
        { key: "settings", link: "settings", icon: <Settings size={18} />, notificationCount: 0 },
      ],
    }

    return items[user.role] || items.Personal
  }, [notifications, user.role])

  const navItems = getNavItems()

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }

      // Check localStorage for collapsed state
      const isCollapsed = localStorage.getItem("sidebarCollapsed")
      // check if the sidebarCollapsed is null
      if (isCollapsed === null) {
        // Set default collapsed state based on screen size
        setIsCollapsed(window.innerWidth < 1280 && window.innerWidth >= 768)
      } else {
        // Set collapsed state based on localStorage value
        setIsCollapsed(JSON.parse(isCollapsed))
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize)
      // Initial call to set the correct state based on current screen size
      handleResize()
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
    // save collapsed state to localStorage
    localStorage.setItem("sidebarCollapsed", !isCollapsed)
  }

  const handleNavItemClick = (itemKey) => {
    console.log("Clicked item:", itemKey)

    // redirect to the clicked item link
    router.push(`/${itemKey}`)

    // Close mobile menu if we're on mobile and menu is open
    if (windowWidth < 768) {
      setIsMobileMenuOpen(false)
    }
  }

  // When sidebar is open on mobile, add overlay and prevent scrolling
  useEffect(() => {
    if (isMobileMenuOpen && window.innerWidth < 1024) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isMobileMenuOpen])

  // Calculate sidebar width based on collapsed state
  const sidebarWidth = isCollapsed ? "w-16" : "w-64"

  return (
    <>
      {/* Mobile Header - always visible on mobile */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card-bg backdrop-blur-sm shadow-md z-40 flex items-center justify-between px-4">
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md text-neutral-990 dark:text-neutral-50"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="flex gap-2">
          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun1 size="18" color="white" variant="Bold" />
            ) : (
              <Moon size="18" color="black" variant="Bold" />
            )}
          </button>

          {/* Language selector icon */}
          <button
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            onClick={toggleLanguage}
            aria-label="Toggle language"
          >
            {isDarkMode ? (
              <LanguageCircle size="18" color="white" variant="Bold" />
            ) : (
              <LanguageCircle size="18" color="black" variant="Bold" />
            )}
          </button>
        </div>

        <div className="flex justify-center">
          <img src="/logo-v.svg" alt="Logo" className="dark:hidden h-10 w-16" />
          <img src="/logo-v-dark.svg" alt="Logo Dark" className="hidden dark:block h-10 w-16" />
        </div>
      </header>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-[#0000007b] z-40 transition-all duration-300 ease-in-out"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-neutral-50 dark:bg-neutral-990 shadow-lg transition-all duration-300 ease-in-out ${sidebarWidth} z-50 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="bg-card-bg h-screen flex flex-col justify-start ">
          <div
            className={`flex items-center justify-between ${isCollapsed ? "flex-col px-0" : "flex-row px-4"} transition-all duration-300`}
          >
            {/* Logo area - only visible on desktop */}
            <div className={`mt-3 p-3 flex justify-center items-center`}>
              {isCollapsed ? (
                <img src="/logo-icon.svg" alt="Logo Icon" className="dark:hidden h-8 w-8" />
              ) : (
                <img src="/logo-v.svg" alt="Logo" className="dark:hidden h-12 w-20" />
              )}

              {isCollapsed ? (
                <img src="/logo-icon-dark.svg" alt="Logo Icon Dark" className="hidden dark:block h-8 w-8" />
              ) : (
                <img src="/logo-v-dark.svg" alt="Logo Dark" className="hidden dark:block h-12 w-20" />
              )}
            </div>

            {/* Toggle collapse button */}
            <div className={`flex items-center ${isCollapsed ? "mt-2 justify-center" : "mt-3 justify-end"}`}>
              <button
                onClick={toggleCollapse}
                className=" bg-blue-500 text-white rounded-full p-1 shadow-md flex w-8 h-8 items-center justify-center "
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-4 px-3 flex-1 overflow-y-visible">
            {navItems.map((item) => {
              const NavItem = (
                <div
                  key={item.key}
                  className={`${isCollapsed ? "px-3" : "px-4"} py-3 mb-1 rounded-md flex items-center transition-colors duration-150 cursor-pointer text-sm relative ${
                    activeItem === item.key
                      ? "text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400 font-medium"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => {
                    handleNavItemClick(item.link)
                  }}
                >
                  <span className={`${isCollapsed ? "mr-0" : "mr-3"}`}>{item.icon}</span>
                  {!isCollapsed && <span>{t("sideNav", "items", item.key)}</span>}

                  {/* Notification badge */}
                  {item.notificationCount > 0 && (
                    <span
                      className={`absolute ${isCollapsed ? "top-1 right-1" : "top-2 right-2"} bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center`}
                    >
                      {item.notificationCount}
                    </span>
                  )}
                </div>
              )

              // Add tooltip wrapper when sidebar is collapsed
              return isCollapsed ? (
                <Tooltip key={item.key} text={t("sideNav", "items", item.key)}>
                  {NavItem}
                </Tooltip>
              ) : (
                NavItem
              )
            })}
          </div>

          {/* Language and dark mode toggles - only visible on desktop */}
          <div className={`hidden lg:block px-4 py-3 ${isCollapsed ? "flex justify-center" : ""}`}>
            <div className={`flex items-center ${isCollapsed ? "flex-col gap-2" : "justify-center gap-4"}`}>
              {/* Dark Mode Toggle Button */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <Sun1 size="18" color="white" variant="Bold" />
                ) : (
                  <Moon size="18" color="black" variant="Bold" />
                )}
              </button>

              {/* Language selector icon */}
              <button
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                onClick={toggleLanguage}
                aria-label="Toggle language"
              >
                {isDarkMode ? (
                  <LanguageCircle size="18" color="white" variant="Bold" />
                ) : (
                  <LanguageCircle size="18" color="black" variant="Bold" />
                )}
              </button>
            </div>
          </div>

          {/* User profile area */}
          <div className={`p-4 ${isCollapsed ? "flex justify-center" : ""}`}>
            <div className={`flex items-center ${isCollapsed ? "flex-col" : ""}`}>
              {/* User profile picture or initials */}
              {user.profilePicture ? (
                <div className="flex items-center justify-center rounded-full h-9 w-9 overflow-hidden">
                  <img
                    src={user.profilePicture || "/placeholder.svg"}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center bg-[#2EA95C] outline outline-[5px] outline-[#2EA95C25] rounded-full h-9 w-9 text-white font-bold text-sm">
                  <span>{user.initials}</span>
                </div>
              )}

              {!isCollapsed && (
                <>
                  <div className="ml-3">
                    <div className="text-xs font-medium dark:text-white">{user.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="ml-auto text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
                    aria-label="Logout"
                  >
                    <LogOut size={16} />
                  </button>
                </>
              )}

              {/* Show logout button below profile pic when collapsed */}
              {isCollapsed && (
                <button
                  onClick={handleLogout}
                  className="mt-2 p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
                  aria-label="Logout"
                >
                  <LogOut size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content spacing div to push content right when sidebar is present */}
      <div className={`hidden lg:block ${isCollapsed ? "w-16" : "w-64"} transition-all duration-300`} />

      {/* Mobile padding to account for the fixed header */}
      <div className="lg:hidden h-16" />
    </>
  )
}

export default Sidebar
