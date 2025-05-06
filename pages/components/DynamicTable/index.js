// File: components/DynamicTable/index.js
"use client"

import { useState, useEffect } from "react"
import dynamic from 'next/dynamic'
import { Edit, Trash } from "lucide-react"
import { FilterProvider, useFilter } from "./FilterContext"
import { ColumnHeader, DropdownHeader, SearchHeader } from "./HeaderComponents"
import { getStylesForField, StyledBadge } from "./styleConfigs"
import { 
  createDarkTheme, 
  createLightTheme, 
  defaultCustomStyles, 
  DefaultEmptyComponent 
} from "./themes"
import { useLanguage } from '../../translations/contexts/languageContext'
import { RowDetailModal } from "./RowDetailModal"
import { exportCSV } from "./exportUtils"

// Initialize themes
createDarkTheme()
createLightTheme()

// Dynamically import DataTable with SSR disabled
const DataTable = dynamic(() => import('react-data-table-component'), {
  ssr: false,
})

// ================ DYNAMIC TABLE COMPONENT ================

export const DynamicTable = ({
  data = [],
  title = "Data Table",
  customStyles = {},
  isDarkMode = false,
  withSearch = true,
  withPagination = true,
  emptyComponent,
  onRowClicked,
  selectableRows = false,
  selectableRowsHighlight = false,
  onSelectedRowsChange,
  clearSelectedRows = false,
  fixedHeader = false,
  fixedHeaderScrollHeight = "400px",
  columnConfig = {},
  dropdownFields = [],
  styled = [],
  actionColumn = true,
  onEdit,
  onAddNew,
  onExportCSV, // New prop for custom export function
  exportFilename, // Optional custom filename for export
  addButtonText = "Add User",
  addButtonLink = "",
  onDelete,
  showRowDetailsModal = true,
  showExport = true // New prop to toggle export button visibility
}) => {
  return (
    <FilterProvider initialData={data}>
      <DynamicTableInner 
        data={data}
        title={title}
        customStyles={customStyles}
        isDarkMode={isDarkMode}
        withSearch={withSearch}
        withPagination={withPagination}
        emptyComponent={emptyComponent}
        onRowClicked={onRowClicked}
        selectableRows={selectableRows}
        selectableRowsHighlight={selectableRowsHighlight}
        onSelectedRowsChange={onSelectedRowsChange}
        clearSelectedRows={clearSelectedRows}
        fixedHeader={fixedHeader}
        fixedHeaderScrollHeight={fixedHeaderScrollHeight}
        columnConfig={columnConfig}
        dropdownFields={dropdownFields}
        styled={styled}
        actionColumn={actionColumn}
        onEdit={onEdit}
        onAddNew={onAddNew}
        onDelete={onDelete}
        onExportCSV={onExportCSV}
        exportFilename={exportFilename}
        addButtonLink={addButtonLink} 
        addButtonText={addButtonText}
        showRowDetailsModal={showRowDetailsModal}
        showExport={showExport}
      />
    </FilterProvider>
  )
}

// Inner component that uses the filter context
const DynamicTableInner = ({
  data,
  title,
  customStyles,
  isDarkMode,
  withSearch,
  withPagination,
  emptyComponent,
  onRowClicked,
  selectableRows,
  selectableRowsHighlight,
  onSelectedRowsChange,
  clearSelectedRows,
  fixedHeader,
  fixedHeaderScrollHeight,
  columnConfig,
  dropdownFields,
  styled = [],
  actionColumn,
  onEdit,
  onAddNew,
  onDelete,
  onExportCSV,
  exportFilename,
  addButtonText,
  addButtonLink,
  showRowDetailsModal,
  showExport = true
}) => {
  const { filteredData, updateFilter, clearFilters, filters, getUniqueValues } = useFilter()
  const [searchQuery, setSearchQuery] = useState("")
  const { t } = useLanguage()
  
  // New state for modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)

  // Handle global search
  const handleSearch = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    updateFilter("globalSearch", query)
  }

  // Clear search
  const clearSearch = () => {
    setSearchQuery("")
    updateFilter("globalSearch", "")
  }

  // Handle CSV export
  const handleExportCSV = () => {
    if (onExportCSV) {
      // Use custom export handler if provided
      onExportCSV(filteredData, columnConfig);
    } else {
      // Default export behavior
      const filename = exportFilename || 
        `${title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.csv`;
      exportCSV(filteredData, columnConfig, filename);
    }
  };

  // Handle row click to open modal
  const handleRowClick = (row) => {
    if (showRowDetailsModal) {
      setSelectedRow(row)
      setIsModalOpen(true)
    }
    
    // Still call the original onRowClicked if provided
    if (onRowClicked) {
      onRowClicked(row)
    }
  }
 
  // Create dynamic columns based on data structure
  const generateColumns = () => {
    if (!data || data.length === 0) return []
    
    const firstItem = data[0]
    const columns = Object.keys(firstItem).map(key => {
      // Skip fields that should be hidden
      if (columnConfig[key]?.hidden) return null
      
      const isDropdown = dropdownFields.includes(key)
      const fieldTitle = columnConfig[key]?.title || key.charAt(0).toUpperCase() + key.slice(1)
      
      // Create column based on field type
      if (isDropdown) {
        const options = getUniqueValues(key)
        return {
          name: <DropdownHeader title={fieldTitle} options={options} field={key} />,
          selector: row => row[key],
          cell: row => {
            // Check if this field should be styled
            if (styled.includes(key)) {
              const style = getStylesForField(key, row[key])
              return <StyledBadge value={row[key]} style={style} />
            }
            
            return row[key]
          }
        }
      } else {
        return {
          name: <ColumnHeader title={fieldTitle} field={key} />,
          selector: row => row[key],
          cell: row => {
            // Add styling for non-dropdown fields too if they're in the styled array
            if (styled.includes(key)) {
              const style = getStylesForField(key, row[key])
              return <StyledBadge value={row[key]} style={style} />
            }
            
            return row[key]
          },
          ...columnConfig[key]
        }
      }
    }).filter(Boolean)
    
    // Add action column if specified
    if (actionColumn) {
      columns.push({
        name: t('userList', 'tablehead', 6),
        cell: (row) => (
          <div className="flex space-x-2">
            <button 
              className="text-gray-600 hover:text-blue-600"
              onClick={e => {
                e.stopPropagation();
                if (onEdit) onEdit(row);
              }}
            >
              <Edit size={18} />
            </button>
            <button 
              className="text-gray-600 hover:text-red-600"
              onClick={e => {
                e.stopPropagation();
                if (onDelete) onDelete(row);
              }}
            >
              <Trash size={18} />
            </button>
          </div>
        ),
        button: true,
        width: "100px",
      })
    }
    
    return columns
  }

  // Generate columns when data changes
  const columns = generateColumns()

  // Create dynamic styles based on dark mode
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--divider-color', 
      isDarkMode ? '#4F4F4F' : '#E7E7E7'
    );
  }, [isDarkMode]);

  // Merge provided custom styles with defaults
  const mergedStyles = {
    ...defaultCustomStyles,
    ...customStyles
  }

  return (
    <div className="w-full">
      {withSearch && (
        <SearchHeader
          title={title}
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
          onClearSearch={clearSearch}
          onClearFilters={clearFilters}
          addButtonText={addButtonText}
          addButtonLink={addButtonLink}
          onAddNew={onAddNew}
          onExportCSV={handleExportCSV}
          data={filteredData}
          columnConfig={columnConfig}
          showExport={showExport}
        />
      )}

      <div className="rounded-t-lg mt-4">
        <DataTable
          columns={columns}
          data={filteredData}
          customStyles={mergedStyles}
          highlightOnHover
          pagination={withPagination}
          theme={isDarkMode ? "darkTheme" : "lightTheme"}
          noDataComponent={emptyComponent || <DefaultEmptyComponent />}
          noHeader={false}
          persistTableHead
          onRowClicked={handleRowClick}
          selectableRows={selectableRows}
          selectableRowsHighlight={selectableRowsHighlight}
          onSelectedRowsChange={onSelectedRowsChange}
          clearSelectedRows={clearSelectedRows}
          fixedHeader={fixedHeader}
          fixedHeaderScrollHeight={fixedHeaderScrollHeight}
          pointerOnHover={true}
          className={`${showRowDetailsModal ? 'cursor-pointer' : ''}`}
        />
      </div>

      {/* Row Details Modal */}
      <RowDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        rowData={selectedRow}
        columnConfig={columnConfig}
      />
    </div>
  )
}

export default DynamicTable