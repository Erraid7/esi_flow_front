"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import DynamicTable from "../../components/dynamicTable1"
import Sidebar from "../../components/sidebar"
import Toast from "../../components/form_components/toast"
import { useDarkMode } from "../../darkLightMode/darkModeContext"
import { Box, Settings, CheckCircle, XCircle, AlertTriangle } from "lucide-react"
import { ArrowRight2 } from "iconsax-react"
import { useLanguage } from "../../translations/contexts/languageContext"
import { Card } from "../../components/cards"

export default function EquipmentManagement() {
  const { t } = useLanguage()
  const { isDarkMode } = useDarkMode()
  const router = useRouter()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, equipment: null })

  // State for toast notifications
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  })

  // State for storing equipment statistics
  const [equipmentData, setEquipmentData] = useState({
    totalEquipment: 0,
    needsMaintenance: 0,
    working: 0,
    outOfService: 0,
    loading: true,
    error: null,
  })

  // Fetch all equipment from the API
  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        setLoading(true)
        const response = await axios.get("https://esiflow2.onrender.com/equipments")

        console.log("Fetched equipment data:", response.data)
        // object exemple received from the API
      //   {
      //     "id": 10,
      //     "inventorie_code": "INV3",
      //     "picture": "https://res.cloudinary.com/di1wbg7qo/image/upload/v1746616952/uploads/Pastel%20Aesthetic%20departments%20Professional%20Gantt%20Graph%20%283%29.png",
      //     "automatic_maintenance_interval": null,
      //     "seasonal_maintenance_months": [
      //         1
      //     ],
      //     "type": "Router",
      //     "category": "Networking Equipment",
      //     "acquisition_date": "2025-05-08T00:00:00.000Z",
      //     "date_of_commissioning": "2025-05-08T00:00:00.000Z",
      //     "localisation": "S26",
      //     "eqp_status": "Out of service",
      //     "documentation": "",
      //     "maintenance_history": [],
      //     "createdAt": "2025-05-08T09:41:51.896Z",
      //     "updatedAt": "2025-05-08T09:48:10.703Z"
      // }

        // Process the data to ensure consistent field names
        const processedData = response.data.map((item) => ({
          id: item.id,
          "Inventory Code": item.inventorie_code || `INV${item.id.toString().padStart(4, "0")}`,
          Type: item.type || "Unknown",
          Category: item.category || "Unknown",
          Location: item.localisation || "Unknown",
          "Acquisition date": formatDate(item.acquisition_date) || "Unknown",
          Status: item.eqp_status || "Unknown",
        }))

        setData(processedData)

        // Calculate statistics
        const totalEquipment = processedData.length
        const needsMaintenance = processedData.filter(
          (item) => item.Status === "Needs Maintenance" || item.Status === "Needs Maintenance",
        ).length
        const working = processedData.filter((item) => item.Status === "Working").length
        const outOfService = processedData.filter((item) => item.Status === "Out of service").length

        setEquipmentData({
          totalEquipment,
          needsMaintenance,
          working,
          outOfService,
          loading: false,
          error: null,
        })

        setLoading(false)
      } catch (error) {
        console.error("Error fetching equipment:", error)
        setEquipmentData((prev) => ({
          ...prev,
          loading: false,
          error: "Failed to fetch equipment",
        }))
        setLoading(false)
      }
    }

    fetchEquipment()
  }, [])

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return null

    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    } catch (error) {
      console.error("Error formatting date:", error)
      return dateString
    }
  }

  const showToast = useCallback((message, type = "success") => {
      setToast({
        visible: true,
        message,
        type,
      })
    }, [])
  
    const hideToast = useCallback(() => {
      setToast((prev) => ({ ...prev, visible: false }))
    }, [])

  // Handle edit equipment
  const handleEdit = (row) => {
    router.push(`edit/${row.id}`)
  }

  // Handle add equipment
  const handleAdd = () => {
    router.push(`add`)
  }

  // Handle delete confirmation
  const confirmDelete = (row) => {
    setDeleteModal({ isOpen: true, equipment: row })
  }

  // Handle actual deletion
  const handleDelete = async () => {
    try {
      const equipment = deleteModal.equipment
      if (!equipment) return

      await axios.delete(`https://esiflow2.onrender.com/equipments/${equipment.id}`)

      // Remove the deleted equipment from the state
      setData((prevData) => prevData.filter((item) => item.id !== equipment.id))

      // Update statistics
      setEquipmentData((prev) => {
        const status = equipment.Status
        return {
          ...prev,
          totalEquipment: prev.totalEquipment - 1,
          needsMaintenance:
            status === "Needs Maintenance"
              ? prev.needsMaintenance - 1
              : prev.needsMaintenance,
          working: status === "Working" ? prev.working - 1 : prev.working,
          outOfService: status === "Out of service" ? prev.outOfService - 1 : prev.outOfService,
        }
      })

      // Close modal
      setDeleteModal({ isOpen: false, equipment: null })

      // Show success toast
      showToast( "Equipment deleted successfully", "success")
    } catch (error) {
      console.error("Error deleting equipment:", error)
      alert(t("equipmentList", "deleteError") || "Failed to delete equipment")
      setDeleteModal({ isOpen: false, equipment: null })
    }
  }

  // Generate stats cards data
  const stats = [
    {
      title: t("equipmentList", "cards", "sub", 1) || "Total Equipment",
      count: equipmentData.totalEquipment,
      increase: "Items",
      icon: <Box className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
    {
      title: t("equipmentList", "cards", "sub", 2) || "Needs Maintenance",
      count: equipmentData.needsMaintenance,
      increase: "Items",
      icon: <Settings className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
    {
      title: t("equipmentList", "cards", "sub", 3) || "Working",
      count: equipmentData.working,
      increase: "Items",
      icon: <CheckCircle className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
    {
      title: t("equipmentList", "cards", "sub", 4) || "Out of Service",
      count: equipmentData.outOfService,
      increase: "Items",
      icon: <XCircle className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
  ]

  // Custom delete confirmation modal
  const DeleteConfirmationModal = () => {
    if (!deleteModal.isOpen) return null
    const equipment = deleteModal.equipment

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div
          className={`bg-white dark:bg-neutral-800 rounded-lg shadow-lg max-w-md w-full p-6 ${isDarkMode ? "border border-neutral-700" : "border border-neutral-200"}`}
        >
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
              {`Are you sure you want to delete the equipment ${equipment?.["Inventory Code"] || ""}? This action cannot be undone.`}
            </p>

            <div className="bg-neutral-100 dark:bg-neutral-700/50 p-3 rounded-md mb-4">
              <div className="grid grid-cols-2 gap-2">
                <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Inventory Code:</span>
                <span className="text-sm text-neutral-900 dark:text-white">{equipment?.["Inventory Code"]}</span>

                <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Type:</span>
                <span className="text-sm text-neutral-900 dark:text-white">{equipment?.Type}</span>

                <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Status:</span>
                <span className="text-sm text-neutral-900 dark:text-white">{equipment?.Status}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setDeleteModal({ isOpen: false, equipment: null })}
              className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-neutral-800 dark:text-white rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
            >
              Delete Equipment
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-14 lg:pt-0 flex flex-col md:flex-row bg-neutral-50 dark:bg-neutral-990 min-h-screen">

      {/* Toast Notification */}
      <Toast message={toast.message} type={toast.type} visible={toast.visible} onClose={hideToast} />

      <div>
        <Sidebar activeItem={"equipment"} />
      </div>

      <div className="w-full px-4 py-4">
        <div>

          <div className="flex flex-col items-start gap-6 mb-6 pt-6 text-neutral-950 dark:text-neutral-100">
            <div className="text-sm flex items-center font-inter">
              <span>{t("equipmentList", "path", 1)}</span>
              <span className="mx-2 text-lg">›</span>
              <span>{t("equipmentList", "path", 2)}</span>
            </div>
            <h1 className="text-xl lg:text-2xl font-russo">{t("equipmentList", "cards", "title")}</h1>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
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
            title={t("equipmentList", "searchbar", "title") || "Equipment List"}
            columnConfig={{
              id: { hidden: true }, // Hide ID column
              "Inventory Code": { title: t("equipmentList", "tablehead", 1) || "Inventory Code" },
              Type: { title: t("equipmentList", "tablehead", 3) || "Type" },
              Category: { title: t("equipmentList", "tablehead", 4) || "Category" },
              Location: { title: t("equipmentList", "tablehead", 5) || "Location" },
              "Acquisition date": { title: t("equipmentList", "tablehead", 6) || "Acquisition Date" },
              Status: { title: t("equipmentList", "tablehead", 7) || "Status" },
            }}
            addButtonText={t("equipmentList", "searchbar", "buttons", 3)}
            dropdownFields={["Type", "Category", "Status", "Location"]}
            onEdit={handleEdit}
            onDelete={confirmDelete}
            onAddNew={handleAdd}
            styled={["Status"]}
          />
        )}

        {/* Render the delete confirmation modal */}
        <DeleteConfirmationModal />
      </div>
    </div>
  )
}
