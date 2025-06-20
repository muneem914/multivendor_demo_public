"use client";

import {
  Check,
  Eye,
  X,
} from "lucide-react";
import { useGetAllSellersQuery } from "@/lib/redux/api/authApi";
import { IUser } from "@/types/user";
import Link from "next/link";

export default function AllSellers() {
  const { data, isLoading, isError } = useGetAllSellersQuery(null);

  if (isLoading) return <p>Loading sellers...</p>;
  if (isError) return <p>Failed to load sellers</p>;

  const sellerData: IUser[] = data?.sellers ?? [];

  return (
    <>
      <h1 className="text-2xl">Total Sellers: {sellerData.length}</h1>

      <div className="bg-white rounded border my-5">
        <div className="overflow-x-auto">
          <table className="w-full table-auto divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-500 whitespace-nowrap">
                  Seller ID
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-500 whitespace-nowrap">
                  Shop Name
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-500 whitespace-nowrap">
                  Seller
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-500 whitespace-nowrap">
                  Email
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-500 whitespace-nowrap">
                  Verified
                </th>
                <th className="px-6 py-3 text-right font-semibold text-gray-500 whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sellerData.map((seller) => (
                <tr key={seller._id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                    {seller._id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {seller.shop?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">
                    {seller.fName} {seller.lName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">
                    {seller.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-3 ">
                    {seller.shop?.isVerified === true ? (
                      <div className="flex  gap-2 text-green-600 text-sm">
                        <Check size={16} /> Approved
                      </div>
                    ) : (
                      <div className="flex  gap-2 text-red-600 text-sm">
                        <X size={16} /> Not approved
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right justify-end ">
                    {seller.shop?.isVerified === true ? (
                      <Link href={`/admin/sellers/${seller._id}`} className="border rounded text-sm p-2 flex gap-2"><Eye/> View</Link>
                    ) : (
                      <button className="text-sm bg-red-500 p-2 rounded text-white cursor-pointer">Approve</button>
                    )}
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
