"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Search,
  Bell,
  PanelLeft,
  ChevronDown,
  Globe,
  CircleHelp,
  ShoppingCart,
  Heart,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import "./styles.scss";
import Image from "next/image";
import { IUser } from "@/types/user";
import { getUserInitials } from "@/helper/getInitials";
import { useLogoutMutation } from "@/lib/redux/api/authApi";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setUser } from "@/lib/redux/slices/authSlice";
import { Separator } from "../ui/separator";
import toast from "react-hot-toast";

interface NavbarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  isMobile: boolean;
  user: IUser | null;
}

export default function Navbar({
  isSidebarOpen,
  onToggleSidebar,
  user,
}: NavbarProps) {
  const [selectedCategory, setSelectedCategory] = useState("Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [logout] = useLogoutMutation();

  const dispatch = useAppDispatch();
  const categories = ["Electronics", "Clothing", "Books"];

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCategory(value);
    setSearchQuery(value); // update search input too
  };

  const router = useRouter();
  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      dispatch(setUser(null));
      router.push("/");
      toast.success("Logout successful");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const sellerHandler = async () => {
    try {
      await logout().unwrap();
      dispatch(setUser(null));
      router.push("/register/seller");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const showWishlist = true;
  const showCart = true;

  const initials = getUserInitials(user?.fName as string);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white">
        <div className="flex flex-col w-full items-center">
          <div className="w-full border-b border-border">
            <div className="w-full max-w-[1440px] h-16 flex items-center justify-between mx-auto p-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggleSidebar}
                  className="lg:hidden"
                  aria-label="Toggle menu"
                >
                  <PanelLeft className="h-5 w-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggleSidebar}
                  className="hidden lg:flex"
                  aria-label="Toggle sidebar"
                >
                  <ChevronLeft
                    className={`h-5 w-5 transition-transform duration-200 ${
                      isSidebarOpen ? "" : "rotate-180"
                    }`}
                  />
                </Button>
                <Link href="/">
                  <Image src="/logo.png" width={100} height={50} alt="logo" />
                </Link>
              </div>

              <div className="flex items-center gap-5 sm:gap-7 md:gap-10">
                <div className="block sm:hidden">
                  {!user ? (
                    <Link href="/register/seller" className="text-red-500">
                      Become a Seller!
                    </Link>
                  ) : user?.role === "customer" ? (
                    <button
                      onClick={sellerHandler}
                      className="text-red-500 cursor-pointer"
                    >
                      Become a Seller!
                    </button>
                  ) : null}
                </div>
                <div className="hidden sm:block text-gray-500">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="dropdown_trigger">
                      <div className="flex items-center justify-center gap-2">
                        <Globe className="h-5 w-5" />
                        <span>EN</span>
                        <ChevronDown className="h-5 w-5" />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Language</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>English (EN)</DropdownMenuItem>
                      <DropdownMenuItem>English (UK)</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="hidden sm:block text-gray-500">
                  <div className="flex items-center justify-center gap-2 cursor-pointer">
                    <CircleHelp className="h-5 w-5" />
                    <span>Help</span>
                  </div>
                </div>

                {user?.role === "customer" && (
                  <>
                    <div className="sm:hidden">
                      <Link href="/cart">
                        <div className="notification_wDot cart">
                          <span>3</span>
                          <ShoppingCart className="h-5 w-5" />
                        </div>
                      </Link>
                    </div>
                    {/* <div className="sm:hidden">
                      <Link href="wishlist">
                        <div className="notification_wDot wishlist">
                          <span>3</span>
                          <Heart className="h-5 w-5" />
                        </div>
                      </Link>
                    </div> */}
                  </>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger className="dropdown_trigger notification_Btn ">
                    <div className="notification_wDot">
                      <span>3</span>
                      <Bell className="h-5 w-5" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>3 New notification</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      Notification 1: checkout new product
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Notification 2: checkout new product
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Notification 3: checkout new product
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger className="dropdown_trigger">
                    <div className="user_dropdown">
                      <div className="avatar">
                        {user ? initials : <UserRound />}
                      </div>
                      <span className="sm:block hidden">{user?.fName}</span>
                      <ChevronDown className="h-5 w-5 sm:block hidden" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {user && (
                      <DropdownMenuLabel>
                        {user?.fName} <Separator orientation="vertical" /> (
                        {user?.role})
                      </DropdownMenuLabel>
                    )}
                    {user && <DropdownMenuSeparator />}
                    {user ? (
                      <DropdownMenuItem className="block cursor-pointer">
                        <Link href={`/${user?.role}/`} className="block">
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                    ) : (
                      <>
                        <DropdownMenuItem className="block cursor-pointer">
                          <Link href="/login" className="block">
                            Login
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="block cursor-pointer">
                          <Link href="/register/customer" className="block">
                            Register
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="block cursor-pointer">
                          <div className="hidden sm:block">
                            {!user ? (
                              <Link
                                href="/register/seller"
                                className="text-red-500"
                              >
                                Become a Seller!
                              </Link>
                            ) : user?.role === "customer" ? (
                              <button
                                onClick={sellerHandler}
                                className="text-red-500 cursor-pointer"
                              >
                                Become a Seller!
                              </button>
                            ) : null}
                          </div>
                        </DropdownMenuItem>
                      </>
                    )}

                    {user && (
                      <DropdownMenuItem className="block cursor-pointer">
                        <button onClick={logoutHandler}>Logout</button>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          <div className="w-full border-b border-border hidden sm:block">
            <div className="w-full max-w-[1440px] h-20 flex items-center justify-between gap-6 mx-auto p-4">
              <div
                className={`flex flex-grow items-center gap-2 ${
                  !showWishlist && !showCart ? "justify-start" : ""
                }`}
              >
                <div className="flex border border-gray-300 rounded-md overflow-hidden w-full bg-white max-w-full">
                  <div className="w-40 px-2 py-2 category_select">
                    <select
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                      className="w-full text-sm text-gray-600 focus:outline-none bg-transparent"
                    >
                      <option disabled>Categories</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-px bg-gray-300 my-2"></div>

                  <div className="flex items-center px-3 flex-grow">
                    <Search className="w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      className="flex-grow px-2 py-2 text-sm outline-none"
                      placeholder="Search by product, brand, or keyword"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <button className="bg-red-600 text-white px-4 py-2 rounded text-sm shrink-0">
                  Search
                </button>
              </div>

              {user?.role === "customer" && (
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-1 text-gray-600 hover:text-black text-sm">
                    <Heart className="w-4 h-4" />
                    <span>Wishlist</span>
                  </button>

                  <button className="flex items-center gap-1 text-gray-600 hover:text-black text-sm">
                    <ShoppingCart className="w-4 h-4" />
                    <span>Cart</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
