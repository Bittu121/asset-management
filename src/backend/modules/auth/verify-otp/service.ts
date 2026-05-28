import { timingSafeEqual } from "crypto";
import UserAccount from "../../admin/user-account/schema";

const MAX_ATTEMPTS = 5;
const LOCK_DURATION_MS = 15 * 60 * 1000;

export const verifyOtpService = async (email: string, otp: string) => {
  const user = await UserAccount.findOne({ email });
  if (!user) return { success: false, message: "User not found" };

  // Rate limit: reject if locked
  if (user.otpLockedUntil && new Date() < user.otpLockedUntil) {
    return { success: false, message: "Too many attempts. Try again after 15 minutes." };
  }

  // Check expiry
  if (!user.otpExpiry || new Date() > user.otpExpiry) {
    return { success: false, message: "OTP has expired" };
  }

  // Constant-time OTP comparison to prevent timing attacks
  const storedBuf = Buffer.from(user.otp ?? "");
  const providedBuf = Buffer.from(otp);
  const isMatch =
    storedBuf.length === providedBuf.length && timingSafeEqual(storedBuf, providedBuf);

  if (!isMatch) {
    const attempts = (user.otpAttempts ?? 0) + 1;
    const lock = attempts >= MAX_ATTEMPTS ? new Date(Date.now() + LOCK_DURATION_MS) : null;
    await UserAccount.findByIdAndUpdate(user._id, {
      otpAttempts: attempts,
      ...(lock ? { otpLockedUntil: lock } : {}),
    });
    return { success: false, message: "Invalid OTP" };
  }

  // Clear OTP and reset rate-limit counters after successful verification
  await UserAccount.findByIdAndUpdate(user._id, {
    otp: "",
    otpExpiry: null,
    isVerified: true,
    otpAttempts: 0,
    otpLockedUntil: null,
  });

  return { success: true, message: "OTP verified successfully" };
};
