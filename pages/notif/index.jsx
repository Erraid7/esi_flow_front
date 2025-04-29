"use client"

import { useState, useEffect, useCallback } from "react"
import { useLanguage } from "../translations/contexts/languageContext"
import Sidebar from "../components/sidebar"
import {
  Bell,
  Search,
  MoreVertical,
  AlertTriangle,
  CheckCircle,
  Calendar,
  FileText,
  PlusCircle,
  Clock,
  Loader2,
} from "lucide-react"
import Toast from "../components/form_components/toast"

// Notification Item Component
const NotificationItem = ({ notification, onMarkAsRead }) => {
  const { t } = useLanguage()

  // Get the appropriate icon based on notification type
  const getIcon = () => {
    switch (notification.type) {
      case "task":
        return <FileText size={20} className="text-blue-500" />
      case "alert":
        return <AlertTriangle size={20} className="text-red-500" />
      case "reminder":
        return <Clock size={20} className="text-amber-500" />
      case "completed":
        return <CheckCircle size={20} className="text-green-500" />
      case "equipment":
        return <PlusCircle size={20} className="text-purple-500" />
      case "update":
        return <Calendar size={20} className="text-indigo-500" />
      default:
        return <Bell size={20} className="text-gray-500" />
    }
  }

  // Format the time difference
  const formatTime = (timestamp) => {
    const now = new Date()
    const notificationTime = new Date(timestamp)
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60))

    if (diffInMinutes < 60) {
      return t("notifications", "timeFormat", "minutesAgo", { count: diffInMinutes })
    } else if (diffInMinutes < 24 * 60) {
      const hours = Math.floor(diffInMinutes / 60)
      return t("notifications", "timeFormat", "hoursAgo", { count: hours })
    } else {
      const days = Math.floor(diffInMinutes / (24 * 60))
      return t("notifications", "timeFormat", "daysAgo", { count: days })
    }
  }

  return (
    <div
      className={`flex p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${!notification.read ? "bg-blue-50 dark:bg-blue-900/10" : ""}`}
    >
      <div className="mr-4 mt-1">{getIcon()}</div>
      <div className="flex-1">
        <h3
          className={`text-sm font-medium ${!notification.read ? "text-blue-600 dark:text-blue-400" : "text-gray-900 dark:text-gray-100"}`}
        >
          {notification.title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.description}</p>
        <div className="flex items-center mt-2 text-xs text-gray-500">
          <span>{formatTime(notification.timestamp)}</span>
          {notification.location && (
            <>
              <span className="mx-1">•</span>
              <span>{notification.location}</span>
            </>
          )}
          {notification.deadline && (
            <>
              <span className="mx-1">•</span>
              <span>{notification.deadline}</span>
            </>
          )}
        </div>
      </div>
      <div className="ml-2 flex items-start">
        <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
          <MoreVertical size={16} className="text-gray-500" />
        </button>
      </div>
    </div>
  )
}

// Notification Group Component
const NotificationGroup = ({ title, notifications, onMarkAsRead }) => {
  return (
    <div className="mb-6">
      <h2 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-2">{title}</h2>
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm overflow-hidden">
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} onMarkAsRead={onMarkAsRead} />
        ))}
      </div>
    </div>
  )
}

// Filter Tab Component
const FilterTab = ({ label, active, onClick }) => {
  return (
    <button
      className={`px-3 py-2 text-sm font-medium ${
        active
          ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
          : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

// Main Component
export default function NotificationsPage() {
  const { t } = useLanguage()

  // State for notifications
  const [notifications, setNotifications] = useState([])
  const [filteredNotifications, setFilteredNotifications] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // State for toast notifications
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  })

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true)
      try {
        // In a real app, you would fetch from an API
        // const response = await fetch('/api/notifications')
        // const data = await response.json()

        // For demo purposes, we'll use mock data
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

        const mockNotifications = [
          // Today
          {
            id: "1",
            type: "task",
            title: t("notifications", "mockData", "taskAssigned"),
            description: t("notifications", "mockData", "taskAssignedDesc"),
            timestamp: new Date(new Date().setMinutes(new Date().getMinutes() - 10)).toISOString(),
            read: false,
            deadline: t("notifications", "mockData", "todayDeadline"),
            group: "today",
          },
          {
            id: "2",
            type: "alert",
            title: t("notifications", "mockData", "equipmentAlert"),
            description: t("notifications", "mockData", "equipmentAlertDesc"),
            timestamp: new Date(new Date().setMinutes(new Date().getMinutes() - 30)).toISOString(),
            read: false,
            location: "DE",
            group: "today",
          },
          {
            id: "3",
            type: "reminder",
            title: t("notifications", "mockData", "filterReplacement"),
            description: t("notifications", "mockData", "filterReplacementDesc"),
            timestamp: new Date(new Date().setHours(new Date().getHours() - 1)).toISOString(),
            read: false,
            deadline: t("notifications", "mockData", "tomorrowDeadline"),
            group: "today",
          },

          // Yesterday
          {
            id: "4",
            type: "completed",
            title: t("notifications", "mockData", "taskCompleted"),
            description: t("notifications", "mockData", "taskCompletedDesc"),
            timestamp: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
            read: true,
            location: "CP3",
            group: "yesterday",
          },
          {
            id: "5",
            type: "equipment",
            title: t("notifications", "mockData", "newEquipment"),
            description: t("notifications", "mockData", "newEquipmentDesc"),
            timestamp: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
            read: true,
            location: "A",
            group: "yesterday",
          },
          {
            id: "6",
            type: "update",
            title: t("notifications", "mockData", "maintenanceUpdate"),
            description: t("notifications", "mockData", "maintenanceUpdateDesc"),
            timestamp: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
            read: true,
            group: "yesterday",
          },

          // This Week
          {
            id: "7",
            type: "equipment",
            title: t("notifications", "mockData", "newEquipments"),
            description: t("notifications", "mockData", "newEquipmentsDesc"),
            timestamp: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
            read: true,
            location: "AP2",
            group: "thisWeek",
          },
          {
            id: "8",
            type: "update",
            title: t("notifications", "mockData", "maintenanceReport"),
            description: t("notifications", "mockData", "maintenanceReportDesc"),
            timestamp: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString(),
            read: true,
            group: "thisWeek",
          },
          {
            id: "9",
            type: "update",
            title: t("notifications", "mockData", "softwareUpdate"),
            description: t("notifications", "mockData", "softwareUpdateDesc"),
            timestamp: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
            read: true,
            group: "thisWeek",
          },
        ]

        setNotifications(mockNotifications)
        setFilteredNotifications(mockNotifications)
      } catch (error) {
        console.error("Error fetching notifications:", error)
        showToast(t("notifications", "toast", "fetchError"), "error")
      } finally {
        setIsLoading(false)
      }
    }

    fetchNotifications()
  }, [t])

  // Filter notifications when activeFilter or searchQuery changes
  useEffect(() => {
    let filtered = [...notifications]

    // Apply filter
    if (activeFilter === "unread") {
      filtered = filtered.filter((notification) => !notification.read)
    } else if (activeFilter === "urgent") {
      filtered = filtered.filter((notification) => notification.type === "alert")
    } else if (activeFilter === "tasks") {
      filtered = filtered.filter((notification) => notification.type === "task" || notification.type === "completed")
    } else if (activeFilter === "info") {
      filtered = filtered.filter((notification) => notification.type === "update")
    }

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (notification) =>
          notification.title.toLowerCase().includes(query) || notification.description.toLowerCase().includes(query),
      )
    }

    setFilteredNotifications(filtered)
  }, [activeFilter, searchQuery, notifications])

  // Group notifications by date
  const groupedNotifications = {
    today: filteredNotifications.filter((n) => n.group === "today"),
    yesterday: filteredNotifications.filter((n) => n.group === "yesterday"),
    thisWeek: filteredNotifications.filter((n) => n.group === "thisWeek"),
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

  const handleMarkAsRead = useCallback((notificationId) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === notificationId ? { ...notification, read: true } : notification)),
    )
  }, [])

  const handleMarkAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
    showToast(t("notifications", "toast", "markedAllRead"), "success")
  }, [t, showToast])

  const handleLoadMore = useCallback(() => {
    // In a real app, you would fetch more notifications
    showToast(t("notifications", "toast", "loadingMore"), "info")
  }, [t, showToast])

  // Current user for sidebar
  const currentUser = {
    name: "XXX",
    role: "technician",
    initials: "XX",
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-900">
      {/* Toast Notification */}
      <Toast message={toast.message} type={toast.type} visible={toast.visible} onClose={hideToast} />

      {/* Show sidebar */}
      <Sidebar
        activeItem={"notifications"}
        userRole={currentUser.role}
        userName={currentUser.name}
        userInitials={currentUser.initials}
      />

      {/* Main content */}
      <div className="pt-14 md:pt-0 flex-1 overflow-y-auto pb-8 bg-gray-50 dark:bg-neutral-990">
        <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center py-4 text-sm">
            <span className="text-gray-500">{t("notifications", "breadcrumb", "dashboard")}</span>
            <span className="mx-2">›</span>
            <span className="font-medium">{t("notifications", "breadcrumb", "notifications")}</span>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-medium text-gray-900 dark:text-white flex items-center">
              {t("notifications", "title")}
              <Bell className="ml-2" size={24} />
            </h1>
          </div>

          {/* Search */}
          <div className="mb-6">
            <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("notifications", "searchTitle")}
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder={t("notifications", "searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-between mb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex">
              <FilterTab
                label={t("notifications", "filters", "all")}
                active={activeFilter === "all"}
                onClick={() => setActiveFilter("all")}
              />
              <FilterTab
                label={t("notifications", "filters", "unread")}
                active={activeFilter === "unread"}
                onClick={() => setActiveFilter("unread")}
              />
              <FilterTab
                label={t("notifications", "filters", "urgent")}
                active={activeFilter === "urgent"}
                onClick={() => setActiveFilter("urgent")}
              />
              <FilterTab
                label={t("notifications", "filters", "tasks")}
                active={activeFilter === "tasks"}
                onClick={() => setActiveFilter("tasks")}
              />
              <FilterTab
                label={t("notifications", "filters", "info")}
                active={activeFilter === "info"}
                onClick={() => setActiveFilter("info")}
              />
            </div>

            <button
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              onClick={handleMarkAllAsRead}
            >
              {t("notifications", "markAllAsRead")}
            </button>
          </div>

          {/* Notifications List */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <span className="ml-2 text-gray-600 dark:text-gray-400">{t("notifications", "loading")}</span>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-base font-medium text-gray-900 dark:text-gray-100">
                {t("notifications", "noNotifications")}
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{t("notifications", "checkBackLater")}</p>
            </div>
          ) : (
            <>
              {/* Today's notifications */}
              {groupedNotifications.today.length > 0 && (
                <NotificationGroup
                  title={t("notifications", "groups", "today")}
                  notifications={groupedNotifications.today}
                  onMarkAsRead={handleMarkAsRead}
                />
              )}

              {/* Yesterday's notifications */}
              {groupedNotifications.yesterday.length > 0 && (
                <NotificationGroup
                  title={t("notifications", "groups", "yesterday")}
                  notifications={groupedNotifications.yesterday}
                  onMarkAsRead={handleMarkAsRead}
                />
              )}

              {/* This week's notifications */}
              {groupedNotifications.thisWeek.length > 0 && (
                <NotificationGroup
                  title={t("notifications", "groups", "thisWeek")}
                  notifications={groupedNotifications.thisWeek}
                  onMarkAsRead={handleMarkAsRead}
                />
              )}

              {/* Load more button */}
              <div className="mt-6 text-center">
                <button
                  className="px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 border border-gray-300 dark:border-gray-700 rounded-lg"
                  onClick={handleLoadMore}
                >
                  {t("notifications", "loadMore")}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
