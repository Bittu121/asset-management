"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/admin");
    }, 3000);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-[#f8fafc]">
      <div className="text-center max-w-md px-6">
        <div className="mb-6">
          <div className="w-14 h-14 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-500 text-lg">!</span>
          </div>
        </div>

        <h1 className="text-5xl font-semibold text-gray-900">404</h1>
        <div className="w-10 h-0.5 bg-gray-300 mx-auto my-4"></div>
        <p className="text-gray-600 text-sm leading-relaxed">
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </p>

        <button
          onClick={() => router.push("/admin")}
          className="mt-6 px-5 py-2 text-sm font-medium rounded-md bg-gray-900 text-white hover:bg-gray-800 transition"
        >
          Go to Dashboard
        </button>
        <p
          onClick={() => router.push("/login")}
          className="mt-4 text-xs text-gray-500 cursor-pointer hover:underline"
        >
          Back to Login
        </p>
      </div>
    </div>
  );
}
