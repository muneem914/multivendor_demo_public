"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Eye, Trash2, TriangleAlert, X } from "lucide-react";
import {
  useDeleteUserByIdMutation,
  useGetAllCustomersQuery,
} from "@/lib/redux/api/userApi";
import { IUser } from "@/types/user";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AllCustomers() {
  const [selectCustomer, setSelectCustomer] = useState<IUser | null>(null);
  const { data, isLoading, isError, refetch } = useGetAllCustomersQuery(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [
    deleteUserById,
    { isSuccess: isSuccessDelete, isError: isErrorDelete },
  ] = useDeleteUserByIdMutation();

  useEffect(() => {
    if (isSuccessDelete) {
      toast.success("User deletion successful");
      refetch();
    }
    if (isErrorDelete) {
      toast.error("user deletion failed.");
    }
  }, [isSuccessDelete, isErrorDelete, refetch]);

  const handleDeleteCustomer = (id: string | undefined) => {
    deleteUserById(id);
    setDeleteOpen(false);
  };

  if (isLoading) return <p>Loading customers...</p>;
  if (isError) return <p>Failed to load customers</p>;

  const customerData: IUser[] = data?.customers ?? [];

  console.log(customerData);
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
                      <Link
                        href={`/admin/customers/${customer._id}`}
                        className="border rounded  border-gray-300 flex items-center gap-1 p-1 cursor-pointer"
                      >
                        <Eye />{" "}
                      </Link>
                      <button
                        onClick={() => {
                          setSelectCustomer(customer);
                          setDeleteOpen(true);
                        }}
                        className="border rounded border-red-500 text-red-500 p-1 cursor-pointer"
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog
        open={deleteOpen}
        onClose={() => {
          setDeleteOpen(false);
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
            <h1 className="text-xl font-semibold">Delete Customer?</h1>
            <h1 className="text-lg font-semibold capitalize">
              ID: {selectCustomer?._id}
            </h1>
            <h1>
              Customer: {selectCustomer?.fName} | +880 {selectCustomer?.phone}
            </h1>
            <h1>Email: {selectCustomer?.email}</h1>
            <p className="text-gray-500 text-center">
              Are you sure you want to delete this customer? After that, all the
              customer information with their orders information, will be
              removed.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => {
                setDeleteOpen(false);
              }}
              className="rounded order-2 sm:order-1 border border-red-600 flex gap-2 items-center justify-center bg-white py-3 font-semibold text-red-600 hover:bg-red-600 hover:text-white"
            >
              <X /> Cancel
            </button>
            <button
              onClick={() => handleDeleteCustomer(selectCustomer?._id)}
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
