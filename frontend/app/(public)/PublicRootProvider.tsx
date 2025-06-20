"use client";

import React, { useEffect, useState } from "react";

import Loader from "@/components/common/Loader";
import Link from "next/link";
import Navbar from "@/components/public/navbar";
import { CircleHelp, House, LayoutDashboard, Mail, Search } from "lucide-react";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

export default function PublicRootLayout({ children }: LayoutProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const pathname = usePathname();

  const menuBar = [
    {
      name: "Home",
      url: "/",
      icon: <House />,
    },
    {
      name: "Category",
      url: "/category",
      icon: <LayoutDashboard />,
    },
    {
      name: "About Us",
      url: "/about",
      icon: <CircleHelp />,
    },
    {
      name: "Contact",
      url: "/contact",
      icon: <Mail />,
    },
    {
      name: "Blog",
      url: "/blog",
      icon: <Mail />,
    },
  ];

  const navItems = [
    { href: "/", icon: <House /> },
    { href: "/about", icon: <CircleHelp /> },
    { href: "/search", icon: <Search /> },
    { href: "/dashboard", icon: <LayoutDashboard /> },
    { href: "/messages", icon: <Mail /> },
  ];

  useEffect(() => {
    if (!isLoaded) {
      setIsLoaded(true);
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    // <div className="min-h-screen w-full max-w-[1440px] mx-auto">
    <div>
      <Navbar />

      <div className="flex  pt-16 sm:pt-36">
        <div className="bg-red-500 fixed w-full z-10 text-white hidden sm:flex gap-10 items-center justify-center">
          {menuBar.map((item, index) => (
            <Link
              key={index}
              href={item.url}
              className={`p-4 hover:bg-red-600 transition ${
                pathname === item.url ? "bg-red-700" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <main
          className={`
          min-h-[calc(100vh-9rem)] sm:pt-15 pb-15 sm:pb-0 max-w-[1440px] mx-auto bg-gray-50/50
          transition-all duration-300 ease-in-out w-full overflow-x-hidden
        `}
        >
          {children}

          <div className="bg-red-500 bottom-0 fixed w-full sm:w-fit text-white flex sm:hidden items-center justify-around">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`p-4 hover:bg-red-600 transition ${
                  pathname === item.href ? "bg-red-700" : ""
                }`}
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
