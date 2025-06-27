"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import {
  useDeleteUserByIdMutation,
  useGetSellerByIdQuery,
  useInvalidateSellerMutation,
} from "@/lib/redux/api/userApi";
import { ArrowLeft, CircleAlert, TriangleAlert, X } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminSellerDetails() {
  const params = useParams();
  const router = useRouter();
  const [invalidOpen, setInvalidOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { data } = useGetSellerByIdQuery(params.id);

  const [
    invalidateSeller,
    { isSuccess: isSuccessInvalidate, isError: isErrorInvalidate },
  ] = useInvalidateSellerMutation();
  const [
    deleteUserById,
    { isSuccess: isSuccessDelete, isError: isErrorDelete },
  ] = useDeleteUserByIdMutation();

  const seller = data?.seller;
  console.log(seller);
  useEffect(() => {
    if (isSuccessInvalidate) {
      router.push("/admin/sellers");
      toast.success("Seller is now invalidated (Unverified)");
    }
    if (isSuccessDelete) {
      router.push("/admin/sellers");
      toast.success("User deletion successful");
    }
    if (isErrorDelete) {
      toast.error("user deletion failed.");
    }
    if (isErrorInvalidate) {
      toast.error("seller invalidation failed");
    }
  }, [
    isSuccessDelete,
    isErrorDelete,
    isSuccessInvalidate,
    isErrorInvalidate,
    router,
  ]);

  const handleDeleteSeller = (id: string | undefined) => {
    deleteUserById(id);
    setDeleteOpen(false);
  };
  const handleInvalidateSeller = (id: string | undefined) => {
    invalidateSeller(id);
    setInvalidOpen(false);
  };
  return (
    <>
      <h1 className="text-2xl flex gap-3 items-center font-semibold">
        <Link href="/admin/sellers">
          <ArrowLeft />
        </Link>{" "}
        Seller Details
      </h1>
      <br />
      <h1 className="text-2xl text-green-600">
        N.B. this page will contain all the products form a particular seller
        with full control (edit, update etc. all functionality) both for product
        information and seller information
      </h1>
      <br />
      <h1 className="text-2xl">Seller ID: {seller?._id}</h1>
      <br />
      <h1 className="text-2xl">
        Name: {seller?.fName} {seller?.lName}
      </h1>
      <br />
      <h1 className="text-2xl">Email: {seller?.email}</h1>
      <br />
      <h1 className="text-2xl">Shop name: {seller?.shop?.name}</h1>
      <br />
      <h1 className="text-2xl">Shop Address: {seller?.shop?.location}</h1>
      <br />
      <h1 className="text-2xl">
        Verification Status:{" "}
        {seller?.shop?.isVerified === true ? "verified" : "Not yet verified"}
      </h1>
      <br />
      <br />
      <button
        onClick={() => {
          setInvalidOpen(true);
        }}
        className="p-2 border rounded bg-red-500 text-white cursor-pointer mr-4"
      >
        Invalidate this seller
      </button>
      <button
        onClick={() => {
          setDeleteOpen(true);
        }}
        className="p-2 border rounded bg-red-500 text-white cursor-pointer mr-4"
      >
        Delete this seller
      </button>
      <br />

      <Dialog
        open={invalidOpen}
        onClose={() => {
          setInvalidOpen(false);
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
            <h1 className="text-xl font-semibold">Invalidate Seller?</h1>
            <h1 className="text-lg font-semibold capitalize">
              Seller ID: {seller?._id}
            </h1>
            <h1>
              Seller: {seller?.fName} | Shop: {seller?.shop?.name}
            </h1>
            <h1>Email: {seller?.email}</h1>
            <p className="text-gray-500 text-center">
              Are you sure you want to invalidate this seller? After that,
              seller will not be able to add, edit or delete any product into
              this site.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => {
                setInvalidOpen(false);
              }}
              className="rounded order-2 sm:order-1 border border-red-600 flex gap-2 items-center justify-center bg-white py-3 font-semibold text-red-600 hover:bg-red-600 hover:text-white"
            >
              <X /> Cancel
            </button>
            <button
              onClick={() => handleInvalidateSeller(seller?._id)}
              className="rounded bg-red-600 py-3 order-1 sm:order-2 flex gap-2 items-center justify-center font-semibold text-white hover:bg-red-500"
            >
              Confirm
            </button>
          </div>
        </DialogPanel>
      </Dialog>

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
            <h1 className="text-xl font-semibold">Delete Seller?</h1>
            <h1 className="text-lg font-semibold capitalize">
              Seller ID: {seller?._id}
            </h1>
            <h1>
              Seller: {seller?.fName} | Shop: {seller?.shop?.name}
            </h1>
            <h1>Email: {seller?.email}</h1>
            <p className="text-gray-500 text-center">
              Are you sure you want to delete this seller? After that, all the
              seller information with their products, will be removed.
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
              onClick={() => handleDeleteSeller(seller?._id)}
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
