"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Create the context
const FilterContext = createContext()

// Custom hook to use the filter context
export const useFilter = () => {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider")
  }
  return context
}

export const FilterProvider = ({ children, initialData }) => {
  // State for all filters
  const [filters, setFilters] = useState({
    task: "",
    location: "",
    person: "",
    priority: "",
    status: "",
    globalSearch: "", // Add globalSearch filter
  })

  // State for filtered data
  const [filteredData, setFilteredData] = useState(initialData)

  // Update a specific filter
  const updateFilter = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      task: "",
      location: "",
      person: "",
      priority: "",
      status: "",
      globalSearch: "",
    })
  }

  // Apply filters whenever filters state changes
  useEffect(() => {
    const result = initialData.filter((item) => {
      // First check if the item passes the global search
      if (filters.globalSearch) {
        const searchTerm = filters.globalSearch.toLowerCase()
        // Check all string properties for the search term
        const matchesGlobalSearch = Object.values(item).some(
          (value) => typeof value === "string" && value.toLowerCase().includes(searchTerm),
        )

        if (!matchesGlobalSearch) return false
      }

      // Then check specific column filters
      return (
        (filters.task === "" || item.task.toLowerCase().includes(filters.task.toLowerCase())) &&
        (filters.location === "" || item.location.toLowerCase().includes(filters.location.toLowerCase())) &&
        (filters.person === "" || item.person.toLowerCase().includes(filters.person.toLowerCase())) &&
        (filters.priority === "" || item.priority === filters.priority) &&
        (filters.status === "" || item.status === filters.status)
      )
    })

    setFilteredData(result)
  }, [filters, initialData])

  // Get unique values for dropdown filters
  const getUniqueValues = (field) => {
    const values = [...new Set(initialData.map((item) => item[field]))]
    return values
  }

  // Context value
  const value = {
    filters,
    filteredData,
    updateFilter,
    clearFilters,
    getUniqueValues,
  }

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}
