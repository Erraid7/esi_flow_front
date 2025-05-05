"use client"

import { useState } from "react"
import DynamicTable from "../components/DynamicTable"
import Sidebar from "../components/sidebar"
import { useDarkMode } from "../darkLightMode/darkModeContext"
import { ArrowRight2 } from "iconsax-react"
import { useLanguage } from "../translations/contexts/languageContext"

export default function ReportPage() {
  const { t } = useLanguage()
  const { isDarkMode } = useDarkMode()

  // User management data
  const [userData, setUserData] = useState([
    {
      id: 0,
      name: "Ahmed Zitouni",
      profession: "Doctor",
      email: "a.zitouni@health.dz",
      phoneNumber: "0555123789",
      role: "Admin",
    },
    {
      id: 1,
      name: "Sarah Johnson",
      profession: "Software Developer",
      email: "s.johnson@devtech.com",
      phoneNumber: "0776234567",
      role: "User",
    },
    {
      id: 2,
      name: "Mehdi Boukadoum",
      profession: "Teacher",
      email: "m.boukadoum@edu.dz",
      phoneNumber: "0666345678",
      role: "Moderator",
    },
    {
      id: 3,
      name: "Emily Davis",
      profession: "Marketing Specialist",
      email: "e.davis@marketing.co",
      phoneNumber: "0556456789",
      role: "User",
    },
    {
      id: 4,
      name: "Youssef Khelifi",
      profession: "Engineer",
      email: "y.khelifi@tech.dz",
      phoneNumber: "0777567890",
      role: "Admin",
    },
  ])

  // Tasks management data
  const [taskData, setTaskData] = useState([
    {
      "Task name": "Remove Backend",
      Location: "NS Men",
      Responsible: "Emad Djemai",
      Priority: "high",
      Deadline: "12/12/2012",
      Status: "completed",
    },
    {
      "Task name": "Emad Mohamed",
      Location: "Security",
      Responsible: "nm_djemai@esi.dz",
      Priority: "medium",
      Deadline: "07/26/2311",
      Status: "todo",
    },
    {
      "Task name": "Emad Mohamed",
      Location: "Student",
      Responsible: "nm_djemai@esi.dz",
      Priority: "medium",
      Deadline: "07/26/2311",
      Status: "inprogress",
    },
    {
      "Task name": "Emad Mohamed",
      Location: "Cleaning",
      Responsible: "nm_djemai@esi.dz",
      Priority: "low",
      Deadline: "07/26/2311",
      Status: "pending",
    },
    {
      "Task name": "Emad Mohamed",
      Location: "Student",
      Responsible: "nm_djemai@esi.dz",
      Priority: "high",
      Deadline: "07/26/2311",
      Status: "completed",
    },
  ])

  // Equipment management data
  const [equipmentData, setEquipmentData] = useState([
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
  ])

  // Handlers (placeholder functions)
  const handleEdit = (row) => {
    console.log("Edit:", row)
    // Your edit logic here
  }

  const handleDelete = (row) => {
    console.log("Delete:", row)
    // Your delete logic here
  }

  return (
    <div className="flex flex-col md:flex-row bg-neutral-50 dark:bg-neutral-990 h-full">
      <div>
        <Sidebar activeItem={"report"} />
      </div>

      <div className="w-full px-4 py-4">
        <div>
          <div className="flex items-center gap-2 mb-8 text-neutral-950 dark:text-neutral-50">
            {t("reportPage", "path", 1)} <ArrowRight2 size="14" color="#697689" /> {t("reportPage", "path", 2)}
          </div>

          {/* Title with border */}
          <div className="inline-block mb-6 border-b-2 border-neutral-500 dark:border-neutral-200 pb-2 w-full">
            <h1 className="text-2xl font-bold text-neutral-950 dark:text-neutral-50 ">
              {t("reportPage", "title")}
            </h1>
          </div>
        </div>

        {/* Users Table */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-neutral-950 dark:text-neutral-50 mb-4">
            {t("reportPage", "sections", "users")}
          </h2>
          <DynamicTable
            data={userData}
            isDarkMode={isDarkMode}
            title={t("reportPage", "tables", "users", "title")}
            columnConfig={{
              id: { hidden: true },
              name: { title: t("reportPage", "tables", "users", "columns", "name") },
              profession: { title: t("reportPage", "tables", "users", "columns", "profession") },
              email: { title: t("reportPage", "tables", "users", "columns", "email") },
              phoneNumber: { title: t("reportPage", "tables", "users", "columns", "phoneNumber") },
              role: { title: t("reportPage", "tables", "users", "columns", "role") },
            }}
            addButtonText={t("reportPage", "tables", "users", "addButton")}
            dropdownFields={["role", "profession"]}
            onEdit={handleEdit}
            onDelete={handleDelete}
            styled={["role"]}
          />
        </div>

        {/* Tasks Table */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-neutral-950 dark:text-neutral-50 mb-4">
            {t("reportPage", "sections", "tasks")}
          </h2>
          <DynamicTable
            data={taskData}
            isDarkMode={isDarkMode}
            title={t("reportPage", "tables", "tasks", "title")}
            columnConfig={{
              "Task name": { title: t("reportPage", "tables", "tasks", "columns", "taskName") },
              Location: { title: t("reportPage", "tables", "tasks", "columns", "location") },
              Responsible: { title: t("reportPage", "tables", "tasks", "columns", "responsible") },
              Priority: { title: t("reportPage", "tables", "tasks", "columns", "priority") },
              Deadline: { title: t("reportPage", "tables", "tasks", "columns", "deadline") },
              Status: { title: t("reportPage", "tables", "tasks", "columns", "status") },
            }}
            addButtonText={t("reportPage", "tables", "tasks", "addButton")}
            dropdownFields={["Priority", "Status"]}
            onEdit={handleEdit}
            onDelete={handleDelete}
            styled={["Priority", "Status"]}
          />
        </div>

        {/* Equipment Table */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-neutral-950 dark:text-neutral-50 mb-4">
            {t("reportPage", "sections", "equipment")}
          </h2>
          <DynamicTable
            data={equipmentData}
            isDarkMode={isDarkMode}
            title={t("reportPage", "tables", "equipment", "title")}
            columnConfig={{
              "Inventory Code": { title: t("reportPage", "tables", "equipment", "columns", "inventoryCode") },
              ID: { title: t("reportPage", "tables", "equipment", "columns", "id") },
              Type: { title: t("reportPage", "tables", "equipment", "columns", "type") },
              Category: { title: t("reportPage", "tables", "equipment", "columns", "category") },
              Location: { title: t("reportPage", "tables", "equipment", "columns", "location") },
              "Acquisition date": { title: t("reportPage", "tables", "equipment", "columns", "acquisitionDate") },
              Status: { title: t("reportPage", "tables", "equipment", "columns", "status") },
            }}
            addButtonText={t("reportPage", "tables", "equipment", "addButton")}
            dropdownFields={["Type", "Category", "Status", "Location"]}
            onEdit={handleEdit}
            onDelete={handleDelete}
            styled={["Status"]}
          />
        </div>
      </div>
    </div>
  )
}
