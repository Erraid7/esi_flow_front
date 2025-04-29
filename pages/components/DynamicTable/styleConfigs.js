// File: components/DynamicTable/styleConfigs.js

// Define styles for different fields and their values
const styleConfigs = {
    'role': {
      'Admin': 'bg-green-100 text-green-800',
      'Technician': 'bg-purple-100 text-purple-800',
      'User': 'bg-blue-100 text-blue-800',
      'Manager': 'bg-yellow-100 text-yellow-800',
      'Guest': 'bg-gray-100 text-gray-800'
    },
    'status': {
      'Working': 'bg-green-100 text-green-800',
      'Out of service': 'bg-red-100 text-red-800',
      'Under repair': 'bg-yellow-100 text-yellow-800',
      'Needle_pretentance': 'bg-purple-100 text-purple-800',
      Pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/10 dark:text-yellow-400 border border-yellow-400",
      "In Progress": "bg-blue-100 text-blue-800 dark:bg-blue-800/10 dark:text-blue-400 border border-blue-400",
      Completed: "bg-green-100 text-green-800 dark:bg-green-800/10 dark:text-green-400 border border-green-400",
      Cancelled: "bg-red-100 text-red-800 dark:bg-red-800/10 dark:text-red-400 border border-red-400",
    },
    urgency: {
        Low: "bg-green-100 text-green-800 dark:bg-green-800/10 dark:text-green-400 border border-green-400",
        Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/10 dark:text-yellow-400 border border-yellow-400",
        High: "bg-red-100 text-red-800 dark:bg-red-800/10 dark:text-red-400 border border-red-400",
        Critical: "bg-purple-100 text-purple-800 dark:bg-purple-800/10 dark:text-purple-400 border border-purple-400",
      }
    // Add more fields as needed
  }
  
  // Default style if no specific style is found
  const defaultStyle = 'bg-blue-100 text-blue-800'
  
  /**
   * Get styling for a specific field and value
   * @param {string} fieldName - The name of the field
   * @param {string} value - The value of the field
   * @returns {string} - CSS classes for styling
   */
  export const getStylesForField = (fieldName, value) => {
    return styleConfigs[fieldName.toLowerCase()]?.[value] || defaultStyle
  }
  
  // Export the styled badge component for reuse
  export const StyledBadge = ({ value, style }) => (
    <div className={`px-3 py-1 rounded-md text-xs font-medium flex items-center ${style}`}>
      <span className="mr-1.5">
        <svg className="h-2 w-2" viewBox="0 0 8 8" fill="currentColor">
          <circle cx="4" cy="4" r="3" />
        </svg>
      </span>
      {value}
    </div>
  )
  
  export default styleConfigs