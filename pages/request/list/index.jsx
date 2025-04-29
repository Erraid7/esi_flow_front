"use client"

import { useState, useEffect } from "react"
import DynamicTable from "../../components/DynamicTable"
import Sidebar from "../../components/sidebar"
import { useDarkMode } from "../../darkLightMode/darkModeContext"
import { ClipboardList, Clock, CheckCircle } from "lucide-react"
import { ArrowRight2 } from "iconsax-react"
import { useLanguage } from "../../translations/contexts/languageContext"
import { Card } from "../../components/cards"
import { useRouter } from "next/navigation"

export default function RequestListPage() {
  const { t } = useLanguage()
  const { isDarkMode } = useDarkMode()
  const router = useRouter()

  // Mock data for requests
  const [data, setData] = useState([
    {
      id: "REQ-2023-001",
      title: "Panne d'électricité dans la salle 302",
      location: "Bâtiment A, Étage 3, Salle 302",
      requestedBy: "Amira Boulami",
      urgency: "High",
      status: "Pending",
      createdAt: "15 Mai 2023, 09:30",
    },
    {
      id: "REQ-2023-002",
      title: "Système CVC fonctionne à pleine capacité",
      location: "Bâtiment DE",
      requestedBy: "Mohammed Alaoui",
      urgency: "Medium",
      status: "In Progress",
      createdAt: "14 Mai 2023, 14:45",
    },
    {
      id: "REQ-2023-003",
      title: "Remplacement du filtre à air",
      location: "Bibliothèque",
      requestedBy: "Sara Bennani",
      urgency: "Low",
      status: "Completed",
      createdAt: "13 Mai 2023, 11:20",
    },
    {
      id: "REQ-2023-004",
      title: "Normalisation de la pression du système",
      location: "Chaufferie CP3",
      requestedBy: "Karim Idrissi",
      urgency: "High",
      status: "Completed",
      createdAt: "12 Mai 2023, 16:30",
    },
    {
      id: "REQ-2023-005",
      title: "Installation de nouveaux radiateurs",
      location: "Amphithéâtre AP2",
      requestedBy: "Fatima Zahra",
      urgency: "Medium",
      status: "Pending",
      createdAt: "10 Mai 2023, 09:45",
    },
    {
      id: "REQ-2023-006",
      title: "Mise à jour du système de ventilation",
      location: "Laboratoire L1",
      requestedBy: "Hassan Tazi",
      urgency: "Low",
      status: "Cancelled",
      createdAt: "09 Mai 2023, 13:15",
    },
    {
      id: "REQ-2023-007",
      title: "Réparation des lumières extérieures",
      location: "Parking P2",
      requestedBy: "Nadia Mansouri",
      urgency: "Medium",
      status: "In Progress",
      createdAt: "08 Mai 2023, 10:30",
    },
    {
      id: "REQ-2023-008",
      title: "Problème avec le projecteur",
      location: "Salle de conférence C1",
      requestedBy: "Youssef Alami",
      urgency: "High",
      status: "In Progress",
      createdAt: "07 Mai 2023, 14:20",
    },
    {
      id: "REQ-2023-009",
      title: "Fuite d'eau dans les toilettes",
      location: "Bâtiment B, Étage 1",
      requestedBy: "Leila Benjelloun",
      urgency: "High",
      status: "Completed",
      createdAt: "06 Mai 2023, 11:45",
    },
    {
      id: "REQ-2023-010",
      title: "Calibration des équipements de laboratoire",
      location: "Laboratoire L3",
      requestedBy: "Omar Chaoui",
      urgency: "Low",
      status: "Pending",
      createdAt: "05 Mai 2023, 09:00",
    },
  ])

  // State for storing request statistics
  const [requestStats, setRequestStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    completedRequests: 0,
    loading: true,
    error: null,
  })

  // Calculate statistics from data
  useEffect(() => {
    if (data.length > 0) {
      const totalRequests = data.length
      const pendingRequests = data.filter(
        (request) => request.status === "Pending" || request.status === "In Progress",
      ).length
      const completedRequests = data.filter((request) => request.status === "Completed").length

      setRequestStats({
        totalRequests,
        pendingRequests,
        completedRequests,
        loading: false,
        error: null,
      })
    }
  }, [data])

  const handleEdit = (row) => {
    console.log("Edit:", row)
    router.push(`/requests/edit/${row.id}`)
  }

  const handleDelete = (row) => {
    console.log("Delete:", row)
    // Your delete logic here
    setData((prevData) => prevData.filter((item) => item.id !== row.id))
  }

  const handleRowClick = (row) => {
    router.push(`/requests/${row.id}`)
  }

  // Generate stats cards data
  const stats = [
    {
      title: t("requestList", "cards", "totalRequests"),
      count: requestStats.totalRequests,
      increase: 12,
      icon: <ClipboardList className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
    {
      title: t("requestList", "cards", "pendingRequests"),
      count: requestStats.pendingRequests,
      increase: 8,
      icon: <Clock className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
    {
      title: t("requestList", "cards", "completedRequests"),
      count: requestStats.completedRequests,
      increase: 15,
      icon: <CheckCircle className="h-5 w-5 text-neutral-950 dark:text-white" />,
    },
  ]

  return (
    <div className="flex flex-col md:flex-row bg-neutral-50 dark:bg-neutral-990 h-full">
      <div>
        <Sidebar activeItem={"requests"} />
      </div>

      <div className="w-full px-4 py-4">
        <div>
          <div className="flex items-center gap-2 mb-8 text-neutral-950 dark:text-neutral-50">
            {t("requestList", "path", "dashboard")} <ArrowRight2 size="14" color="#697689" />{" "}
            {t("requestList", "path", "requests")}
          </div>
          <h1 className="text-2xl font-bold text-neutral-950 dark:text-neutral-50 mb-6">
            {t("requestList", "cards", "title")}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {stats.map((stat, index) => (
              <Card key={index} title={stat.title} count={stat.count} increase={stat.increase} icon={stat.icon} />
            ))}
          </div>
        </div>
        <DynamicTable
          data={data}
          isDarkMode={isDarkMode}
          title={t("requestList", "searchbar", "title")}
          columnConfig={{
            id: { title: t("requestList", "columns", "id") },
            title: { title: t("requestList", "columns", "title") },
            location: { title: t("requestList", "columns", "location") },
            requestedBy: { title: t("requestList", "columns", "requestedBy") },
            urgency: { title: t("requestList", "columns", "urgencyLevel") },
            status: { title: t("requestList", "columns", "status") },
            createdAt: { title: t("requestList", "columns", "createdAt") },
          }}
          addButtonText={t("requestList", "searchbar", "addButton")}
          dropdownFields={["urgency", "status"]}
          onEdit={handleEdit}
          onDelete={handleDelete}
          styled={["status", "urgency"]}
          onRowClicked={handleRowClick}
        />
      </div>
    </div>
  )
}
