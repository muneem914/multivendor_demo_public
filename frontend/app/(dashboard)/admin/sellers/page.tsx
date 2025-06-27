"use client";

import { Check, CircleAlert, Eye, X } from "lucide-react";
import {
  useGetAllSellersQuery,
  useVerifySellerMutation,
} from "@/lib/redux/api/userApi";
import { IUser } from "@/types/user";
import Link from "next/link";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AllSellers() {
  const [open, setOpen] = useState(false);
  const [selectSeller, setSelectSeller] = useState<IUser | null>(null);

  const {
    data,
    isLoading,
    isError: getAllSellersError,
    refetch,
  } = useGetAllSellersQuery(null);
  const [verifySeller, { isSuccess, isError: verifySellerError }] =
    useVerifySellerMutation();

  const sellerData: IUser[] = data?.sellers ?? [];

  useEffect(() => {
    if (verifySellerError) {
      toast.error("Error encountered, while approving seller");
    }
    if (isSuccess) {
      toast.success("Seller Approved.");
      refetch();
    }
  }, [isSuccess, verifySellerError, refetch]);

  const handleApprove = (id: string | undefined) => {
    if (id) {
      verifySeller(id);
    } else {
      toast.error("Seller ID is missing for approval.");
    }
    setOpen(false);
  };
  if (isLoading) return <p>Loading sellers...</p>;
  if (getAllSellersError) return <p>Failed to load sellers</p>;

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
                  Verification
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
                        <Check size={16} /> Verified
                      </div>
                    ) : (
                      <div className="flex  gap-2 text-red-600 text-sm">
                        <X size={16} /> Not Verified
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right justify-end ">
                    {seller.shop?.isVerified === true ? (
                      <Link
                        href={`/admin/sellers/${seller._id}`}
                        className="border rounded text-sm p-2 flex gap-2"
                      >
                        <Eye /> View
                      </Link>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectSeller(seller);
                          setOpen(true);
                        }}
                        className="text-sm bg-red-500 p-2 rounded text-white cursor-pointer"
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
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
            <span className="bg-yellow-50 text-yellow-600 rounded-full p-3">
              <CircleAlert />
            </span>
            <h1 className="text-xl font-semibold">Approve Seller?</h1>
            <h1 className="text-lg font-semibold capitalize">
              Seller ID: {selectSeller?._id}
            </h1>
            <h1>
              Seller: {selectSeller?.fName} | Shop: {selectSeller?.shop?.name}
            </h1>
            <h1>Email: {selectSeller?.email}</h1>
            <p className="text-gray-500 text-center">
              Are you sure you want to approve this seller? After that, seller
              will be able to add, edit or delete any product into this site.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => {
                setOpen(false);
              }}
              className="rounded order-2 sm:order-1 border border-red-600 flex gap-2 items-center justify-center bg-white py-3 font-semibold text-red-600 hover:bg-red-600 hover:text-white"
            >
              <X /> Cancel
            </button>
            <button
              onClick={() => handleApprove(selectSeller?._id)}
              className="rounded bg-red-600 py-3 order-1 sm:order-2 flex gap-2 items-center justify-center font-semibold text-white hover:bg-red-500"
            >
              Confirm
            </button>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
}
