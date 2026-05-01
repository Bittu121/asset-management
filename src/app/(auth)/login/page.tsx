"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store/auth/store";
import { clearError, loginAction } from "../../../store/auth/authActions";
import Image from "next/image";

function Login() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    // Clear error on mount
    dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    if (!form.email.trim() || !form.password.trim()) return;
    await dispatch(loginAction(form.email, form.password, router));
  };

  return (
    <div className="flex h-screen bg-[#f8fafc]">
      <div className="hidden md:flex w-1/2 items-center justify-center bg-[#060c2c] p-10">
        <div className="max-w-md w-full bg-linear-to-br from-[#0f172a] to-[#1e293b] rounded-xl p-10 shadow-sm border border-white/5">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
            <Image
              src="/asset-icon.webp"
              alt="Asset"
              width={50}
              height={50}
              className="object-contain brightness-200 rounded-xl"
            />
          </div>

          <h2 className="text-3xl font-semibold text-white leading-tight">
            Asset Management
          </h2>

          <p className="mt-4 text-gray-400 text-sm leading-relaxed">
            Track, manage, and optimize assets with real-time visibility and
            automation.
          </p>

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

      {/* RIGHT SIDE */}
      <div className="flex w-full md:w-1/2 items-center justify-center">
        <div className="w-full max-w-sm px-6">
          {/* Heading */}
          <h1 className="text-2xl font-semibold text-gray-900">Welcome back</h1>
          <p className="text-sm text-gray-500 mt-1">
            Please login to your account
          </p>

          {/* Form */}
          <div className="mt-6 space-y-4">
            {/* Google Login */}
            <button className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-100 transition">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-4 h-4"
              />
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-2">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-xs text-gray-400">OR</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Email */}
            <input
              name="email"
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Password */}
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Forgot Password */}
            <div className="flex justify-end">
              <span
                onClick={() => router.push("/forgot-password")}
                className="text-xs text-gray-500 cursor-pointer hover:underline"
              >
                Forgot password?
              </span>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="w-full py-2 rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition"
            >
              Login
            </button>
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

export default Login;
