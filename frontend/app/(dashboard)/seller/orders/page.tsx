"use client";
import { Eye, Search, Truck, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const filteredOrders = useMemo(() => {
    const initialData = [
      {
        id: "ORD-12395",
        date: "May 20, 2023",
        buyer: "shawkat mujahid",
        status: "pending",
        total: "249.99",
      },
      {
        id: "ORD-12345",
        date: "May 20, 2023",
        buyer: "Muneem hussain",
        status: "delivered",
        total: "249.99",
      },
      {
        id: "ORD-12346",
        date: "May 15, 2023",
        buyer: "Akash ovi",
        status: "shipped",
        total: "399.99",
      },
      {
        id: "ORD-12347",
        date: "May 10, 2023",
        buyer: "Plabon rudra",
        status: "pending",
        total: "159.98",
      },
      {
        id: "ORD-12348",
        date: "May 5, 2023",
        buyer: "kazi Nion",
        status: "delivered",
        total: "79.99",
      },
      {
        id: "ORD-12349",
        date: "April 30, 2023",
        buyer: "Mahbub alam",
        status: "cancelled",
        total: "129.99",
      },
      {
        id: "ORD-12350",
        date: "June 01, 2023",
        buyer: "Toufiq noor",
        status: "pending",
        total: "50.00",
      },
      {
        id: "ORD-12351",
        date: "June 05, 2023",
        buyer: "Masum billah",
        status: "shipped",
        total: "100.00",
      },
    ];

    let currentOrders = initialData;

    //  search filter
    if (searchQuery) {
      currentOrders = currentOrders.filter(
        (item) =>
          item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.buyer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.status.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (activeTab !== "all") {
      currentOrders = currentOrders.filter((item) => item.status === activeTab);
    }

    return currentOrders;
  }, [searchQuery, activeTab]);

  return (
    <>
      <h1 className="text-lg sm:text-xl font-semibold mb-5 my-2">Orders</h1>
      <div className="relative w-full mb-5 z-0">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
          <Search />
        </span>
        <input
          type="text"
          name=""
          id=""
          placeholder="Search by Order ID, Date, Buyer name or Status..."
          className="w-full border rounded bg-white pl-10 pr-3 py-3 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200"
          value={searchQuery}
          onChange={onSearchChange}
        />
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveTab} >
        <TabsList className="w-full h-15 p-2 border rounded-sm">
          <TabsTrigger value="all" >All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab}>
          <div className="bg-white rounded border my-3 hidden sm:block">
            <div className="">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-2 py-3 md:px-6 md:py-3 text-left font-semibold text-gray-500 whitespace-nowrap">
                      Order ID
                    </th>
                    <th className="px-2 py-3 md:px-6 md:py-3 text-left font-semibold text-gray-500 whitespace-nowrap">
                      Date
                    </th>
                    <th className="px-2 py-3 md:px-6 md:py-3 hidden lg:table-cell text-left font-semibold text-gray-500 whitespace-nowrap">
                      Buyer
                    </th>
                    <th className="px-2 py-3 md:px-6 md:py-3 text-left font-semibold text-gray-500 whitespace-nowrap">
                      Amount
                    </th>
                    <th className="px-2 py-3 md:px-6 md:py-3 text-left font-semibold text-gray-500 whitespace-nowrap">
                      Status
                    </th>
                    <th className="px-2 py-3 md:px-6 md:py-3 text-right font-semibold text-gray-500 whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-100">
                        <td className="px-2 py-3 md:px-6 md:py-3 whitespace-nowrap text-gray-800">
                          #{item.id}
                        </td>
                        <td className="px-2 py-3 md:px-6 md:py-3 whitespace-nowrap text-gray-600">
                          {item.date}
                        </td>
                        <td className="px-2 py-3 md:px-6 md:py-3 hidden lg:table-cell whitespace-nowrap text-gray-600">
                          {item.buyer}
                        </td>
                        <td className="px-2 py-3 md:px-6 md:py-3 whitespace-nowrap text-gray-800 font-medium">
                          ${item.total}
                        </td>
                        <td className="px-2 py-3 md:px-6 md:py-3 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 text-sm capitalize rounded-full font-medium ${
                              item.status === "delivered"
                                ? "bg-green-100 text-green-600"
                                : item.status === "shipped"
                                ? "bg-blue-100 text-blue-600"
                                : item.status === "pending"
                                ? "bg-yellow-100 text-yellow-600"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="px-2 py-3 md:px-6 md:py-3 whitespace-nowrap text-right flex gap-3 justify-end items-center">
                          {item.status === "pending" ? (
                            <div className="flex items-center gap-2">
                              <Link
                                href={`/seller/orders/${item.id}`}
                                className="px-3 py-2 border rounded flex items-center gap-2 hover:border-red-600 hover:text-red-600"
                              >
                                {" "}
                                <Eye />{" "}
                                <span className=" hidden lg:block">View</span>
                              </Link>
                              <button
                                onClick={() => {
                                  setSelectedOrder(item);
                                  setOpen(true);
                                }}
                                className="flex items-center gap-2 px-2 py-2 cursor-pointer rounded bg-red-500 text-white hover:bg-red-600"
                              >
                                <Truck />{" "}
                                <span className=" hidden lg:block">Ship</span>
                              </button>
                            </div>
                          ) : (
                            <Link
                              href={`/seller/orders/${item.id}`}
                              className="px-3 py-2 border rounded flex items-center gap-2 hover:border-red-600 hover:text-red-600"
                            >
                              {" "}
                              <Eye />{" "}
                              <span className=" hidden lg:block">View</span>
                            </Link>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-8 text-gray-500"
                      >
                        No orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="block sm:hidden">
            {filteredOrders.length > 0 ? (
            filteredOrders.map((item) => (
              <div key={item.id} className="rounded border bg-white p-2 my-3">
                <p className="font-semibold pb-1">{item.id}</p>
                <p className="text-gray-500">{item.date}</p>
                <div className="border my-1"></div>
                <div className="flex items-center justify-between my-2">
                  <div>
                    <p className="text-gray-500 mb-2">Buyer</p>
                    <p>{item.buyer}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-2">Amount</p>
                    <p>{item.total}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-2">Status</p>
                    <span
                      className={`px-3 py-1 text-sm capitalize rounded-full font-medium ${
                        item.status === "delivered"
                          ? "bg-green-100 text-green-600"
                          : item.status === "shipped"
                          ? "bg-blue-100 text-blue-600"
                          : item.status === "pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
                <div className="border my-2"></div>
                <div className="flex w-full gap-2">
                  {item.status === "pending" ? (
                            <>
                              <Link
                                href={`/seller/orders/${item.id}`}
                                className="px-3 py-2 border rounded justify-center flex w-full items-center gap-2 hover:border-red-600 hover:text-red-600"
                              >
                                {" "}
                                <Eye />{" "}
                                View Details
                              </Link>
                              <button
                                onClick={() => {
                                  setSelectedOrder(item);
                                  setOpen(true);
                                }}
                                className="flex w-full items-center justify-center gap-2 px-2 py-2 cursor-pointer rounded bg-red-500 text-white hover:bg-red-600"
                              >
                                <Truck />{" "}
                                Ship Order
                              </button>
                            </>
                          ) : (
                            <Link
                              href={`/seller/orders/${item.id}`}
                              className="px-3 py-2 border rounded justify-center flex w-full items-center gap-2 hover:border-red-600 hover:text-red-600"
                            >
                              {" "}
                              <Eye />{" "}
                              View
                            </Link>
                          )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No orders found.
            </div>
          )}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedOrder(null);
        }}
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />

        <DialogPanel
          className="
      relative z-50 w-full max-w-md sm:min-w-[300px] overflow-hidden
      rounded-xl bg-white p-6 shadow-xl
    "
        >
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Order: #{selectedOrder?.id}
          </DialogTitle>
          <p className="mb-5 text-gray-500">Placed on {selectedOrder?.date}</p>

          <div className="flex justify-between my-3">
            <p className="text-gray-500">Status</p>
            <p className="text-yellow-600 capitalize">
              {selectedOrder?.status}
            </p>
          </div>
          <div className="border"></div>
          <div className="flex justify-between my-3">
            <p className="text-gray-500">Product:</p>
            <p className="text-black capitalize">{selectedOrder?.status}</p>
          </div>
          <div className="flex justify-between my-3">
            <p className="text-gray-500">Amount:</p>
            <p className="text-black">${selectedOrder?.total}</p>
          </div>
          <div className="flex justify-between my-3">
            <p className="text-gray-500">Customer</p>
            <p className="text-black capitalize">{selectedOrder?.buyer}</p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => {
                setOpen(false);
                setSelectedOrder(null);
              }}
              className="rounded order-2 sm:order-1 border border-red-600 flex gap-2 items-center justify-center bg-white py-3 font-semibold text-red-600 hover:bg-red-600 hover:text-white"
            >
              <X /> Cancel
            </button>
            <button
              onClick={() => setOpen(false)}
              className="rounded bg-red-600 py-3 order-1 sm:order-2 flex gap-2 items-center justify-center font-semibold text-white hover:bg-red-500"
            >
              <Truck /> Ship Order
            </button>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
}
