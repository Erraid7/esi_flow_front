
import React, { useEffect } from "react"
import { Check, AlertTriangle, Bell, X } from "lucide-react"

const Toast = ({ message, type, visible, onClose }) => {
    useEffect(() => {
      if (visible) {
        const timer = setTimeout(() => {
          onClose()
        }, 3000)
        return () => clearTimeout(timer)
      }
    }, [visible, onClose])
  
    if (!visible) return null
  
    const bgColor = type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-blue-500"
  
    const icon =
      type === "success" ? <Check size={20} /> : type === "error" ? <AlertTriangle size={20} /> : <Bell size={20} />
  
    return (
      <div
        className={`fixed top-4 right-4 ${bgColor} text-white p-4 rounded shadow-lg flex items-center z-50 animate-fade-in`}
      >
        <div className="mr-3">{icon}</div>
        <p>{message}</p>
        <button onClick={onClose} className="ml-4">
          <X size={16} />
        </button>
      </div>
    )
  }

  export default Toast;