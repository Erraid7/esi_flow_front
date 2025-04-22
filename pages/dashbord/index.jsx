"use client"

import DataTable, { createTheme } from "react-data-table-component"
import { useLanguage } from "../translations/contexts/languageContext"
import { useDarkMode } from "../darkLightMode/darkModeContext"
import { useState } from "react"
import { data } from "./data"
import { FilterProvider, useFilter } from "./FilterContext"
import { getColumns } from "./columns"

// createTheme creates a new theme named solarized that overrides the build in dark theme
createTheme("darkTheme", {
  text: {
    primary: "#f8f9fa",
    secondary: "#d1d5db",
  },
  background: {
    default: "#1f2937",
  },
  context: {
    background: "#374151",
    text: "#f8f9fa",
  },
  divider: {
    default: "#4b5563",
  },
  button: {
    default: "#374151",
    hover: "#4b5563",
    focus: "#4b5563",
    disabled: "#6b7280",
  },
  sortFocus: {
    default: "#6b7280",
  },
})

createTheme("lightTheme", {
  text: {
    primary: "#1f2937",
    secondary: "#4b5563",
  },
  background: {
    default: "#ffffff",
  },
  context: {
    background: "#e5e7eb",
    text: "#1f2937",
  },
  divider: {
    default: "#e5e7eb",
  },
  button: {
    default: "#f3f4f6",
    hover: "#e5e7eb",
    focus: "#e5e7eb",
    disabled: "#d1d5db",
  },
  sortFocus: {
    default: "#d1d5db",
  },
})

const customStyles = {
  headCells: {
    style: {
      backgroundColor: "#284CFF0D",
      paddingTop: "16px",
      paddingBottom: "16px",
    },
  },
}

// Main component wrapper with FilterProvider
export default function Dashboard() {
  return (
    <FilterProvider initialData={data}>
      <DashboardContent />
    </FilterProvider>
  )
}

// Inner component that uses the filter context
function DashboardContent() {
  const { t } = useLanguage()
  const { isDarkMode } = useDarkMode()
  const { filteredData, updateFilter, clearFilters, filters } = useFilter()
  const [searchQuery, setSearchQuery] = useState("")

  // Handle global search
  const handleSearch = (e) => {
    const query = e.target.value
    setSearchQuery(query)

    // Update the globalSearch filter
    updateFilter("globalSearch", query)
  }

  // Clear search
  const clearSearch = () => {
    setSearchQuery("")
    updateFilter("globalSearch", "")
  }

  // Get columns with filter components
  const columns = getColumns()

  return (
    <div className="p-4">
      <div className="bg-neutral-50 dark:bg-neutral-990 text-neutral-950 dark:text-neutral-50 p-6 rounded-lg w-full max-w-3xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-primary-900 dark:text-primary-100">Recent Maintenance</h1>
          <h2 className="text-xl font-bold text-primary-900 dark:text-primary-100">Tasks</h2>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search in all fields..."
              className="bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded px-4 py-2 w-full pl-10"
              value={searchQuery}
              onChange={handleSearch}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-2.5 text-neutral-500 h-4 w-4"
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
                onClick={clearSearch}
                className="absolute right-3 top-2.5 text-neutral-500 hover:text-neutral-700"
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

          <div className="flex gap-2">
            <button
              onClick={clearFilters}
              className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded px-4 py-2 flex items-center gap-2 transition-colors"
            >
              Clear Filters
            </button>

            <button className="bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-neutral-50 rounded px-4 py-2 flex items-center gap-2 transition-colors">
              Add New Task
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
          </div>
        </div>
      </div>

      <div className="rounded-t-xl mt-4 ">
        <DataTable
          columns={columns}
          data={filteredData}
          customStyles={customStyles}
          highlightOnHover
          pagination
          theme={isDarkMode ? "darkTheme" : "lightTheme"}
          noDataComponent={<div className="p-4 text-center text-gray-500">No matching records found</div>}
        />
      </div>
    </div>
  )
}
