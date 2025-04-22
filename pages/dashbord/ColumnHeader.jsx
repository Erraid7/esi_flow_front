"use client"

import { ArrowDown2, ArrowUp2 } from "iconsax-react"
import { useState, useEffect } from "react"
import { useFilter } from "./FilterContext"

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
      <div className="flex justify-between w-full">
        {title}
        <div>
          {isInputVisible ? (
            <ArrowUp2 size="18" color="#697689" className="cursor-pointer" onClick={() => setIsInputVisible(false)} />
          ) : (
            <ArrowDown2 size="18" color="#697689" className="cursor-pointer" onClick={() => setIsInputVisible(true)} />
          )}
        </div>
      </div>
      <div className=" ">
        {isInputVisible && (
          <input
            type="text"
            className="w-full border px-2 py-1 rounded mr-2"
            placeholder="Type to filter..."
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

  const handleOptionSelect = (option) => {
    updateFilter(field, option)
    setIsDropdownVisible(false)
  }

  const clearSelection = () => {
    updateFilter(field, "")
    setIsDropdownVisible(false)
  }

  return (
    <div className="w-full">
      <div className="flex justify-between w-full">
        <div className="flex items-center">
          {title}
          {filters[field] && (
            <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">{filters[field]}</span>
          )}
        </div>
        <div>
          {isDropdownVisible ? (
            <ArrowUp2
              size="18"
              color="#697689"
              className="cursor-pointer"
              onClick={() => setIsDropdownVisible(false)}
            />
          ) : (
            <ArrowDown2
              size="18"
              color="#697689"
              className="cursor-pointer"
              onClick={() => setIsDropdownVisible(true)}
            />
          )}
        </div>
      </div>
      <div className="">
  {isDropdownVisible && (
    <div className="absolute w-20 md:w-48 border rounded mt-1 bg-white shadow-lg z-50">
      <div className=" px-2 py-1 cursor-pointer hover:bg-gray-100 text-gray-500 border-b" onClick={clearSelection}>
        Clear filter
      </div>
      {options.map((option, index) => (
        <div
          key={index}
          className={`px-2 py-1 cursor-pointer hover:bg-gray-100 ${filters[field] === option ? "bg-blue-50" : ""}`}
          onClick={() => handleOptionSelect(option)}
        >
          {option}
        </div>
      ))}
    </div>
  )}
</div>
    </div>
  )
}
