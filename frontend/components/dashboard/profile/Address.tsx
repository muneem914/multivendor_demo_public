"use client";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useAppSelector } from "@/lib/redux/hooks";
import { Check, MapPin, Trash2, TriangleAlert, X } from "lucide-react";
import EditAddress from "./EditAddress";
import {
  useDeleteAddressMutation,
  useSetDefaultAddressMutation,
} from "@/lib/redux/api/userApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Address as AddressInterface } from "@/types/user";

const Address = () => {
  const { user } = useAppSelector((state) => state.auth);

  console.log(user?.addresses);
  const addresses = user?.addresses;

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [defaultOpen, setDefaultOpen] = useState(false);

  const [selectedAddress, setSelectedAddress] =
    useState<AddressInterface | null>(null);

  // const isDefault = true;
  const [
    deleteAddress,
    { isSuccess: isDeleteSuccess, isError: isDeleteError },
  ] = useDeleteAddressMutation();
  const [
    setDefaultAddress,
    { isSuccess: isDefaultSuccess, isError: isDefaultError },
  ] = useSetDefaultAddressMutation();

  useEffect(() => {
    if (isDeleteError) {
      toast.error("Error in deleting");
    }
    if (isDefaultError) {
      toast.error("Error in making this address default");
    }
    if (isDeleteSuccess) {
      toast.success("Address deleted successfully");
    }
    if (isDefaultSuccess) {
      toast.success("Default Address changed");
    }
  }, [isDefaultError, isDeleteError, isDefaultSuccess, isDeleteSuccess]);

  const handleDelete = (id: string | undefined) => {
    deleteAddress(id);
    setDeleteOpen(false);
  };
  const handleDefault = async (id: string | undefined) => {
    await setDefaultAddress({
      id,
      data: { isDefault: true },
    });
    setDefaultOpen(false);
  };
  return (
    <>
      {addresses?.map((address, index) => (
        <div key={index} className="rounded border p-4 mt-4">
          <h3 className="font-semibold text-lg flex gap-3 mb-4">
            <MapPin />
            {address.label}
          </h3>
          <p className="text-gray-500 capitalize">
            {" "}
            {address.street}, {address.city} - {address.postalCode}
          </p>
          <p className="text-gray-500 capitalize">
            {" "}
            {address.state}, {address.country}
          </p>
          <div className="flex gap-3 flex-wrap mt-3">
            <EditAddress address={address} />
            <button
              onClick={() => {
                setSelectedAddress(address);
                setDeleteOpen(true);
              }}
              className="flex items-center gap-1 p-2 text-red-500 rounded border border-red-200 py-2 px-3 cursor-pointer"
            >
              <Trash2 />
              Delete
            </button>
            {address.isDefault ? (
              <button className="flex items-center gap-1 text-gray-500 p-2 py-2 px-3r cursor-not-allowed">
                <Check /> Default
              </button>
            ) : (
              <button
                onClick={() => {
                  setSelectedAddress(address);
                  setDefaultOpen(true);
                }}
                className="flex hover:bg-red-500 transition hover:text-white items-center gap-1 p-2 rounded border py-2 px-3 cursor-pointer"
              >
                Set as Default
              </button>
            )}
          </div>
        </div>
      ))}

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
            <h1 className="text-xl font-semibold">Delete Address?</h1>
            <h1 className="text-lg font-semibold capitalize">
              Label: {selectedAddress?.label}
            </h1>
            <h1>
              Street: {selectedAddress?.street} | Post code:{" "}
              {selectedAddress?.postalCode}
            </h1>
            <h1 className="capitalize">
              {selectedAddress?.city}, {selectedAddress?.state},{" "}
              {selectedAddress?.country}
            </h1>
            <p className="text-gray-500 text-center">
              Are you sure you want to delete this address? After that, all the
              address information associated with this address, will be removed.
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
              onClick={() => handleDelete(selectedAddress?._id)}
              className="rounded bg-red-600 py-3 order-1 sm:order-2 flex gap-2 items-center justify-center font-semibold text-white hover:bg-red-500"
            >
              Confirm
            </button>
          </div>
        </DialogPanel>
      </Dialog>

      <Dialog
        open={defaultOpen}
        onClose={() => {
          setDefaultOpen(false);
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
            <h1 className="text-xl font-semibold">Delete Address?</h1>
            <h1 className="text-lg font-semibold capitalize">
              Label: {selectedAddress?.label}
            </h1>
            <h1>
              Street: {selectedAddress?.street} | Post code:{" "}
              {selectedAddress?.postalCode}
            </h1>
            <h1 className="capitalize">
              {selectedAddress?.city}, {selectedAddress?.state},{" "}
              {selectedAddress?.country}
            </h1>
            <p className="text-gray-500 text-center">
              Are you sure you want to make this address default? After that,
              all the address associated with this account, will be removed as
              default and only this address will be default.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => {
                setDefaultOpen(false);
              }}
              className="rounded order-2 sm:order-1 border border-red-600 flex gap-2 items-center justify-center bg-white py-3 font-semibold text-red-600 hover:bg-red-600 hover:text-white"
            >
              <X /> Cancel
            </button>
            <button
              onClick={() => handleDefault(selectedAddress?._id)}
              className="rounded bg-red-600 py-3 order-1 sm:order-2 flex gap-2 items-center justify-center font-semibold text-white hover:bg-red-500"
            >
              Make Default
            </button>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
};

export default Address;
