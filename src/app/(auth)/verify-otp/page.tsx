"use client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/auth/store";
import { clearError, resendOtpAction, verifyOtpAction } from "@/store/auth/authActions";

export default function VerifyOTP() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { otpEmail, otpLoading, error } = useSelector((state: RootState) => state.auth);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const isOtpValid = otp.every((digit) => digit !== "");

  useEffect(() => {
    if (!otpEmail) {
      router.push("/forgot-password");
    }
    dispatch(clearError());
  }, [otpEmail, router, dispatch]);

  // Timer
  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // OTP INPUT
  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  // VERIFY
  const handleVerify = async () => {
    const fullOtp = otp.join("");
    const isOtpValid = fullOtp.length === 6;

    if (fullOtp.length !== 6) {
      toast.error("Enter complete OTP");
      return;
    }
    await dispatch(verifyOtpAction(otpEmail, fullOtp, router));
  };

  // Resend otp
  const handleResend = () => {
    if (!canResend) return;
    dispatch(resendOtpAction(otpEmail));
    setTimer(60);
    setCanResend(false);
  };

  return (
    <div className="flex h-screen bg-[#f8fafc]">
      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-[#060c2c] p-10">
        <div className="max-w-md w-full bg-linear-to-br from-[#0f172a] to-[#1e293b] rounded-xl p-10 shadow-sm border border-white/5">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
            <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <path d="M7 7h4M7 11h4M7 15h4" />
              <path d="M13 7l2 2 3-3" />
            </svg>
          </div>

          <h2 className="text-3xl font-semibold text-white leading-tight">Asset Management</h2>

          <p className="mt-4 text-gray-400 text-sm leading-relaxed">
            Track, manage, and optimize assets with real-time visibility and automation.
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
              <p className="text-sm text-gray-300">End-to-end lifecycle management</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full md:w-1/2 items-center justify-center">
        <div className="w-full max-w-sm px-6 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Verify OTP</h1>
          <p className="text-sm text-gray-500 mt-1">Enter the 6-digit code sent to your email</p>
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">
              {error}
            </div>
          )}

          {/* OTP INPUT */}
          <div className="flex justify-between gap-2 mt-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                maxLength={1}
                className="w-10 h-12 text-center border border-gray-300 rounded-xl text-lg focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          {/* VERIFY */}
          <button
            onClick={handleVerify}
            disabled={!isOtpValid}
            className={`w-full mt-6 py-2 rounded-md  text-white text-sm font-medium ${
              isOtpValid ? "bg-gray-900" : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {otpLoading ? "Verifying..." : "Verify OTP"}
          </button>

          {/* RESEND TIMER */}
          <div className="mt-4 text-xs text-gray-500">
            {canResend ? (
              <span onClick={handleResend} className="text-blue-600 cursor-pointer hover:underline">
                Resend OTP
              </span>
            ) : (
              <span>Resend in {timer}s</span>
            )}
          </div>

          {/* NAVIGATION */}
          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={() => router.push("/forgot-password")}
              className="flex items-center gap-1 px-3 py-1.5 rounded-2xl text-xs font-medium bg-white/60 backdrop-blur border border-gray-200 text-gray-700 hover:bg-white hover:shadow-sm transition"
            >
              ← Back
            </button>

            <button
              onClick={() => router.push("/login")}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-900 text-white hover:bg-gray-800 shadow-sm transition"
            >
              Login →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
