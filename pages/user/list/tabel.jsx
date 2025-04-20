"use client"

import { useState, useEffect } from "react"
import { Search, Plus, ChevronDown, ChevronLeft, ChevronRight, Edit, Trash } from "lucide-react"
import { useLanguage } from "../../translations/contexts/languageContext"
import { useDarkMode } from "../../darkLightMode/darkModeContext"
import { useRouter } from "next/navigation"
import axios from "axios" // Import axios

// Role Badge Component
function RoleBadge({ role }) {
  let textColor = ""
  let borderColor = ""

  switch (role) {
    case "Admin":
      textColor = "text-green-500"
      borderColor = "border-green-500"
      break
    case "Technician":
      textColor = "text-purple-500"
      borderColor = "border-purple-500"
      break
    case "Personal":
      textColor = "text-blue-500"
      borderColor = "border-blue-500"
      break
    default:
      textColor = "text-gray-500"
      borderColor = "border-gray-500"
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-transparent ${textColor} border ${borderColor}`}
    >
      <span className="mr-1.5">●</span>
      {role}
    </span>
  )
}

// Table Header Component
function TableHeader({ toggleFilter, openFilterColumns, filters, handleFilterChange, professionOptions, roleOptions }) {
  const { t } = useLanguage()
  const { isDarkMode } = useDarkMode()

  // Column header with animated filter component
  const ColumnHeader = ({ column, label }) => {
    const isOpen = openFilterColumns[column]

    return (
      <th
        scope="col"
        className="px-6 py-3 text-left text-sm font-medium bg-card-bg text-neutral-990 dark:text-neutral-50"
      >
        <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleFilter(column)}>
          <span
            className={`transition-all duration-300 ${isOpen ? "transform -translate-y-1 text-primary-500 dark:text-primary-400" : ""}`}
          >
            {label}
          </span>
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 text-neutral-950 dark:text-white ${isOpen ? "transform rotate-180 text-primary-500 dark:text-primary-400" : ""}`}
          />
        </div>
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-24 mt-2 opacity-100" : "max-h-0 opacity-0"}`}
        >
          {column === "role" ? (
            <div className="relative">
              <select
                className="w-full px-2 py-1 text-neutral-990 dark:text-neutral-50 bg-neutral-50 dark:bg-neutral-990 border border-neutral-200 dark:border-neutral-800 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 text-xs"
                value={filters[column]}
                onChange={(e) => handleFilterChange(column, e.target.value)}
              >
                <option value="">All roles</option>
                {roleOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ) : column === "profession" ? (
            <div className="relative">
              <select
                className="w-full px-2 py-1 text-neutral-990 dark:text-neutral-50 bg-neutral-50 dark:bg-neutral-990 border border-neutral-200 dark:border-neutral-800 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 text-xs"
                value={filters[column]}
                onChange={(e) => handleFilterChange(column, e.target.value)}
              >
                <option value="">All professions</option>
                {professionOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="relative">
              <input
                type="text"
                placeholder={`Filter ${column}...`}
                className="w-full px-2 py-1 text-neutral-990 dark:text-neutral-50 bg-neutral-50 dark:bg-neutral-990 border border-neutral-200 dark:border-neutral-800 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 text-xs"
                value={filters[column]}
                onChange={(e) => handleFilterChange(column, e.target.value)}
              />
              {filters[column] && (
                <button
                  className="absolute inset-y-0 right-0 flex items-center px-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
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

  return (
    <thead className="">
      <tr>
        <ColumnHeader column="name" label="Name" />
        <ColumnHeader column="profession" label="Profession" />
        <ColumnHeader column="email" label="E-mail" />
        <th
          scope="col"
          className="px-6 py-3 text-left text-sm font-medium bg-card-bg text-neutral-990 dark:text-neutral-50"
        >
          Phone Number
        </th>
        <ColumnHeader column="role" label="Role" />
        <th
          scope="col"
          className="px-6 py-3 text-left text-sm font-medium bg-card-bg text-neutral-990 dark:text-neutral-50"
        >
          Action
        </th>
      </tr>
    </thead>
  )
}

// Table Body Component
function TableBody({ currentItems, handleEdit, handleDelete }) {
  const { t } = useLanguage()
  const { isDarkMode } = useDarkMode()

  return (
    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 bg-neutral-50 dark:bg-neutral-990">
      {currentItems.length > 0 ? (
        currentItems.map((user) => (
          <tr key={user.id} className="hover:bg-neutral-100 dark:hover:bg-neutral-90">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-990 dark:text-neutral-50">
              {user.full_name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-990 dark:text-neutral-50">
              {user.profession}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-990 dark:text-neutral-50">{user.email}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-990 dark:text-neutral-50">{user.phone}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <RoleBadge role={user.role} />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-990 dark:text-neutral-50">
              <div className="flex space-x-3">
                <button
                  className="text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300"
                  onClick={() => handleEdit(user.id)}
                >
                  <Edit className="h-5 w-5 text-neutral-950 dark:text-white" />
                </button>
                <button
                  className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300"
                  onClick={() => handleDelete(user.id)}
                >
                  <Trash className="h-5 w-5 text-neutral-950 dark:text-white" />
                </button>
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="6" className="px-6 py-10 text-center text-sm text-neutral-990 dark:text-neutral-50">
            No users found matching your filters
          </td>
        </tr>
      )}
    </tbody>
  )
}

// Pagination Component
function Pagination({ currentPage, totalPages, paginate, prevPage, nextPage }) {
  const { t } = useLanguage()
  const { isDarkMode } = useDarkMode()

  // Generate page buttons
  const getPageButtons = () => {
    const buttons = []
    const maxVisiblePages = 5 // Maximum number of page buttons to show

    // Always show first page
    buttons.push(
      <button
        key={1}
        onClick={() => paginate(1)}
        className={`px-3 py-1 mx-1 rounded ${
          currentPage === 1
            ? "bg-primary-500 dark:bg-primary-400 text-white"
            : "bg-neutral-200 dark:bg-neutral-800 text-neutral-990 dark:text-neutral-50 hover:bg-neutral-300 dark:hover:bg-neutral-700"
        }`}
      >
        1
      </button>,
    )

    // Calculate range of pages to show
    let startPage = Math.max(2, currentPage - 1)
    let endPage = Math.min(totalPages - 1, currentPage + 1)

    // Adjust if we're near the beginning
    if (currentPage <= 2) {
      endPage = Math.min(totalPages - 1, maxVisiblePages - 1)
    }

    // Adjust if we're near the end
    if (currentPage >= totalPages - 2) {
      startPage = Math.max(2, totalPages - maxVisiblePages + 1)
    }

    // Add ellipsis if needed before middle pages
    if (startPage > 2) {
      buttons.push(
        <span key="ellipsis1" className="px-3 py-1 text-neutral-990 dark:text-neutral-50">
          ...
        </span>,
      )
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === i
              ? "bg-primary-500 dark:bg-primary-400 text-white"
              : "bg-neutral-200 dark:bg-neutral-800 text-neutral-990 dark:text-neutral-50 hover:bg-neutral-300 dark:hover:bg-neutral-700"
          }`}
        >
          {i}
        </button>,
      )
    }

    // Add ellipsis if needed after middle pages
    if (endPage < totalPages - 1) {
      buttons.push(
        <span key="ellipsis2" className="px-3 py-1 text-neutral-990 dark:text-neutral-50">
          ...
        </span>,
      )
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      buttons.push(
        <button
          key={totalPages}
          onClick={() => paginate(totalPages)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === totalPages
              ? "bg-primary-500 dark:bg-primary-400 text-white"
              : "bg-neutral-200 dark:bg-neutral-800 text-neutral-990 dark:text-neutral-50 hover:bg-neutral-300 dark:hover:bg-neutral-700"
          }`}
        >
          {totalPages}
        </button>,
      )
    }

    return buttons
  }

  return (
    <div className="flex items-center justify-center mt-4">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className={`p-1 rounded-full ${
          currentPage === 1
            ? "text-neutral-400 dark:text-neutral-600 cursor-not-allowed"
            : "text-neutral-990 dark:text-neutral-50 hover:bg-neutral-200 dark:hover:bg-neutral-800"
        }`}
      >
        <ChevronLeft className="h-5 w-5 text-neutral-950 dark:text-white" />
      </button>

      <div className="mx-2 flex">{getPageButtons()}</div>

      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className={`p-1 rounded-full ${
          currentPage === totalPages
            ? "text-neutral-400 dark:text-neutral-600 cursor-not-allowed"
            : "text-neutral-990 dark:text-neutral-50 hover:bg-neutral-200 dark:hover:bg-neutral-800"
        }`}
      >
        <ChevronRight className="h-5 w-5 text-neutral-950 dark:text-white" />
      </button>
    </div>
  )
}

// Alert Component for notifications
function Alert({ message, type, onClose }) {
  const bgColor = type === "success" ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"
  const textColor = type === "success" ? "text-green-800 dark:text-green-200" : "text-red-800 dark:text-red-200"
  const borderColor = type === "success" ? "border-green-500" : "border-red-500"

  return (
    <div
      className={`p-4 mb-4 rounded-md ${bgColor} ${textColor} border-l-4 ${borderColor} flex justify-between items-center`}
    >
      <p>{message}</p>
      <button onClick={onClose} className="text-sm font-medium">
        ×
      </button>
    </div>
  )
}

// Confirmation Modal Component
function ConfirmationModal({ isOpen, onCancel, onConfirm, title, message }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-card-bg bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 w-96 max-w-md shadow-xl">
        <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">{title}</h3>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{message}</p>
        <div className="mt-4 flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

// Main Users Table Component
export default function UsersTable() {
  const { t } = useLanguage()
  const { isDarkMode } = useDarkMode()
  const router = useRouter()

  // State for users data
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // States for filtering and pagination
  const [filteredUsers, setFilteredUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null })
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  // States for alerts and confirmations
  const [alert, setAlert] = useState({ show: false, message: "", type: "" })
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    userId: null,
    title: "",
    message: "",
  })

  // Column filter states
  const [openFilterColumns, setOpenFilterColumns] = useState({
    name: false,
    profession: false,
    email: false,
    role: false,
  })

  const [filters, setFilters] = useState({
    name: "",
    profession: "",
    email: "",
    role: "",
  })

  // Fetch users on component mount
  useEffect(() => {
    // Simple direct axios call as requested
    setLoading(true);
    axios.get('http://localhost:5000/users')
      .then((res) => {
        setUsers(res.data);
        setFilteredUsers(res.data);
        setError(null);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
        setError("Failed to load users. Please try again later.");
        setAlert({
          show: true,
          message: "Failed to load users. Please try again later.",
          type: "error",
        });
        setUsers([]);
        setFilteredUsers([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Handle delete user
  const handleDelete = (userId) => {
    setConfirmModal({
      isOpen: true,
      userId: userId,
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this user? This action cannot be undone.",
    })
  }

  // Confirm delete user
  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/users/${confirmModal.userId}`)

      // Update local state after successful deletion
      setUsers(users.filter((user) => user.id !== confirmModal.userId))
      setFilteredUsers(filteredUsers.filter((user) => user.id !== confirmModal.userId))

      // Show success alert
      setAlert({
        show: true,
        message: "User deleted successfully",
        type: "success",
      })
    } catch (error) {
      console.error("Failed to delete user:", error)
      setAlert({
        show: true,
        message: "Failed to delete user. Please try again.",
        type: "error",
      })
    } finally {
      // Close confirmation modal
      setConfirmModal({ isOpen: false, userId: null, title: "", message: "" })
    }
  }

  // Handle edit user - navigate to edit page
  const handleEdit = (userId) => {
    router.push(`/edit_user/${userId}`)
  }

  // Get unique values for dropdown options
  const getUniqueValues = (field) => {
    const values = [...new Set(users.map((user) => user[field]))]
    return values.sort()
  }

  // Profession and role options
  const professionOptions = getUniqueValues("profession")
  const roleOptions = getUniqueValues("role")

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem)

  // Calculate total pages
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  // Next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  // Previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  // Handle search input change
  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    applyFilters(value, filters)
    setCurrentPage(1) // Reset to first page when searching
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
    const newFilters = {
      ...filters,
      [column]: value,
    }
    setFilters(newFilters)
    applyFilters(searchTerm, newFilters)
    setCurrentPage(1) // Reset to first page when filtering
  }

  // Apply all filters
  const applyFilters = (search, filterValues) => {
    let result = [...users]

    // Apply search term
    if (search) {
      result = result.filter(
        (user) =>
          (user.name && user.name.toLowerCase().includes(search.toLowerCase())) ||
          (user.profession && user.profession.toLowerCase().includes(search.toLowerCase())) ||
          (user.email && user.email.toLowerCase().includes(search.toLowerCase())) ||
          (user.phone && user.phone.toLowerCase().includes(search.toLowerCase())) ||
          (user.role && user.role.toLowerCase().includes(search.toLowerCase())),
      )
    }

    // Apply column filters
    Object.keys(filterValues).forEach((key) => {
      if (filterValues[key] && result.length > 0) {
        result = result.filter((user) => user[key] && user[key].toLowerCase().includes(filterValues[key].toLowerCase()))
      }
    })

    setFilteredUsers(result)
  }

  // Handle Add User button click
  const handleAddUser = () => {
    router.push("/create_user")
  }

  // Close alert message
  const closeAlert = () => {
    setAlert({ show: false, message: "", type: "" })
  }

  // If loading, show loading indicator
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="bg-neutral-50 dark:bg-neutral-990 p-6 rounded-lg shadow-lg w-full">
      {/* Alert Notification */}
      {alert.show && <Alert message={alert.message} type={alert.type} onClose={closeAlert} />}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onCancel={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={confirmDelete}
        title={confirmModal.title}
        message={confirmModal.message}
      />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-neutral-990 dark:text-neutral-50">Users Table</h2>

        <div className="flex gap-3">
          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Input search text"
              className="bg-neutral-50 dark:bg-neutral-990 text-neutral-990 dark:text-neutral-50 pl-3 pr-10 py-2 rounded-md text-sm w-56 border border-neutral-200 dark:border-neutral-800"
              value={searchTerm}
              onChange={handleSearch}
            />
            <button className="absolute right-2 top-2 text-neutral-950 dark:text-white">
              <Search className="h-4 w-4" />
            </button>
          </div>

          {/* Add User Button */}
          <button
            className="flex items-center gap-2 bg-primary-500 dark:bg-primary-400 hover:bg-primary-600 dark:hover:bg-primary-500 text-white px-4 py-2 rounded-md transition-colors text-sm"
            onClick={handleAddUser}
          >
            <Plus className="h-4 w-4" />
            Add User
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-md">{error}</div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
        <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
          <TableHeader
            toggleFilter={toggleFilter}
            openFilterColumns={openFilterColumns}
            filters={filters}
            handleFilterChange={handleFilterChange}
            professionOptions={professionOptions}
            roleOptions={roleOptions}
          />
          <TableBody currentItems={currentItems} handleEdit={handleEdit} handleDelete={handleDelete} />
        </table>
      </div>

      {/* Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
        prevPage={prevPage}
        nextPage={nextPage}
      />

      {/* Records info */}
      <div className="mt-3 text-sm text-neutral-990 dark:text-neutral-50 text-center">
        Showing {filteredUsers.length > 0 ? indexOfFirstItem + 1 : 0} to{" "}
        {Math.min(indexOfLastItem, filteredUsers.length)} of {filteredUsers.length} entries
      </div>
    </div>
  )
}

// Parent Component for Users List Page
export function UsersList() {
  const { t } = useLanguage()
  const { isDarkMode } = useDarkMode()

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Handle body overflow when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isMobileMenuOpen])

  return (
    <div className="bg-neutral-50 dark:bg-neutral-990 flex w-full overflow-hidden">
      {/* Sidebar would be imported here */}
      <div className="flex-1 p-6">
        <UsersTable />
      </div>
    </div>
  )
}