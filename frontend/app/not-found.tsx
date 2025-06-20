"use client";

import { ArrowLeftCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const rounter = useRouter();
  const handleGoBack = () => {
    rounter.back();
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
          <p className="text-xl font-semibold text-gray-700 mb-6">
            Oops! Page not found.
          </p>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <button
            onClick={handleGoBack}
            className="inline-flex items-center justify-center gap-2 bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition"
          >
            <ArrowLeftCircle className="w-5 h-5" />
            Go Back
          </button>
        </div>
      </div>
    </>
  );
}
