"use client";

import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { SidebarItem } from "@/types/types";
import { IUser } from "@/types/user";
import Loader from "@/components/common/Loader";
import { Search } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  sidebarItems: SidebarItem[];
  user: IUser | null;
}

export default function DashboardLayout({
  children,
  sidebarItems,
  user,
}: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const mobile = width < 768;
      const tablet = width >= 768 && width < 1024;
      const desktop = width >= 1024;

      setIsMobile(mobile);
      setIsTablet(tablet);

      if (mobile) {
        setIsSidebarOpen(false);
      } else if (tablet) {
        setIsSidebarOpen(false);
      } else if (desktop) {
        setIsSidebarOpen(true);
      }

      if (!isLoaded) {
        setIsLoaded(true);
      }
    };
    // Initial check
    checkScreenSize();

    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkScreenSize, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [isLoaded]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen w-full max-w-[1440px] mx-auto">
      <Navbar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={toggleSidebar}
        isMobile={isMobile}
        user={user}
      />

      <div className="flex pt-16 sm:pt-36">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
          isMobile={isMobile}
          isTablet={isTablet}
          sidebarItems={sidebarItems}
        />

        <main
          className={`
          flex-1 p-3 sm:p-5 bg-white sm:bg-gray-50/50 min-h-[calc(100vh-9rem)]
          transition-all duration-300 ease-in-out w-full overflow-x-hidden
           ${
             isSidebarOpen && !isMobile
               ? "ml-64"
               : !isSidebarOpen && !isMobile
               ? "ml-16"
               : "ml-0"
           }
        `}
        >
          <div className="sm:hidden mb-3">
            <div className="flex justify-between border rounded-md p-2">
              <input
                type="text"
                className="w-full outline-0 border-0 pl-2"
                placeholder="Search"
              />
              <button className="p-2 ml-5 bg-red-500 text-white rounded-md cursor-pointer">
                <Search />
              </button>
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
