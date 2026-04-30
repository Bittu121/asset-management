import UserAccount from "../../admin/user-account/schema";
import { comparePassword } from "../../../utils/bcrypt";
import { signAccessToken, signRefreshToken } from "../../../config/jwt";

export const loginService = async (email: string, password: string) => {
  // Find user by email in UserAccount collection
  const user = await UserAccount.findOne({ email });
  if (!user) return null;

  // Compare password
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) return null;

  // Sign tokens
  const payload = {
    id: user._id.toString(),
    email: user.email,
    role: user.role.toLowerCase(),
  };

  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  return {
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      employeeCode: user.employeeCode,
    },
  };
};
