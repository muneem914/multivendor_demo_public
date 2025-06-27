/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import {
  Check,
  ChevronDown,
  X,
  Plus,
  Search,
  SquarePen,
  Trash,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import imgUrl from "@/public/images.jpeg";
import Image from "next/image";


export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("stock status");
  const [selectedCategory, setSelectedCategory] = useState("category");
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const onStatusSelect = (status: string) => {
    setSelectedStatus(status);
  };
  const onCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredOrders = useMemo(() => {
    const initialData = [
      {
        id: "ORD-12395",
        image: imgUrl,
        name: "premium denim jeans",
        sku: "TS-001",
        status: "low stock",
        price: 166,
        category: "wearable",
        stock: 28,
      },
      {
        id: "ORD-12345",
        image: imgUrl,
        name: "viewsonic monitor",
        sku: "TS-002",
        status: "active",
        price: 234,
        category: "laptop & accessories",
        stock: 134,
      },
      {
        id: "ORD-12346",
        image: imgUrl,
        name: "Hair serum",
        sku: "TS-003",
        status: "out of stock",
        price: 23,
        category: "skin care",
        stock: 0,
      },
      {
        id: "ORD-12347",
        image: imgUrl,
        name: "Organic face cream",
        sku: "TS-004",
        status: "active",
        price: 50,
        category: "skin care",
        stock: 70,
      },
      {
        id: "ORD-12348",
        image: imgUrl,
        name: "premium cotton tshirt",
        sku: "TS-006",
        status: "low stock",
        price: 80,
        category: "mens clothing",
        stock: 12,
      },
      {
        id: "ORD-12349",
        image: imgUrl,
        name: "leather walltet",
        sku: "TS-007",
        status: "out of stock",
        price: 100,
        category: "wearable",
        stock: 0,
      },
      {
        id: "ORD-12350",
        image: imgUrl,
        name: "wireless earbuds",
        sku: "TS-008",
        status: "active",
        price: 67,
        category: "headphone & audio",
        stock: 35,
      },
      {
        id: "ORD-12351",
        image: imgUrl,
        name: "Bamboo cuttting board",
        sku: "TS-009",
        status: "out of stock",
        price: 75,
        category: "kitchen & dining",
        stock: 22,
      },
    ];

    let currentOrders = initialData;

    // Apply search filter
    if (searchQuery) {
      currentOrders = currentOrders.filter(
        (item) =>
          item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.status.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (selectedStatus !== "stock status") {
      currentOrders = currentOrders.filter(
        (item) => item.status === selectedStatus
      );
    }
    if (selectedCategory !== "category") {
      currentOrders = currentOrders.filter(
        (item) => item.category === selectedCategory
      );
    }

    return currentOrders;
  }, [searchQuery, selectedStatus, selectedCategory]);

  const orderStatuses = ["stock status","active", "low stock", "out of stock"];
  const categories = [
    "category",
    "kitchen & dining",
    "headphone & audio",
    "wearable",
    "mens clothing",
    "skin care",
    "laptop & accessories",
  ];

  return (
    <>
      <div className="flex justify-between mb-5">
        <h1 className="text-xl font-semibold">Products</h1>
        <Link
          href="/seller/products/new"
          className="flex gap-3 px-3 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
        >
          <Plus /> Add Product
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 mb-3 lg:mb-7">
        <div className="">
          <div className="relative w-full z-0">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
              <Search />
            </span>
            <input
              type="text"
              name=""
              id=""
              placeholder="Search by name, SKU or Status..."
              className="w-full border rounded bg-white pl-10 pr-3 py-3 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200"
              value={searchQuery}
              onChange={onSearchChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="bg-white capitalize w-full border rounded hover:border-blue-600 hover:text-blue-600 transition px-3 py-3 cursor-pointer flex items-center justify-center gap-4">
                  {
                    selectedCategory ? selectedCategory : <span className="">Category:</span>
                  }
                  {/* <span className="font-semibold capitalize">
                    {selectedCategory}
                  </span>{" "} */}
                  <ChevronDown size={20} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onSelect={() => onCategorySelect(category)}
                    className="cursor-pointer capitalize"
                  >
                    {category === selectedCategory && (
                      <Check size={16} className="mr-2" />
                    )}
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="bg-white capitalize w-full border rounded hover:border-blue-600 hover:text-blue-600 transition px-3 py-3 cursor-pointer flex items-center justify-center gap-4">
                  {
                    selectedStatus ? selectedStatus : <span className="">Stock Status:</span>
                  }
                  {/* <span className="font-semibold capitalize">
                    {selectedStatus}
                  </span>{" "} */}
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
        </div>
      </div>

      <div className="bg-white rounded border my-3 hidden sm:block">
        <div className="">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 py-3 md:px-6 md:py-3 text-left font-semibold text-gray-500 whitespace-nowrap">
                  Image
                </th>
                <th className="px-2 py-3 md:px-6 md:py-3 text-left font-semibold text-gray-500 whitespace-nowrap">
                  Name
                </th>
                <th className="px-2 py-3 md:px-6 md:py-3 text-left font-semibold text-gray-500 whitespace-nowrap">
                  SKU
                </th>
                <th className="px-2 py-3 md:px-6 md:py-3 text-left font-semibold text-gray-500 whitespace-nowrap hidden lg:table-cell">
                  Price
                </th>
                <th className="px-2 py-3 md:px-6 md:py-3 text-left font-semibold text-gray-500 whitespace-nowrap hidden lg:table-cell">
                  Stock
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
                  <tr key={item.id} className="hover:bg-gray-100 my-auto">
                    <td className="px-2 py-3 md:px-6 md:py-3 whitespace-nowrap text-gray-800">
                      <span className="">
                        <Image
                          width={50}
                          height={50}
                          src={item.image}
                          alt={item.name}
                        />
                      </span>
                    </td>
                    <td className="px-2 py-3 md:px-6 md:py-3 whitespace-nowrap text-gray-600 capitalize">
                      {item.name}
                    </td>
                    <td className="px-2 py-3 md:px-6 md:py-3  whitespace-nowrap text-gray-600">
                      {item.sku}
                    </td>
                    <td className="px-2 py-3 md:px-6 md:py-3 whitespace-nowrap text-gray-800 hidden lg:table-cell">
                      ${item.price}
                    </td>
                    <td className="px-2 py-3 md:px-6 md:py-3 whitespace-nowrap text-gray-800 hidden lg:table-cell">
                      {item.stock}
                    </td>
                    <td className="px-2 py-3 md:px-6 md:py-3 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 text-sm capitalize rounded-full font-medium ${
                          item.status === "active"
                            ? "bg-green-100 text-green-600"
                            : item.status === "low stock"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-2 py-3 md:px-6 md:py-3 whitespace-nowrap text-right flex gap-3 justify-end items-center">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/seller/products/update/${item.id}`}
                          className="px-3 py-2 border rounded flex items-center gap-2 hover:border-red-600 hover:text-red-600"
                        >
                          {" "}
                          <SquarePen />{" "}
                          <span className=" hidden lg:block">Edit</span>
                        </Link>
                        <button
                          onClick={() => {
                            setSelectedProduct(item);
                            setOpen(true);
                          }}
                          className="flex items-center gap-2 px-2 py-2 cursor-pointer rounded text-red-500 border border-red-300"
                        >
                          <Trash />{" "}
                          <span className=" hidden lg:block">Delete</span>
                        </button>
                      </div>
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

      <div className="block sm:hidden">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((item) => (
            <div key={item.id} className="rounded border bg-white p-2 my-3">
              <div className="flex gap-3">
                <Image
                  width={50}
                  height={50}
                  src={item.image}
                  alt={item.name}
                />
                <div className="">
                  <p className="font-semibold pb-1">{item.id}</p>
                  <p className="text-gray-500">{item.sku}</p>
                </div>
              </div>
              <div className="border my-1"></div>
              <div className="flex items-center justify-between my-2">
                <div>
                  <p className="text-gray-500 mb-2">Price</p>
                  <p>{item.price}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-2">Stock</p>
                  <p>{item.stock}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-2">Status</p>
                  <span
                    className={`px-3 py-1 text-sm capitalize rounded-full font-medium ${
                      item.status === "active"
                        ? "bg-green-100 text-green-600"
                        : item.status === "low stock"
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
                <Link
                  href={`/seller/products/update/${item.id}`}
                  className="px-3 py-2 border rounded justify-center flex w-full items-center gap-2 hover:border-red-600 hover:text-red-600"
                >
                  {" "}
                  <SquarePen /> Edit
                </Link>
                <button
                  onClick={() => {
                    setSelectedProduct(item);
                    setOpen(true);
                  }}
                  className="flex w-full items-center border justify-center gap-2 px-2 py-2 cursor-pointer rounded text-red-500 border-red-500 hover:text-white hover:bg-red-600"
                >
                  <Trash /> Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">No orders found.</div>
        )}
      </div>

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedProduct(null);
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
          <div className="p-3 sm:p4 flex flex-col items-center justify-center gap-3">
            <span className="bg-red-50 text-red-600 rounded-full p-3">
              <TriangleAlert />
            </span>
            <h1 className="text-xl font-semibold">Delete Product?</h1>
            <p className="text-gray-500 text-center">
              Are you sure you want to delete this product? This action cannot
              be undone.
            </p>
            <h1 className="text-lg font-semibold capitalize">
              {selectedProduct?.name}
            </h1>
          </div>

          <div className="mt-3 flex items-center justify-center gap-3">
            <button
              onClick={() => {
                setOpen(false);
                setSelectedProduct(null);
              }}
              className="rounded border flex gap-2 items-center justify-center bg-white px-3 py-2 font-semibold  hover:bg-red-600 hover:text-white"
            >
              <X /> Cancel
            </button>
            <button
              onClick={() => setOpen(false)}
              className="rounded bg-red-600 px-3 py-2 flex gap-2 items-center justify-center font-semibold text-white hover:bg-red-500"
            >
              <Trash /> Delete
            </button>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
}
