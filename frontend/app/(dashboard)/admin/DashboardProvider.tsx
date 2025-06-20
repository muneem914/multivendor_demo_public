"use client";

import { ReactNode } from "react";
import {
  Home,
  Box,
  ShoppingCart,
  CreditCard,
  Settings,
  Users,
  UserCog,
} from "lucide-react";
import AdminLayout from "@/components/dashboard/layout";
import { useAppSelector } from "@/lib/redux/hooks";

// import { use } from 'react-redux';
// import { useAppSelector } from '@/store/hooks'; // if using Redux

const sidebarItems = [
  { icon: Home, label: "Overview", href: "/admin" },
  // { icon: Box, label: "Products", href: "/admin/documents" },
  { icon: ShoppingCart, label: "Orders", href: "/admin/orders" },
  { icon: Users, label: "Customers", href: "/admin/customers" },
  { icon: UserCog, label: "Sellers", href: "/admin/sellers" },
  { icon: CreditCard, label: "Payments", href: "/admin/payment" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function DashboardProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useAppSelector((state) => state.auth);
  console.log(user);
  return (
    <AdminLayout sidebarItems={sidebarItems} user={user}>
      {children}
    </AdminLayout>
  );
}
