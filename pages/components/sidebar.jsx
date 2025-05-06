"use client"
import { Home, Mail, Shield, User, BarChart2, Bell, Settings, LogOut, Menu, X, CheckCheckIcon } from "lucide-react"
import { useLanguage } from "../translations/contexts/languageContext"
import { useDarkMode } from "../darkLightMode/darkModeContext"
import { Sun1, Moon, LanguageCircle } from "iconsax-react"
import { useState, useEffect } from "react"
import axios from "axios"

// Define navigation items for each role
const roleNavItems = {
  admin: [
    { key: "dashboard", link: "dashboard/admin", icon: <Home size={18} /> },
    { key: "requests", link: "request/list", icon: <Mail size={18} /> },
    { key: "equipment", link: "equipment/list", icon: <Shield size={18} /> },
    { key: "tasks", link: "task/list", icon: <CheckCheckIcon size={18} /> },
    { key: "users", link: "user/list", icon: <User size={18} /> },
    { key: "reports", link: "report/admin", icon: <BarChart2 size={18} /> },
    { key: "notifications", link: "notif", icon: <Bell size={18} /> },
    { key: "settings", link: "settings", icon: <Settings size={18} /> },
  ],
  technician: [
    { key: "dashboard", link: "dashboard/technician", icon: <Home size={18} /> },
    { key: "equipment", link: "equipment/list", icon: <Shield size={18} /> },
    { key: "tasks", link: "task/list", icon: <CheckCheckIcon size={18} /> },
    { key: "notifications", link: "notif", icon: <Bell size={18} /> },
    { key: "settings", link: "settings", icon: <Settings size={18} /> },
  ],
  user: [
    { key: "dashboard", link: "dashboard/personal", icon: <Home size={18} /> },
    { key: "requests", link: "request/list", icon: <Mail size={18} /> },
    { key: "notifications", link: "notif", icon: <Bell size={18} /> },
    { key: "settings", link: "settings", icon: <Settings size={18} /> },
  ],
}

const Sidebar = ({
  activeItem = "dashboard",
  userRole = "user", // Default role is user
  userName = "Guest User",
  userInitials = "GU",
}) => {
  const { t, toggleLanguage } = useLanguage()
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0)

  // Add this near the top of the component with other state declarations
  const [user, setUser] = useState({
    name: userName || "Guest User",
    initials: userInitials || "GU",
    role: userRole || "user",
  })

  // Helper function to get initials from name
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

          //i want to turn the sting of user to object
          // Parse the JSON string to get the user object
          const userObject = JSON.parse(localStorage.getItem("user"));




          // Extract user info directly from the parsed object
          const fullName = userObject.full_name
          const role = userObject.role || "user"

          // Update user state
          setUser({
            name: fullName,
            initials: getInitials(fullName),
            role: role,
          })
        }
      } catch (error) {
        console.error("Error getting user from token:", error)
        // Keep default values if there's an error
      }
    }

    getUserFromToken()
  }, [])

  const handleLogout = async () => {
    try {
     const token = getTokenFromCookies('jwt');

      if (token) {
        // Call the logout endpoint
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/auth/logout`,
          {}, // Empty body
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        // Clear the token from localStorage
        localStorage.removeItem("user")

        // Redirect to landing page
        window.location.href = "/"
      } else {
        // If no token, just redirect to landing page
        window.location.href = "/"
      }
    } catch (error) {
      console.error("Error during logout:", error)
      // Even if there's an error, redirect to landing page
      window.location.href = "/"
    }
  }

  // Get navigation items based on user role
  const navItems = roleNavItems[user.role] || roleNavItems.user

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleNavItemClick = (itemKey) => {
    console.log("Clicked item:", itemKey)

    // Special handling for dashboard to route based on user role
    if (itemKey.startsWith("dashboard/")) {
      window.location.href = `/${itemKey}`
    } else {
      window.location.href = `/${itemKey}`
    }

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
        className={`fixed top-0 left-0 h-screen bg-neutral-50 dark:bg-neutral-990 shadow-lg transition-all duration-300 ease-in-out w-64 z-50 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="bg-card-bg h-screen flex flex-col justify-start">
          {/* Logo area - only visible on desktop */}
          <div className="mt-3 p-3 flex justify-center items-center">
            <img src="/logo-v.svg" alt="Logo" className="dark:hidden h-12 w-20" />
            <img src="/logo-v-dark.svg" alt="Logo Dark" className="hidden dark:block h-12 w-20" />
          </div>

          {/* Navigation */}
          <div className="mt-3 px-3 flex-1 overflow-y-auto">
            {navItems.map((item) => (
              <div
                key={item.key}
                className={`px-4 py-3 mb-1 rounded-md flex items-center transition-colors duration-150 cursor-pointer text-sm ${
                  activeItem === item.key
                    ? "text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400 font-medium"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                onClick={() => {
                  handleNavItemClick(item.link)
                  console.log("Navigating to", item.link)
                }}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{t("sideNav", "items", item.key)}</span>
              </div>
            ))}
          </div>

          {/* Language and dark mode toggles - only visible on desktop */}
          <div className="hidden lg:block px-4 py-3">
            <div className="flex items-center justify-center gap-4">
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
          <div className="p-4">
            <div className="flex items-center">
              <div className="flex items-center justify-center bg-[#2EA95C] outline outline-[5px] outline-[#2EA95C25] rounded-full h-9 w-9 text-white font-bold text-sm">
                <span>{user.initials}</span>
              </div>
              <div className="ml-3">
                <div className="text-xs font-medium dark:text-white">{user.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="ml-auto p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
                aria-label="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content spacing div to push content right when sidebar is present */}
      <div className="hidden lg:block w-64" />

      {/* Mobile padding to account for the fixed header */}
      <div className="lg:hidden h-16" />
    </>
  )
}

export default Sidebar
