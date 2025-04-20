"use client"

import { useState } from "react"
import { AlertTriangle, ChevronDown, X, Upload } from "lucide-react"
import Sidebar from "../../components/sidebar"
import axios from "axios" // Import axios

// FormField Component
const FormField = ({
  title,
  placeholder,
  value,
  onChange,
  icon,
  type = "text",
  isTextarea = false,
  error = null,
  required = false,
}) => {
  return (
    <div className="flex flex-col mb-3">
      {title && (
        <label className="block text-sm font-inter text-neutral-800 dark:text-neutral-200 mb-1">
          {title} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        {isTextarea ? (
          <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full text-sm px-4 py-3 border ${error ? "border-red-300 bg-red-50" : "border-none bg-neutral-100 dark:bg-neutral-800"} rounded-lg shadow-sm focus:ring-2 focus:ring-primary-200 focus:border-primary-500 transition-all text-neutral-800 dark:text-neutral-200 min-h-24`}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full text-sm px-4 py-3 border ${error ? "border-red-300 bg-red-50" : "border-none bg-neutral-100 dark:bg-neutral-800"} rounded-lg shadow-sm focus:ring-2 focus:ring-primary-200 focus:border-primary-500 transition-all text-neutral-800 dark:text-neutral-200`}
          />
        )}

        {icon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-700 dark:text-neutral-300" onClick={icon.onClick}>
            {icon.element}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
          <AlertTriangle size={12} className="mr-1" />
          {error}
        </p>
      )}
    </div>
  )
}

// DropdownField Component
const DropdownField = ({
  title,
  value,
  onChange,
  options = [],
  placeholder,
  error = null,
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleSelect = (option) => {
    onChange(option)
    setIsOpen(false)
  }

  return (
    <div className="flex flex-col mb-3">
      {title && (
        <label className="block text-sm font-inter text-neutral-800 dark:text-neutral-200 mb-1">
          {title} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <div
          className="flex items-center justify-between bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors shadow-sm"
          onClick={toggleDropdown}
        >
          <span className="text-sm text-neutral-700 dark:text-neutral-200">
            {value || placeholder}
          </span>
          <ChevronDown
            size={18}
            className={`text-neutral-700 dark:text-neutral-200 transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""}`}
          />
        </div>

        {isOpen && options.length > 0 && (
          <ul className="absolute w-full mt-1 bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-md shadow-lg z-10">
            {options.map((option, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-primary-50 dark:hover:bg-primary-900/30 cursor-pointer text-neutral-800 dark:text-neutral-200"
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
          <AlertTriangle size={12} className="mr-1" />
          {error}
        </p>
      )}
    </div>
  )
}

// Image preview component
const ImagePreview = ({ image, onRemove }) => {
  return (
    <div className="relative inline-block mr-2 mb-2">
      <img 
        src={URL.createObjectURL(image)} 
        alt="Preview" 
        className="h-20 w-20 object-cover rounded-md border border-neutral-200"
      />
      <button 
        type="button"
        onClick={onRemove}
        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 h-6 w-6 flex items-center justify-center"
      >
        <X size={14} />
      </button>
    </div>
  )
}

export default function AssistanceRequestForm() {
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    localisation: "",
    equipment_id: "",
    description: "",
    priority: ""
  })
  
  // For image uploads
  const [images, setImages] = useState([])
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' })

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: null })
    }
  }

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
    
    // Check if adding these files would exceed the limit
    if (images.length + selectedFiles.length > 3) {
      setErrors({ ...errors, images: "Maximum 3 photos allowed" })
      return
    }
    
    setImages([...images, ...selectedFiles])
    
    // Clear image error if it exists
    if (errors.images) {
      setErrors({ ...errors, images: null })
    }
  }

  const removeImage = (index) => {
    const updatedImages = [...images]
    updatedImages.splice(index, 1)
    setImages(updatedImages)
  }

  // Convert UI priority labels to backend format
  const mapPriorityToBackend = (uiPriority) => {
    const priorityMap = {
      "Low - Peut attendre": "low",
      "Medium - Dans les 48 heures": "medium",
      "High - Intervention urgente": "high"
    }
    return priorityMap[uiPriority] || null
  }

  const validateForm = () => {
    const newErrors = {}
   
    if (!formData.title.trim()) {
      newErrors.title = "Ce champ est obligatoire"
    }
   
    if (!formData.localisation.trim()) {
      newErrors.localisation = "Ce champ est obligatoire"
    }

    if (!formData.equipment_id.trim()) {
      newErrors.equipment_id = "Ce champ est obligatoire"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Ce champ est obligatoire"
    }

    if (!formData.priority) {
      newErrors.priority = "Veuillez sélectionner un niveau d'urgence"
    }

    if (images.length === 0) {
      newErrors.images = "Au moins une photo est requise"
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
   
    const formErrors = validateForm()
    setErrors(formErrors)

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true)
      setSubmitMessage({ type: '', text: '' })
      
      try {
        // Create FormData object to handle file uploads
        const formDataToSend = new FormData()
        
        // Add text fields to FormData
        formDataToSend.append('title', formData.title)
        formDataToSend.append('localisation', formData.localisation)
        formDataToSend.append('equipment_id', formData.equipment_id)
        formDataToSend.append('description', formData.description)
        formDataToSend.append('priority', mapPriorityToBackend(formData.priority))
        
        // Add images to FormData
        // The backend expects a field named 'picture'
        images.forEach(image => {
          formDataToSend.append('picture', image)
        })
        
        // Send POST request to backend API
        const response = await axios.post('/requests', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        
        // Handle successful response
        console.log('Request submitted successfully:', response.data)
        setSubmitMessage({ 
          type: 'success', 
          text: 'Votre demande a été soumise avec succès!' 
        })
        console.log('Response:', response.data)
        // Reset form after successful submission
        setFormData({
          title: "",
          localisation: "",
          equipment_id: "",
          description: "",
          priority: ""
        })
        setImages([])
        
      } catch (error) {
        console.error('Error submitting request:', error)
        
        // Handle different types of errors
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setSubmitMessage({ 
            type: 'error', 
            text: error.response.data.message || 'Une erreur est survenue lors de la soumission de votre demande.' 
          })
        } else if (error.request) {
          // The request was made but no response was received
          setSubmitMessage({ 
            type: 'error', 
            text: 'Impossible de se connecter au serveur. Veuillez vérifier votre connexion internet.' 
          })
        } else {
          // Something happened in setting up the request that triggered an Error
          setSubmitMessage({ 
            type: 'error', 
            text: 'Une erreur est survenue lors de la préparation de votre demande.' 
          })
        }
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  // Updated urgency level options
  const urgencyLevelOptions = [
    "Low - Peut attendre",
    "Medium - Dans les 48 heures",
    "High - Intervention urgente"
  ]

  // Current user for sidebar
  const currentUser = {
    name: "MEHDAOUI Lokman",
    role: "admin",
    initials: "AD"
  }  

  return (
    <div className="flex min-h-screen gap-3 bg-gray-50 dark:bg-neutral-900 ">
      <Sidebar 
        activeItem={"requests"}
        userRole={currentUser.role}
        userName={currentUser.name}
        userInitials={currentUser.initials}
      />
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-990 text-neutral-800 dark:text-neutral-200 w-full px-20 py-10">
        <div className="p-4">
          <div className="flex items-center gap-1 text-sm mb-2">
            <span className="hover:underline cursor-pointer">Dashboard</span>
            <span>&gt;</span>
            <span className="hover:underline cursor-pointer">Tasks</span>
            <span>&gt;</span>
            <span>Nouvelle demande</span>
          </div>
         
          <h1 className="text-2xl font-bold mb-3 text-neutral-900 dark:text-neutral-100">Demande d'assistance</h1>
         
          <div className="bg-neutral-50 dark:bg-neutral-990 rounded-lg p-4 mb-4">
            {submitMessage.text && (
              <div className={`mb-4 p-3 rounded-md ${submitMessage.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                {submitMessage.text}
              </div>
            )}
            
            <div className="flex flex-col items-start gap-1 mb-4 bg-card-bg rounded-sm p-4">
              <div className="text-primary-500 dark:text-primary-400">
                <AlertTriangle size={20} />
              </div>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Formulaire de signalement</h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Veuillez remplir les informations ci-dessous pour soumettre votre demande d'intervention.</p>
            </div>
           
            <form onSubmit={handleSubmit}>
              <FormField
                title="Titre de la demande"
                placeholder="Ex: Panne d'électricité dans la salle 129"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                error={errors.title}
                required={true}
              />
             
              <FormField
                title="Localisation"
                placeholder="Ex: Bloc Pédagogique, Étage 1, Salle 129"
                value={formData.localisation}
                onChange={(e) => handleInputChange("localisation", e.target.value)}
                error={errors.localisation}
                required={true}
              />
             
              <FormField
                title="Equipment ID"
                placeholder="Ex: 123456"
                value={formData.equipment_id}
                onChange={(e) => handleInputChange("equipment_id", e.target.value)}
                error={errors.equipment_id}
                required={true}
              />
             
              <FormField
                title="Description du problème"
                placeholder="Décrivez le problème rencontré en détail..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                isTextarea={true}
                error={errors.description}
                required={true}
              />
             
              <DropdownField
                title="Niveau d'urgence"
                placeholder="Sélectionnez un niveau d'urgence"
                value={formData.priority}
                onChange={(value) => handleInputChange("priority", value)}
                options={urgencyLevelOptions}
                error={errors.priority}
                required={true}
              />
             
              <div className="mt-3 mb-3">
                <h3 className="text-sm mb-1 text-neutral-800 dark:text-neutral-200">Photos <span className="text-red-500">*</span></h3>
                <div className="flex items-center">
                  <label className="cursor-pointer px-4 py-2 bg-primary-500 dark:bg-primary-400 text-white rounded-md hover:bg-primary-600 dark:hover:bg-primary-500 transition-colors flex items-center">
                    <Upload size={16} className="mr-2" />
                    Ajouter des photos
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      disabled={images.length >= 3}
                    />
                  </label>
                  <span className="ml-4 text-sm text-neutral-500 dark:text-neutral-400">
                    {images.length}/3 photos (obligatoire)
                  </span>
                </div>
                
                {errors.images && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <AlertTriangle size={12} className="mr-1" />
                    {errors.images}
                  </p>
                )}
                
                <div className="mt-3 flex flex-wrap">
                  {images.map((image, index) => (
                    <ImagePreview 
                      key={index} 
                      image={image} 
                      onRemove={() => removeImage(index)} 
                    />
                  ))}
                </div>
              </div>
             
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="submit"
                  className={`px-6 py-2 bg-primary-500 dark:bg-primary-400 text-white rounded-md hover:bg-primary-600 dark:hover:bg-primary-500 transition-colors flex items-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Soumission en cours...' : 'Soumettre la demande'}
                </button>
                <button
                  type="button"
                  className="px-6 py-2 bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
                  onClick={() => {
                    setFormData({
                      title: "",
                      localisation: "",
                      equipment_id: "",
                      description: "",
                      priority: ""
                    })
                    setImages([])
                    setErrors({})
                    setSubmitMessage({ type: '', text: '' })
                  }}
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}