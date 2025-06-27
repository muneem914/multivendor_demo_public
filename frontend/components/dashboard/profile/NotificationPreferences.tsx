"use client";

import { useUpdateNotificationPreferencesMutation } from "@/lib/redux/api/userApi";
import { useAppSelector } from "@/lib/redux/hooks";
import React, { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

const NotificationPreferences = () => {
  const { user } = useAppSelector((state) => state.auth);
  // console.log(user);
  const notificationData = user?.notificationPreferences;

  const [updateNotificationPreferences, { isLoading, isError, isSuccess }] =
    useUpdateNotificationPreferencesMutation();

  const [form, setForm] = useState({
    orderUpdates: false,
    promotions: false,
    newsletter: false,
    wishlistUpdates: false,
  });

  useEffect(() => {
    if (notificationData) {
      setForm({
        orderUpdates: notificationData?.orderUpdates || false,
        promotions: notificationData?.promotions || false,
        newsletter: notificationData?.newsletter || false,
        wishlistUpdates: notificationData?.wishlistUpdates || false,
      });
    }
    if (isError) {
      toast.error("something went wrong");
    }

    if (isSuccess) {
      toast.success("Preferences updated successfully");
    }
  }, [notificationData, isError, isSuccess]);

  const originalData = {
    orderUpdates: notificationData?.orderUpdates || false,
    promotions: notificationData?.promotions || false,
    newsletter: notificationData?.newsletter || false,
    wishlistUpdates: notificationData?.wishlistUpdates || false,
  };

  const isFormChanged = JSON.stringify(form) !== JSON.stringify(originalData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await updateNotificationPreferences(form);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update preferences");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 mt-10 mb-4">
        <div className="flex items-center justify-between  border-b pb-5 mb-5">
          <p className="font-semibold">Order Updates</p>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="orderUpdates"
              checked={form.orderUpdates}
              onChange={handleChange}
              className="sr-only peer"
            />
            <div className="relative w-9 h-5 bg-gray-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
          </label>
        </div>
        <div className="flex items-center justify-between  border-b pb-5 mb-5">
          <p className="font-semibold">Promotions and deals</p>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="promotions"
              checked={form.promotions}
              onChange={handleChange}
              className="sr-only peer"
            />
            <div className="relative w-9 h-5 bg-gray-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
          </label>
        </div>
        <div className="flex items-center justify-between  border-b pb-5 mb-5">
          <p className="font-semibold">Newsletter</p>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="newsletter"
              checked={form.newsletter}
              onChange={handleChange}
              className="sr-only peer"
            />
            <div className="relative w-9 h-5 bg-gray-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
          </label>
        </div>
        <div className="flex items-center justify-between  border-b pb-5 mb-5">
          <p className="font-semibold">Wishlist updates</p>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="wishlistUpdates"
              checked={form.wishlistUpdates}
              onChange={handleChange}
              className="sr-only peer"
            />
            <div className="relative w-9 h-5 bg-gray-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
          </label>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading || !isFormChanged}
          className={`rounded px-3 py-2 text-white transition ${
            isLoading || !isFormChanged
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {isLoading ? "Saving..." : "Save Preferences"}
        </button>
      </div>
    </form>
  );
};

export default NotificationPreferences;
