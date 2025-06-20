"use client";

import {
  Eye,
  SquarePen,
  Trash2,
} from "lucide-react";
import {  useGetAllCustomersQuery } from "@/lib/redux/api/authApi";
import { IUser } from "@/types/user";

export default function AllCustomers() {
  const { data, isLoading, isError } = useGetAllCustomersQuery(null);

  if (isLoading) return <p>Loading customers...</p>;
  if (isError) return <p>Failed to load customers</p>;

  const customerData: IUser[] = data?.customers ?? [];

  return (
    <>
      <h1 className="text-2xl">Total Customers: {customerData.length}</h1>

      <div className="bg-white rounded border my-5">
        <div className="overflow-x-auto">
          <table className="w-full table-auto divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-500 whitespace-nowrap">
                  Customer ID
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-500 whitespace-nowrap">
                   Name
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-500 whitespace-nowrap">
                  Phone
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-500 whitespace-nowrap">
                  Email
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-500 whitespace-nowrap">
                  Orders
                </th>
                <th className="px-6 py-3 text-right font-semibold text-gray-500 whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {customerData.map((customer) => (
                <tr key={customer._id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                    {customer._id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {customer.fName} {customer.lName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">
                    +880 {customer.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">
                    {customer.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">
                    0
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right justify-end ">
                    <div className="flex gap-2">
                        <button className="border rounded-md border-green-500 text-green-500 p-1 cursor-pointer"><Trash2 size={20}/></button>
                        <button className="border rounded-md border-blue-500 text-blue-500 p-1 cursor-pointer"><Eye size={20}/></button>
                        <button className="border rounded-md border-red-500 text-red-500 p-1 cursor-pointer"><SquarePen size={20}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
