
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { CircleAlert } from "lucide-react";
import Link from "next/link";

export default function SellerDashboardPage() {
  return (
    // <ProtectedRoute allowedRoles={['seller']}>
    <div className="">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">Welcome back, name</h1>
      <h3 className="font-semibold">You;ve made <span className="font-bold">$2,450</span> Today.</h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 my-5 gap-4">
        <div className="p-4 border rounded bg-white col-span-1">
          <p className="text-gray-500 font-semibold">Sales Today</p>
          <h1 className="text-xl sm:text-2xl font-semibold my-2">$2,450</h1>
          <p className="flex gap-1 text-green-500 ">+ 15% from last period</p>
        </div>
        <div className="p-4 border rounded bg-white col-span-1">
          <p className="text-gray-500 font-semibold">Sales This Week</p>
          <h1 className="text-xl sm:text-2xl font-semibold my-2">$12,450</h1>
          <p className="flex gap-1 text-green-500 ">+ 8% from last period</p>
        </div>
        <div className="p-4 border rounded bg-white col-span-2 sm:col-span-1">
          <p className="text-gray-500 font-semibold">Sales</p>
          <h1 className="text-xl sm:text-2xl font-semibold my-2">$42,450</h1>
          <p className="flex gap-1 text-green-500 ">+ 12% from last period</p>
        </div>
      </div>

      <div className="border rounded bg-white p-4 my-5">
        <h3 className="font-semibold mb-4">Order Status</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3 border rounded flex gap-3">
            <div className="w-3 h-3 mt-1 rounded-full bg-yellow-500"></div>
            <div className="grid gap-2">
              <span className="">Pending</span>
              <p className="font-semibold">12</p>
            </div>
          </div>
          <div className="p-3 border rounded flex gap-3">
            <div className="w-3 h-3 mt-1 rounded-full bg-blue-500"></div>
            <div className="grid gap-2">
              <span className="">Shipped</span>
              <p className="font-semibold">24</p>
            </div>
          </div>
          <div className="p-3 border rounded flex gap-3">
            <div className="w-3 h-3 mt-1 rounded-full bg-green-500"></div>
            <div className="grid gap-2">
              <span className="">Delivered</span>
              <p className="font-semibold">155</p>
            </div>
          </div>
          <div className="p-3 border rounded flex gap-3">
            <div className="w-3 h-3 mt-1 rounded-full bg-red-500"></div>
            <div className="grid gap-2">
              <span className="">Cancelled</span>
              <p className="font-semibold">2</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-2 rounded bg-white p-4 my-5">
        <h3 className="font-semibold mb-4">Revenue Trend (30 days)</h3>
        <RevenueChart/>
      </div>
      <div className="border rounded border-yellow-400 bg-yellow-50 p-2 sm:p-4 my-5 grid grid-cols-1 sm:flex justify-between items-center">
          <span className="flex items-center gap-2 text-sm text-yellow-600"><CircleAlert/> You have 2 products running low. Restock now.</span>
          <Link href="/seller/products" className="justify-self-end bg-white border p-2 text-xs sm:text-sm border-yellow-400 rounded text-yellow-600" >View Products</Link>
      </div>
    </div>
    // </ProtectedRoute>
  );
}
