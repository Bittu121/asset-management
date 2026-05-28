import UserAccount from "../../admin/user-account/schema";
import { hashPassword } from "../../../utils/password";

export const resetPasswordService = async (email: string, password: string) => {
  const user = await UserAccount.findOne({ email });
  if (!user) return null;

  // OTP must have been verified before allowing password reset
  if (!user.isVerified) return { error: "OTP not verified" };

  const hashedPassword = await hashPassword(password);

  await UserAccount.findByIdAndUpdate(user._id, {
    password: hashedPassword,
    isVerified: false,
  });

  return { email };
};
