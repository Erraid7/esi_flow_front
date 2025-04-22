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
    name: "",
    profession: "",
    email: "",
    phoneNumber: "",
    role: "",
    globalSearch: "",
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
      name: "",
      profession: "",
      email: "",
      phoneNumber: "",
      role: "",
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
        (filters.name === "" || item.name.toLowerCase().includes(filters.name.toLowerCase())) &&
        (filters.profession === "" || item.profession.toLowerCase().includes(filters.profession.toLowerCase())) &&
        (filters.email === "" || item.email.toLowerCase().includes(filters.email.toLowerCase())) &&
        (filters.phoneNumber === "" || item.phoneNumber.includes(filters.phoneNumber)) &&
        (filters.role === "" || item.role === filters.role)
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
