"use client"

import DataTable, { createTheme } from "react-data-table-component"
import { useLanguage } from "../translations/contexts/languageContext"
import { useDarkMode } from "../darkLightMode/darkModeContext"
import { useState, useEffect } from "react"
import { data } from "./data"
import { FilterProvider, useFilter } from "./FilterContext"
import { getColumns } from "./columns"
import SearchHeader from "./SearchHeader"

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
      backgroundColor: "#f1f5f9",
      paddingTop: "12px",
      paddingBottom: "12px",
      fontWeight: "600",
    },
  },
  rows: {
    style: {
      minHeight: "50px",
    },
    stripedStyle: {
      backgroundColor: "#f8fafc",
    },
  },
  noData: {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#6b7280",
      backgroundColor: "#ffffff",
      height: "200px",
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
  const [tableData, setTableData] = useState(filteredData)
  const [showEmptyMessage, setShowEmptyMessage] = useState(false)

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

  // Handle add new user
  const handleAddUser = () => {
    // This would typically open a modal or navigate to a form
    console.log("Add new user clicked")
  }

  // Get columns with filter components
  const columns = getColumns()

  // Update tableData when filteredData changes
  useEffect(() => {
    // If there's no data, we'll show an empty array but with a special flag
    if (filteredData.length === 0) {
      setTableData([{ id: "empty-row", _isEmpty: true }])
      setShowEmptyMessage(true)
    } else {
      setTableData(filteredData)
      setShowEmptyMessage(false)
    }
  }, [filteredData])

  return (
    <div className="p-4">
      <div className="bg-white dark:bg-neutral-900 shadow-sm rounded-lg overflow-hidden">
        <SearchHeader
          title="User Management"
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
          onClearSearch={clearSearch}
          onClearFilters={clearFilters}
          onAddNew={handleAddUser}
        />

        <div className="relative">
          <DataTable
            columns={columns}
            data={tableData}
            customStyles={customStyles}
            highlightOnHover
         
            pagination
            
            theme={isDarkMode ? "darkTheme" : "lightTheme"}
          
            // Don't use the default noDataComponent as it hides the headers
            
          />

        
        </div>
      </div>
    </div>
  )
}
