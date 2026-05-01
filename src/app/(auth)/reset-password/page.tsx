"use client";

import { clearError, resetPasswordAction } from "@/store/auth/authActions";
import { AppDispatch, RootState } from "@/store/auth/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ResetPassword() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { otpEmail, resetLoading, error } = useSelector(
    (state: RootState) => state.auth,
  );
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (!otpEmail) {
      router.push("/forgot-password");
    }
    dispatch(clearError());
  }, [otpEmail, router, dispatch]);

  const handleReset = async () => {
    setPasswordError("");

    if (password !== confirm) {
      setPasswordError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    await dispatch(resetPasswordAction(otpEmail, password, router));
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
          <h1 className="text-2xl font-semibold text-gray-900">
            Reset Password
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Create a new secure password for your account
          </p>
          {(error || passwordError) && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">
              {error || passwordError}
            </div>
          )}

          {/* FORM */}
          <div className="mt-6 space-y-4">
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />

            <input
              type="password"
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleReset()}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />

            <button
              onClick={handleReset}
              disabled={resetLoading}
              className="w-full py-2 rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition"
            >
              {resetLoading ? "Resetting..." : "Reset Password"}
            </button>

            {/* NAVIGATION */}
            <div className="mt-4 flex justify-between items-center">
              {/* Back */}
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
