'use client';

import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function UnauthorizedPage() {
  const router = useRouter();
  const handleGoBack = () => router.push('/');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="flex items-center justify-center mb-6">
          <Lock className="w-12 h-12 text-red-500" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Unauthorized</h1>
        <p className="text-lg text-gray-700 mb-4">
          You don’t have permission to view this page.
        </p>
        <p className="text-gray-600 mb-6">
          If you believe this is a mistake, please contact support or try again with different credentials.
        </p>
        <button
          onClick={handleGoBack}
          className="inline-flex items-center justify-center gap-2 bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition"
        >
          <Lock className="w-5 h-5" />
          Go to home
        </button>
      </div>
    </div>
  );
}
