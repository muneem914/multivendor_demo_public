"use client";

import { ReactNode } from "react";
import { Home, Box, ShoppingCart, CreditCard, Settings } from "lucide-react";
import SellerLayout from "@/components/dashboard/layout";
import { useAppSelector } from "@/lib/redux/hooks";


const sidebarItems = [
  { icon: Home, label: "Overview", href: "/seller" },
  { icon: Box, label: "Products", href: "/seller/products" },
  { icon: ShoppingCart, label: "Orders", href: "/seller/orders" },
  { icon: CreditCard, label: "Payments", href: "/seller/payments" },
  { icon: Settings, label: "Settings", href: "/seller/settings" },
];

export default function DashboardProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useAppSelector((state) => state.auth);
  console.log(user);
  return (
    <SellerLayout sidebarItems={sidebarItems} user={user}>
      {children}
    </SellerLayout>
  );
}
