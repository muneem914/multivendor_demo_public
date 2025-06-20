"use client";
import Address from "@/components/dashboard/profile/Address";
import NotificationPreferences from "@/components/dashboard/profile/NotificationPreferences";
import PasswordChanger from "@/components/dashboard/profile/PasswordChanger";
import ProfileInformation from "@/components/dashboard/profile/ProfileInformation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Plus } from "lucide-react";

export default function CustomerProfilePage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-1">Profile</h1>
      <p className="text-gray-500 mb-5">
        Manage your account settings and preference
      </p>
      <Tabs defaultValue="personal" className="">
        <TabsList className="w-full h-15 p-2 border rounded-sm">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="address">Address</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        <br />
        <TabsContent value="personal">
          <div className="bg-white p-6 rounded-lg border border-border">
            <h2 className="text-xl font-bold mb-1">Personal Information</h2>
            <p className="text-gray-500 mb-5">Update your personal details.</p>
            <ProfileInformation />
          </div>

          <div className="bg-white p-6 rounded-lg border border-border my-10">
            <h2 className="text-xl font-bold mb-1">Change Password</h2>
            <p className="text-gray-500 mb-5">Change your current password.</p>
            <PasswordChanger />
          </div>

          <div className="bg-white p-6 rounded-lg border border-border my-10">
            <h2 className="text-xl font-bold mb-1">Notification Preferences</h2>
            <p className="text-gray-500 mb-5">
              Manage how you receive notifications.
            </p>
            <NotificationPreferences />
          </div>
        </TabsContent>
        <TabsContent value="address">
          <div className="bg-white p-6 rounded-lg border border-border">
            <div className="grid sm:flex items-center justify-between gap-3">
              <div className=" order-2 sm:order-1">
                <h2 className="text-xl font-bold mb-1">Addresses</h2>
                <p className="text-gray-500 mb-5">
                  Manage your shipping and billing addresses.
                </p>
              </div>
              <div className=" order-1 sm:order-2">
                <button
                  disabled
                  title="currently not available"
                  className="disabled:bg-gray-300 disabled:cursor-not-allowed rounded px-3 py-2 flex gap-3 bg-red-500 cursor-pointer text-white"
                >
                  <Plus /> Add Address
                </button>
              </div>
            </div>

            <Address />
          </div>
        </TabsContent>

        <TabsContent value="transactions">
          <div className="bg-white p-6 rounded-lg border border-border">
            <h2 className="text-xl font-bold mb-1">Payment Transactions</h2>
            <p className="text-gray-500 mb-2">
              Track your payments and download receipts. All transactions are
              securely processed via XYZ gateway.
            </p>

            <div className="rounded border p-4 mt-4">
              <div className="grid sm:flex justify-between">
                <h3 className="font-semibold order-2 sm:order-1">
                  Wireless Noise-Cancelling Headphones
                </h3>
                <div className="bg-green-100 text-green-600 rounded-xl py-1 px-3 order-1 sm:order-2 w-fit mb-2 sm:mb-0">
                  Paid
                </div>
              </div>
              <p className="text-gray-500">Transaction ID: TXN-4532219</p>
              <div className="grid sm:flex justify-between gap-3 mt-2">
                <div className="">
                  <p className="font-semibold">$249.99</p>
                  <p className="text-gray-500">May 26, 2025</p>
                </div>
                <div className="">
                  <button className="flex items-center gap-2 border p-2 rounded cursor-pointer">
                    <Download /> Download Receipt
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded border p-4  mt-4">
              <div className="grid sm:flex justify-between">
                <h3 className="font-semibold order-2 sm:order-1">
                  Wireless Noise-Cancelling Headphones
                </h3>
                <div className="bg-yellow-100 text-yellow-600 rounded-xl py-1 px-3 order-1 sm:order-2 w-fit mb-2 sm:mb-0">
                  Pending
                </div>
              </div>
              <p className="text-gray-500">Transaction ID: TXN-4532219</p>
              <div className="grid sm:flex justify-between gap-3 mt-2">
                <div className="">
                  <p className="font-semibold">$249.99</p>
                  <p className="text-gray-500">May 26, 2025</p>
                </div>
                <div className="">
                  <button
                    disabled
                    className="flex items-center gap-2 border p-2 rounded text-gray-500 cursor-not-allowed"
                  >
                    <Download /> Download Receipt
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded border p-4  mt-4">
              <div className="grid sm:flex justify-between">
                <h3 className="font-semibold order-2 sm:order-1">
                  Wireless Noise-Cancelling Headphones
                </h3>
                <div className="bg-red-50 text-red-600 rounded-xl py-1 px-3 order-1 sm:order-2 w-fit mb-2 sm:mb-0">
                  Failed
                </div>
              </div>
              <p className="text-gray-500">Transaction ID: TXN-4532219</p>
              <div className="grid sm:flex justify-between gap-3 mt-2">
                <div className="">
                  <p className="font-semibold">$249.99</p>
                  <p className="text-gray-500">May 26, 2025</p>
                </div>
                <div className="">
                  <button
                    disabled
                    className="flex items-center gap-2 border p-2 rounded text-gray-500 cursor-not-allowed"
                  >
                    <Download /> Download Receipt
                  </button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
