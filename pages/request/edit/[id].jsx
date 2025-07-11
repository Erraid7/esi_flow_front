"use client"

import { useState, useEffect, useCallback } from "react"
import { useLanguage } from "../../translations/contexts/languageContext"
import Sidebar from "../../components/sidebar"
import { MapPin, AlertCircle, Loader2 } from 'lucide-react'
import FormField from "../../components/form_components/form_field"
import DropdownField from "../../components/form_components/dropdown_field"
import AutocompleteField from "../../components/form_components/autocomplete_field"
import PhotoUpload from "../../components/form_components/photoupload_field"
import Toast from "../../components/form_components/toast"
import FormSection from "../../components/form_components/form_section"
import axios from "axios"
import { useRouter, useParams } from "next/navigation"

// Main Component
export default function RequestEditForm() {
  const { t } = useLanguage()
  const router = useRouter()
  const params = useParams()
  const requestId = params?.id || ""

  // Loading state
  const [isLoading, setIsLoading] = useState(true)

  // State for toast notifications
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  })

  // Form state
  const [request, setRequest] = useState({
    id: "",
    title: "",
    location: "",
    equipmentCode: "",
    description: "",
    urgencyLevel: "",
    status: "",
    createdAt: "",
    updatedAt: "",
  })

  // Equipment state
  const [allEquipment, setAllEquipment] = useState([])
  const [equipmentList, setEquipmentList] = useState([])
  const [isLoadingEquipment, setIsLoadingEquipment] = useState(false)
  const [selectedEquipment, setSelectedEquipment] = useState(null)

  // Photos state
  const [photos, setPhotos] = useState([])
  const [deletedPhotos, setDeletedPhotos] = useState([])
  const [uploadingPhotos, setUploadingPhotos] = useState(false)

  // Form validation
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Available options for dropdowns
  const urgencyLevelOptions = ["Low", "Medium", "High"]


  // Fetch equipment data from API
  useEffect(() => {
    const fetchEquipment = async () => {
      setIsLoadingEquipment(true)
      try {
        // Fetch equipment from your API
        const response = await axios.get("https://esiflow2.onrender.com/equipments")
        
        // Format equipment data for display
        const formattedEquipment = response.data.map((equip) => ({
          id: equip.id,
          code: equip.inventorie_code || equip.code,
          type: equip.type, 
          location: equip.localisation || equip.location,
        }))
        
        setAllEquipment(formattedEquipment)
        setEquipmentList(formattedEquipment)
      } catch (error) {
        console.error("Error fetching equipment:", error)
        showToast(t("requestForm","toast","equipmentFetchError"), "error")
        // Fallback to empty list
        setAllEquipment([])
        setEquipmentList([])
      } finally {
        setIsLoadingEquipment(false)
      }
    }

    fetchEquipment()
  }, [t])

  // Fetch request data
  useEffect(() => {
    const fetchRequestData = async () => {
      if (!requestId) return
      
      setIsLoading(true)
      try {
        // Fetch request data from API
        const response = await axios.get(`https://esiflow2.onrender.com/requests/${requestId}`)
        const requestData = response.data
        
        // Format request data for the form
        const formattedRequest = {
          id: requestData.id,
          title: requestData.title,
          location: requestData.localisation || requestData.location,
          equipmentCode: "", // Will be set after finding equipment
          description: requestData.description,
          urgencyLevel: requestData.priority,
          status: requestData.status,
          createdAt: requestData.created_at,
          updatedAt: requestData.updated_at,
        }

        // Find the equipment by ID
        if (requestData.equipment_id && allEquipment.length > 0) {
          const equipment = allEquipment.find(eq => eq.id === requestData.equipment_id)
          if (equipment) {
            formattedRequest.equipmentCode = equipment.code
            setSelectedEquipment(equipment)
          }
        }

        setRequest(formattedRequest)

        // Handle photos
        if (requestData.picture) {
          // If there's a picture URL, create a photo object
          setPhotos([{
            id: "existing-photo",
            preview: requestData.picture,
            file: null
          }])
        } else {
          setPhotos([])
        }
      } catch (error) {
        console.error("Error fetching request data:", error)
        showToast(t("requestForm","toast","fetchError"), "error")
      } finally {
        setIsLoading(false)
      }
    }

    // Only fetch if equipment data is loaded
    if (allEquipment.length > 0) {
      fetchRequestData()
    }
  }, [requestId, allEquipment, t])

  // Filter equipment based on location input
  useEffect(() => {
    const filterEquipment = () => {
      if (!request.location.trim()) {
        // If location is empty, show all equipment
        setEquipmentList(allEquipment)
        return
      }

      // Filter equipment by location
      const locationLower = request.location.toLowerCase()
      const filtered = allEquipment.filter(
        (equipment) => equipment.location && equipment.location.toLowerCase().includes(locationLower),
      )

      setEquipmentList(filtered)
    }

    filterEquipment()
  }, [request.location, allEquipment])

  const handleInputChange = useCallback(
    (field, value) => {
      setRequest((prev) => ({ ...prev, [field]: value }))
      // Clear error for this field when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: null }))
      }
    },
    [errors],
  )

  const handleEquipmentSelect = useCallback(
    (code, equipment) => {
      setRequest((prev) => {
        // If location is empty and equipment is selected, auto-populate location
        if (!prev.location && equipment && equipment.location) {
          return {
            ...prev,
            equipmentCode: code,
            location: equipment.location,
          }
        }
        return { ...prev, equipmentCode: code }
      })

      setSelectedEquipment(equipment || null)

      // Clear error if present
      if (errors.equipmentCode) {
        setErrors((prev) => ({ ...prev, equipmentCode: null }))
      }
    },
    [errors],
  )

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

  const validateForm = useCallback(() => {
    const newErrors = {}

    // Required fields with translated error messages
    if (!request.title.trim()) newErrors.title = t("requestForm","validation","titleRequired")
    if (!request.description.trim()) newErrors.description = t("requestForm","validation","descriptionRequired")
    if (!request.urgencyLevel) newErrors.urgencyLevel = t("requestForm","validation","urgencyLevelRequired")
    if (!selectedEquipment || !selectedEquipment.id) newErrors.equipmentCode = t("requestForm","validation","equipmentRequired")
    if (!request.location.trim()) newErrors.location = t("requestForm","validation","locationRequired")

    return newErrors
  }, [request, selectedEquipment, t])

  // Function to upload a single photo and get its URL
  const uploadPhoto = async (photo) => {
    if (!photo || !photo.file) {
      // If it's an existing photo without a file, just return the preview URL
      if (photo && photo.preview && !photo.file) {
        return photo.preview
      }
      throw new Error("No photo to upload")
    }

    const formData = new FormData()
    formData.append("image", photo.file)

    try {
      const response = await axios.post("https://esiflow2.onrender.com/requests/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      // Check the response structure and extract the URL
      const imageUrl = response.data.imageUrl || response.data.url
      
      if (!imageUrl) {
        console.error("Upload response missing URL:", response.data)
        throw new Error("Upload response missing URL")
      }
      
      return imageUrl
    } catch (error) {
      console.error("Photo upload error:", error)
      throw new Error(`Failed to upload photo: ${error.message}`)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formErrors = validateForm()
    setErrors(formErrors)

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true)

      try {
        // Step 1: Upload any new photos
        let photoUrl = ""

        if (photos.length > 0) {
          // Check if we have a new photo to upload
          const hasNewPhoto = photos.some(photo => photo.file)
          
          if (hasNewPhoto) {
            setUploadingPhotos(true)
            // Find the first photo with a file and upload it
            const photoToUpload = photos.find(photo => photo.file)
            photoUrl = await uploadPhoto(photoToUpload)
            setUploadingPhotos(false)
          } else {
            // Use the existing photo URL
            photoUrl = photos[0].preview
          }
        }

        // Get token from localStorage
        const storedTokenStr = localStorage.getItem('user');
        let storedToken = null;

        if (storedTokenStr) {
          try {
            storedToken = JSON.parse(storedTokenStr);
          } catch (error) {
            console.error("Error parsing token from localStorage:", error);
            showToast("Authentication error. Please login again.", "error");
            return;
          }
        }

        if (!storedToken || !storedToken.id) {
          console.error("No valid user token found");
          showToast("Please login to update a request", "error");
          return;
        }
        
        // Step 2: Update the request with the photo URL
        const requestData = {
          equipment_id: selectedEquipment.id,
          title: request.title,
          description: request.description,
          localisation: request.location,
          priority: request.urgencyLevel,
          status: request.status,
          picture: photoUrl,
        }

        // Submit the request to update
        const response = await axios.put(`https://esiflow2.onrender.com/requests/${request.id}`, requestData)

        // Show success message
        showToast(t("requestForm","toast","updateSuccess"), "success")

        // Navigate back after successful update
        setTimeout(() => router.back(), 2000)
      } catch (error) {
        console.error("Error updating request:", error)
        const errorMessage = error.response?.data?.message || t("requestForm","toast","updateError")
        showToast(errorMessage, "error")
      } finally {
        setIsSubmitting(false)
        setUploadingPhotos(false)
      }
    } else {
      showToast(t("requestForm","toast","error"), "error")
    }
  }

  const handleCancel = () => {
    router.back()
  }

  // Format equipment for display in the autocomplete
  const formatEquipmentForDisplay = (equipment) => {
    if (!equipment) return null
    
    return {
      id: equipment.id,
      code: equipment.code,
      location: equipment.location,
      name: equipment.type,
      display: `${equipment.code} - ${equipment.type || 'Unknown Type'} (${equipment.location || 'Unknown Location'})`,
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-900">
      {/* Toast Notification */}
      <Toast message={toast.message} type={toast.type} visible={toast.visible} onClose={hideToast} />

      {/* Show sidebar */}
      <div><Sidebar activeItem={"requests"} /></div>

      {/* Main content */}
      <div className="pt-14 md:pt-0 flex overflow-y-auto pb-8 w-full bg-neutral-50 dark:bg-neutral-990">
        <div className="px-4 sm:px-10 lg:px-20 w-full">
          <div className="flex flex-col items-start gap-6 mb-6 pt-6 text-neutral-950 dark:text-neutral-100">
            <div className="text-sm flex items-center font-inter">
              <span>{t("requestForm","breadcrumb","dashboard")}</span>
              <span className="mx-2 text-lg">›</span>
              <span>{t("requestForm","breadcrumb","myRequests")}</span>
              <span className="mx-2 text-lg">›</span>
              <span>{t("requestForm","breadcrumb","editRequest")}</span>
            </div>
            <h1 className="text-xl lg:text-2xl font-russo">{t("requestForm","editTitle")}</h1>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <span className="ml-2 text-neutral-600 dark:text-neutral-300">{t("requestForm","loading")}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              {/* Form Header */}
              <FormSection
                title={t("requestForm","header","editTitle")}
                description={t("requestForm","header","editDescription")}
                icon={<AlertCircle size={20} />}
              >
                {/* Empty section with just the title and description */}
              </FormSection>

              {/* Request Details */}
              <div className="space-y-6">
                <FormField
                  title={t("requestForm","fields","requestTitle","label")}
                  placeholder={t("requestForm","fields","requestTitle","placeholder")}
                  value={request.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  error={errors.title}
                  required={true}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AutocompleteField
                    title={t("requestForm","fields","equipmentCode","label")}
                    placeholder={t("requestForm","fields","equipmentCode","placeholder")}
                    value={request.equipmentCode}
                    onChange={handleEquipmentSelect}
                    options={equipmentList.map(formatEquipmentForDisplay)}
                    displayKey="display"
                    valueKey="code"
                    error={errors.equipmentCode}
                    required={true}
                    loading={isLoadingEquipment}
                    emptyMessage={t("requestForm","fields","equipmentCode","noEquipmentMessage")}
                    noMatchMessage={t("requestForm","fields","equipmentCode","noMatchMessage")}
                  />

                  <FormField
                    title={t("requestForm","fields","location","label")}
                    placeholder={t("requestForm","fields","location","placeholder")}
                    value={request.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    icon={<MapPin size={16} />}
                    error={errors.location}
                    required={true}
                    comment={t("requestForm","fields","location","comment")}
                  />
                </div>

                <FormField
                  title={t("requestForm","fields","description","label")}
                  placeholder={t("requestForm","fields","description","placeholder")}
                  value={request.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  isTextarea={true}
                  error={errors.description}
                  required={true}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PhotoUpload
                    title={t("requestForm","fields","photos.label")}
                    photos={photos}
                    setPhotos={setPhotos}
                    onDeletePhoto={(photoId) => {
                      if (photoId) {
                        setDeletedPhotos((prev) => [...prev, photoId])
                      }
                    }}
                    maxPhotos={1}
                    error={errors.photos}
                    required={false}
                    comment={t("requestForm","fields","photos","comment")}
                  />

                  <DropdownField
                    title={t("requestForm","fields","urgencyLevel","label")}
                    value={request.urgencyLevel}
                    onChange={(value) => handleInputChange("urgencyLevel", value)}
                    options={urgencyLevelOptions}
                    error={errors.urgencyLevel}
                    required={true}
                    placeholder={t("requestForm","fields","urgencyLevel","placeholder")}
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`h-10 w-auto px-6 mr-3 text-sm bg-blue-500 text-white font-medium rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 transition-colors ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {uploadingPhotos
                        ? t("requestForm","actions","uploadingPhotos")
                        : t("requestForm","actions","updating")}
                    </span>
                  ) : (
                    t("requestForm","actions","update")
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  className="h-10 w-32 text-neutral-900 dark:text-neutral-300 text-sm font-medium bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 transition-colors"
                >
                  {t("requestForm","actions","cancel")}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}