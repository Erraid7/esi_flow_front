"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import DynamicTable from "../../components/dynamicTable1"
import Sidebar from "../../components/sidebar"
import { useDarkMode } from "../../darkLightMode/darkModeContext"
import { Users, Settings, UserCog, AlertTriangle } from "lucide-react"
import { ArrowRight2 } from "iconsax-react"
import axios from "axios"
import { useLanguage } from "../../translations/contexts/languageContext"
import { Card } from "../../components/cards"
import { checkAuth } from '@/pages/authWrapper/apiver';


export default function UserManagement() {
  useEffect(() => {
    const { authorized } = checkAuth(['Admin']);
    if (!authorized) {
      router.push("/login")
    }

  }, []);

  const { t } = useLanguage()
  const { isDarkMode } = useDarkMode()
  const router = useRouter()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, user: null })

  // State for storing statistics data
  const [userData, setUserData] = useState({
    totalUsers: 0,
    maintenanceTeam: 0,
    administrators: 0,
    loading: true,
    error: null,
  })

  // Fetch all users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await axios.get("https://esiflow2.onrender.com/users")
        setData(response.data)

        console.log("Fetched users:", response.data)

        // Calculate statistics
        const totalUsers = response.data.length
        const maintenanceTeam = response.data.filter(
          (user) => user.role === "Technician",
        ).length
        const administrators = response.data.filter((user) => user.role === "Admin").length

        setUserData({
          totalUsers,
          maintenanceTeam,
          administrators,
          loading: false,
          error: null,
        })

        setLoading(false)
      } catch (error) {
        console.error("Error fetching users:", error)
        setUserData((prev) => ({
          ...prev,
          loading: false,
          error: "Failed to fetch users",
        }))
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  // Handle edit user
  const handleEdit = (row) => {
    router.push(`edit/${row.id}`) // Fixed double slash
  }
  const handleadd = (row) => {
    router.push(`add`) // Fixed double slash
  }

  // Handle delete confirmation
  const confirmDelete = (row) => {
    setDeleteModal({ isOpen: true, user: row })
  }

  // Handle actual deletion
  const handleDelete = async () => {
    try {
      const row = deleteModal.user
      if (!row) return
      
      await axios.delete(`https://esiflow2.onrender.com/users/${row.id}`) // Updated API endpoint
      // Remove the deleted user from the state
      setData((prevData) => prevData.filter((user) => user.id !== row.id))

      // Update statistics
      setUserData((prev) => ({
        ...prev,
        totalUsers: prev.totalUsers - 1,
        maintenanceTeam:
          row.role === "Technician" ? prev.maintenanceTeam - 1 : prev.maintenanceTeam,
        administrators: row.role === "Admin" ? prev.administrators - 1 : prev.administrators,
      }))

      // Close modal
      setDeleteModal({ isOpen: false, user: null })
    } catch (error) {
      console.error("Error deleting user:", error)
      alert(t("userList", "deleteError") || "Failed to delete user")
      setDeleteModal({ isOpen: false, user: null })
    }
  }

  // Generate stats cards data
  const stats = [
    {
      title: t("userList", "cards", "sub", 1),
      count: userData.totalUsers,
      increase: "Users", 
      icon: <Users className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
    {
      title: t("userList", "cards", "sub", 2),
      count: userData.maintenanceTeam,
      increase: "Technicians", 
      icon: <Settings className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
    {
      title: t("userList", "cards", "sub", 3),
      count: userData.administrators,
      increase: "Admins", 
      icon: <UserCog className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
  ]

  // Custom delete confirmation modal
  const DeleteConfirmationModal = () => {
    if (!deleteModal.isOpen) return null
    const user = deleteModal.user

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className={`bg-white dark:bg-neutral-800 rounded-lg shadow-lg max-w-md w-full p-6 ${isDarkMode ? 'border border-neutral-700' : 'border border-neutral-200'}`}>
          <div className="flex items-center mb-4">
            <div className="mr-4 bg-red-100 dark:bg-red-900/30 p-2 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-medium text-neutral-900 dark:text-white">
              {t("equipmentList", "deleteConfirm") || "Confirm Deletion"}
            </h3>
          </div>
          
          <div className="mb-6">
            <p className="text-neutral-700 dark:text-neutral-300 mb-4">
              {`Are you sure you want to delete the user ${user?.name || ''}? This action cannot be undone.`}
            </p>
            
            <div className="bg-neutral-100 dark:bg-neutral-700/50 p-3 rounded-md mb-4">
              <div className="grid grid-cols-2 gap-2">
                <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Name:</span>
                <span className="text-sm text-neutral-900 dark:text-white">{user?.full_name}</span>
                
                <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Email:</span>
                <span className="text-sm text-neutral-900 dark:text-white">{user?.email}</span>
                
                <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Role:</span>
                <span className="text-sm text-neutral-900 dark:text-white">{user?.role}</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setDeleteModal({ isOpen: false, user: null })}
              className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-neutral-800 dark:text-white rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
            >
              Delete User
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row bg-neutral-50 dark:bg-neutral-990 min-h-screen">
      <div>
        <Sidebar activeItem={"users"}/>
      </div>

      <div className="w-full px-4 py-4">
        <div>
          <div className="flex flex-col items-start gap-6 mb-6 pt-6 text-neutral-950 dark:text-neutral-100">
            <div className="text-sm flex items-center font-inter">
              <span>{t("userList", "path", 1)}</span>
              <span className="mx-2 text-lg">›</span>
              <span>{t("userList", "path", 2)}</span>
            </div>
            <h1 className="text-xl lg:text-2xl font-russo">{t("userList", "cards", "titel")}</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {stats.map((stat, index) => (
              <Card key={index} title={stat.title} count={stat.count} increase={stat.increase} icon={stat.icon} />
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <DynamicTable
            data={data}
            isDarkMode={isDarkMode}
            title={t("userList", "searchbar", "titel")}
            columnConfig={{
              id: { hidden: true }, // Hide ID column
              name: { title: t("userList", "tablehead", 1) }, // Custom title
              profession: { title: t("userList", "tablehead", 2) },
              email: { title: t("userList", "tablehead", 3) },
              phoneNumber: { title: t("userList", "tablehead", 4) },
              role: { title: t("userList", "tablehead", 5) },
              password : { hidden: true }, 
              created_at : { hidden: true }, 
              updated_at : { hidden: true }, 
              bio : { hidden: true }, 
              pictures : { hidden: true },
              wants_email_notifications : { hidden: true },
            }}
            addButtonText={t("userList", "searchbar", "buttons", 3)}
            dropdownFields={["role", "profession"]}
            onEdit={handleEdit}
            onDelete={confirmDelete} // Changed to open the confirmation modal
            styled={["role"]}
            onAddNew={handleadd} // Added onAddNew prop for adding new users
         
          />
        )}
        
        {/* Render the delete confirmation modal */}
        <DeleteConfirmationModal />
      </div>
    </div>
  )
}