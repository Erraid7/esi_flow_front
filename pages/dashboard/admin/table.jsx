"use client"

import { useState, useEffect } from "react"
import { Search, Plus, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "../../translations/contexts/languageContext"
import { useDarkMode } from '../../darkLightMode/darkModeContext';

export default function MaintenanceTable() {
  const { t, toggleLanguage } = useLanguage()
  const { isDarkMode } = useDarkMode()

  // Sample data for the table
  const initialTasks = [
    {
      id: 1,
      name: "Remove Backend",
      location: "NS Men",
      person: "Erraid Djemai",
      priority: "medium",
      deadline: "2012-12-12",
      status: "Completed",
    },
    {
      id: 2,
      name: "Erraid Mohamed",
      location: "Security",
      person: "nm_djemai@esi.dz",
      priority: "medium",
      deadline: "2024-06-15",
      status: "To Do",
    },
    {
      id: 3,
      name: "Erraid Mohamed",
      location: "Student",
      person: "nm_djemai@esi.dz",
      priority: "medium",
      deadline: "2024-05-20",
      status: "To Do",
    },
    {
      id: 4,
      name: "Erraid Mohamed",
      location: "Cleaning",
      person: "nm_djemai@esi.dz",
      priority: "medium",
      deadline: "2024-07-10",
      status: "Pending",
    },
    {
      id: 5,
      name: "Erraid Mohamed",
      location: "cp1",
      person: "nm_djemai@esi.dz",
      priority: "high",
      deadline: "2024-05-30",
      status: "Completed",
    },
    {
      id: 6,
      name: "Erraid Mohamed",
      location: "Student",
      person: "nm_djemai@esi.dz",
      priority: "high",
      deadline: "2024-08-01",
      status: "To Do",
    },
    {
      id: 7,
      name: "Erraid Mohamed",
      location: "Network Technician",
      person: "nm_djemai@esi.dz",
      priority: "high",
      deadline: "2024-07-15",
      status: "In Progress",
    },
    {
      id: 8,
      name: "Erraid Mohamed",
      location: "Mechanical Technician",
      person: "nm_djemai@esi.dz",
      priority: "high",
      deadline: "2024-06-30",
      status: "In Progress",
    },
    {
      id: 9,
      name: "Erraid Mohamed",
      location: "Nm_djemai@Esi.Dz",
      person: "nm_djemai@esi.dz",
      priority: "low",
      deadline: "2024-09-01",
      status: "Pending",
    },
    {
      id: 10,
      name: "Erraid Mohamed",
      location: "Teacher",
      person: "nm_djemai@esi.dz",
      priority: "low",
      deadline: "2024-06-20",
      status: "Completed",
    },
  ]

  const [tasks, setTasks] = useState(initialTasks)
  const [filteredTasks, setFilteredTasks] = useState(initialTasks)
  const [searchTerm, setSearchTerm] = useState("")
  const [openFilterColumns, setOpenFilterColumns] = useState({
    name: false,
    location: false,
    person: false,
    priority: false,
    deadline: false,
    status: false,
  })
  const [filters, setFilters] = useState({
    name: "",
    location: "",
    person: "",
    priority: "",
    deadline: "",
    status: "",
  })

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [tasksPerPage, setTasksPerPage] = useState(5)

  // Priority and status options
  const priorityOptions = ["low", "medium", "high"]
  const statusOptions = ["To Do", "In Progress", "Pending", "Completed", "Cancelled"]

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1) // Reset to first page on new search
  }

  // Toggle filter visibility
  const toggleFilter = (column) => {
    setOpenFilterColumns({
      ...openFilterColumns,
      [column]: !openFilterColumns[column],
    })
  }

  // Handle filter input change
  const handleFilterChange = (column, value) => {
    setFilters({
      ...filters,
      [column]: value,
    })
    //setCurrentPage(1) // Reset to first page on new filter
  }

  // Apply filters and search
  useEffect(() => {
    let result = initialTasks

    // Apply search term
    if (searchTerm) {
      result = result.filter(
        (task) =>
          task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.person.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.priority.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.deadline.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.status.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply column filters
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        if (key === "deadline") {
          result = result.filter((task) => task[key].includes(filters[key]))
        } else {
          result = result.filter((task) => task[key].toLowerCase().includes(filters[key].toLowerCase()))
        }
      }
    })

    setFilteredTasks(result)
  }, [searchTerm, filters])

  // Get current tasks for pagination
  const indexOfLastTask = currentPage * tasksPerPage
  const indexOfFirstTask = indexOfLastTask - tasksPerPage
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask)
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))

  // Status badge component
  const StatusBadge = ({ status }) => {
    let bgColor = ""
    let textColor = ""

    switch (status.toLowerCase()) {
      case "completed":
        bgColor =
          "bg-[#F6FFED] dark:bg-[#103C1C] w-20 md:w-24 rounded-lg border-2 border-[#B7EB8F] dark:border-[#52C41A] flex justify-center"
        textColor = "text-[#52C41A]"
        break
      case "to do":
        bgColor =
          "bg-[#E6F7FF] dark:bg-[#0C2D4D] w-20 md:w-24 rounded-lg border-2 border-[#91D5FF] dark:border-[#1890FF] flex justify-center"
        textColor = "text-[#1890FF]"
        break
      case "pending":
        bgColor =
          "bg-[#FFF1F0] dark:bg-[#4D1814] w-20 md:w-24 rounded-lg border-2 border-[#FFA39E] dark:border-[#F5222D] flex justify-center"
        textColor = "text-[#F5222D]"
        break
      case "in progress":
        bgColor =
          "bg-[#FFFBE6] dark:bg-[#4D3800] w-20 md:w-24 rounded-lg border-2 border-[#FFE58F] dark:border-[#FAAD14] flex justify-center"
        textColor = "text-[#FAAD14]"
        break
      case "cancelled":
        bgColor =
          "bg-[#FFF1F0] dark:bg-[#4D1814] w-20 md:w-24 rounded-lg border-2 border-[#FFA39E] dark:border-[#F5222D] flex justify-center"
        textColor = "text-gray-600 dark:text-gray-400"
        break
      default:
        bgColor =
          "bg-[#E6F7FF] dark:bg-[#0C2D4D] w-20 md:w-24 rounded-lg border-2 border-[#FFA39E] dark:border-[#1890FF] flex justify-center"
        textColor = "text-gray-600 dark:text-gray-400"
    }

    return (
      <span
        className={`inline-flex items-center px-2 md:px-3.5 py-1 md:py-1.5 rounded-lg text-xs font-medium ${bgColor} ${textColor}`}
      >
        {status}
      </span>
    )
  }

  // Priority badge component
  const PriorityBadge = ({ priority }) => {
    let bgColor = ""
    let textColor = ""

    switch (priority.toLowerCase()) {
      case "high":
        bgColor =
          "bg-[#FFF1F0] dark:bg-[#4D1814] w-20 md:w-24 rounded-lg border-2 border-[#FFA39E] dark:border-[#F5222D] flex justify-center"
        textColor = "text-[#F5222D]"
        break
      case "medium":
        bgColor =
          "bg-[#FFFBE6] dark:bg-[#4D3800] w-20 md:w-24 rounded-lg border-2 border-[#FFE58F] dark:border-[#FAAD14] flex justify-center"
        textColor = "text-yellow-600 dark:text-yellow-500"
        break
      case "low":
        bgColor =
          "bg-[#E6F7FF] dark:bg-[#0C2D4D] w-20 md:w-24 rounded-lg border-2 border-[#91D5FF] dark:border-[#1890FF] flex justify-center"
        textColor = "text-[#1890FF]"
        break
      default:
        bgColor =
          "bg-[#FFF1F0] dark:bg-[#4D1814] w-20 md:w-24 rounded-lg border-2 border-[#FFA39E] dark:border-[#F5222D] flex justify-center"
        textColor = "text-gray-600 dark:text-gray-400"
    }

    return (
      <span
        className={`inline-flex items-center px-2 md:px-3.5 py-1 md:py-1.5 rounded-lg text-xs font-medium ${bgColor} ${textColor}`}
      >
        {priority}
      </span>
    )
  }

  // Custom styled select component with dropdown animation
  const StyledSelect = ({ options, value, onChange, placeholder }) => {
    return (
      <div className="relative">
        <select
          className="w-full appearance-none px-2 md:px-3 py-1 md:py-2 text-neutral-950 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-xs"
          value={value}
          onChange={onChange}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {typeof option === "string" ? option.charAt(0).toUpperCase() + option.slice(1) : option}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
          <ChevronDown className="h-3 w-3 md:h-4 md:w-4" />
        </div>
      </div>
    )
  }

  // Custom styled date input component
  const StyledDateInput = ({ value, onChange }) => {
    return (
      <div className="relative">
        <input
          type="date"
          className="w-full px-2 md:px-3 py-1 md:py-2 text-neutral-950 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-xs"
          value={value}
          onChange={onChange}
        />
      </div>
    )
  }

  // Column header with animated filter component
  const ColumnHeader = ({ column, label }) => {
    const isOpen = openFilterColumns[column]

    return (
      <th
        scope="col"
        className="px-2 sm:px-4 md:px-6 py-4 md:py-6 text-left font-inter font-semibold text-xs sm:text-sm text-neutral-950 dark:text-white uppercase tracking-wider border-r dark:border-gray-700"
      >
        <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleFilter(column)}>
          <span
            className={`transition-all duration-300 ${isOpen ? "transform -translate-y-2 text-blue-600 dark:text-blue-400" : ""}`}
          >
            {label}
          </span>
          <ChevronDown
            className={`h-3 w-3 md:h-4 md:w-4 transition-transform duration-300 ${isOpen ? "transform rotate-180 text-blue-600 dark:text-blue-400" : ""}`}
          />
        </div>
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-16 mt-2 opacity-100" : "max-h-0 opacity-0"}`}
        >
          {column === "priority" ? (
            <StyledSelect
              options={priorityOptions}
              value={filters[column]}
              onChange={(e) => handleFilterChange(column, e.target.value)}
              placeholder="All priorities"
            />
          ) : column === "status" ? (
            <StyledSelect
              options={statusOptions}
              value={filters[column]}
              onChange={(e) => handleFilterChange(column, e.target.value)}
              placeholder="All statuses"
            />
          ) : column === "deadline" ? (
            <StyledDateInput value={filters[column]} onChange={(e) => handleFilterChange(column, e.target.value)} />
          ) : (
            <div className="relative">
              <input
                type="text"
                placeholder={`Filter ${column}...`}
                className="w-full px-2 md:px-3 py-1 md:py-2 text-neutral-950 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-xs"
                value={filters[column]}
                onChange={(e) => handleFilterChange(column, e.target.value)}
              />
              {filters[column] && (
                <button
                  className="absolute inset-y-0 right-0 flex items-center px-1 md:px-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleFilterChange(column, "")
                  }}
                >
                  ×
                </button>
              )}
            </div>
          )}
        </div>
      </th>
    )
  }

  // Pagination controls component
  const PaginationControls = () => (
    <div className="py-2 md:py-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-2 md:px-4">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`relative inline-flex items-center rounded-md px-2 py-1 text-xs md:text-sm font-medium ${currentPage === 1 ? "text-gray-300 dark:text-gray-600 cursor-not-allowed" : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"}`}
        >
          {t("dashboard", "maintenance", "pagination", "previous")}
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`relative ml-3 inline-flex items-center rounded-md px-2 py-1 text-xs md:text-sm font-medium ${currentPage === totalPages ? "text-gray-300 dark:text-gray-600 cursor-not-allowed" : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"}`}
        >
          {t("dashboard", "maintenance", "pagination", "next")}
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300">
            {t("dashboard", "maintenance", "pagination", "showing")}{" "}
            <span className="font-medium">{indexOfFirstTask + 1}</span>{" "}
            {t("dashboard", "maintenance", "pagination", "to")}{" "}
            <span className="font-medium">
              {indexOfLastTask > filteredTasks.length ? filteredTasks.length : indexOfLastTask}
            </span>{" "}
            {t("dashboard", "maintenance", "pagination", "of")}{" "}
            <span className="font-medium">{filteredTasks.length}</span>{" "}
            {t("dashboard", "maintenance", "pagination", "results")}
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center rounded-l-md px-1 md:px-2 py-1 md:py-2 ${
                currentPage === 1
                  ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              <span className="sr-only">{t("dashboard", "maintenance", "pagination", "previous")}</span>
              <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
            </button>
            {/* Show up to 5 page numbers */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum =
                currentPage <= 3 ? i + 1 : currentPage >= totalPages - 2 ? totalPages - 4 + i : currentPage - 2 + i

              if (pageNum <= 0 || pageNum > totalPages) return null

              return (
                <button
                  key={pageNum}
                  onClick={() => paginate(pageNum)}
                  className={`relative inline-flex items-center px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm font-medium ${
                    currentPage === pageNum
                      ? "z-10 bg-blue-500 text-white focus:z-20"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-20"
                  }`}
                >
                  {pageNum}
                </button>
              )
            })}
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center rounded-r-md px-1 md:px-2 py-1 md:py-2 ${
                currentPage === totalPages
                  ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              <span className="sr-only">{t("dashboard", "maintenance", "pagination", "next")}</span>
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )

  // Task count and per page selector
  const TasksPerPageSelector = () => (
    <div className="flex items-center space-x-1 md:space-x-2 px-2 md:px-6 pb-2 md:pb-3 text-xs md:text-sm text-gray-500 dark:text-gray-400">
      <span>{t("dashboard", "maintenance", "perPage", "show")}</span>
      <select
        className="px-1 md:px-2 py-1 border rounded-md text-xs md:text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
        value={tasksPerPage}
        onChange={(e) => {
          setTasksPerPage(Number(e.target.value))
          setCurrentPage(1) // Reset to first page when changing items per page
        }}
      >
        {[5, 10, 25, 50].map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      <span>{t("dashboard", "maintenance", "perPage", "tasksPerPage")}</span>
    </div>
  )

  return (
    <div className="py-4 md:py-6 min-h-6">
      <div>
        <h1 className="text-xl md:text-2xl font-russo mb-4 md:mb-6 dark:text-white">
          {t("dashboard", "maintenance", "title")}
        </h1>

        <div className="flex flex-row sm:flex-row mb-4 md:mb-6 gap-3 md:gap-6">
          <div className="relative w-full sm:w-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={t("dashboard", "maintenance", "search")}
              className="w-full sm:w-[250px] md:w-[350px] pl-8 md:pl-10 pr-3 md:pr-4 md:py-2 rounded-lg bg-white dark:bg-gray-800 border-0 dark:border dark:border-gray-700 focus:ring-2 focus:ring-blue-500 text-sm py-3 text-gray-900 dark:text-white"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <button className="flex items-center justify-center gap-1 md:gap-2 bg-blue-500 hover:bg-blue-600 text-neutral-50 px-3 md:px-4 py-1.5 md:py-2 rounded-lg transition-colors text-sm">
            <Plus className="h-4 w-4 md:h-5 md:w-5" />
            {t("dashboard", "maintenance", "addButton")}
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden max-w-full">
          {/* Wrap the table in a scrollable container */}
          <div className="overflow-x-auto">
            <div className="min-w-full">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 table-fixed sm:table-auto">
                <thead className="bg-card-bg dark:bg-gray-900 sticky top-0 z-10">
                  <tr>
                    <ColumnHeader column="name" label={t("dashboard", "maintenance", "columns", "name")} />
                    <ColumnHeader column="location" label={t("dashboard", "maintenance", "columns", "location")} />
                    <ColumnHeader column="person" label={t("dashboard", "maintenance", "columns", "person")} />
                    <ColumnHeader column="priority" label={t("dashboard", "maintenance", "columns", "priority")} />
                    <ColumnHeader column="deadline" label={t("dashboard", "maintenance", "columns", "deadline")} />
                    <ColumnHeader column="status" label={t("dashboard", "maintenance", "columns", "status")} />
                  
                  </tr>
                </thead>

                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {currentTasks.map((task) => (
                    <tr
                      key={task.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                    >
                      <td className="px-2 sm:px-4 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900 dark:text-white font-inter">
                        {task.name}
                      </td>
                      <td className="px-2 sm:px-4 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm text-neutral-950 dark:text-gray-300 font-inter">
                        {task.location}
                      </td>
                      <td className="px-2 sm:px-4 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm font-inter text-neutral-950 dark:text-gray-300">
                        {task.person}
                      </td>
                      <td className="px-2 sm:px-4 md:px-6 py-2 md:py-4 whitespace-nowrap">
                        <PriorityBadge priority={task.priority} />
                      </td>
                      <td className="px-2 sm:px-4 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm font-inter text-neutral-950 dark:text-gray-300">
                        {task.deadline}
                      </td>
                      <td className="px-2 sm:px-4 md:px-6 py-2 md:py-4 whitespace-nowrap">
                        <StatusBadge status={task.status} />
                      </td>
                    </tr>
                  ))}
                  {currentTasks.length === 0 && (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-2 sm:px-4 md:px-6 py-6 md:py-10 text-center text-xs md:text-sm text-gray-500 dark:text-gray-400"
                      >
                        {t("dashboard", "maintenance", "noTasks")}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tasks per page selector */}
          <TasksPerPageSelector />

          {/* Pagination controls */}
          {filteredTasks.length > 0 && <PaginationControls />}
        </div>
      </div>
    </div>
  )
}
