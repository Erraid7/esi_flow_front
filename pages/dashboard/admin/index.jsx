"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Sidebar from "../../components/sidebar";
import axios from "axios";
import DynamicTable from "../../components/dynamicTable1";

import EquipmentStatusChart from "../../components/equipmentStatusChart.jsx";
import StateCards from "../../stateCard.jsx";
import NotificationAndCreateUserCards from "./notcraete";
import { useLanguage } from "../../translations/contexts/languageContext";
import { useDarkMode } from "../../darkLightMode/darkModeContext";
import DynamicPieChart from "../../components/pie";
import { useRouter } from "next/navigation";
import { AlertTriangle, X } from 'lucide-react';
import Toast from "@/pages/components/form_components/toast";

// API service for data fetching
import { fetchDashboardData } from "../../components/api";

const Dashboard = () => {
  const { t } = useLanguage();
  const { isDarkMode } = useDarkMode();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [screenSize, setScreenSize] = useState("desktop"); // 'mobile', 'tablet', 'desktop'
  const [isMobile, setIsMobile] = useState(false);
  const [data, setData] = useState([])
  // State for API data
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [interventions, setInterventions] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState("")
  const router = useRouter();
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, request: null });
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });
  
  // State for storing request statistics
  const [requestStats, setRequestStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    completedRequests: 0,
    loading: true,
    error: null,
  })


  // Fetch data from API
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const data = await fetchDashboardData();

        setUsers(data.users);
        setRequests(data.requests);
        setInterventions(data.interventions);
        setEquipment(data.equipment);
        setError(null);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

    // Fetch all requests from the API
    useEffect(() => {
      const fetchRequests = async () => {
        try {
          // get user role from local storage
          const user = JSON.parse(localStorage.getItem("user"));
          if (user) { 
            setUserRole(user.role);
          } else {
            console.error("User not found in local storage");
            setUserRole("personal");
          }


          setLoading(true)
          const response = await axios.get("https://esi-flow-back.onrender.com/requests")
          console.log("Raw API response:", response.data)

          // sort the requests by created_at date in descending order
          response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  
          // Process the data to include all required information
          const processedData = response.data.map((request) => {
            // Extract requester name directly from the nested requester object
            const requesterName =
              request.requester && request.requester.full_name ? request.requester.full_name : "Unknown"
  
            // Extract inventory code or other equipment info from the nested equipment object
            const inventoryCode = request.equipment && request.equipment.id ? `INV-${request.equipment.id}` : "N/A"
  
            // Extract location safely
            const location =
              request.localisation ||
              (request.equipment && typeof request.equipment.localisation === "string"
                ? request.equipment.localisation
                : "N/A")
  
            // Format date
            let createdAt = "N/A"
            if (request.created_at) {
              try {
                createdAt = new Date(request.created_at).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              } catch (error) {
                console.error("Error formatting date:", error)
                createdAt = String(request.created_at)
              }
            }
  
            // Make sure all fields are primitive values (strings, numbers) not objects
            return {
              id: request.id,
              req_code: request.request_code || "N/A", // Add this line
              title: request.title || "No Title",
              location: location,
              requestedBy: requesterName,
              urgency: request.priority || "N/A",
              status: request.req_status || "N/A",
              createdAt: createdAt,
              inventoryCode: inventoryCode,
              description: request.description || "No description",
            };
          })
  
          setData(processedData)
          console.log("Processed data:", processedData)
  
          // Calculate statistics
          const totalRequests = processedData.length
          const pendingRequests = processedData.filter(
            (request) => request.status === "Reviewing" || request.status === "In Progress",
          ).length
          const completedRequests = processedData.filter((request) => request.status === "Completed").length
  
          setRequestStats({
            totalRequests,
            pendingRequests,
            completedRequests,
            loading: false,
            error: null,
          })
  
          setLoading(false)
        } catch (error) {
          console.error("Error fetching requests:", error)
          setRequestStats((prev) => ({
            ...prev,
            loading: false,
            error: "Failed to fetch requests",
          }))
          setLoading(false)
        }
      }
  
      fetchRequests()
    }, [])

    const showToast = (message, type = "success") => {
      setToast({
        visible: true,
        message,
        type,
      });
      // Auto-dismiss after 3 seconds
      setTimeout(() => {
        setToast((prev) => ({ ...prev, visible: false }));
      }, 3000);
    };

    const hideToast = () => {
      setToast((prev) => ({ ...prev, visible: false }));
    };
  
  // Handle edit request
  const handleEdit = (row) => {
    router.push(`/request/edit/${row.id}`);
  };

  // Handle add request
  const handleAdd = () => {
    router.push(`/request/add`);
  };

  // Handle accept request
  const handleAccept = async (row) => {
    router.push(`/task/add?requestId=${row.id}`)
  }

  // Handle reject request
  const handleReject = async (row) => {
    try {
      const updatedRequest = { ...row, status: "Refused" }
      updatedRequest.req_status = "Refused"
      
      const response = await axios.put(`https://esi-flow-back.onrender.com/requests/${row.id}`, updatedRequest)
      console.log("API response:", response.data)
      setData((prevData) =>
        prevData.map((request) => (request.id === row.id ? updatedRequest : request))
      )
      setRequestStats((prev) => ({
        ...prev,
        pendingRequests: prev.pendingRequests - 1,
        completedRequests: prev.completedRequests + 1,
      }))
      showToast("Request rejected successfully", "success")
    } catch (error) {
      console.error("Error rejecting request:", error)
      alert("Failed to reject request")
    }
  }

  // Handle delete confirmation
  const confirmDelete = (row) => {
    setDeleteModal({ isOpen: true, request: row });
  };

  // Handle actual deletion
  const handleDelete = async () => {
    try {
      const row = deleteModal.request;
      if (!row) return;

      await axios.delete(`https://esi-flow-back.onrender.com/requests/${row.id}`);

      // Remove the deleted request from the state
      setData((prevData) => prevData.filter((request) => request.id !== row.id));

      // Update statistics
      setRequestStats((prev) => ({
        ...prev,
        totalRequests: prev.totalRequests - 1,
        pendingRequests: row.status === "Reviewing" ? prev.pendingRequests - 1 : prev.pendingRequests,
        completedRequests: 
          row.status === "Accepted" || row.status === "Refused" ? prev.completedRequests - 1 : prev.completedRequests,
      }));

      // Close modal
      setDeleteModal({ isOpen: false, request: null });
      showToast("Request deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting request:", error);
      showToast("Failed to delete request", "error");
      setDeleteModal({ isOpen: false, request: null });
    }
  };

  // Custom delete confirmation modal
  const DeleteConfirmationModal = () => {
    if (!deleteModal.isOpen) return null;
    const request = deleteModal.request;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className={`bg-white dark:bg-neutral-800 rounded-lg shadow-lg max-w-md w-full p-6 ${isDarkMode ? "border border-neutral-700" : "border border-neutral-200"}`}>
          <div className="flex items-center mb-4">
            <div className="mr-4 bg-red-100 dark:bg-red-900/30 p-2 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-medium text-neutral-900 dark:text-white">
              {t("dashboard", "requests", "deleteConfirm") || "Confirm Deletion"}
            </h3>
          </div>

          <div className="mb-6">
            <p className="text-neutral-700 dark:text-neutral-300 mb-4">
              {`Are you sure you want to delete the request "${request?.title || ""}"? This action cannot be undone.`}
            </p>

            <div className="bg-neutral-100 dark:bg-neutral-700/50 p-3 rounded-md mb-4">
              <div className="grid grid-cols-2 gap-2">
                <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Title:</span>
                <span className="text-sm text-neutral-900 dark:text-white">{request?.title}</span>

                <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Requested By:</span>
                <span className="text-sm text-neutral-900 dark:text-white">{request?.requestedBy}</span>

                <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Status:</span>
                <span className="text-sm text-neutral-900 dark:text-white">{request?.status}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setDeleteModal({ isOpen: false, request: null })}
              className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-neutral-800 dark:text-white rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
            >
              Delete Request
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScreenSize("mobile");
        setIsMobile(true);
      } else if (window.innerWidth < 1024) {
        setScreenSize("tablet");
        setIsMobile(false);
      } else {
        setScreenSize("desktop");
        setIsMobile(false);
      }
    };

    // Set initial size
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu when switching to desktop
  useEffect(() => {
    if (screenSize === "desktop") {
      setIsMobileMenuOpen(false);
    }
  }, [screenSize]);

  // Process equipment data for pie chart
  const getEquipmentStatusData = () => {
    if (!equipment.length)
      return [
        { eqp_status: "Working", value: 400 },
        { eqp_status: "Needs Maintenance", value: 200 },
        { eqp_status: "Out of service", value: 100 },
      ];

    const statusCounts = {
      Working: 0,
      "Needs Maintenance": 0,
      "Out of service": 0,
    };

    equipment.forEach((item) => {
      if (item.eqp_status in statusCounts) {
        statusCounts[item.eqp_status]++;
      }
    });

    return Object.entries(statusCounts).map(([name, value]) => ({
      name,
      value,
    }));
  };

  // Process request data for priority donut chart
  const getRequestPriorityData = () => {
    if (!requests.length)
      return [
        { name: t("dashboard", "charts", "priority", "high"), value: 400 },
        { name: t("dashboard", "charts", "priority", "medium"), value: 200 },
        { name: t("dashboard", "charts", "priority", "low"), value: 100 },
      ];

    const priorityCounts = {
      High: 0,
      Medium: 0,
      Low: 0,
    };

    requests.forEach((request) => {
      if (request.priority in priorityCounts) {
        priorityCounts[request.priority]++;
      }
    });

    return [
      {
        name:"High",
        value: priorityCounts.High,
      },
      {
        name: "Medium",
        value: priorityCounts.Medium,
      },
      {
        name: "Low",
        value: priorityCounts.Low,
      },
    ];
  };

  // Process request data for status chart
  const getRequestStatusData = () => {
    if (!interventions.length)
      return [
        { name: "Cancelled", count: 45, color: "#FFB6C1" },
        { name: "In Progress", count: 65, color: "#FFE4B5" },
        { name: "Pendding", count: 58, color: "#FFFACD" },
        { name: "Completed", count: 98, color: "#BAFAD0" },
        { name: "To Do", count: 30, color: "#ADD8E6" },
      ];

    const statusCounts = {
      Cancelled: { count: 0, color: "#FFB6C1" },
      "In Progress": { count: 0, color: "#FFE4B5" },
      Pending: { count: 0, color: "#FFFACD" },
      Completed: { count: 0, color: "#BAFAD0" },
      "To Do": { count: 0, color: "#ADD8E6" },
    };

    interventions.forEach((intervention) => {
      if (intervention.intv_status in statusCounts) {
        statusCounts[intervention.intv_status].count++;
      }
    });

    return Object.entries(statusCounts).map(([name, data]) => ({
      name,
      count: data.count,
      color: data.color,
    }));
  };

  // Prepare state cards data
  const getDynamicCardsData = () => {
    return [
      {
        id: "users",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        ),
        title: "Total Users",
        count: `${users.length || 0} active users`,
        buttonText: "Manage Users",
        path: "/user/list",
      },
      {
        id: "technicians",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ),
        title: "Technicians",
        count: `${
          users.filter((user) => user.role === "Technician").length || 0
        } available technicians`,
        buttonText: "View Technicians",
        path: "/user/list",
      },
      {
        id: "requests",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        ),
        title: "Active Requests",
        count: `${
          requests.filter(
            (req) =>
              req.req_status !== "Accepted" && req.req_status !== "Refused"
          ).length || 0
        } pending requests`,
        buttonText: "View Requests",
        path: "/request/list",
      },
    ];
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex h-screen bg-neutral-50 dark:bg-neutral-990 overflow-hidden">
        <Sidebar activeItem={"dashboard"} />
        <div className="flex-1 overflow-auto pt-16 lg:pt-0">
          <div className="p-4 md:p-8 lg:p-12 flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-lg dark:text-white">
                Loading dashboard data...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex h-screen bg-neutral-50 dark:bg-neutral-990 overflow-hidden">
        <Toast message={toast.message} type={toast.type} visible={toast.visible} onClose={hideToast} />
        <Sidebar activeItem={"dashboard"} />
        <div className="flex-1 overflow-auto pt-16 lg:pt-0">
          <div className="p-4 md:p-8 lg:p-12 flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-red-500 text-5xl mb-4">⚠️</div>
              <p className="text-lg text-red-500 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }



  return (
    <div className="pt-14 lg:pt-0 flex min-h-screen bg-neutral-50 dark:bg-neutral-990 overflow-hidden">
      <Head>
        <title>{t("dashboard", "title")}</title>
        <meta name="description" content="ESI Flow Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Toast notification */}
      <Toast message={toast.message} type={toast.type} visible={toast.visible} onClose={hideToast} />



      {/* Sidebar component - visible by default on desktop */}
      <Sidebar activeItem={"dashboard"} />

      {/* Main content with padding adjustment for mobile header */}
      <div className="flex-1 overflow-auto pt-16 lg:pt-0">
        <div className="p-4 md:p-8 lg:p-12">
          {/* StateCard implementation */}
          <div className="mb-6">
            <StateCards cardsData={getDynamicCardsData()} />
          </div>

          {/* Dashboard Overview */}
          <h2 className="text-2xl font-russo mb-4 dark:text-white">
            {t("dashboard", "overview")}
          </h2>

          {/* Charts Grid - Responsive Layout */}
          <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-6 mb-6">
            {/* Priority Request Chart - Takes 1/3 of the space on medium+ screens */}
            <div className="md:col-span-1">
              <DynamicPieChart
                data={getRequestPriorityData()}
                colors={["#FF4C61", "#FFC233", "#4CB5F5"]}
                title={t("dashboard", "technician", "mostFrequentIssues")}
                chartType="donut"
                cardWidth="100%"
              />
            </div>

            {/* Equipment Status Chart - Takes 2/3 of the space on medium+ screens */}
            <div className="md:col-span-2">
              <EquipmentStatusChart data={getRequestStatusData()} />
            </div>
          </div>

          <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-6">
            {/* Equipment Status Pie Chart */}
            <div>
              <DynamicPieChart
                data={getEquipmentStatusData()}
                colors={["#FF4C61", "#FFC233", "#4CB5F5"]}
                title={t("dashboard", "technician", "equipmentStatus")}
                chartType="pie"
                cardWidth="100%"
              />
            </div>

            {/* Notifications and Create New User Section */}
            <div>
              <NotificationAndCreateUserCards />
            </div>
          </div>

          {/* Maintenance Tasks Table */}
          <div className="mt-6"></div>
        </div>
        <div className="px-4 md:px-20 lg:px-16 mb-6">
        <DynamicTable
          data={data}
          isDarkMode={isDarkMode}
          title={t("requestList", "searchbar", "title") || "Request List"}
          columnConfig={{
           id: { hidden: true }, // Hide ID column
              req_code: { title: t("requestList", "columns", "requestCode") || "Request Code" },
              title: { title: t("requestList", "columns", "title") || "Title" },
              location: { title: t("requestList", "columns", "location") || "Location" },
              requestedBy: { title: t("requestList", "columns", "requestedBy") || "Requested By" },
              urgency: { title: t("requestList", "columns", "urgencyLevel") || "Urgency" },
              status: { title: t("requestList", "columns", "status") || "Status" },
              createdAt: { hidden: true }, // Hide createdAt column
              inventoryCode: { hidden: true }, // Hide inventoryCode column
              description: { hidden: true }, // Hide description column
              _equipment: { hidden: true }, // Hide equipment object
              _requester: { hidden: true }, // Hide requester object
          }}
          addButtonText={t("requestList", "searchbar", "addButton") || "Add Request"}
            dropdownFields={["urgency", "status"]}
            showAcceptAction= {userRole === "Admin"} // Show accept action only for admin
            showRefuseAction= {userRole === "Admin"} // Show reject action only for admin
            showDeleteAction={userRole === "Admin"} // Show delete action only for admin
            onEdit={handleEdit}
            onDelete={confirmDelete} // Changed to open the confirmation modal
            onAddNew={handleAdd} // Added onAddNew prop for adding new users
            statusField="status"
            reviewingStatus="Reviewing"
            // Add the accept and reject functions if the user is an admin
            onAccepte={handleAccept}
            onRefuse={handleReject}
            styled={["status", "urgency"]}
        />
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal />
    </div>
  );
};

export default Dashboard;