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
import { useLanguage } from '../../translations/contexts/languageContext';

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
  addButtonText = "Add User",
  onDelete
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
        onDelete={onDelete}
        addButtonText={addButtonText}
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
  onDelete,
  addButtonText
}) => {
  const { filteredData, updateFilter, clearFilters, filters, getUniqueValues } = useFilter()
  const [searchQuery, setSearchQuery] = useState("")
  const { t, toggleLanguage } = useLanguage();

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
      // Within the generateColumns function, replace the existing isDropdown check with this:
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
        name:t('userList', 'tablehead',6) ,
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
          onRowClicked={onRowClicked}
          selectableRows={selectableRows}
          selectableRowsHighlight={selectableRowsHighlight}
          onSelectedRowsChange={onSelectedRowsChange}
          clearSelectedRows={clearSelectedRows}
          fixedHeader={fixedHeader}
          fixedHeaderScrollHeight={fixedHeaderScrollHeight}
        />
      </div>
    </div>
  )
}

export default DynamicTable