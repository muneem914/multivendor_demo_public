"use client";

import { ReactNode } from "react";
import {
  Home,
  Settings,
  UserRound,
  CircleHelp,
  Heart,
  Truck,
} from "lucide-react";
import CustomerLayout from "@/components/dashboard/layout";
import { useAppSelector } from "@/lib/redux/hooks";

const sidebarItems = [
  { icon: Home, label: "Overview", href: "/customer" },
  { icon: Truck, label: "My Orders", href: "/customer/orders" },
  { icon: Heart, label: "Wishlist", href: "/customer/wishlist" },
  { icon: UserRound, label: "Profile", href: "/customer/profile" },
  { icon: CircleHelp, label: "Support", href: "/customer/support" },
  { icon: Settings, label: "Settings", href: "/customer/settings" },
];

export default function DashboardProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <CustomerLayout sidebarItems={sidebarItems} user={user}>
      {children}
    </CustomerLayout>
  );
}
