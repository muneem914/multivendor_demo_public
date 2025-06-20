'use client'
import { useAppSelector } from "@/lib/redux/hooks";
import {
  CircleCheckBig,
  Gift,
  Heart,
  Package,
  Star,
  Truck,
} from "lucide-react";

export default function CustomerDashboardPage() {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-6">Hi, {user?.fName} {user?.lName} 👋</h1>
      <p className="text-gray-500 mb-4 text-right">
        Last updated: Today, 10:30 AM
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white py-3 px-4 rounded-md border border-border shadow-sm flex items-center justify-between">
          <div className="">
            <p className="text-gray-600 mb-2">Total Orders</p>
            <h3 className="text-xl font-bold">24</h3>
          </div>
          <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center">
            <Package color="#315CEA" />
          </div>
        </div>

        <div className="bg-white py-3 px-4 rounded-md border border-border shadow-sm flex items-center justify-between">
          <div className="">
            <p className="text-gray-600 mb-2">Wishlist Items</p>
            <h3 className="text-xl font-bold">24</h3>
          </div>
          <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center">
            <Heart color="#DF2648" />
          </div>
        </div>

        <div className="bg-white py-3 px-4 rounded-md border border-border shadow-sm flex items-center justify-between">
          <div className="">
            <p className="text-gray-600 mb-2">Pending Deliveries</p>
            <h3 className="text-xl font-bold">24</h3>
          </div>
          <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center">
            <Truck color="#F89118" />
          </div>
        </div>

        <div className="bg-white py-3 px-4 rounded-md border border-border shadow-sm flex items-center justify-between">
          <div className="">
            <p className="text-gray-600 mb-2">Active Coupons</p>
            <h3 className="text-xl font-bold">24</h3>
          </div>
          <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center">
            <Gift color="#27CE60" />
          </div>
        </div>
        {/* ))} */}
      </div>

      <div className="bg-white p-6 rounded-lg border border-border">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-10">
          <div className="grid sm:flex justify-between ">
            <div className="flex gap-3 order-2 sm:order-1">
              <div className="hidden sm:block">
                <CircleCheckBig color="#27CE60" />
              </div>
              <div className="">
                <h3 className="text-lg font-semibold mb-2">Order Delivered</h3>
                <p className="text-gray-500">
                  Your Order #ORD-7895 has been delivered
                </p>
              </div>
            </div>
            <div className="order-1 sm:order-2 mb-2">
              <p className="text-gray-500">Today, 9:45 AM</p>
            </div>
          </div>

          <div className="grid sm:flex justify-between ">
            <div className="flex gap-3 order-2 sm:order-1">
              <div className="hidden sm:block">
                <Heart color="#DF2648" />
              </div>
              <div className="">
                <h3 className="text-lg font-semibold mb-2">
                  Added to Wishlist
                </h3>
                <p className="text-gray-500">
                  {" "}
                  You added {"Wireless Headphones"} to your wishlist
                </p>
              </div>
            </div>
            <div className="order-1 sm:order-2 mb-2">
              <p className="text-gray-500">Yesterday, 4:30 pM</p>
            </div>
          </div>

          <div className="grid sm:flex justify-between ">
            <div className="flex gap-3 order-2 sm:order-1">
              <div className="hidden sm:block">
                <Truck color="#315CEA" />
              </div>
              <div className="">
                <h3 className="text-lg font-semibold mb-2">Order Shipped</h3>
                <p className="text-gray-500">
                  Your Order #ORD-7895 has been shipped
                </p>
              </div>
            </div>
            <div className="order-1 sm:order-2 mb-2">
              <p className="text-gray-500">Yesterday, 11:20 AM</p>
            </div>
          </div>

          <div className="grid sm:flex justify-between ">
            <div className="flex gap-3 order-2 sm:order-1">
              <div className="hidden sm:block">
                <Star color="#F89118" />
              </div>
              <div className="">
                <h3 className="text-lg font-semibold mb-2">Review Posted</h3>
                <p className="text-gray-500">
                  You posted a review for {"Smart Watch"}
                </p>
              </div>
            </div>
            <div className="order-1 sm:order-2 mb-2">
              <p className="text-gray-500">May 20, 2023</p>
            </div>
          </div>

          <div className="grid sm:flex justify-between ">
            <div className="flex gap-3 order-2 sm:order-1">
              <div className="hidden sm:block">
                <Gift color="#773FE2" />
              </div>
              <div className="">
                <h3 className="text-lg font-semibold mb-2">Coupon Applied</h3>
                <p className="text-gray-500">
                  {" "}
                  You used coupon {"SUMMER20"} on your purchase
                </p>
              </div>
            </div>
            <div className="order-1 sm:order-2 mb-2">
              <p className="text-gray-500">May 18, 2023</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
