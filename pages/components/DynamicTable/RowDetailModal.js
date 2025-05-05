// File: components/DynamicTable/RowDetailModal.js
"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"
import { useLanguage } from '../../translations/contexts/languageContext'
import { 
  Calendar, 
  Mail, 
  User, 
  Tag, 
  Clock, 
  Hash, 
  AlertCircle, 
  FileText, 
  Globe, 
  Phone, 
  Map, 
  Briefcase, 
  CheckCircle2,
  XCircle, 
  Info
} from "lucide-react"

export const RowDetailModal = ({ isOpen, onClose, rowData, columnConfig = {} }) => {
  const { t } = useLanguage()
  const modalRef = useRef(null)

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
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

  // Function to format text content for display
  const formatTextContent = (value) => {
    if (value === null || value === undefined) return '-'
    
    const stringValue = String(value)
    
    // For longer text content, format it differently
    if (typeof value === 'string' && value.length > 100) {
      return (
        <div className="bg-neutral-50 dark:bg-neutral-900 p-3 rounded-md border border-neutral-200 dark:border-neutral-700 mt-2 max-h-60 overflow-y-auto">
          <p className="whitespace-pre-wrap text-sm">{stringValue}</p>
        </div>
      )
    }
    
    return stringValue
  }

  if (!isOpen || !rowData) return null

  return (
    <div className="fixed inset-0 bg-white/20 dark:bg-neutral-900/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        ref={modalRef}
        className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        <div className="border-b border-neutral-200 dark:border-neutral-700 p-4 flex justify-between items-center">
          <h3 className="text-xl font-medium text-neutral-900 dark:text-white flex items-center">
            <Info className="mr-2" size={20} />
            {t('rowDetails', 'title', 'Row Details')}
          </h3>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 130px)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rowData && Object.entries(rowData).map(([key, value]) => {
              // Skip internal fields or specifically hidden fields
              if (key.startsWith('_') || columnConfig[key]?.hidden) return null
              
              const fieldTitle = columnConfig[key]?.title || key.charAt(0).toUpperCase() + key.slice(1)
              const icon = getFieldIcon(key, value)
              
              return (
                <div key={key} className="border rounded-lg p-4 bg-neutral-50 dark:bg-neutral-900 shadow-sm">
                  <div className="flex items-center mb-2">
                    <div className="text-primary-600 dark:text-primary-400 mr-2">
                      {icon}
                    </div>
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
                      {fieldTitle}
                    </p>
                  </div>
                  <div className="text-neutral-900 dark:text-white pl-7">
                    {formatTextContent(value)}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        
        <div className="border-t border-neutral-200 dark:border-neutral-700 p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors flex items-center"
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