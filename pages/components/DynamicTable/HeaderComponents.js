"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowDown2, ArrowUp2, DocumentDownload } from "iconsax-react"
import { useFilter } from "./FilterContext"
import { createPortal } from "react-dom"
import { useLanguage } from "../../translations/contexts/languageContext"
import { useDarkMode } from "../../darkLightMode/darkModeContext"
import { exportCSV, exportPDF } from "./exportUtils"

export const ColumnHeader = ({ title, field }) => {
  const [isInputVisible, setIsInputVisible] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const { filters, updateFilter } = useFilter()

  // Update input value when filter changes
  useEffect(() => {
    setInputValue(filters[field] || "")
  }, [filters, field])

  const handleInputChange = (e) => {
    const value = e.target.value
    setInputValue(value)
    updateFilter(field, value)
  }

  return (
    <div className="w-full">
      <div className="flex justify-between w-full items-center">
        <span className="font-medium">{title}</span>
        <div className="cursor-pointer">
          {isInputVisible ? (
            <ArrowUp2 size={16} color="#697689" onClick={() => setIsInputVisible(false)} />
          ) : (
            <ArrowDown2 size={16} color="#697689" onClick={() => setIsInputVisible(true)} />
          )}
        </div>
      </div>
      <div>
        {isInputVisible && (
          <input
            type="text"
            className="w-full border border-neutral-200 dark:border-neutral-700 px-2 py-1 rounded mt-1 text-sm
          bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none"
            placeholder={`Filter ${title}...`}
            value={inputValue}
            onChange={handleInputChange}
          />
        )}
      </div>
    </div>
  )
}

export const DropdownHeader = ({ title, options, field }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const { filters, updateFilter } = useFilter()
  const headerRef = useRef(null)
  const buttonRef = useRef(null)
  const dropdownRef = useRef(null)
  const { t } = useLanguage()

  const handleOptionSelect = (option) => {
    updateFilter(field, option)
    setIsDropdownVisible(false)
  }

  const clearSelection = () => {
    updateFilter(field, "")
    setIsDropdownVisible(false)
  }

  // Calculate position when dropdown visibility changes or on scroll/resize
  useEffect(() => {
    if (!isDropdownVisible) return

    const updatePosition = () => {
      if (buttonRef.current && dropdownRef.current) {
        const rect = buttonRef.current.getBoundingClientRect()
        const headerRect = headerRef.current.getBoundingClientRect()

        // Set the dropdown position directly under the arrow button
        dropdownRef.current.style.top = `${rect.bottom}px`
        dropdownRef.current.style.left = `${rect.left - 100 + rect.width}px`
        dropdownRef.current.style.width = `${Math.max(150, headerRect.width)}px`
      }
    }

    updatePosition()

    // Update position on scroll or resize
    window.addEventListener("scroll", updatePosition, true)
    window.addEventListener("resize", updatePosition)

    return () => {
      window.removeEventListener("scroll", updatePosition, true)
      window.removeEventListener("resize", updatePosition)
    }
  }, [isDropdownVisible])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isDropdownVisible &&
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsDropdownVisible(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isDropdownVisible])

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible)
  }

  return (
    <div className="w-full" ref={headerRef}>
      <div className="flex justify-between w-full items-center">
        <span className="font-medium">{title}</span>
        <div className="cursor-pointer" ref={buttonRef} onClick={toggleDropdown}>
          {isDropdownVisible ? <ArrowUp2 size={16} color="#697689" /> : <ArrowDown2 size={16} color="#697689" />}
        </div>
      </div>

      {isDropdownVisible &&
        createPortal(
          <div
            ref={dropdownRef}
            className="fixed border border-neutral-200 dark:border-neutral-700 
                   rounded shadow-lg bg-white dark:bg-neutral-800 z-[9999] 
                   overflow-y-auto"
            style={{
              minWidth: "150px",
              maxHeight: "200px",
            }}
          >
            <div
              className="px-2 py-1 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700 
                     text-neutral-500 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-700 text-sm"
              onClick={clearSelection}
            >
              {t("userList", "tablehead", "clearfilter")}
            </div>
            {options.map((option, index) => (
              <div
                key={index}
                className={`px-2 py-1 cursor-pointer text-sm text-neutral-900 dark:text-white
                       hover:bg-neutral-100 dark:hover:bg-neutral-700
                       ${
                         filters[field] === option
                           ? "bg-primary-50 dark:bg-primary-950 text-primary-800 dark:text-primary-300"
                           : ""
                       }`}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>,
          document.body,
        )}
    </div>
  )
}

export const SearchHeader = ({
  title,
  searchQuery,
  onSearchChange,
  onClearSearch,
  onClearFilters,
  onAddNew,
  onExportCSV, // Custom export function
  data, // Current data to export
  columnConfig, // Column configuration for export
  addButtonText = "Add User",
  showExport = true,
  showClearFilters = true,
  showAddButton = true,
}) => {
  const { t } = useLanguage()
  const { isDarkMode } = useDarkMode()
  const [exportMenuOpen, setExportMenuOpen] = useState(false)
  const exportMenuRef = useRef(null)
  const exportButtonRef = useRef(null)

  // Handle CSV export
  const handleExportCSV = () => {
    if (onExportCSV) {
      onExportCSV()
    } else if (data) {
      // Default export if no custom handler provided
      const filename = `${title.toLowerCase().replace(/\s+/g, "-")}-${new Date().toISOString().split("T")[0]}.csv`
      exportCSV(data, columnConfig || {}, filename)
    }
    setExportMenuOpen(false)
  }

  // Handle PDF export
  const handleExportPDF = () => {
    if (data) {
      const filename = `${title.toLowerCase().replace(/\s+/g, "-")}-${new Date().toISOString().split("T")[0]}.pdf`
      exportPDF(data, columnConfig || {}, title, filename)
    }
    setExportMenuOpen(false)
  }

  // Close export menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        exportMenuOpen &&
        exportMenuRef.current &&
        exportButtonRef.current &&
        !exportMenuRef.current.contains(event.target) &&
        !exportButtonRef.current.contains(event.target)
      ) {
        setExportMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [exportMenuOpen])

  return (
    <div className="flex flex-col md:flex-row items-start justify-between md:items-center w-full gap-4 px-2">
      <h2 className="text-xl font-russo text-neutral-950 dark:text-white">{title}</h2>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
        <div className="relative w-full sm:w-64 border-solid border border-neutral-200 dark:border-neutral-700 rounded-lg">
          <input
            type="text"
            placeholder={t("userList", "searchbar", "placeholder")}
            className="bg-white dark:bg-neutral-990 text-neutral-950 dark:text-white rounded-md px-4 py-2 pl-10 w-full"
            value={searchQuery}
            onChange={(e) => onSearchChange(e)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-2.5 text-neutral-400 dark:text-neutral-500 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {searchQuery && (
            <button
              onClick={onClearSearch}
              className="absolute right-3 top-2.5 text-neutral-700 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          {showExport && (
            <div className="relative">
              <button
                ref={exportButtonRef}
                onClick={() => setExportMenuOpen(!exportMenuOpen)}
                className="bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-md p-2 text-sm flex items-center gap-1"
                title={t("userList", "searchbar", "buttons", 0) || "Export"}
              >
                {isDarkMode ? (
                  <DocumentDownload size="20" color="#d9e3f0" />
                ) : (
                  <DocumentDownload size="20" color="#555555" />
                )}
              </button>

              {exportMenuOpen &&
                createPortal(
                  <div
                    ref={exportMenuRef}
                    className="fixed border border-neutral-200 dark:border-neutral-700 
                           rounded shadow-lg bg-white dark:bg-neutral-800 z-[9999]"
                    style={{
                      top: exportButtonRef.current
                        ? `${exportButtonRef.current.getBoundingClientRect().bottom + 5}px`
                        : "0px",
                      left: exportButtonRef.current
                        ? `${exportButtonRef.current.getBoundingClientRect().left}px`
                        : "0px",
                      width: "150px",
                    }}
                  >
                    <div
                      className="px-3 py-2 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700 
                             text-neutral-900 dark:text-white text-sm flex items-center gap-2"
                      onClick={handleExportCSV}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                          stroke="#4CAF50"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14 2V8H20"
                          stroke="#4CAF50"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 16H16"
                          stroke="#4CAF50"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 12H16"
                          stroke="#4CAF50"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      CSV
                    </div>
                    <div
                      className="px-3 py-2 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700 
                             text-neutral-900 dark:text-white text-sm flex items-center gap-2"
                      onClick={handleExportPDF}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                          stroke="#F44336"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14 2V8H20"
                          stroke="#F44336"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 16H16"
                          stroke="#F44336"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 12H16"
                          stroke="#F44336"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      PDF
                    </div>
                  </div>,
                  document.body,
                )}
            </div>
          )}

          {showClearFilters && (
            <button
              onClick={onClearFilters}
              className="bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-md px-3 py-2 text-sm"
            >
              {t("userList", "searchbar", "buttons", 2)}
            </button>
          )}

          {showAddButton && (
            <button
              onClick={onAddNew}
              className="bg-primary-600 hover:bg-primary-700 text-white rounded-md px-3 py-2 text-sm flex items-center gap-2"
            >
              <span className="sm:block">{addButtonText}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
