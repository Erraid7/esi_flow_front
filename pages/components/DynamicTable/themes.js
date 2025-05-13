// File: components/DynamicTable/themes.js
import { createTheme } from "react-data-table-component"

// Dark theme definition
export const createDarkTheme = () => createTheme("darkTheme", {
    // Your existing dark theme definition
    text: {
      primary: "#FFFFFF",
      secondary: "#D1D1D1",
    },
    background: {
      default: "transparent", // neutral-990
    },
    context: {
      background: "#3D3D3D", // neutral-900
      text: "#FFFFFF",
    },
    divider: {
      default: "#4F4F4F", // neutral-700
    },
    button: {
      default: "#5D5D5D", // neutral-900 
      hover: "#4F4F4F", // neutral-700
      focus: "#4F4F4F", // neutral-700
      disabled: "#3D3D3D", // neutral-600
    },
    sortFocus: {
      default: "#5D5D5D", // neutral-600
    },
    highlightOnHover: {
      default: "#262626", // neutral-950
      text: "#FFFFFF",
    },
  })
  

// Light theme definition
export const createLightTheme = () => createTheme("lightTheme", {
    // Your existing light theme definition
    text: {
      primary: "#262626", // neutral-950
      secondary: "#4F4F4F", // neutral-700
    },
    background: {
      default: "transparent", // white
    },
    context: {
      background: "#E7E7E7", // neutral-100
      text: "#262626", // neutral-950
    },
    divider: {
      default: "#E7E7E7", // neutral-100
    },
    button: {
      default: "#D1D1D1", // neutral-200
      hover: "#E7E7E7", // neutral-100
      focus: "#E7E7E7", // neutral-100
      disabled: "#F6F6F6", // neutral-50
    },
    sortFocus: {
      default: "#D1D1D1", // neutral-200
    },
    highlightOnHover: {
      default: "#E7E7E7FF", // primary-50
      text: "#123868", // primary-900
    },
  })

// Default custom styles
export const defaultCustomStyles = {
  headCells: {
    style: {
      backgroundColor: "#284CFF0D",
      paddingTop: "12px",
      paddingBottom: "12px",
      fontWeight: "600",
      borderBottom: "1px solid var(--divider-color)",
    },
  },
  rows: {
    style: {
      minHeight: "50px",
      borderBottomStyle: "solid",
      borderBottomWidth: "1px",
      borderBottomColor: "var(--divider-color)",
    },
    stripedStyle: {
      backgroundColor: "#F6F6F6",
    },
    highlightOnHoverStyle: {
      cursor: "pointer",
    },
  },
  noData: {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#888888",
      backgroundColor: "transparent",
      height: "200px",
    },
  },
  pagination: {
    style: {
      borderTopStyle: "solid",
      borderTopWidth: "1px",
    },
    pageButtonsStyle: {
      borderRadius: "4px",
      height: "32px",
      width: "32px",
      padding: "4px",
      margin: "0px 4px",
      cursor: "pointer",
      transition: "0.2s ease-out",
    },
  },
}

// Default empty component
export const DefaultEmptyComponent = () => (
  <div className="flex items-center justify-center h-64 text-neutral-400 dark:text-neutral-500">
    No data found
  </div>
)