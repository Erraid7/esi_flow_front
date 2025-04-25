
import { AlertTriangle } from "lucide-react"

const FormField = ({
    title,
    placeholder,
    value,
    onChange,
    icon,
    comment,
    type = "text",
    onIconClick,
    isTextarea = false,
    error = null,
    required = false,
    className = "",
  }) => {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        {title && (
          <label className="block text-sm font-inter text-neutral-950 dark:text-neutral-100">
            {title} {required && <span className="text-red-500">*</span>}
          </label>
        )}
  
        <div className="relative">
          {isTextarea ? (
            <textarea
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className={`w-full text-sm px-4 py-3 border ${error ? "border-red-300 bg-red-50 dark:bg-red-900/20" : "border-none bg-[#E7E7E7] dark:bg-neutral-950"} rounded-lg shadow-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all text-neutral-990 dark:text-neutral-100 min-h-24`}
            />
          ) : (
            <input
              type={type}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className={`w-full text-sm px-4 py-3 border ${error ? "border-red-300 bg-red-50 dark:bg-red-900/20" : "border-none bg-neutral-100 dark:bg-neutral-950"} rounded-lg shadow-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all text-neutral-990 dark:text-neutral-100 `}
            />
          )}
  
          {icon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-500 dark:text-neutral-400" onClick={onIconClick}>
              {icon}
            </div>
          )}
        </div>
  
        {error && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertTriangle size={12} className="mr-1" />
            {error}
          </p>
        )}
  
        {comment && !error && <div className="text-xs text-neutral-800 mt-1">{comment}</div>}
      </div>
    )
  }

  export default FormField;