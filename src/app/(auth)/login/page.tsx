"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store/auth/store";
import { clearError, loginAction } from "../../../store/auth/authActions";
import Image from "next/image";
import { ArrowRight, Eye, EyeOff, KeyRound } from "lucide-react";

function Login() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) dispatch(clearError());
  };

  const handleLogin = async () => {
    if (!form.email.trim() || !form.password.trim()) return;
    setLoginLoading(true);
    await dispatch(loginAction(form.email, form.password, router));
    setLoginLoading(false);
  };

  return (
    <div className="flex h-screen bg-[#f8fafc]">
      {/* LEFT SIDE */}
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
            Track, allocate, and manage assets with real-time visibility across
            your organization.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-green-400 mt-1">✔</span>
              <p className="text-sm text-gray-300">Real-time asset tracking</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 mt-1">✔</span>
              <p className="text-sm text-gray-300">Role-based access control</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 mt-1">✔</span>
              <p className="text-sm text-gray-300">
                Gate pass & allocation workflows
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full md:w-1/2 items-center justify-center">
        <div className="w-full max-w-sm px-6">
          <h1 className="text-2xl font-semibold text-gray-900">Welcome back</h1>
          <p className="text-sm text-gray-500 mt-1">
            Please login to your account
          </p>

          <div className="mt-6 space-y-4">
            {/* Error message */}
            {error && (
              <div className="px-4 py-2.5 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Email */}
            <input
              name="email"
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              disabled={loginLoading}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-400"
            />

            {/* Password with show/hide toggle */}
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                disabled={loginLoading}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                disabled={loginLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <span
                onClick={() => !loginLoading && router.push("/forgot-password")}
                className="text-xs text-gray-500 cursor-pointer hover:underline"
              >
                Forgot password?
              </span>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={loginLoading}
              className="w-full py-2 rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loginLoading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </div>

          {/* Demo access */}
          <a
            href="mailto:bittukumar8713@gmail.com?subject=Asset%20Management%20-%20Demo%20Credentials"
            className="group mt-6 flex items-center gap-3 rounded-lg border border-gray-200 bg-white/60 px-4 py-3 transition-all hover:border-gray-300 hover:bg-white hover:shadow-sm"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-gray-900/5 text-gray-500 transition group-hover:bg-gray-900 group-hover:text-white">
              <KeyRound size={14} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-medium text-gray-900">
                Request demo credentials
              </span>
              <span className="block text-[11px] text-gray-500">
                Get access to explore the full web app
              </span>
            </span>
            <ArrowRight
              size={14}
              className="shrink-0 text-gray-300 transition-all group-hover:translate-x-0.5 group-hover:text-gray-900"
            />
          </a>

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
