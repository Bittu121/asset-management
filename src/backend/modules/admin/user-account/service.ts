import UserAccount from "./schema";
import { CreateUserAccountDto, UpdateUserAccountDto } from "./dto";
import { hashPassword } from "../../../utils/password";
import { sendEmail } from "../../../utils/sendEmail";
import { env } from "../../../config/env";

export const getAllUserAccounts = async () => {
  return await UserAccount.find()
    .populate("role", "name")
    .populate("reportingManager", "name email employeeCode")
    .select("-password -otp -otpExpiry")
    .sort({ createdAt: -1 });
};

export const getUserAccountById = async (id: string) => {
  return await UserAccount.findById(id)
    .populate("role", "name permissions")
    .populate("reportingManager", "name email employeeCode")
    .select("-password -otp -otpExpiry");
};

export const getUserByEmail = async (email: string) => {
  return await UserAccount.findOne({ email });
};

export const getUserByEmployeeCode = async (code: string) => {
  return await UserAccount.findOne({ employeeCode: code });
};

export const createUserAccount = async (data: CreateUserAccountDto) => {
  const hashedPassword = await hashPassword(data.password);

  const user = await UserAccount.create({
    ...data,
    password: hashedPassword,
    isVerified: true,
  });

  // Send welcome email
  await sendEmail({
    to: data.email,
    subject: "Welcome to Asset Management System",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
        <h2 style="color: #1e293b;">Welcome to Asset Management!</h2>
        <p>Hello <strong>${data.name}</strong>,</p>
        <p>Your account has been created successfully.</p>
        <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>Email:</strong> ${data.email}</p>
          <p style="margin: 5px 0;"><strong>Employee Code:</strong> ${data.employeeCode}</p>
          <p style="margin: 5px 0;"><strong>Temporary Password:</strong> ${data.password}</p>
        </div>
        <p style="color: #ef4444; font-size: 14px;">Please change your password after first login.</p>
        <a href="${env.NEXT_PUBLIC_APP_URL}/login" 
           style="display: inline-block; padding: 12px 24px; background: #6366f1; color: white; text-decoration: none; border-radius: 6px; margin-top: 10px;">
          Login Now
        </a>
      </div>
    `,
  });

  return await getUserAccountById(user._id.toString());
};

export const updateUserAccount = async (
  id: string,
  data: UpdateUserAccountDto,
) => {
  if (data.password) {
    data.password = await hashPassword(data.password);
  }

  const user = await UserAccount.findByIdAndUpdate(id, data, { new: true })
    .populate("role", "name")
    .populate("reportingManager", "name email employeeCode")
    .select("-password -otp -otpExpiry");

  return user;
};

export const deleteUserAccount = async (id: string) => {
  return await UserAccount.findByIdAndDelete(id);
};
