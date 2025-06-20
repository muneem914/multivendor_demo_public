"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Check,
  ChevronDown,
  Ellipsis,
  MapPinned,
  Repeat,
  Repeat2,
  Search,
  X,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function CustomerOrderPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const onStatusSelect = (status: string) => {
    setSelectedStatus(status);
  };

  const filteredOrders = useMemo(() => {
    const initialData = [
      {
        id: "ORD-12345",
        date: "May 20, 2023",
        status: "delivered",
        total: "249.99",
      },
      {
        id: "ORD-12346",
        date: "May 15, 2023",
        status: "shipped",
        total: "399.99",
      },
      {
        id: "ORD-12347",
        date: "May 10, 2023",
        status: "processing",
        total: "159.98",
      },
      {
        id: "ORD-12348",
        date: "May 5, 2023",
        status: "delivered",
        total: "79.99",
      },
      {
        id: "ORD-12349",
        date: "April 30, 2023",
        status: "cancelled",
        total: "129.99",
      },
      {
        id: "ORD-12350",
        date: "June 01, 2023",
        status: "processing",
        total: "50.00",
      },
      {
        id: "ORD-12351",
        date: "June 05, 2023",
        status: "shipped",
        total: "100.00",
      },
    ];

    let currentOrders = initialData;

    // Apply search filter
    if (searchQuery) {
      currentOrders = currentOrders.filter(
        (item) =>
          item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.status.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (selectedStatus !== "All") {
      currentOrders = currentOrders.filter(
        (item) => item.status === selectedStatus
      );
    }

    return currentOrders;
  }, [searchQuery, selectedStatus]);

  const orderStatuses = [
    "All",
    "delivered",
    "shipped",
    "processing",
    "cancelled",
  ];

  return (
    <>
      <h1 className="text-2xl font-bold mb-1">My Orders</h1>
      <p className="text-gray-500 mb-5">View and manage your order history.</p>

      <div className="flex w-full items-center gap-3 mt-2 mb-4">
        <div className="relative w-full p-1 z-0">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
            <Search />
          </span>
          <input
            type="text"
            name=""
            id=""
            placeholder="Search by Order ID, Date, or Status..."
            className="w-full border rounded bg-white pl-10 pr-3 py-3 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200"
            value={searchQuery}
            onChange={onSearchChange}
          />
        </div>
        {/* <button className="w-50 border rounded hover:border-red-600 hover:text-red-600 transition px-3 py-3 cursor-pointer flex items-center justify-between">
        Order Status <ChevronDown/>
      </button> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="bg-white sm:w-1/3 border rounded hover:border-blue-600 hover:text-blue-600 transition px-3 py-3 cursor-pointer flex items-center justify-between">
              <span className="hidden sm:block">Order Status:</span>{" "}
              <span className="font-semibold capitalize">{selectedStatus}</span>{" "}
              <ChevronDown size={20} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
            {orderStatuses.map((status) => (
              <DropdownMenuItem
                key={status}
                onSelect={() => onStatusSelect(status)}
                className="cursor-pointer capitalize"
              >
                {status === selectedStatus && (
                  <Check size={16} className="mr-2" />
                )}
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="bg-white rounded border my-5">
        <div className="overflow-x-auto">
          <table className="w-full table-auto divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-500 whitespace-nowrap">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-500 whitespace-nowrap">
                  Date
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-500 whitespace-nowrap">
                  Status
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-500 whitespace-nowrap">
                  Total
                </th>
                <th className="px-6 py-3 text-right font-semibold text-gray-500 whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* {initialData?.map((item) => (
            <tr key={item.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">#{item.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-3 py-1 capitalize rounded-full ${
                        item.status === 'delivered' ? 'bg-green-100 text-green-600' :
                        item.status === 'shipped' ? 'bg-blue-100 text-blue-600' :
                        item.status === 'processing' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-red-100 text-red-600'
                        }`}>
                        {item.status}
                        </span>
                    </td>
                <td className="px-6 py-4 whitespace-nowrap">${item.total}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right flex gap-3 justify-end">
                {
                    item.status === 'delivered' ? <button className="flex items-center gap-2 px-2 py-1 border rounded cursor-pointer hover:text-white hover:bg-red-600"><Repeat/> Buy Again</button> :
                    item.status === 'shipped' ? <button className="flex items-center gap-2 px-2 py-1 border rounded cursor-pointer hover:text-white hover:bg-red-600"><MapPinned/> Track</button> :
                    item.status === 'processing' ? <button className="flex items-center gap-2 px-2 py-1 border rounded cursor-pointer hover:text-white hover:bg-red-600"><X/> Cancel</button> :
                    <button className="flex items-center gap-2 px-2 py-1 border rounded cursor-pointer hover:text-white hover:bg-red-600"><Repeat2/> Reorder</button>
                }

                <DropdownMenu>
                    <DropdownMenuTrigger className="dropdown_trigger">
                        <button className="cursor-pointer"><Ellipsis/></button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                    <DropdownMenuItem>
                        <button className="cursor-pointer">View Order</button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <button className="cursor-pointer">Contact Seller</button>
                    </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                </td>
            </tr>
            ))} */}

              {filteredOrders.length > 0 ? (
                filteredOrders.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                      #{item.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {item.date}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 text-sm capitalize rounded-full font-medium ${
                          item.status === "delivered"
                            ? "bg-green-100 text-green-600"
                            : item.status === "shipped"
                            ? "bg-blue-100 text-blue-600"
                            : item.status === "processing"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">
                      ${item.total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right flex gap-3 justify-end items-center">
                      {item.status === "delivered" && (
                        <button className="flex items-center gap-2 px-3 py-2 border border-transparent rounded cursor-pointer text-green-600 hover:text-white hover:bg-green-600 transition-colors duration-200 text-sm">
                          <Repeat size={16} /> Buy Again
                        </button>
                      )}
                      {item.status === "shipped" && (
                        <button className="flex items-center gap-2 px-3 py-2 border border-transparent rounded cursor-pointer text-indigo-600 hover:text-white hover:bg-indigo-600 transition-colors duration-200 text-sm">
                          <MapPinned size={16} /> Track
                        </button>
                      )}
                      {item.status === "processing" && (
                        <button className="flex items-center gap-2 px-3 py-2 border border-transparent rounded cursor-pointer text-red-600 hover:text-white hover:bg-red-600 transition-colors duration-200 text-sm">
                          <X size={16} /> Cancel
                        </button>
                      )}
                      {item.status === "cancelled" && (
                        <button className="flex items-center gap-2 px-3 py-2 border border-transparent rounded cursor-pointer text-purple-600 hover:text-white hover:bg-purple-600 transition-colors duration-200 text-sm">
                          <Repeat2 size={16} /> Reorder
                        </button>
                      )}

                      <DropdownMenu>
                        <DropdownMenuTrigger
                          asChild
                          className="dropdown_trigger"
                        >
                          <button className="cursor-pointer p-1 rounded-full hover:bg-gray-100 transition-colors duration-200">
                            <Ellipsis size={20} className="text-gray-600" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem className="cursor-pointer px-4 py-2 hover:bg-gray-100 transition-colors duration-100 rounded text-gray-700">
                            <Link href={`/customer/orders/${item.id}`}>
                              View Order Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer px-4 py-2 hover:bg-gray-100 transition-colors duration-100 rounded text-gray-700">
                            <Link href="/customer/support">
                              Message to seller
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
