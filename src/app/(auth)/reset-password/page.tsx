"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetPassword() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleReset = () => {
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    // API call later
    router.push("/login");
  };

  return (
    <div className="flex h-screen bg-[#f8fafc]">
      {/* LEFT */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-[#060c2c] p-10">
        <div className="max-w-md w-full bg-linear-to-br from-[#0f172a] to-[#1e293b] rounded-xl p-10 shadow-sm border border-white/5">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <path d="M7 7h4M7 11h4M7 15h4" />
              <path d="M13 7l2 2 3-3" />
            </svg>
          </div>

          <h2 className="text-3xl font-semibold text-white leading-tight">
            Asset Management
          </h2>

          <p className="mt-4 text-gray-400 text-sm leading-relaxed">
            Track, manage, and optimize assets with real-time visibility and
            automation.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex gap-3">
              <span className="text-green-400">✔</span>
              <p className="text-sm text-gray-300">Real-time asset tracking</p>
            </div>

            <div className="flex gap-3">
              <span className="text-green-400">✔</span>
              <p className="text-sm text-gray-300">Reduce risks and costs</p>
            </div>

            <div className="flex gap-3">
              <span className="text-green-400">✔</span>
              <p className="text-sm text-gray-300">
                End-to-end lifecycle management
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex w-full md:w-1/2 items-center justify-center">
        <div className="w-full max-w-sm px-6">
          {/* Heading */}
          <h1 className="text-2xl font-semibold text-gray-900">
            Reset Password
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Create a new secure password for your account
          </p>

          {/* FORM */}
          <div className="mt-6 space-y-4">
            <input
              type="password"
              placeholder="New password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />

            <input
              type="password"
              placeholder="Confirm password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />

            <button className="w-full py-2 rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition">
              Reset Password
            </button>

            {/* NAVIGATION */}
            <div className="mt-4 flex justify-between items-center">
              {/* Back (Secondary) */}
              <button
                onClick={() => router.push("/verify-otp")}
                className="px-3 py-1.5 rounded-md text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 transition"
              >
                ← Back
              </button>

              {/* Login (Primary Action) */}
              <button
                onClick={() => router.push("/login")}
                className="px-3 py-1.5 rounded-md text-xs font-medium bg-gray-900 text-white hover:bg-gray-800 transition shadow-sm"
              >
                Login →
              </button>
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
