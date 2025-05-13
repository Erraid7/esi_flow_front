/**
 * Creates a CSV string from an array of objects
 * @param {Array} data - Array of data objects
 * @param {Object} columnConfig - Configuration for columns
 * @returns {String} CSV formatted string
 */
export const convertToCSV = (data, columnConfig) => {
  if (!data || data.length === 0) return ""

  // Get the keys from the first object to determine the fields
  const fields = Object.keys(data[0])

  // Create headers row using column titles from config or default formatting
  const headers = fields.map((field) => {
    const title = columnConfig[field]?.title || field.charAt(0).toUpperCase() + field.slice(1)
    return `"${title}"`
  })

  // Create CSV rows
  const csvRows = [headers.join(",")]

  // Add data rows
  data.forEach((item) => {
    const values = fields.map((field) => {
      const value = item[field]
      // Handle different data types and ensure CSV compatibility
      if (value === null || value === undefined) return '""'
      if (typeof value === "string") return `"${value.replace(/"/g, '""')}"`
      return `"${value}"`
    })

    csvRows.push(values.join(","))
  })

  return csvRows.join("\n")
}

/**
 * Exports data as a downloadable CSV file
 * @param {Array} data - Data to export
 * @param {Object} columnConfig - Configuration for columns
 * @param {String} filename - Name of the file to download
 */
export const exportCSV = (data, columnConfig, filename = "export.csv") => {
  if (!data || data.length === 0) {
    console.warn("No data to export")
    return
  }

  const csvContent = convertToCSV(data, columnConfig)

  // Create a Blob containing the CSV data
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })

  // Create a downloadable link
  const link = document.createElement("a")

  // Support for different browsers
  if (navigator.msSaveBlob) {
    // For IE and Edge
    navigator.msSaveBlob(blob, filename)
  } else {
    // For Chrome, Firefox, etc.
    const url = URL.createObjectURL(blob)
    link.href = url
    link.setAttribute("download", filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url) // Clean up
  }
}

// Fields that should be hidden from display in PDF exports
const HIDDEN_FIELDS = [
  "password",
  "hashedPassword",
  "salt",
  "picture",
  "image",
  "avatar",
  "file",
  "signature",
  "token",
  "secret",
  "api_key",
  "private_key",
  "credentials",
]

/**
 * Exports data as a downloadable PDF file with improved structure and logos
 * @param {Array} data - Data to export
 * @param {Object} columnConfig - Configuration for columns
 * @param {String} title - Title for the PDF document
 * @param {String} filename - Name of the file to download
 */
export const exportPDF = async (data, columnConfig, title, filename = "export.pdf") => {
  if (!data || data.length === 0) {
    console.warn("No data to export")
    return
  }

  try {
    // Dynamically import jsPDF
    const jsPDFModule = await import("jspdf")
    const jsPDF = jsPDFModule.default || jsPDFModule.jsPDF

    // Create a new PDF document
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    })

    // Define page dimensions
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 15
    const usableWidth = pageWidth - 2 * margin

    // Add logos
    try {
      // ESI Logo (left side)
      const esiLogo = new Image()
      esiLogo.src = "/esi-png.png"
      doc.addImage(esiLogo, "PNG", margin, margin, 25, 15)

      // ESI-FLOW Logo (right side)
      const esiFlowLogo = new Image()
      esiFlowLogo.src = "/logo-v-png.png"
      doc.addImage(esiFlowLogo, "PNG", pageWidth - margin - 40, margin, 40, 15)
    } catch (logoError) {
      console.warn("Could not add logos to PDF:", logoError)
    }

    // Add title with better positioning (centered)
    doc.setFontSize(18)
    doc.setTextColor(0, 51, 102) // Dark blue color
    doc.setFont("helvetica", "bold")
    const titleWidth = (doc.getStringUnitWidth(title) * doc.internal.getFontSize()) / doc.internal.scaleFactor
    doc.text(title, (pageWidth - titleWidth) / 2, margin + 25)

    // Add date and time with better formatting
    const now = new Date()
    const dateTimeStr = `Generated on: ${now.toLocaleDateString()} at ${now.toLocaleTimeString()}`
    doc.setFontSize(10)
    doc.setTextColor(102, 102, 102) // Gray color
    doc.setFont("helvetica", "normal")
    doc.text(dateTimeStr, margin, margin + 35)

    // Filter out sensitive fields
    const visibleFields = Object.keys(data[0]).filter(
      (field) => !HIDDEN_FIELDS.includes(field.toLowerCase()) && !columnConfig[field]?.hidden,
    )

    // Create headers array for visible fields only
    const headers = visibleFields.map(
      (field) => columnConfig[field]?.title || field.charAt(0).toUpperCase() + field.slice(1),
    )

    // Calculate column widths (distribute evenly among visible columns)
    const colWidth = usableWidth / headers.length

    // Set starting position for the table
    let yPos = margin + 45
    const xStart = margin

    // Add a horizontal line before the table
    doc.setDrawColor(200, 200, 200)
    doc.setLineWidth(0.5)
    doc.line(margin, yPos - 5, pageWidth - margin, yPos - 5)

    // Set styles for header
    doc.setFillColor(41, 128, 185) // Modern blue header background
    doc.setTextColor(255, 255, 255) // White text for header
    doc.setFontSize(11)
    doc.setFont("helvetica", "bold")

    // Draw header cells
    headers.forEach((header, i) => {
      // Draw cell background
      doc.rect(xStart + i * colWidth, yPos, colWidth, 10, "F")

      // Draw cell border
      doc.setDrawColor(220, 220, 220)
      doc.rect(xStart + i * colWidth, yPos, colWidth, 10, "S")

      // Add text (centered)
      const textWidth = (doc.getStringUnitWidth(header) * doc.internal.getFontSize()) / doc.internal.scaleFactor
      const textX = xStart + i * colWidth + (colWidth - textWidth) / 2
      doc.text(header, textX, yPos + 6.5)
    })

    // Move to the next row
    yPos += 10

    // Set styles for data rows
    doc.setTextColor(60, 60, 60) // Dark gray text for data
    doc.setFontSize(9)
    doc.setFont("helvetica", "normal")

    // Draw data rows
    let rowCount = 0
    for (const item of data) {
      // Check if we need a new page
      if (yPos > pageHeight - margin - 10) {
        doc.addPage()
        yPos = margin

        // Add page number
        const pageNum = doc.internal.getNumberOfPages()
        doc.setFontSize(8)
        doc.setTextColor(150, 150, 150)
        doc.text(`Page ${pageNum}`, pageWidth - margin - 15, pageHeight - margin)

        // Redraw header on new page
        doc.setFillColor(41, 128, 185)
        doc.setTextColor(255, 255, 255)
        doc.setFontSize(11)
        doc.setFont("helvetica", "bold")

        headers.forEach((header, i) => {
          doc.rect(xStart + i * colWidth, yPos, colWidth, 10, "F")
          doc.setDrawColor(220, 220, 220)
          doc.rect(xStart + i * colWidth, yPos, colWidth, 10, "S")

          const textWidth = (doc.getStringUnitWidth(header) * doc.internal.getFontSize()) / doc.internal.scaleFactor
          const textX = xStart + i * colWidth + (colWidth - textWidth) / 2
          doc.text(header, textX, yPos + 6.5)
        })

        yPos += 10
        doc.setTextColor(60, 60, 60)
        doc.setFontSize(9)
        doc.setFont("helvetica", "normal")
      }

      // Set alternating row background
      if (rowCount % 2 === 0) {
        doc.setFillColor(245, 245, 245) // Light gray for even rows
        visibleFields.forEach((_, i) => {
          doc.rect(xStart + i * colWidth, yPos, colWidth, 8, "F")
        })
      }

      // Draw cell borders and text for visible fields only
      visibleFields.forEach((field, i) => {
        const value = item[field] === null || item[field] === undefined ? "" : String(item[field])

        // Draw cell border
        doc.setDrawColor(220, 220, 220)
        doc.rect(xStart + i * colWidth, yPos, colWidth, 8, "S")

        // Add text (left-aligned with padding)
        // Truncate text if too long for the cell
        const maxChars = Math.floor(colWidth / 1.8)
        const displayText = value.length > maxChars ? value.substring(0, maxChars - 3) + "..." : value

        doc.text(displayText, xStart + i * colWidth + 2, yPos + 5.5)
      })

      // Move to the next row
      yPos += 8
      rowCount++
    }

    // Add footer with page numbers
    const totalPages = doc.internal.getNumberOfPages()
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      doc.setTextColor(150, 150, 150)

      // Add page number
      doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin - 25, pageHeight - margin)

      // Add footer line
      doc.setDrawColor(200, 200, 200)
      doc.setLineWidth(0.5)
      doc.line(margin, pageHeight - margin - 5, pageWidth - margin, pageHeight - margin - 5)

      // Add copyright or system info
      doc.text("ESI-FLOW Maintenance Management System", margin, pageHeight - margin)
    }

    // Save the PDF
    doc.save(filename)
  } catch (error) {
    console.error("Error generating PDF:", error)
    // Show a user-friendly error message
    alert("Failed to generate PDF. Please try again later.")
  }
}
