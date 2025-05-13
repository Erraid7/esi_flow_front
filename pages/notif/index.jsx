"use client"

import { useState, useEffect, useCallback } from "react"
import { useLanguage } from "../translations/contexts/languageContext"
import { useDarkMode } from "../darkLightMode/darkModeContext"
import Sidebar from "../components/sidebar"
import axios from "axios"
import {
  Bell,
  Search,
  AlertTriangle,
  CheckCircle,
  UserPlus,
  Clock,
  Loader2,
  ChevronRight,
  Filter,
  X,
  Eye,
  Trash2,
  RefreshCw,
  MoreVertical,
  Info,
  XCircle,
  PenToolIcon as Tool,
  CheckSquare,
  MessageSquare,
  Shield,
} from "lucide-react"

// Main Component
export default function NotificationsPage() {
  const { t } = useLanguage()
  const { isDarkMode } = useDarkMode()

  // State for notifications
  const [notifications, setNotifications] = useState([])
  const [filteredNotifications, setFilteredNotifications] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [currentUser, setCurrentUser] = useState({
    id: null,
    role: "user",
    name: "User",
  })

  // State for toast notifications
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  })

  // API base URL
  const API_BASE_URL = "https://esi-flow-back.onrender.com"

  // Get current user from localStorage - moved to useEffect
  const getCurrentUser = useCallback(() => {
    if (typeof window === "undefined") return { id: null, role: "user" }

    try {
      const userString = localStorage.getItem("user")
      if (userString) {
        return JSON.parse(userString)
      }
      return { id: null, role: "user" }
    } catch (error) {
      console.error("Error getting user from localStorage:", error)
      return { id: null, role: "user" }
    }
  }, [])

  // Initialize user data
  useEffect(() => {
    const user = getCurrentUser()
    setCurrentUser({
      id: user.id,
      role: user.role,
      name: user.name,
    })
  }, [getCurrentUser])

  // Get auth token for API requests - moved to a function to be called inside useEffect or handlers
  const getAuthToken = useCallback(() => {
    if (typeof window === "undefined") return null

    try {
      const userString = localStorage.getItem("user")
      if (userString) {
        const user = JSON.parse(userString)
        return user.token || null
      }
      return null
    } catch (error) {
      console.error("Error getting auth token:", error)
      return null
    }
  }, [])

  // Create axios instance with auth header
  const createApiClient = useCallback(() => {
    const client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    })

    // Add auth token to requests
    client.interceptors.request.use(
      (config) => {
        const token = getAuthToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )

    return client
  }, [getAuthToken])

  // Fetch notifications from API
  const fetchNotifications = useCallback(
    async (refresh = false, page = 1) => {
      if (refresh) {
        setIsRefreshing(true)
        setCurrentPage(1)
        page = 1
      } else if (page === 1) {
        setIsLoading(true)
      }

      try {
        const apiClient = createApiClient()
        const user = getCurrentUser()

        if (!user.id) {
          throw new Error("User not authenticated")
        }

        // Get notifications from API
        const response = await apiClient.get("/notifications")
        const notificationsData = response.data

        // Filter notifications for current user
        const userNotifications = notificationsData.filter((notification) => notification.recipient_id === user.id)

        // Sort notifications by created_at date
        userNotifications.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

        // Process notifications for display
        const processedNotifications = userNotifications.map((notification) => {
          // Determine group based on created_at date
          const createdAt = new Date(notification.created_at)
          const now = new Date()
          const yesterday = new Date(now)
          yesterday.setDate(yesterday.getDate() - 1)
          const weekAgo = new Date(now)
          weekAgo.setDate(weekAgo.getDate() - 7)

          let group = "older"
          if (createdAt.toDateString() === now.toDateString()) {
            group = "today"
          } else if (createdAt.toDateString() === yesterday.toDateString()) {
            group = "yesterday"
          } else if (createdAt > weekAgo) {
            group = "thisWeek"
          }

          let entity_type
          let title

          // Determine entity_type based on notification data
          if (notification.request_id == null && notification.intervention_id == null) {
            entity_type = "System"
            title = "Welcome & Workflow"
          }
          if (notification.request_id && notification.intervention_id == null) {
            entity_type = "request"
            title = "Request is here"
          } else if (notification.intervention_id) {
            entity_type = "intervention"
            title = "New task for you"
          }

          return {
            ...notification,
            seen: notification.seen || false,
            group,
            entity_type,
            title: title || "Notification",
          }
        })

        if (page === 1 || refresh) {
          setNotifications(processedNotifications)
        } else {
          setNotifications((prev) => [...prev, ...processedNotifications])
        }

        // Check if there are more notifications to load
        setHasMore(processedNotifications.length > 0)

        if (refresh) {
          showToast(t("notifications", "toast", "refreshSuccess"), "success")
        }
      } catch (error) {
        console.error("Error fetching notifications:", error)
        showToast(t("notifications", "toast", "fetchError"), "error")

        // If API fails, use mock data for demo purposes
        if (page === 1) {
          const mockNotifications = generateMockNotifications()
          setNotifications(mockNotifications)
          setHasMore(false)
        }
      } finally {
        setIsLoading(false)
        setIsRefreshing(false)
      }
    },
    [t, createApiClient, getCurrentUser],
  )

  // Generate mock notifications for demo/fallback
  const generateMockNotifications = useCallback(() => {
    const user = getCurrentUser()
    const currentUserId = user.id || 1

    return [
      // Welcome notification
      {
        id: 1,
        recipient_id: currentUserId,
        message: "👋 Welcome to ESI Flow! Your account has been created successfully.",
        type: "info",
        request_id: null,
        intervention_id: null,
        delivery_method: "app_notification",
        seen: false,
        created_at: new Date(new Date().setMinutes(new Date().getMinutes() - 10)).toISOString(),
        group: "today",
        title: "Welcome to ESI Flow",
        entity_type: "user",
      },
      // Request creation notification
      {
        id: 2,
        recipient_id: currentUserId,
        message: "A new maintenance request has been submitted for the air conditioning unit in Building A.",
        type: "info",
        request_id: 123,
        intervention_id: null,
        delivery_method: "app_notification",
        seen: false,
        created_at: new Date(new Date().setMinutes(new Date().getMinutes() - 30)).toISOString(),
        group: "today",
        title: "New Maintenance Request",
        entity_type: "request",
      },
      // More mock notifications...
      {
        id: 3,
        recipient_id: currentUserId,
        message:
          "Your maintenance request for the printer in Room 101 has been refused. Reason: Equipment scheduled for replacement next week.",
        type: "error",
        request_id: 124,
        intervention_id: null,
        delivery_method: "app_notification",
        seen: false,
        created_at: new Date(new Date().setHours(new Date().getHours() - 2)).toISOString(),
        group: "today",
        title: "Request Refused",
        entity_type: "request",
      },
    ]
  }, [getCurrentUser])

  // Initial fetch
  useEffect(() => {
    fetchNotifications()
  }, [fetchNotifications])

  // Filter notifications when activeFilter or searchQuery changes
  useEffect(() => {
    let filtered = [...notifications]

    // Apply filter
    if (activeFilter === "unread") {
      filtered = filtered.filter((notification) => !notification.seen)
    } else if (activeFilter === "requests") {
      filtered = filtered.filter((notification) => notification.entity_type === "request")
    } else if (activeFilter === "tasks") {
      filtered = filtered.filter((notification) => notification.entity_type === "intervention")
    } else if (activeFilter === "System") {
      filtered = filtered.filter(
        (notification) => notification.entity_type === "System" || notification.entity_type === "equipment",
      )
    }

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (notification) =>
          notification.title.toLowerCase().includes(query) || notification.message.toLowerCase().includes(query),
      )
    }

    setFilteredNotifications(filtered)
  }, [activeFilter, searchQuery, notifications])

  // Group notifications by date
  const groupedNotifications = {
    today: filteredNotifications.filter((n) => n.group === "today"),
    yesterday: filteredNotifications.filter((n) => n.group === "yesterday"),
    thisWeek: filteredNotifications.filter((n) => n.group === "thisWeek"),
    older: filteredNotifications.filter((n) => n.group === "older"),
  }

  // Count notifications by type
  const notificationCounts = {
    all: notifications.length,
    unread: notifications.filter((n) => !n.seen).length,
    requests: notifications.filter((n) => n.entity_type === "request").length,
    tasks: notifications.filter((n) => n.entity_type === "intervention").length,
    System: notifications.filter((n) => n.entity_type === "System" || n.entity_type === "equipment").length,
  }

  // Show toast notification
  const showToast = useCallback((message, type = "success") => {
    setToast({
      visible: true,
      message,
      type,
    })
  }, [])

  // Hide toast notification
  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }))
  }, [])

  // Mark notification as read
  const handleMarkAsRead = useCallback(
    async (notificationId) => {
      try {
        const apiClient = createApiClient()

        // Update notification on server
        await apiClient.put(`/notifications/${notificationId}`, {
          seen: true,
        })

        // Update local state
        setNotifications((prev) =>
          prev.map((notification) =>
            notification.id === notificationId ? { ...notification, seen: true } : notification,
          ),
        )

        showToast(t("notifications", "toast", "markedAsRead"), "success")
      } catch (error) {
        console.error("Error marking notification as read:", error)
        showToast(t("notifications", "toast", "updateError"), "error")
      }
    },
    [t, showToast, createApiClient],
  )

  // Delete notification
  const handleDeleteNotification = useCallback(
    async (notificationId) => {
      try {
        const apiClient = createApiClient()

        // Delete notification on server
        await apiClient.delete(`/notifications/${notificationId}`)

        // Update local state
        setNotifications((prev) => prev.filter((notification) => notification.id !== notificationId))

        showToast(t("notifications", "toast", "deleted"), "success")
      } catch (error) {
        console.error("Error deleting notification:", error)
        showToast(t("notifications", "toast", "deleteError"), "error")
      }
    },
    [showToast, t, createApiClient],
  )

  // Mark all notifications as read
  const handleMarkAllAsRead = useCallback(async () => {
    try {
      const apiClient = createApiClient()

      // Get all unread notification IDs
      const unreadIds = notifications
        .filter((notification) => !notification.seen)
        .map((notification) => notification.id)

      // If no unread notifications, return
      if (unreadIds.length === 0) {
        showToast(t("notifications", "toast", "noUnreadNotifications"), "info")
        return
      }

      // Update each notification (in a real app, you might have a bulk update endpoint)
      await Promise.all(unreadIds.map((id) => apiClient.put(`/notifications/${id}`, { seen: true })))

      // Update local state
      setNotifications((prev) => prev.map((notification) => ({ ...notification, seen: true })))

      showToast(t("notifications", "toast", "markedAllRead"), "success")
    } catch (error) {
      console.error("Error marking all notifications as read:", error)
      showToast(t("notifications", "toast", "updateError"), "error")
    }
  }, [notifications, t, showToast, createApiClient])

  // Refresh notifications
  const handleRefresh = useCallback(() => {
    fetchNotifications(true)
  }, [fetchNotifications])

  // Load more notifications
  const handleLoadMore = useCallback(() => {
    const nextPage = currentPage + 1
    setCurrentPage(nextPage)
    fetchNotifications(false, nextPage)
  }, [currentPage, fetchNotifications])

  // Clear search
  const handleClearSearch = useCallback(() => {
    setSearchQuery("")
  }, [])

  // Toast Component
  const Toast = ({ message, type, visible, onClose, duration = 3000 }) => {
    useEffect(() => {
      if (visible) {
        const timer = setTimeout(() => {
          onClose()
        }, duration)

        return () => clearTimeout(timer)
      }
    }, [visible, onClose, duration])

    const getIcon = () => {
      switch (type) {
        case "Success":
          return <CheckCircle className="h-5 w-5 text-green-500" />
        case "Error":
          return <AlertTriangle className="h-5 w-5 text-red-500" />
        case "Info":
          return <Info className="h-5 w-5 text-blue-500" />
        case "Warning":
          return <AlertTriangle className="h-5 w-5 text-amber-500" />
        default:
          return <Info className="h-5 w-5 text-blue-500" />
      }
    }

    const getBgColor = () => {
      switch (type) {
        case "Success":
          return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
        case "Error":
          return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
        case "Info":
          return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
        case "Warning":
          return "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
        default:
          return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
      }
    }

    const getTextColor = () => {
      switch (type) {
        case "Success":
          return "text-green-800 dark:text-green-200"
        case "Error":
          return "text-red-800 dark:text-red-200"
        case "Info":
          return "text-blue-800 dark:text-blue-200"
        case "Warning":
          return "text-amber-800 dark:text-amber-200"
        default:
          return "text-blue-800 dark:text-blue-200"
      }
    }

    return visible ? (
      <div className="fixed top-4 right-4 z-50 max-w-md animate-fade-in-down">
        <div className={`flex items-center p-4 rounded-lg shadow-lg border ${getBgColor()}`}>
          <div className="flex-shrink-0 mr-3">{getIcon()}</div>
          <div className={`flex-1 ${getTextColor()}`}>{message}</div>
          <button
            onClick={onClose}
            className="ml-4 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      </div>
    ) : null
  }

  // Filter Tab Component
  const FilterTab = ({ label, active, count, onClick }) => {
    return (
      <button
        className={`px-3 py-2 text-sm font-medium rounded-t-lg transition-colors ${
          active
            ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400 bg-blue-50/50 dark:bg-blue-900/10"
            : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
        }`}
        onClick={onClick}
      >
        <div className="flex items-center">
          {label}
          {count > 0 && (
            <span
              className={`ml-1.5 px-1.5 py-0.5 text-xs rounded-full ${
                active
                  ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                  : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
              }`}
            >
              {count}
            </span>
          )}
        </div>
      </button>
    )
  }

  // Notification Item Component
  const NotificationItem = ({ notification, onMarkAsRead, onDelete }) => {
    const [showActions, setShowActions] = useState(false)

    // Get the appropriate icon based on notification type and entity_type
    const getIcon = () => {
      // First check entity_type
      if (notification.entity_type === "user") {
        return <UserPlus size={20} className="text-purple-500" />
      } else if (notification.entity_type === "request") {
        if (notification.type === "Warning") {
          return <XCircle size={20} className="text-red-500" />
        } else if (notification.type === "Success") {
          return <CheckCircle size={20} className="text-green-500" />
        } else {
          return <MessageSquare size={20} className="text-blue-500" />
        }
      } else if (notification.entity_type === "intervention") {
        if (notification.type === "Success") {
          return <CheckSquare size={20} className="text-green-500" />
        } else {
          return <Tool size={20} className="text-amber-500" />
        }
      } else if (notification.entity_type === "equipment") {
        return <Tool size={20} className="text-indigo-500" />
      } else if (notification.entity_type === "System") {
        return <Shield size={20} className="text-blue-500" />
      }

      // Fallback to type-based icons
      switch (notification.type) {
        case "Info":
          return <Info size={20} className="text-blue-500" />
        case "Warning":
          return <AlertTriangle size={20} className="text-amber-500" />
        case "Error":
          return <AlertTriangle size={20} className="text-red-500" />
        case "Success":
          return <CheckCircle size={20} className="text-green-500" />
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
        return `${diffInMinutes} minutes ago`
      } else if (diffInMinutes < 24 * 60) {
        const hours = Math.floor(diffInMinutes / 60)
        return `${hours} hours ago`
      } else {
        const days = Math.floor(diffInMinutes / (24 * 60))
        return `${days} days ago`
      }
    }

    // Get background color based on notification type and read status
    const getBackgroundColor = () => {
      if (!notification.seen) {
        return "bg-blue-50 dark:bg-blue-900/10"
      }

      switch (notification.type) {
        case "Error":
          return isDarkMode ? "hover:bg-red-900/10" : "hover:bg-red-50"
        case "Info":
          return isDarkMode ? "hover:bg-blue-900/10" : "hover:bg-blue-50"
        case "Success":
          return isDarkMode ? "hover:bg-green-900/10" : "hover:bg-green-50"
        case "Warning":
          return isDarkMode ? "hover:bg-amber-900/10" : "hover:bg-amber-50"
        default:
          return isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"
      }
    }

    return (
      <div
        className={`flex p-4 border-b border-gray-100 dark:border-gray-700 transition-colors ${
          !notification.seen ? "bg-blue-50 dark:bg-blue-900/10" : ""
        } ${getBackgroundColor()}`}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        <div className="mr-4 mt-1">
          <div className="p-2 rounded-full bg-white dark:bg-neutral-800 shadow-sm">{getIcon()}</div>
        </div>
        <div className="flex-1">
          <h3
            className={`text-sm font-medium ${
              !notification.seen ? "text-blue-600 dark:text-blue-400" : "text-neutral-950 dark:text-neutral-100"
            }`}
          >
            {notification.message}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.title}</p>
          <div className="flex items-center mt-2 text-xs text-gray-500">
            <span className="flex items-center">
              <Clock size={12} className="mr-1" />
              {formatTime(notification.created_at)}
            </span>
            {notification.request_id && (
              <>
                <span className="mx-1">•</span>
                <span>Request #{notification.request_id}</span>
              </>
            )}
            {notification.intervention_id && (
              <>
                <span className="mx-1">•</span>
                <span>Task #{notification.intervention_id}</span>
              </>
            )}
          </div>
        </div>
        <div className="ml-2 flex items-start space-x-1">
          {(showActions || !notification.seen) && (
            <>
              {!notification.seen && (
                <button
                  onClick={() => onMarkAsRead(notification.id)}
                  className="p-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                  title="Mark as read"
                >
                  <Eye size={14} />
                </button>
              )}
              <button
                onClick={() => onDelete(notification.id)}
                className="p-1.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-full hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-900/30 dark:hover:text-red-400 transition-colors"
                title="Delete"
              >
                <Trash2 size={14} />
              </button>
            </>
          )}
          {!showActions && notification.seen && (
            <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
              <MoreVertical size={16} className="text-gray-500" />
            </button>
          )}
        </div>
      </div>
    )
  }

  // Notification Group Component
  const NotificationGroup = ({ title, notifications, onMarkAsRead, onDelete }) => {
    if (notifications.length === 0) return null

    return (
      <div className="mb-6 animate-fade-in">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base font-medium text-gray-900 dark:text-gray-100">{title}</h2>
          <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
            {notifications.length}
          </span>
        </div>
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={onMarkAsRead}
              onDelete={onDelete}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 dark:bg-neutral-900">
      {/* Toast Notification */}
      <Toast message={toast.message} type={toast.type} visible={toast.visible} onClose={hideToast} />

      {/* Show sidebar */}
      <Sidebar
        activeItem={"notifications"}/>

      {/* Main content */}
      <div className=" flex-1 overflow-y-auto pb-8 bg-gray-50 dark:bg-neutral-990">
        <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center py-4 text-sm">
            <span className="text-gray-500 dark:text-gray-400">Dashboard</span>
            <ChevronRight className="h-4 w-4 text-gray-400 mx-1" />
            <span className="font-medium text-gray-900 dark:text-gray-200">Notifications</span>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-medium text-gray-900 dark:text-white flex items-center">
              Notifications
              <div className="ml-2 p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Bell className="text-blue-600 dark:text-blue-400" size={20} />
              </div>
              {notificationCounts.unread > 0 && (
                <span className="ml-3 px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                  {notificationCounts.unread} unread
                </span>
              )}
            </h1>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleRefresh}
                className={`p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${isRefreshing ? "animate-spin" : ""}`}
                disabled={isRefreshing}
                title="Refresh"
              >
                <RefreshCw size={18} />
              </button>
              <button
                onClick={handleMarkAllAsRead}
                className="hidden sm:flex items-center px-3 py-1.5 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors"
              >
                <Eye size={16} className="mr-1.5" />
                Mark all as read
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Mobile Filters Button */}
          <div className="sm:hidden mb-4">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="w-full flex items-center justify-center px-4 py-2 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300"
            >
              <Filter size={16} className="mr-2" />
              Filters
              <ChevronRight size={16} className={`ml-2 transition-transform ${showMobileFilters ? "rotate-90" : ""}`} />
            </button>
          </div>

          {/* Filters */}
          <div
            className={`${showMobileFilters ? "block" : "hidden"} sm:block mb-6 border-b border-gray-200 dark:border-gray-700`}
          >
            <div className="flex flex-wrap">
              <FilterTab
                label="All"
                active={activeFilter === "all"}
                count={notificationCounts.all}
                onClick={() => setActiveFilter("all")}
              />
              <FilterTab
                label="Unread"
                active={activeFilter === "unread"}
                count={notificationCounts.unread}
                onClick={() => setActiveFilter("unread")}
              />
              <FilterTab
                label="Requests"
                active={activeFilter === "requests"}
                count={notificationCounts.requests}
                onClick={() => setActiveFilter("requests")}
              />
              <FilterTab
                label="Tasks"
                active={activeFilter === "tasks"}
                count={notificationCounts.tasks}
                onClick={() => setActiveFilter("tasks")}
              />
              <FilterTab
                label="System"
                active={activeFilter === "System"}
                count={notificationCounts.System}
                onClick={() => setActiveFilter("System")}
              />
            </div>
          </div>

          {/* Notifications List */}
          {isLoading ? (
            <div className="flex flex-col justify-center items-center h-64 bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-8">
              <Loader2 className="h-10 w-10 animate-spin text-blue-500 mb-4" />
              <span className="text-gray-600 dark:text-gray-400">Loading notifications...</span>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-neutral-800 rounded-lg shadow-sm animate-fade-in">
              <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full inline-flex">
                <Bell className="h-8 w-8 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="mt-4 text-base font-medium text-gray-900 dark:text-gray-100">No notifications found</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Check back later for new notifications</p>
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="mt-4 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-sm hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Today's notifications */}
              <NotificationGroup
                title="Today"
                notifications={groupedNotifications.today}
                onMarkAsRead={handleMarkAsRead}
                onDelete={handleDeleteNotification}
              />

              {/* Yesterday's notifications */}
              <NotificationGroup
                title="Yesterday"
                notifications={groupedNotifications.yesterday}
                onMarkAsRead={handleMarkAsRead}
                onDelete={handleDeleteNotification}
              />

              {/* This week's notifications */}
              <NotificationGroup
                title="This Week"
                notifications={groupedNotifications.thisWeek}
                onMarkAsRead={handleMarkAsRead}
                onDelete={handleDeleteNotification}
              />

              {/* Older notifications */}
              <NotificationGroup
                title="Older"
                notifications={groupedNotifications.older}
                onMarkAsRead={handleMarkAsRead}
                onDelete={handleDeleteNotification}
              />

              {/* Load more button */}
              {hasMore && (
                <div className="mt-6 text-center animate-fade-in">
                  <button
                    className="px-4 py-2 text-sm bg-white dark:bg-neutral-800 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:shadow transition-all"
                    onClick={handleLoadMore}
                  >
                    Load more
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// Add these animations to your globals.css
// @keyframes fade-in-down {
//   0% {
//     opacity: 0;
//     transform: translateY(-10px);
//   }
//   100% {
//     opacity: 1;
//     transform: translateY(0);
//   }
// }

// @keyframes fade-in {
//   0% {
//     opacity: 0;
//   }
//   100% {
//     opacity: 1;
//     transform: translateY(0);
//   }
// }

// .animate-fade-in-down {
//   animation: fade-in-down 0.3s ease-out forwards;
// }

// .animate-fade-in {
//   animation: fade-in 0.3s ease-out forwards;
// }