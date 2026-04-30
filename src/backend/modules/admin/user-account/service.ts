import UserAccount from "./schema";
import { CreateUserAccountDto, UpdateUserAccountDto } from "./dto";
import { hashPassword } from "../../../utils/bcrypt";
import { sendEmail } from "../../../utils/sendEmail";

// Get all user accounts
export const getAllUserAccounts = async () => {
  const users = await UserAccount.find()
    .select("-password")
    .sort({ createdAt: -1 });
  return users;
};

// Get single user account
export const getUserAccountById = async (id: string) => {
  const user = await UserAccount.findById(id).select("-password");
  return user;
};

// Check duplicate email
export const getUserByEmail = async (email: string) => {
  const user = await UserAccount.findOne({ email });
  return user;
};

// Check duplicate employee code
export const getUserByEmployeeCode = async (employeeCode: string) => {
  const user = await UserAccount.findOne({ employeeCode });
  return user;
};

// Create user account
export const createUserAccount = async (data: CreateUserAccountDto) => {
  const hashedPassword = await hashPassword(data.password);
  const user = await UserAccount.create({
    ...data,
    password: hashedPassword,
  });

  await sendEmail({
    to: data.email,
    subject: "Welcome to Asset Management",
    html: `
  <div style="font-family:Arial, sans-serif; background:#f9fafb; padding:32px;">
    
    <div style="max-width:420px; margin:0 auto; background:#ffffff; padding:24px; border-radius:8px; border:1px solid #e5e7eb;">
      
      <!-- Title -->
      <h2 style="margin:0 0 12px; font-size:20px; color:#111827;">
        Welcome 👋
      </h2>

      <!-- Message -->
      <p style="font-size:14px; color:#4b5563; margin-bottom:16px;">
        Your account has been created successfully.
      </p>

      <!-- Credentials -->
      <p style="font-size:14px; color:#111827; margin:6px 0;">
        <strong>Email:</strong> ${data.email}
      </p>

      <p style="font-size:14px; color:#111827; margin:6px 0;">
        <strong>Temporary Password:</strong>
      </p>

      <!-- Password Box -->
      <div style="margin:8px 0 16px; padding:10px; background:#f3f4f6; border-radius:6px; font-size:14px; color:#111827;">
        ${data.password}
      </div>

      <!-- Note -->
      <p style="font-size:13px; color:#6b7280; margin-bottom:20px;">
        This is your temporary password. Please login and change it immediately.
      </p>

      <!-- Button -->
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/login"
        style="display:inline-block; padding:10px 16px; background:#111827; color:#ffffff; text-decoration:none; border-radius:6px; font-size:14px;">
        Login →
      </a>

    </div>

    <!-- Footer -->
    <p style="text-align:center; font-size:12px; color:#9ca3af; margin-top:16px;">
      © 2026 Asset Management
    </p>

  </div>
  `,
  });

  // Return without password
  const userObj = user.toObject() as any;
  delete userObj.password;
  return userObj;
};

// Update user account
export const updateUserAccount = async (
  id: string,
  data: UpdateUserAccountDto,
) => {
  // Hash password if it's being updated
  if (data.password) {
    data.password = await hashPassword(data.password);
  }

  const user = await UserAccount.findByIdAndUpdate(id, data, {
    new: true,
  }).select("-password");

  return user;
};

// Delete user account
export const deleteUserAccount = async (id: string) => {
  const user = await UserAccount.findByIdAndDelete(id);
  return user;
};
