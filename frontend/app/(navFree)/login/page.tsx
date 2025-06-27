"use client";
import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@/lib/redux/api/authApi";
import { useAppSelector } from "@/lib/redux/hooks";
import { setUser } from "@/lib/redux/slices/authSlice";
import Loader from "@/components/common/Loader";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [login, { isSuccess, isLoading, error }] = useLoginMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  const isAuthenticated = useAppSelector((state) => state.auth);
  const { user } = useAppSelector((state) => state.auth);
  const [checkingAuth, setCheckingAuth] = useState(false);

  console.log(isAuthenticated);
  useEffect(() => {
    setCheckingAuth(true);
  }, []);
  useEffect(() => {
    if (user) {
      if (user.role === "admin") router.push("/admin");
      else if (user.role === "seller") router.push("/seller");
      else if (user.role === "customer") router.push("/");
    }
  }, [checkingAuth, user, router]);

  const isDisabled = !form.email || form.password.length < 6;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await login(form).unwrap();
    dispatch(setUser(res.user));
    if (res.user.role === "admin") router.push("/admin");
    if (res.user.role === "seller") router.push("/seller");
    if (res.user.role === "customer") router.push("/");
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Successful");
    }
    if (error) {
      const errorMessage =
        "data" in error &&
        error.data &&
        typeof error.data === "object" &&
        "message" in error.data
          ? (error.data as { message: string }).message
          : "message" in error
          ? error.message || "Login failed"
          : "Login failed";

      toast.error(errorMessage);
    }
  }, [isSuccess, error]);

  if (!checkingAuth) return <Loader />;

  return (
    <>
      <div className="h-screen flex">
        <div className="hidden md:block md:w-1/2 fixed left-0 top-0 h-full z-0">
          <Image
            src="/login.png"
            alt="Login Visual"
            layout="fill"
            objectFit="cover"
          />
        </div>

        <div className="w-full md:w-1/2 md:ml-auto relative z-10">
          <div className="px-6 sm:px-10 py-10 flex justify-center items-center min-h-screen">
            <div className="w-full sm:max-w-md">
              <div className="mb-7 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Brand Logo"
                  width={150}
                  height={60}
                />
              </div>

              <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
              <p className="text-gray-600 mb-8">
                Please enter your details to login.
              </p>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    placeholder="••••••••"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isDisabled || isLoading}
                  className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-600">
                <p>
                  Do not have an account?{" "}
                  <Link
                    href="/register/customer"
                    className="text-red-600 hover:underline"
                  >
                    Register
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
    </>
  );
}
