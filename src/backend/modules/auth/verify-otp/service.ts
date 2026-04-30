import UserAccount from "../../admin/user-account/schema";

export const verifyOtpService = async (email: string, otp: string) => {
  const user = await UserAccount.findOne({ email });
  if (!user) return { success: false, message: "User not found" };

  // Check OTP
  if (user.otp !== otp) {
    return { success: false, message: "Invalid OTP" };
  }

  // Check expiry
  if (!user.otpExpiry || new Date() > user.otpExpiry) {
    return { success: false, message: "OTP has expired" };
  }

  // Clear OTP after verification
  await UserAccount.findByIdAndUpdate(user._id, {
    otp: "",
    otpExpiry: null,
    isVerified: true,
  });

  return { success: true, message: "OTP verified successfully" };
};
