import axios from "axios"

// Base URL for API requests
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add request interceptor for authentication if needed
apiClient.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    const token = localStorage.getItem("user")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors here
    if (error.response) {
      // Server responded with an error status
      console.error("API Error:", error.response.status, error.response.data)

      // Handle authentication errors
      if (error.response.status === 401) {
        // Redirect to login or refresh token
        console.log("Authentication error, redirecting to login...")
        // window.location.href = '/login';
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error("Network Error:", error.request)
    } else {
      // Something else happened
      console.error("Error:", error.message)
    }

    return Promise.reject(error)
  },
)

// Fetch all users
export const fetchUsers = async () => {
  try {
    const response = await apiClient.get("/users")
    return response.data
  } catch (error) {
    console.error("Error fetching users:", error)
    throw error
  }
}

// Fetch all requests
export const fetchRequests = async () => {
  try {
    const response = await apiClient.get("/requests")
    return response.data
  } catch (error) {
    console.error("Error fetching requests:", error)
    throw error
  }
}

// Fetch all interventions
export const fetchInterventions = async () => {
  try {
    const response = await apiClient.get("/interventions")
    return response.data
  } catch (error) {
    console.error("Error fetching interventions:", error)
    throw error
  }
}

// Fetch all equipment
export const fetchEquipment = async () => {
  try {
    const response = await apiClient.get("/equipments")
    return response.data
  } catch (error) {
    console.error("Error fetching equipment:", error)
    throw error
  }
}

// Fetch all dashboard data in parallel
export const fetchDashboardData = async () => {
  try {
    const [users, requests, interventions, equipment] = await Promise.all([
      fetchUsers(),
      fetchRequests(),
      fetchInterventions(),
      fetchEquipment(),
    ])

    return {
      users,
      requests,
      interventions,
      equipment,
    }
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    throw error
  }
}

// Additional API functions can be added here
export const createUser = async (userData) => {
  try {
    const response = await apiClient.post("/users", userData)
    return response.data
  } catch (error) {
    console.error("Error creating user:", error)
    throw error
  }
}

export const updateRequest = async (id, requestData) => {
  try {
    const response = await apiClient.put(`/requests/${id}`, requestData)
    return response.data
  } catch (error) {
    console.error("Error updating request:", error)
    throw error
  }
}

export const createIntervention = async (interventionData) => {
  try {
    const response = await apiClient.post("/interventions", interventionData)
    return response.data
  } catch (error) {
    console.error("Error creating intervention:", error)
    throw error
  }
}

export const updateEquipmentStatus = async (id, status) => {
  try {
    const response = await apiClient.patch(`/equipments/${id}`, { status })
    return response.data
  } catch (error) {
    console.error("Error updating equipment status:", error)
    throw error
  }
}