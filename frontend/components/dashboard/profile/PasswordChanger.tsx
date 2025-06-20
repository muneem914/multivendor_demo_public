"use client";

import { useUpdateUserPasswordMutation } from "@/lib/redux/api/authApi";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

const PasswordChanger = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [updateUserPassword, { isLoading, isSuccess, isError }] =
    useUpdateUserPasswordMutation();
  useEffect(() => {
    if (isSuccess) {
      toast.success("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
    }
    if (isError) {
      toast.error("Current password incorrect");
    }
  }, [isSuccess, isError]);

  const isButtonDisabled =
    isLoading || currentPassword.length < 6 || newPassword.length < 6;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (currentPassword === newPassword) {
      toast.error(
        "Current and new password are same. Try a different password."
      );
      return;
    }

    const data = {
      currentPassword,
      newPassword,
    };

    try {
      updateUserPassword(data);
    } catch (error) {
      console.log(error);
      toast.error("check console");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="grid">
          <label htmlFor="currentPassword" className="font-semibold mb-2">
            Current Password
          </label>
          <input
            type="password"
            name="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            id="currentPassword"
            className="border rounded p-2"
            placeholder="Your Current Password"
          />
        </div>
        <div className="grid">
          <label htmlFor="newPassword" className="font-semibold mb-2">
            New Password{" "}
            <span className="text-red-500 text-sm font-normal">
              {" "}
              * Minimum 6 character
            </span>
          </label>
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            id="newPassword"
            className="border rounded p-2"
            placeholder="New Password"
          />
        </div>
      </div>
      <div className="flex justify-end mt-5">
        <button
          type="submit"
          disabled={isButtonDisabled}
          className="disabled:bg-gray-400 disabled:cursor-not-allowed bg-red-600 px-3 py-2 rounded text-white cursor-pointer"
        >
          {isLoading ? "Changing..." : "Change Password"}
        </button>
      </div>
    </form>
  );
};

export default PasswordChanger;
