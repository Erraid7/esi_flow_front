import React from 'react';
import Link from 'next/link';
import {Home, Mail, Shield, User, BarChart2, Bell, Settings, LogOut, X, Menu} from 'lucide-react';
import { useLanguage } from "../../translations/contexts/languageContext";
import { useDarkMode } from "../../darkLightMode/darkModeContext";

const SideNavbar = ({ activeItem, isMobileMenuOpen, toggleMobileMenu }) => {
    const navItems = [
      { name: 'Dashboard', icon: <Home size={18} /> },
      { name: 'Requests', icon: <Mail size={18} /> },
      { name: 'Equipment', icon: <Shield size={18} /> },
      { name: 'Users', icon: <User size={18} /> },
      { name: 'Reports', icon: <BarChart2 size={18} /> },
      { name: 'Notifications', icon: <Bell size={18} /> },
      { name: 'Settings', icon: <Settings size={18} /> }
    ];

  
    return (
      <>
        {/* Mobile Menu Toggle */}
        <div className="lg:hidden fixed top-0 left-0 right-0 bg-white z-30 border-b border-gray-200 px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/api/placeholder/80/30" alt="ESI FLOW" className="h-6" />
          </div>
          <button 
            onClick={toggleMobileMenu}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
  
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block w-64 bg-neutral-50 border-r border-gray-200 h-screen">
          <div className="p-6 border-b border-gray-200">
            <img src="/api/placeholder/120/40" alt="ESI FLOW" className="h-8" />
          </div>
          
          <nav className="mt-6 px-3">
            {navItems.map((item) => (
              <div 
                key={item.name}
                className={`px-4 py-3 mb-1 rounded-md flex items-center transition-colors duration-150 ${
                  activeItem === item.name 
                    ? 'text-blue-600 bg-blue-50 font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </div>
            ))}
          </nav>
          
          <div className="absolute bottom-0 left-0 p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                <span>AD</span>
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium">DOULAMI Amira</div>
                <div className="text-xs text-gray-500">Personal</div>
              </div>
              <button className="ml-2 p-2 text-gray-500 hover:text-red-500">
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>
  
        {/* Sidebar - Mobile */}
        <div className={`lg:hidden fixed inset-0 z-20 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
          <div className="absolute inset-0 bg-gray-600 opacity-75" onClick={toggleMobileMenu}></div>
          
          <div className="relative bg-white w-80 h-full overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <img src="/api/placeholder/80/30" alt="ESI FLOW" className="h-6" />
              <button onClick={toggleMobileMenu}>
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            
            <nav className="mt-6 px-3">
              {navItems.map((item) => (
                <div 
                  key={item.name}
                  className={`px-4 py-3 mb-1 rounded-md flex items-center ${
                    activeItem === item.name 
                      ? 'text-blue-600 bg-blue-50 font-medium' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={toggleMobileMenu}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </div>
              ))}
            </nav>
            
            <div className="absolute bottom-0 left-0 w-full border-t border-gray-200 p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                  <span>AD</span>
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium">DOULAMI Amira</div>
                  <div className="text-xs text-gray-500">Personal</div>
                </div>
                <button className="ml-auto p-2 text-gray-500 hover:text-red-500">
                  <LogOut size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

export default SideNavbar;