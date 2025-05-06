// File: components/DynamicTable/exportUtils.js

/**
 * Creates a CSV string from an array of objects
 * @param {Array} data - Array of data objects 
 * @param {Object} columnConfig - Configuration for columns
 * @returns {String} CSV formatted string
 */
export const convertToCSV = (data, columnConfig) => {
    if (!data || data.length === 0) return "";
    
    // Determine which fields to include in the export
    const firstItem = data[0];
    const fields = Object.keys(firstItem).filter(field => {
      // Skip fields marked as hidden or excluded from export
      return !(columnConfig[field]?.hidden || columnConfig[field]?.excludeFromExport);
    });
    
    // Create headers row using column titles from config or default formatting
    const headers = fields.map(field => {
      const title = columnConfig[field]?.title || field.charAt(0).toUpperCase() + field.slice(1);
      return `"${title}"`;
    });
    
    // Create CSV rows
    const csvRows = [headers.join(',')];
    
    // Add data rows
    data.forEach(item => {
      const values = fields.map(field => {
        const value = item[field];
        // Handle different data types and ensure CSV compatibility
        if (value === null || value === undefined) return '""';
        if (typeof value === 'string') return `"${value.replace(/"/g, '""')}"`;
        return `"${value}"`;
      });
      
      csvRows.push(values.join(','));
    });
    
    return csvRows.join('\n');
  };
  
  /**
   * Exports data as a downloadable CSV file
   * @param {Array} data - Data to export
   * @param {Object} columnConfig - Configuration for columns
   * @param {String} filename - Name of the file to download
   */
  export const exportCSV = (data, columnConfig, filename = 'export.csv') => {
    if (!data || data.length === 0) {
      console.warn('No data to export');
      return;
    }
    
    const csvContent = convertToCSV(data, columnConfig);
    
    // Create a Blob containing the CSV data
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Create a downloadable link
    const link = document.createElement('a');
    
    // Support for different browsers
    if (navigator.msSaveBlob) {
      // For IE and Edge
      navigator.msSaveBlob(blob, filename);
    } else {
      // For Chrome, Firefox, etc.
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url); // Clean up
    }
  };