import React from "react";
import Table from './tabel';  // or './table' depending on actual filename
import Sidebar from '../../components/sidebar';
import { useLanguage } from "../../translations/contexts/languageContext";
import { useDarkMode } from "../../darkLightMode/darkModeContext";
import { useEffect, useState } from "react";
import Cards from "./cards";
import UserList from "./test"; // Import UserList component

export default function Userlist() {
  const { t, toggleLanguage } = useLanguage();
  const { isDarkMode } = useDarkMode();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle body overflow when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  // Current user for sidebar
  const currentUser = {
    name: "MEHDAOUI Lokman",
    role: "admin",
    initials: "AD"
  }

  return (
    <div className="bg-neutral-50 dark:bg-neutral-990 flex w-full overflow-hidden ">
      <Sidebar 
        activeItem={"users"}
        userRole={currentUser.role}
        userName={currentUser.name}
        userInitials={currentUser.initials}
      />
      
      {/* Main content container with auto margins and proper width */}
      <div className="flex-1 flex flex-col max-w-7xl mx-auto  md:py-6 py-20  space-y-6 overflow-hidden ">
        <Cards />
        <Table />
      </div>
    </div>
  );
}