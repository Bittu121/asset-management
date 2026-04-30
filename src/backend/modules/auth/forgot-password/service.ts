import UserAccount from "../../admin/user-account/schema";
import { sendEmail } from "../../../utils/sendEmail";

// Generate 6 digit OTP
const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const forgotPasswordService = async (email: string) => {
  const user = await UserAccount.findOne({ email });
  if (!user) return null;

  const otp = generateOTP();

  // OTP expires in 5 minutes
  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

  // Save OTP and expiry to user
  await UserAccount.findByIdAndUpdate(user._id, {
    otp,
    otpExpiry,
  });

  // Send email
  await sendEmail({
    to: email,
    subject: "Password Reset OTP - Asset Management",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
        <h2 style="color: #1e293b;">Password Reset OTP</h2>
        <p>Hello <strong>${user.name}</strong>,</p>
        <p>Your OTP for password reset is:</p>
        <div style="background: #f1f5f9; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
          <h1 style="color: #6366f1; letter-spacing: 8px; font-size: 36px;">${otp}</h1>
        </div>
        <p style="color: #64748b; font-size: 14px;">This OTP is valid for <strong>5 minutes</strong>.</p>
        <p style="color: #64748b; font-size: 14px;">If you did not request this, please ignore this email.</p>
      </div>
    `,
  });

  return { email };
};
