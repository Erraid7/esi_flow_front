"use client"

import { useState, useEffect, useRef } from "react"
import { AlertTriangle, Search, X } from 'lucide-react'

/**
 * Autocomplete field component for selecting options from a dropdown
 * @param {Object} props - Component props
 * @param {string} props.title - Field title
 * @param {string} props.placeholder - Input placeholder
 * @param {string} props.value - Current value
 * @param {Function} props.onChange - Function called when value changes
 * @param {Array} props.options - Array of options to display
 * @param {string|null} props.error - Error message
 * @param {boolean} props.required - Whether the field is required
 * @param {boolean} props.disabled - Whether the field is disabled
 * @param {boolean} props.loading - Whether options are loading
 * @param {string} props.emptyMessage - Message to show when no options are available
 * @param {string} props.noMatchMessage - Message to show when no options match the search
 */
const AutocompleteField = ({
  title,
  placeholder,
  value,
  onChange,
  options,
  error,
  required = false,
  disabled = false,
  loading = false,
  emptyMessage = "No options available",
  noMatchMessage = "No matches found",
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [selectedOption, setSelectedOption] = useState(null)
  const [filteredOptions, setFilteredOptions] = useState([])
  const dropdownRef = useRef(null)
  const inputRef = useRef(null)

  // Initialize input value from the selected value
  useEffect(() => {
    if (value && options.length > 0) {
      const option = options.find((opt) => opt.code === value)
      if (option) {
        setSelectedOption(option)
        setInputValue(`${option.code} - ${option.name}`)
      }
    } else if (!value) {
      setInputValue("")
      setSelectedOption(null)
    }
  }, [value, options])

  // Filter options based on input
  useEffect(() => {
    if (!isOpen) return

    if (!inputValue.trim()) {
      setFilteredOptions(options)
      return
    }

    const filtered = options.filter(
      (option) =>
        option.code.toLowerCase().includes(inputValue.toLowerCase()) ||
        option.name.toLowerCase().includes(inputValue.toLowerCase()),
    )
    setFilteredOptions(filtered)
  }, [inputValue, options, isOpen])

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)

        // If no option is selected, reset the input
        if (!selectedOption) {
          setInputValue("")
        } else {
          setInputValue(`${selectedOption.code} - ${selectedOption.name}`)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [selectedOption])

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
    setIsOpen(true)
  }

  const handleOptionSelect = (option) => {
    setSelectedOption(option)
    setInputValue(`${option.code} - ${option.name}`)
    onChange(option.code, option)
    setIsOpen(false)
  }

  const handleInputFocus = () => {
    setIsOpen(true)
    // Select all text when focused
    if (inputRef.current) {
      inputRef.current.select()
    }
  }

  const handleClearInput = () => {
    setInputValue("")
    setSelectedOption(null)
    onChange("")
    // Focus the input after clearing
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className="flex flex-col gap-2 bg-" ref={dropdownRef}>
      {title && (
        <label className="block text-sm font-inter text-neutral-950 dark:text-neutral-100">
          {title} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder={placeholder}
            disabled={disabled}
            className={`w-full text-sm px-4 py-3 pr-10 border ${
              error ? "border-red-300 bg-red-50" : "border-none bg-neutral-100 dark:bg-neutral-950"
            } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all text-neutral-990 dark:text-neutral-100 ${
              disabled ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-500">
            {inputValue && !disabled ? (
              <button
                type="button"
                onClick={handleClearInput}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <X size={16} />
              </button>
            ) : (
              <Search size={16} />
            )}
          </div>
        </div>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {loading ? (
              <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">Loading...</div>
            ) : filteredOptions.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
                {options.length === 0 ? emptyMessage : noMatchMessage}
              </div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.id}
                  className="px-4 py-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 cursor-pointer text-sm"
                  onClick={() => handleOptionSelect(option)}
                >
                  <div className="font-medium text-neutral-950 dark:text-neutral-200">
                    {option.code} - {option.name}
                  </div>
                  <div className="text-xs text-neutral-800 dark:text-neutral-300">{option.location}</div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <AlertTriangle size={12} className="mr-1" />
          {error}
        </p>
      )}
    </div>
  )
}

export default AutocompleteField