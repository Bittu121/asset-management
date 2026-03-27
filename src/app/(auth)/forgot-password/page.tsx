"use client";

import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const router = useRouter();

  return (
    <div className="flex h-screen bg-[#f8fafc]">
      {/* LEFT SIDE (SAME AS LOGIN) */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-[#060c2c] p-10">
        <div className="max-w-md w-full bg-linear-to-br from-[#0f172a] to-[#1e293b] rounded-xl p-10 shadow-sm border border-white/5">
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <path d="M7 7h4M7 11h4M7 15h4" />
              <path d="M13 7l2 2 3-3" />
            </svg>
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-semibold text-white leading-tight">
            Asset Management
          </h2>

          {/* Description */}
          <p className="mt-4 text-gray-400 text-sm leading-relaxed">
            Track, manage, and optimize assets with real-time visibility and
            automation.
          </p>

          {/* Points */}
          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-green-400 mt-1">✔</span>
              <p className="text-sm text-gray-300">Real-time asset tracking</p>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-green-400 mt-1">✔</span>
              <p className="text-sm text-gray-300">Reduce risks and costs</p>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-green-400 mt-1">✔</span>
              <p className="text-sm text-gray-300">
                End-to-end lifecycle management
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE (FORGOT PASSWORD) */}
      <div className="flex w-full md:w-1/2 items-center justify-center">
        <div className="w-full max-w-sm px-6">
          {/* Heading */}
          <h1 className="text-2xl font-semibold text-gray-900">
            Forgot password
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Enter your email to receive a reset link
          </p>

          {/* Form */}
          <div className="mt-6 space-y-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Submit */}
            <button className="w-full py-2 rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition">
              Send Reset Link
            </button>

            {/* Back to login */}
            <div className="text-center mt-4">
              <span
                onClick={() => router.push("/login")}
                className="text-xs text-gray-500 cursor-pointer hover:underline"
              >
                Back to login
              </span>
            </div>
          </div>

          {/* Footer */}
          <p className="mt-8 text-xs text-gray-400 text-center">
            © 2026 Asset Management. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
