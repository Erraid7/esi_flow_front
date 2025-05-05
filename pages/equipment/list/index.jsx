"use client"

import { useState } from "react"
import DynamicTable from "../../components/DynamicTable"
import Sidebar from "../../components/sidebar"
import { useDarkMode } from "../../darkLightMode/darkModeContext"
import { Box, Settings, CheckCircle, XCircle } from "lucide-react"
import { ArrowRight2 } from "iconsax-react"
import { useLanguage } from "../../translations/contexts/languageContext"
import { Card } from "../../components/cards"

export default function EquipmentManagement() {
  const { t } = useLanguage()
  const { isDarkMode } = useDarkMode()
  const [data, setData] = useState([
    {
      "Inventory Code": "INV0001",
      ID: "0001",
      Type: "Desktop",
      Category: "Computing Device",
      Location: "API1",
      "Acquisition date": "15/01/2025",
      Status: "Working",
    },
    {
      "Inventory Code": "INV0002",
      ID: "0002",
      Type: "Desktop",
      Category: "Computing Device",
      Location: "API1",
      "Acquisition date": "15/01/2025",
      Status: "out of service",
    },
    {
      "Inventory Code": "INV0003",
      ID: "0003",
      Type: "Desktop",
      Category: "Computing Device",
      Location: "API1",
      "Acquisition date": "15/01/2025",
      Status: "media_meritservice",
    },
    {
      "Inventory Code": "INV0004",
      ID: "0004",
      Type: "Desktop",
      Category: "Computing Device",
      Location: "API1",
      "Acquisition date": "15/01/2025",
      Status: "media_meritservice",
    },
    {
      "Inventory Code": "INV0005",
      ID: "0005",
      Type: "Desktop",
      Category: "Computing Device",
      Location: "API1",
      "Acquisition date": "15/01/2025",
      Status: "working",
    },
    {
      "Inventory Code": "INV0006",
      ID: "0006",
      Type: "Desktop",
      Category: "Computing Device",
      Location: "API1",
      "Acquisition date": "15/01/2025",
      Status: "media_meritservice",
    },
    {
      "Inventory Code": "INV0007",
      ID: "0007",
      Type: "Laptop",
      Category: "Computing Device",
      Location: "API2",
      "Acquisition date": "18/01/2025",
      Status: "Working",
    },
    {
      "Inventory Code": "INV0008",
      ID: "0008",
      Type: "Laptop",
      Category: "Computing Device",
      Location: "API2",
      "Acquisition date": "18/01/2025",
      Status: "out of service",
    },
    {
      "Inventory Code": "INV0009",
      ID: "0009",
      Type: "Printer",
      Category: "Peripheral",
      Location: "Lab1",
      "Acquisition date": "20/01/2025",
      Status: "maintenance",
    },
    {
      "Inventory Code": "INV0010",
      ID: "0010",
      Type: "Monitor",
      Category: "Peripheral",
      Location: "API1",
      "Acquisition date": "22/01/2025",
      Status: "Working",
    },
  ])

  const handleEdit = (row) => {
    console.log("Edit:", row)
    // Your edit logic here
  }

  const handleDelete = (row) => {
    console.log("Delete:", row)
    // Your delete logic here
  }

  const onAddNew = () => {
    
  }

  // State for storing data from API
  const [equipmentData, setEquipmentData] = useState({
    totalEquipment: 10,
    needsMaintenance: 3,
    working: 4,
    outOfService: 3,
    loading: true,
    error: null,
  })

  // Generate stats cards data
  const stats = [
    {
      title: t("equipmentList", "cards", "sub", 1),
      count: equipmentData.totalEquipment,
      increase: t("uniquetache"),
      icon: <Box className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
    {
      title: t("equipmentList", "cards", "sub", 2),
      count: equipmentData.needsMaintenance,
      increase: t("uniquetache"),
      icon: <Settings className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
    {
      title: t("equipmentList", "cards", "sub", 3),
      count: equipmentData.working,
      increase: t("uniquetache"),
      icon: <CheckCircle className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
    {
      title: t("equipmentList", "cards", "sub", 4),
      count: equipmentData.outOfService,
      increase: t("uniquetache"),
      icon: <XCircle className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
  ]

  return (
    <div className="flex flex-col md:flex-row bg-neutral-50 dark:bg-neutral-990 h-full">
      <div>
        <Sidebar activeItem={"equipment"} />
      </div>

      <div className="w-full px-4 py-4">
        <div>
          <div className="flex items-center gap-2 mb-8 text-neutral-950 dark:text-neutral-50">
            {t("equipmentList", "path", 1)} <ArrowRight2 size="14" color="#697689" /> {t("equipmentList", "path", 2)}
          </div>
          <h1 className="text-2xl font-bold text-neutral-950 dark:text-neutral-50 mb-6">
            {t("equipmentList", "cards", "title")}
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <Card key={index} title={stat.title} count={stat.count} increase={stat.increase} icon={stat.icon} />
            ))}
          </div>
        </div>
        <DynamicTable
          data={data}
          isDarkMode={isDarkMode}
          title={t("equipmentList", "searchbar", "title")}
          columnConfig={{
            id: { hidden: true }, // Hide ID column
            "Inventory Code": { title: t("equipmentList", "tablehead", 1) },
            ID: { title: t("equipmentList", "tablehead", 2) },
            Type: { title: t("equipmentList", "tablehead", 3) },
            Category: { title: t("equipmentList", "tablehead", 4) },
            Location: { title: t("equipmentList", "tablehead", 5) },
            "Acquisition date": { title: t("equipmentList", "tablehead", 6) },
            Status: { title: t("equipmentList", "tablehead", 7) },
          }}
          addButtonText={t("equipmentList", "searchbar", "buttons", 3)}
          dropdownFields={["Type", "Category", "Status","Location"]}
          onEdit={handleEdit}
          onDelete={handleDelete}
          styled={["Status"]}
          onAddNew={onAddNew}
        />
      </div>
    </div>
  )
}
