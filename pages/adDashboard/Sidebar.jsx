"use client"
import { Home, Mail, Shield, User, BarChart2, Bell, Settings, LogOut, X } from "lucide-react"
import { useLanguage } from "../translations/contexts/languageContext"
import { useDarkMode } from '../darkLightMode/darkModeContext';
import {Sun1, Moon, LanguageCircle, HambergerMenu, CloseCircle} from 'iconsax-react';
import DarkModeToggle from "./dark_mode_toggle";


const Sidebar = ({ activeItem = "Dashboard", isMobileMenuOpen, toggleMobileMenu }) => {
  const { t, toggleLanguage } = useLanguage()
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  const navItems = [
    { name: t("dashboard", "sidebar", "dashboard"), icon: <Home size={18} /> },
    { name: t("dashboard", "sidebar", "requests"), icon: <Mail size={18} /> },
    { name: t("dashboard", "sidebar", "equipment"), icon: <Shield size={18} /> },
    { name: t("dashboard", "sidebar", "users"), icon: <User size={18} /> },
    { name: t("dashboard", "sidebar", "reports"), icon: <BarChart2 size={18} /> },
    { name: t("dashboard", "sidebar", "notifications"), icon: <Bell size={18} /> },
    { name: t("dashboard", "sidebar", "settings"), icon: <Settings size={18} /> },
  ]

  // Determine if this is mobile view based on whether toggle function is provided
  const isMobile = !!toggleMobileMenu


  const handleLinkClick = (linkName) => {
    scrollToSection(linkName);
    setActiveLink(linkName);
    setIsMobileMenuOpen(false);
  };

  // const toggleMobileMenu = () => {
  //   setIsMobileMenuOpen(!isMobileMenuOpen);
  // };



  return (
    <div className="flex flex-col h-full bg-neutral-50 dark:bg-neutral-50-dark border-r border-gray-200 dark:bg-neutral-950 dark:border-neutral-950">
      {/* Logo area - Show close button on mobile */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <img src="login/logo13.svg" alt="ESI FLOW" className="h-14" />
        <div className="flex items-center gap-2">
          <DarkModeToggle />
          {isMobile && (
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-200"
              aria-label="Close menu"
            >
              <X size={20} className="text-gray-500 dark:text-gray-400" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-3 flex-1 overflow-y-auto">
        {navItems.map((item) => (
          <div
            key={item.name}
            className={`px-4 py-3 mb-1 rounded-md flex items-center transition-colors duration-150 cursor-pointer ${
              activeItem === item.name
                ? "text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400 font-medium"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
            onClick={() => {
              // On mobile, you might want to close the menu when an item is clicked
              if (isMobile && toggleMobileMenu) {
                toggleMobileMenu()
              }
              // You can add navigation logic here
            }}
          >
            <span className="mr-3">{item.icon}</span>
            <span>{item.name}</span>
          </div>
        ))}
         {/* Desktop Icons and Login */}
                    <div className="flex items-center gap-6">
                      {/* Dark Mode Toggle Button */}
                      <button 
                        onClick={toggleDarkMode}
                        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Toggle dark mode"
                      > 
                        {isDarkMode ? (
                          <Sun1 size="18" color="white" variant="Bold"/>
                        ) : (
                          <Moon size="18" color="black" variant="Bold"/>
                        )}
                      </button>
                      
                      {/* Language selector icon */}
                      <button 
                        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" 
                        onClick={toggleLanguage}
                      >
                        {isDarkMode ? (
                          <LanguageCircle size="18" color="white" variant="Bold"/>
                        ) : (
                          <LanguageCircle size="18" color="black" variant="Bold"/>
                        )}
                      </button>
                    </div>
      </nav>

      {/* User profile area */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
            <span>AD</span>
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium dark:text-white">DOULAMI Amira</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Personal</div>
          </div>
          <button className="ml-auto p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
