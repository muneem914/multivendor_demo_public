"use client";

import { useUpdateUserProfileMutation } from "@/lib/redux/api/authApi";
import { useAppSelector } from "@/lib/redux/hooks";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProfileInformation = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [updateUserProfile, { isLoading, isSuccess, isError }] =
    useUpdateUserProfileMutation();

  const [form, setForm] = useState({
    fName: "",
    lName: "",
    email: "",
    phone: "",
    bio: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        fName: user?.fName || "",
        lName: user?.lName || "",
        email: user?.email || "",
        phone: user?.phone?.toString() || "",
        bio: user?.bio || "",
      });
    }
    if (isError) {
      toast.error("Something went wrong");
    }
    if (isSuccess) {
      toast.success("Saved Information");
    }
  }, [user, isError]);

  const originalData = {
    fName: user?.fName || "",
    lName: user?.lName || "",
    email: user?.email || "",
    phone: user?.phone?.toString() || "",
    bio: user?.bio || "",
  };
  const isFormChanged = JSON.stringify(form) !== JSON.stringify(originalData);

  const handleCancel = (e: FormEvent) => {
    e.preventDefault();
    setForm({
      fName: user?.fName || "",
      lName: user?.lName || "",
      email: user?.email || "",
      phone: user?.phone?.toString() || "",
      bio: user?.bio || "",
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const updated = {
      fName: form.fName,
      lName: form.lName,
      email: form.email,
      phone: Number(form.phone),
      bio: form.bio,
    };
    try {
      await updateUserProfile(updated);
      toast.success("Updated Profile Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Check console");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="grid">
            <label htmlFor="fName" className="font-semibold mb-2">
              First name
            </label>
            <input
              type="text"
              value={form.fName}
              onChange={handleChange}
              name="fName"
              id="fName"
              className="border rounded p-2"
              placeholder="first name"
            />
          </div>
          <div className="grid">
            <label htmlFor="lName" className="font-semibold mb-2">
              Last name
            </label>
            <input
              type="text"
              value={form.lName}
              onChange={handleChange}
              name="lName"
              id="lName"
              className="border rounded p-2"
              placeholder="last name"
            />
          </div>
          <div className="grid">
            <label htmlFor="email" className="font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={handleChange}
              name="email"
              id="email"
              className="border rounded p-2"
              placeholder="email"
            />
          </div>
          <div className="grid">
            <label htmlFor="phone" className="font-semibold mb-2">
              Phone
            </label>
            <input
              type="phone"
              value={form.phone}
              onChange={handleChange}
              name="phone"
              id="phone"
              className="border rounded p-2"
              placeholder="phone"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 mt-4">
          <label htmlFor="bio" className="font-semibold mb-2">
            Bio
          </label>
          <textarea
            rows={5}
            value={form.bio}
            onChange={handleChange}
            name="bio"
            id="bio"
            className="border rounded p-2"
            placeholder="Tell us about yourself"
          />
        </div>
        <div className="flex items-center justify-between gap-3 mt-4">
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 rounded border px-3 py-2 cursor-pointer"
          >
            <X /> Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading || !isFormChanged}
            className={`rounded px-3 py-2 text-white transition ${
              isLoading || !isFormChanged
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </>
  );
};

export default ProfileInformation;
