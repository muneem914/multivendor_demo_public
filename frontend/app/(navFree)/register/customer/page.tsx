"use client";

import { useRegisterMutation } from "@/lib/redux/api/authApi";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setUser } from "@/lib/redux/slices/authSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CustomerRegisterPage() {
  const [form, setForm] = useState({
    fName: "",
    lName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    addresses: [
      {
        label: "",
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        isDefault: true,
      },
    ],
    notificationPreferences: {
      orderUpdates: true,
      promotions: false,
      newsletter: true,
      wishlistUpdates: true,
    },
  });

  const { user } = useAppSelector((state) => state.auth);

  const [register, { isLoading, isError, isSuccess }] = useRegisterMutation();
  const dispatch = useAppDispatch();

  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  useEffect(() => {
    if (isError) {
      toast.error("authentication error");
    }
    if (isSuccess) {
      toast.success("Customer data saved");
    }
  }, [isError, isSuccess]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      addresses: [
        {
          ...prev.addresses[0],
          [name]: value,
        },
      ],
    }));
  };

  const isFormValid =
    form.fName.trim() &&
    form.lName.trim() &&
    form.email.trim() &&
    form.phone.trim() &&
    form.password.length >= 6 &&
    form.confirmPassword.length >= 6 &&
    form.password === form.confirmPassword &&
    form.addresses[0].label.trim() &&
    form.addresses[0].street.trim() &&
    form.addresses[0].city.trim() &&
    form.addresses[0].state.trim() &&
    form.addresses[0].postalCode.trim() &&
    form.addresses[0].country.trim();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Password are not matched.");
      return;
    }

    const { confirmPassword, ...submitData } = form;
    console.log(confirmPassword);

    const finalData = {
      ...submitData,
      phone: Number(submitData.phone),
    };

    console.log(finalData);
    try {
      const result = await register(finalData).unwrap();
      dispatch(setUser(result.user));
      toast.success("Registration successful! Welcome aboard!");
      router.push("/");
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="h-screen flex">
      <div className="hidden md:block md:w-1/2 fixed left-0 top-0 h-full z-0">
        <Image
          src="/register.png"
          alt="Register Visual"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="w-full md:w-1/2 md:ml-auto relative z-10">
        <div className="px-6 sm:px-10 py-10 flex justify-center items-center min-h-screen">
          <div className="w-full sm:max-w-md">
            <div className="mb-7 flex items-center justify-center">
              <Image src="/logo.png" alt="Brand Logo" width={150} height={60} />
            </div>

            <h2 className="text-3xl font-bold mb-2">Create an Account</h2>
            <p className="text-gray-600 mb-8">
              Fill in the details to register.
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/2">
                  <label
                    htmlFor="fName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                    <span className="text-xs text-red-600 pl-2">*</span>
                  </label>
                  <input
                    id="fName"
                    name="fName"
                    value={form.fName}
                    type="text"
                    required
                    placeholder="your first name"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full sm:w-1/2">
                  <label
                    htmlFor="lName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                    <span className="text-xs text-red-600 pl-2">*</span>
                  </label>
                  <input
                    id="lName"
                    name="lName"
                    value={form.lName}
                    type="text"
                    required
                    placeholder="your last name"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email<span className="text-xs text-red-600 pl-2">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  value={form.email}
                  type="email"
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="you@example.com"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone<span className="text-xs text-red-600 pl-2">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  value={form.phone}
                  type="tel"
                  required
                  placeholder="+880123456789"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                  <span className="text-xs text-red-600 pl-2">
                    * 6 Character at least
                  </span>
                </label>
                <input
                  id="password"
                  name="password"
                  value={form.password}
                  type="password"
                  required
                  placeholder="••••••••"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                  <span className="text-xs text-red-600 pl-2">
                    * 6 Character at least
                  </span>
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  type="password"
                  required
                  placeholder="••••••••"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  onChange={handleChange}
                />
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Shipping Address
                </h3>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/2">
                  <label
                    htmlFor="label"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Label<span className="text-xs text-red-600 pl-2">*</span>
                  </label>
                  <input
                    id="label"
                    name="label"
                    value={form.addresses[0].label}
                    type="text"
                    required
                    placeholder="Home, Work, Office"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    onChange={handleAddressChange}
                  />
                </div>
                <div className="w-full sm:w-1/2">
                  <label
                    htmlFor="street"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Street<span className="text-xs text-red-600 pl-2">*</span>
                  </label>
                  <input
                    id="street"
                    name="street"
                    value={form.addresses[0].street}
                    type="text"
                    required
                    placeholder="Street Address"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    onChange={handleAddressChange}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/2">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City<span className="text-xs text-red-600 pl-2">*</span>
                  </label>
                  <input
                    id="city"
                    name="city"
                    value={form.addresses[0].city}
                    type="text"
                    required
                    placeholder="City"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    onChange={handleAddressChange}
                  />
                </div>
                <div className="w-full sm:w-1/2">
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700"
                  >
                    State<span className="text-xs text-red-600 pl-2">*</span>
                  </label>
                  <input
                    id="state"
                    name="state"
                    value={form.addresses[0].state}
                    type="text"
                    required
                    placeholder="State"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    onChange={handleAddressChange}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/2">
                  <label
                    htmlFor="postalCode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Postal Code
                    <span className="text-xs text-red-600 pl-2">*</span>
                  </label>
                  <input
                    id="postalCode"
                    name="postalCode"
                    value={form.addresses[0].postalCode}
                    type="text"
                    required
                    placeholder="Postal Code"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    onChange={handleAddressChange}
                  />
                </div>
                <div className="w-full sm:w-1/2">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Country<span className="text-xs text-red-600 pl-2">*</span>
                  </label>
                  <input
                    id="country"
                    name="country"
                    value={form.addresses[0].country}
                    type="text"
                    required
                    placeholder="Country"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    onChange={handleAddressChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !isFormValid}
                className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              <p>
                Already have an account?{" "}
                <Link href="/login" className="text-red-600 hover:underline">
                  Login
                </Link>
              </p>
              <p className="mt-2">
                <Link href="/" className="text-red-600 hover:underline">
                  Go to Homepage
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
