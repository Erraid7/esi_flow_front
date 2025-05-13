"use client"

import { useEffect, useRef, useState } from "react"
import { X, ChevronLeft, ChevronRight, Copy, Check, Search, Info } from "lucide-react"
import { useLanguage } from '../../translations/contexts/languageContext'
import { getStylesForField } from './styleConfigs'
import { 
  Calendar, Mail, User, Tag, Clock, Hash, AlertCircle, FileText, 
  Globe, Phone, Map, Briefcase, CheckCircle2, XCircle
} from "lucide-react"

// Fields that should be hidden from display
const HIDDEN_FIELDS = [
  'password',
  'hashedPassword',
  'salt',
  'picture',
  'image',
  'avatar',
  'file',
  'signature',
  'token',
  'secret',
  'api_key',
  'private_key',
  'credentials'
]

// Status-related fields that should use special styling
const STATUS_FIELDS = [
  'status',
  'state',
  'urgency',
  'priority',
  'equipmentStatus',
  'taskStatus',
  'requestStatus'
]

export const RowDetailModal = ({ isOpen, onClose, rowData, columnConfig = {}, onPrevious, onNext }) => {
  const { t } = useLanguage()
  const modalRef = useRef(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [copiedField, setCopiedField] = useState(null)
  const [activeTab, setActiveTab] = useState("all")

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      // Lock body scroll
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      // Restore body scroll
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  // Close on escape key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isOpen, onClose])

  // Reset search and active tab when opening new row
  useEffect(() => {
    if (isOpen) {
      setSearchTerm("")
      setActiveTab("all")
    }
  }, [isOpen, rowData])

  // Copy to clipboard functionality
  const copyToClipboard = (key, value) => {
    navigator.clipboard.writeText(value)
    setCopiedField(key)
    setTimeout(() => setCopiedField(null), 1500)
  }

  // Helper to determine the icon based on field name and value type
  const getFieldIcon = (key, value) => {
    // First check based on field name patterns
    const lowercaseKey = key.toLowerCase()
    
    if (lowercaseKey.includes('id') || lowercaseKey === 'key') return <Hash size={18} />
    if (lowercaseKey.includes('date') || lowercaseKey.includes('time')) return <Calendar size={18} />
    if (lowercaseKey.includes('email')) return <Mail size={18} />
    if (lowercaseKey.includes('name') || lowercaseKey.includes('user')) return <User size={18} />
    if (lowercaseKey.includes('status')) return <Tag size={18} />
    if (lowercaseKey.includes('phone')) return <Phone size={18} />
    if (lowercaseKey.includes('address') || lowercaseKey.includes('location')) return <Map size={18} />
    if (lowercaseKey.includes('country') || lowercaseKey.includes('region')) return <Globe size={18} />
    if (lowercaseKey.includes('job') || lowercaseKey.includes('role') || lowercaseKey.includes('position')) return <Briefcase size={18} />
    
    // Then check based on value type
    if (typeof value === 'boolean') {
      return value ? <CheckCircle2 size={18} /> : <XCircle size={18} />
    }
    
    if (typeof value === 'number') return <Hash size={18} />
    if (typeof value === 'string' && value.length > 100) return <FileText size={18} />
    
    // Default
    return <Info size={18} />
  }

  const formatTextContent = (key, value) => {
    if (value === null || value === undefined) return '-'
    
    const lowercaseKey = key.toLowerCase()
    const stringValue = String(value)

    // Handle status fields with special colors
    if (STATUS_FIELDS.some(field => lowercaseKey.includes(field))) {
      return (
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          getStylesForField(lowercaseKey, value)
        }`}>
          {stringValue}
        </span>
      )
    }
    
    // Format boolean values
    if (typeof value === 'boolean') {
      return (
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          value ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}>
          {value ? t('common', 'boolean', 'Yes') : t('common', 'boolean', 'No')}
        </span>
      )
    }
    
    // For longer text content
    if (typeof value === 'string' && value.length > 100) {
      return (
        <div className="bg-neutral-50 dark:bg-neutral-900 p-3 rounded-md border border-neutral-200 dark:border-neutral-700 mt-2 max-h-60 overflow-y-auto">
          <p className="whitespace-pre-wrap text-sm">{stringValue}</p>
        </div>
      )
    }
    
    return stringValue
  }

  const getFilteredFields = () => {
    if (!rowData) return []
    
    return Object.entries(rowData).filter(([key, value]) => {
      const lowercaseKey = key.toLowerCase()

      // Hide sensitive fields
      if (HIDDEN_FIELDS.some(field => lowercaseKey.includes(field))) {
        return false
      }

      // Hide non-string-convertible fields
      if (
        typeof value === 'object' || 
        typeof value === 'function' ||
        Array.isArray(value) ||
        value instanceof File ||
        value instanceof Blob
      ) {
        return false
      }

      const matchesSearch = searchTerm === "" || 
        key.toLowerCase().includes(searchTerm.toLowerCase()) || 
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesTab = activeTab === "all" || getFieldCategory(key) === activeTab
      
      return matchesSearch && matchesTab
    })
  }

  // Add a new tab for status fields
  const tabs = [
    { id: "all", label: t('common', 'filters', 'All'), count: Object.keys(rowData || {}).length },
    { id: "status", label: t('common', 'filters', 'Status') },
    { id: "ids", label: t('common', 'filters', 'IDs') },
    { id: "dates", label: t('common', 'filters', 'Dates') },
    { id: "contact", label: t('common', 'filters', 'Contact Info') },
    { id: "other", label: t('common', 'filters', 'Other') }
  ]

  // Update getFieldCategory to include status fields
  const getFieldCategory = (key) => {
    const lowercaseKey = key.toLowerCase()
    
    if (STATUS_FIELDS.some(field => lowercaseKey.includes(field))) return "status"
    if (lowercaseKey.includes('id') || lowercaseKey === 'key') return "ids"
    if (lowercaseKey.includes('date') || lowercaseKey.includes('time')) return "dates"
    if (lowercaseKey.includes('contact') || lowercaseKey.includes('email') || 
        lowercaseKey.includes('phone') || lowercaseKey.includes('address')) return "contact"
    
    return "other"
  }

  const filteredFields = getFilteredFields()

  if (!isOpen || !rowData) return null

  return (
    <div className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity"
         role="dialog"
         aria-modal="true"
         aria-labelledby="modal-title">
      <div 
        ref={modalRef}
        className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-neutral-200 dark:border-neutral-700 transition-all duration-200 ease-out animate-fadeIn"
      >
        <div className="border-b border-neutral-200 dark:border-neutral-700 p-4 flex justify-between items-center bg-neutral-50 dark:bg-neutral-900">
          <h3 id="modal-title" className="text-xl font-medium text-neutral-900 dark:text-white flex items-center">
            <Info className="mr-2 text-primary-600 dark:text-primary-400" size={20} />
            {t('rowDetails', 'title')}
          </h3>
          
          <div className="flex items-center space-x-2">
            {onPrevious && (
              <button
                onClick={onPrevious}
                className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                aria-label={t('common', 'navigation', 'Previous record')}
              >
                <ChevronLeft size={20} />
              </button>
            )}
            
            {onNext && (
              <button
                onClick={onNext}
                className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                aria-label={t('common', 'navigation', 'Next record')}
              >
                <ChevronRight size={20} />
              </button>
            )}
            
            <button
              onClick={onClose}
              className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              aria-label={t('common', 'actions', 'Close')}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-4 border-b border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-neutral-400" />
            </div>
            <input
              type="search"
              className="block w-full p-2 pl-10 text-sm border border-neutral-300 rounded-lg bg-neutral-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white"
              placeholder={t('common', 'search', 'Search fields...')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2 mt-4 border-b border-neutral-200 dark:border-neutral-700 overflow-x-auto pb-2">
            <button
              className={`px-3 py-1 text-sm font-medium rounded-full transition-colors whitespace-nowrap
                ${activeTab === "all" 
                  ? "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200" 
                  : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700"}`}
              onClick={() => setActiveTab("all")}
            >
              {t('common', 'filters', 'All')} ({Object.keys(rowData).length})
            </button>
            <button
              className={`px-3 py-1 text-sm font-medium rounded-full transition-colors whitespace-nowrap
                ${activeTab === "ids" 
                  ? "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200" 
                  : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700"}`}
              onClick={() => setActiveTab("ids")}
            >
              {t('common', 'filters', 'IDs')}
            </button>
            <button
              className={`px-3 py-1 text-sm font-medium rounded-full transition-colors whitespace-nowrap
                ${activeTab === "dates" 
                  ? "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200" 
                  : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700"}`}
              onClick={() => setActiveTab("dates")}
            >
              {t('common', 'filters', 'Dates')}
            </button>
            <button
              className={`px-3 py-1 text-sm font-medium rounded-full transition-colors whitespace-nowrap
                ${activeTab === "contact" 
                  ? "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200" 
                  : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700"}`}
              onClick={() => setActiveTab("contact")}
            >
              {t('common', 'filters', 'Contact Info')}
            </button>
            <button
              className={`px-3 py-1 text-sm font-medium rounded-full transition-colors whitespace-nowrap
                ${activeTab === "other" 
                  ? "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200" 
                  : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700"}`}
              onClick={() => setActiveTab("other")}
            >
              {t('common', 'filters', 'Other')}
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          {filteredFields.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredFields.map(([key, value]) => {
                const fieldTitle = columnConfig[key]?.title || 
                  key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')
                const icon = getFieldIcon(key, value)
                const stringValue = value !== null && value !== undefined ? String(value) : ''
                const isCopyable = stringValue && stringValue !== '-'
                
                return (
                  <div key={key} 
                      className="border rounded-lg p-4 bg-neutral-50 dark:bg-neutral-900 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="text-primary-600 dark:text-primary-400 mr-2">
                          {icon}
                        </div>
                        <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
                          {fieldTitle}
                        </p>
                      </div>
                      
                      {isCopyable && (
                        <button
                          onClick={() => copyToClipboard(key, stringValue)}
                          className={`p-1 rounded-full opacity-0 group-hover:opacity-100 focus:opacity-100
                            ${copiedField === key 
                              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                              : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700'} 
                            transition-opacity duration-200`}
                          aria-label={t('common', 'actions', 'Copy to clipboard')}
                        >
                          {copiedField === key ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                      )}
                    </div>
                    <div className="text-neutral-900 dark:text-white pl-7">
                      {formatTextContent(key, value)}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Search className="h-12 w-12 text-neutral-400 mb-4" />
              <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">
                {t('common', 'search', 'No matching fields')}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                {t('common', 'search', 'Try a different search term or filter')}
              </p>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setActiveTab("all")
                }}
                className="mt-4 px-4 py-2 bg-primary-50 text-primary-600 hover:bg-primary-100 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800 rounded-md transition-colors"
              >
                {t('common', 'actions', 'Clear filters')}
              </button>
            </div>
          )}
        </div>
        
        <div className="border-t border-neutral-200 dark:border-neutral-700 p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors flex items-center shadow-sm hover:shadow focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-800"
          >
            <X size={16} className="mr-2" />
            {t('rowDetails', 'buttons', 'Close')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default RowDetailModal