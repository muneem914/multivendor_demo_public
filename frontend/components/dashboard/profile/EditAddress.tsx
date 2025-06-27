"use client";

import { useUpdateAddressMutation } from "@/lib/redux/api/userApi";
import { Address } from "@/types/user";
import { Edit, X } from "lucide-react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditAddress = ({ address }: { address: Address }) => {
  console.log(address);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    label: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const [updateAddress, { isSuccess, isError }] = useUpdateAddressMutation();

  const isDisabled =
    !form.label ||
    !form.street ||
    !form.city ||
    !form.state ||
    !form.postalCode ||
    !form.country;

  const originalData = {
    label: address?.label || "",
    street: address?.street || "",
    city: address?.city || "",
    state: address?.state || "",
    postalCode: address?.postalCode || "",
    country: address?.country || "",
  };
  const isFormChanged = JSON.stringify(form) !== JSON.stringify(originalData);

  useEffect(() => {
    if (address) {
      setForm({
        label: address?.label || "",
        street: address?.street || "",
        city: address?.city || "",
        state: address?.state || "",
        postalCode: address?.postalCode || "",
        country: address?.country || "",
      });
    }
    if (isError) {
      toast.error("Error in updating new address");
    }
    if (isSuccess) {
      toast.success("Address Data Updated");
      setOpen(false);
    }
  }, [address, isError, isSuccess]);

  const handleCancel = (e: FormEvent) => {
    e.preventDefault();
    setForm({
      label: address?.label || "",
      street: address?.street || "",
      city: address?.city || "",
      state: address?.state || "",
      postalCode: address?.postalCode || "",
      country: address?.country || "",
    });
    setOpen(false);
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const updated = {
      label: form.label,
      street: form.street,
      city: form.city,
      state: form.state,
      country: form.country,
      postalCode: form.postalCode,
    };
    await updateAddress({
      id: address?._id,
      data: updated,
    });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex hover:bg-red-500 transition hover:text-white items-center gap-1 p-2 rounded border py-2 px-3 cursor-pointer"
      >
        <Edit />
        Edit
      </button>

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <DialogPanel
          className="
            relative z-50 w-full max-w-4xl max-h-[90vh] overflow-hidden
            rounded-xl bg-white shadow-xl flex flex-col
          "
        >
          <div className="flex-shrink-0 p-6">
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Update Existing Address
            </DialogTitle>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                <div className="grid mb-3">
                  <label htmlFor="label" className="mb-2">
                    Label<span className="text-red-600 ml-2">*</span>
                  </label>
                  <input
                    type="text"
                    name="label"
                    id="label"
                    value={form.label}
                    required
                    onChange={handleChange}
                    placeholder="e.g. Home, Work, Office. . "
                    className="border rounded p-2"
                  />
                </div>
                <div className="grid mb-3">
                  <label htmlFor="street" className="mb-2">
                    Street<span className="text-red-600 ml-2">*</span>
                  </label>
                  <input
                    type="text"
                    name="street"
                    id="street"
                    value={form.street}
                    required
                    onChange={handleChange}
                    placeholder="Your Street Address"
                    className="border rounded p-2"
                  />
                </div>
                <div className="grid mb-3">
                  <label htmlFor="postalCode" className="mb-2">
                    Postal Code<span className="text-red-600 ml-2">*</span>
                  </label>
                  <input
                    type="number"
                    name="postalCode"
                    id="postalCode"
                    value={form.postalCode}
                    required
                    onChange={handleChange}
                    placeholder="e.g. 5800, 9203"
                    className="border rounded p-2"
                  />
                </div>
                <div className="grid mb-3">
                  <label htmlFor="country" className="mb-2">
                    Country<span className="text-red-600 ml-2">*</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    value={form.country}
                    required
                    onChange={handleChange}
                    placeholder="e.g. Bangladesh"
                    className="border rounded p-2"
                  />
                </div>
                <div className="grid mb-3">
                  <label htmlFor="state" className="mb-2">
                    State/Division<span className="text-red-600 ml-2">*</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    value={form.state}
                    required
                    onChange={handleChange}
                    placeholder="e.g. Dhaka, Rajshahi"
                    className="border rounded p-2"
                  />
                </div>
                <div className="grid mb-3">
                  <label htmlFor="city" className="mb-2">
                    City/District<span className="text-red-600 ml-2">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={form.city}
                    required
                    onChange={handleChange}
                    placeholder="e.g. Bogura, Naogaon"
                    className="border rounded p-2"
                  />
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleCancel}
                  className="rounded order-2 sm:order-1 border border-red-600 flex gap-2 items-center justify-center bg-white py-3 font-semibold text-red-600 hover:bg-red-600 hover:text-white"
                >
                  <X /> Cancel
                </button>
                <button
                  type="submit"
                  disabled={isDisabled || !isFormChanged}
                  className="disabled:cursor-not-allowed disabled:bg-gray-300 cursor-pointer rounded bg-red-600 py-3 order-1 sm:order-2 flex gap-2 items-center justify-center font-semibold text-white hover:bg-red-500"
                >
                  Update Address
                </button>
              </div>
            </div>
          </form>
        </DialogPanel>
      </Dialog>
    </>
  );
};

export default EditAddress;
