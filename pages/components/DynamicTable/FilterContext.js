// File: components/DynamicTable/FilterContext.js
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
  // Dynamically generate filter fields based on data structure
  const generateInitialFilters = (data) => {
    if (!data || data.length === 0) return { globalSearch: "" }
    
    const filterFields = Object.keys(data[0]).reduce((acc, field) => {
      acc[field] = ""
      return acc
    }, {})
    
    return { ...filterFields, globalSearch: "" }
  }

  // State for all filters
  const [filters, setFilters] = useState(generateInitialFilters(initialData))
  
  // State for filtered data
  const [filteredData, setFilteredData] = useState(initialData || [])

  // Update a specific filter
  const updateFilter = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Clear all filters
  const clearFilters = () => {
    setFilters(generateInitialFilters(initialData))
  }

  // Apply filters whenever filters state changes
  useEffect(() => {
    if (!initialData || initialData.length === 0) {
      setFilteredData([])
      return
    }
    
    const result = initialData.filter((item) => {
      // First check if the item passes the global search
      if (filters.globalSearch) {
        const searchTerm = filters.globalSearch.toLowerCase()
        // Check all string properties for the search term
        const matchesGlobalSearch = Object.values(item).some(
          (value) => typeof value === "string" && value.toLowerCase().includes(searchTerm)
        )

        if (!matchesGlobalSearch) return false
      }

      // Then check specific column filters
      return Object.keys(filters).every(filterKey => {
        if (filterKey === 'globalSearch' || !filters[filterKey]) return true
        
        if (typeof item[filterKey] === 'string') {
          return item[filterKey].toLowerCase().includes(filters[filterKey].toLowerCase())
        } else if (item[filterKey] !== undefined) {
          return String(item[filterKey]).includes(filters[filterKey])
        }
        
        return true
      })
    })

    setFilteredData(result)
  }, [filters, initialData])

  // Get unique values for dropdown filters
  const getUniqueValues = (field) => {
    if (!initialData || initialData.length === 0) return []
    const values = [...new Set(initialData.map((item) => item[field]))].filter(Boolean)
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