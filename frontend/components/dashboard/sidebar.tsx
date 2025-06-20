"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
  isTablet: boolean;
  sidebarItems: {
    icon: React.ElementType;
    label: string;
    href: string;
  }[];
}

export default function Sidebar({
  isOpen,
  onClose,
  isMobile,
  sidebarItems,
}: SidebarProps) {
  const pathname = usePathname();

  const isActive = (currentPath: string, linkPath: string) => {
    const baseSegment = linkPath.split("/")[1];
    const basePath = `/${baseSegment}`;

    if (linkPath === basePath) {
      return currentPath === basePath;
    }

    return currentPath.startsWith(linkPath);
  };

  const getSidebarWidth = () => {
    if (isMobile) {
      return isOpen ? "w-64" : "w-0";
    }
    return isOpen ? "w-64" : "w-16";
  };

  const getSidebarTransform = () => {
    if (isMobile && !isOpen) {
      return "transform -translate-x-full";
    }
    return "transform translate-x-0";
  };

  return (
    <>
      <div
        className={`
          fixed inset-0 bg-black/50 z-50 lg:hidden
          transition-opacity duration-300 ease-in-out
          ${
            isMobile && isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
        onClick={onClose}
      />

      <aside
        className={`
        ${getSidebarWidth()}
        ${getSidebarTransform()}
        fixed
        ${isMobile ? "top-0 h-screen" : "top-16 sm:top-36 h-[calc(100vh-4rem)]"}
        bg-white
        transition-all duration-300 ease-in-out
        ${isMobile ? "z-50" : "z-10"}
        overflow-hidden
        ${isMobile ? "shadow-xl" : ""}
      `}
      >
        <div className="absolute right-0 top-0 w-px bg-border h-screen"></div>

        <div className={`p-4 h-full ${isMobile ? "pt-10" : ""}`}>
          <div className="flex items-center justify-end mb-6">
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="lg:hidden"
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>

          <nav className="">
            <ul className="space-y-2">
              {sidebarItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    onClick={isMobile ? onClose : undefined}
                    className={`
                        flex items-center gap-3 px-3 py-2 rounded-md
                        transition-colors duration-200
                        ${
                          isActive(pathname, item.href)
                            ? "bg-red-100 text-red-600"
                            : "hover:bg-red-50 hover:text-red-400"
                        }
                        ${!isOpen && !isMobile ? "justify-center" : ""}
                      `}
                    title={!isOpen && !isMobile ? item.label : ""}
                    aria-current={
                      isActive(pathname, item.href) ? "page" : "false"
                    }
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {(isOpen || isMobile) && (
                      <span className="font-medium">{item.label}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
