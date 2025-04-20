"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Sidebar from "../../components/sidebar";
import PriorityRequestChart from "./PriorityRequestChart";
import EquipmentStatusChart from "./EquipmentStatusChart";
import StateCards from "./StateCard";
import NotificationAndCreateUserCards from "./notcraete";
import Piechart from "./piechart";
import MaintenanceTasksTable from "./table";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import { useLanguage } from "../../translations/contexts/languageContext";
import { useDarkMode } from "../../darkLightMode/darkModeContext";

// Collapsible Chart Container Component that responds to screen size
const CollapsibleChart = ({ title, children, legendComponent }) => {
  const { t } = useLanguage();
  const { isDarkMode } = useDarkMode();

  // Default state is closed for mobile, always open for desktop
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Effect to detect mobile screen and set initial state
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial state
    checkIfMobile();

    // Add event listener
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Always show content on desktop
  const showContent = !isMobile || isOpen;

  return (
    <div className="bg-card-bg dark: p-6 rounded-lg shadow-sm h-full">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-russo dark:text-white">{title}</h3>
        {isMobile && (
          <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <ChevronUp
                className="text-gray-600 dark:text-gray-400"
                size={20}
              />
            ) : (
              <ChevronDown
                className="text-gray-600 dark:text-gray-400"
                size={20}
              />
            )}
          </div>
        )}
      </div>

      {showContent && (
        <>
          <div className="h-64 mt-4 mb-4">{children}</div>
          {legendComponent && legendComponent}
        </>
      )}
    </div>
  );
};

const Dashboard = () => {
  const { t } = useLanguage();
  const { isDarkMode } = useDarkMode();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [screenSize, setScreenSize] = useState("desktop"); // 'mobile', 'tablet', 'desktop'

  // Legend components for reuse
  const priorityLegend = (
    <div className="flex flex-wrap gap-4">
      <div className="flex items-center">
        <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
        <span className="dark:text-gray-300">
          {t("dashboard", "charts", "priority", "high")}
        </span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 bg-yellow-400 rounded-full mr-2"></div>
        <span className="dark:text-gray-300">
          {t("dashboard", "charts", "priority", "medium")}
        </span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 bg-blue-400 rounded-full mr-2"></div>
        <span className="dark:text-gray-300">
          {t("dashboard", "charts", "priority", "low")}
        </span>
      </div>
    </div>
  );

  const equipmentStatusLegend = (
    <>
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-[#FFB6C1] rounded-full mr-2"></div>
          <span className="dark:text-gray-300">
            {t("dashboard", "charts", "equipment", "cancelled")}
          </span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-[#FFE4B5] rounded-full mr-2"></div>
          <span className="dark:text-gray-300">
            {t("dashboard", "charts", "equipment", "inProgress")}
          </span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-[#BAFAD0] rounded-full mr-2"></div>
          <span className="dark:text-gray-300">
            {t("dashboard", "charts", "equipment", "completed")}
          </span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-[#ADD8E6] rounded-full mr-2"></div>
          <span className="dark:text-gray-300">
            {t("dashboard", "charts", "equipment", "toDo")}
          </span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-[#FFFACD] rounded-full mr-2"></div>
          <span className="dark:text-gray-300">
            {t("dashboard", "charts", "equipment", "pending")}
          </span>
        </div>
      </div>
      <div className="flex justify-end">
        <button className="bg-primary-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg text-sm font-medium transition duration-300">
          {t("dashboard", "charts", "equipment", "button")}
        </button>
      </div>
    </>
  );

  const pieChartLegend = (
    <div className="flex flex-wrap gap-4">
      <div className="flex items-center">
        <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
        <span className="text-base dark:text-gray-300">
          {t("dashboard", "charts", "pieChart", "working")}
        </span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 bg-yellow-400 rounded-full mr-2"></div>
        <span className="text-base dark:text-gray-300">
          {t("dashboard", "charts", "pieChart", "needMaintenance")}
        </span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 bg-blue-400 rounded-full mr-2"></div>
        <span className="text-base dark:text-gray-300">
          {t("dashboard", "charts", "pieChart", "outOfService")}
        </span>
      </div>
    </div>
  );

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScreenSize("mobile");
      } else if (window.innerWidth < 1024) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };

    // Set initial size
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu when switching to desktop
  useEffect(() => {
    if (screenSize === "desktop") {
      setIsMobileMenuOpen(false);
    }
  }, [screenSize]);

  // Current user for sidebar
  const currentUser = {
    name: "MEHDAOUI Lokman",
    role: "admin",
    initials: "AD"
  }

  return (
    <div className="flex h-screen bg-neutral-50 dark:bg-neutral-990 overflow-hidden">
      <Head>
        <title>{t("dashboard", "title")}</title>
        <meta name="description" content="ESI Flow Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Sidebar component - visible by default on desktop */}
      <Sidebar 
        activeItem={"dashboard"}
        userRole={currentUser.role}
        userName={currentUser.name}
        userInitials={currentUser.initials}
      />

      {/* Main content with padding adjustment for mobile header */}
      <div className="flex-1 overflow-auto pt-16 lg:pt-0">
        <div className="p-4 md:p-8 lg:p-12">
          {/* StateCard implementation */}
          <div className="mb-6">
            <StateCards />
          </div>

          {/* Dashboard Overview */}
          <h2 className="text-2xl font-russo mb-4 dark:text-white">
            {t("dashboard", "overview")}
          </h2>

          {/* Charts Grid - Responsive Layout */}
          <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-6 mb-6">
            {/* Priority Request Chart - Takes 1/3 of the space on medium+ screens */}
            <div className="md:col-span-1">
              <CollapsibleChart
                title={t("dashboard", "charts", "priority", "title")}
                legendComponent={priorityLegend}
              >
                <PriorityRequestChart />
              </CollapsibleChart>
            </div>

            {/* Equipment Status Chart - Takes 2/3 of the space on medium+ screens */}
            <div className="md:col-span-2">
              <CollapsibleChart
                title={t("dashboard", "charts", "equipment", "title")}
                legendComponent={equipmentStatusLegend}
              >
                <EquipmentStatusChart />
              </CollapsibleChart>
            </div>
          </div>

          <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-6">
            {/* Equipment Status Pie Chart */}
            <div>
              <CollapsibleChart
                title={t("dashboard", "charts", "pieChart", "title")}
                legendComponent={pieChartLegend}
              >
                <Piechart />
              </CollapsibleChart>
            </div>

            {/* Notifications and Create New User Section */}
            <div>
              <NotificationAndCreateUserCards />
            </div>
          </div>

          {/* Maintenance Tasks Table */}
          <div className="mt-6">
            <MaintenanceTasksTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;