
import { AlertTriangle, Calendar } from "lucide-react"

const DateField = ({ title, value, onChange, error = null, required = false, placeholder = "MM/DD/YYYY" }) => {
    return (
      <div className="flex flex-col gap-2">
        {title && (
          <label className="block text-sm font-inter text-neutral-950 dark:text-neutral-100">
            {title} {required && <span className="text-red-500">*</span>}
          </label>
        )}
  
        <div className="relative">
          <input
            type="date"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full text-sm px-4 py-3 pr-10 border ${
              error ? "border-red-300 bg-red-50 dark:bg-red-900/20" : "border-none bg-neutral-100 dark:bg-neutral-950"
            } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all text-neutral-950 dark:text-neutral-100
            [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer`}
          />
          <Calendar 
            size={18} 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 dark:text-neutral-400 pointer-events-none" 
          />
        </div>
  
        {error && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertTriangle size={12} className="mr-1" />
            {error}
          </p>
        )}
      </div>
    );
  };


export default DateField;