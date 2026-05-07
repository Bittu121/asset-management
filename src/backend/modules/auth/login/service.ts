import UserAccount from "../../admin/user-account/schema";
import "../../admin/roles/schema";
import { comparePassword } from "../../../utils/password";
import { signAccessToken, signRefreshToken } from "../../../config/jwt";

type LoginSuccess = {
  success: true;
  accessToken: string;
  refreshToken: string;
  user: {
    _id: string;
    name: string;
    email: string;
    employeeCode: string;
    role: string;
    permissions: string[];
  };
};

type LoginFailure = {
  success: false;
  message: string;
};

export type LoginResponse = LoginSuccess | LoginFailure;

export const loginService = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  const user = await UserAccount.findOne({ email }).populate(
    "role",
    "name permissions",
  );

  if (!user) {
    return { success: false, message: "Invalid email or password" };
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    return { success: false, message: "Invalid email or password" };
  }

  // ✅ Tokens guaranteed string
  const accessToken = signAccessToken({ userId: user._id.toString() });
  const refreshToken = signRefreshToken({ userId: user._id.toString() });

  return {
    success: true,
    accessToken,
    refreshToken,
    user: {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      employeeCode: user.employeeCode,
      role: (user.role as any).name,
      permissions: (user.role as any).permissions,
    },
  };
};
