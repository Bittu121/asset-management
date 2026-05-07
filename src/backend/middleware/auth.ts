import { NextRequest } from "next/server";
import { verifyAccessToken } from "../config/jwt";
import { errorResponse } from "../utils/response";
import { messages } from "../constants/messages";
import UserAccount from "../modules/admin/user-account/schema";

export type AuthUser = {
  _id: string;
  email: string;
  name: string;
  role: string;
  employeeCode: string;
};

export type AuthResult =
  | { user: AuthUser }
  | { status: string; message: string; statusCode: number };

export const authenticate = async (req: NextRequest): Promise<AuthResult> => {
  try {
    // Get token from cookies
    const token = req.cookies.get("accessToken")?.value;

    if (!token) {
      return errorResponse(messages.AUTH.TOKEN_REQUIRED, 401);
    }

    // Verify token
    const decoded = verifyAccessToken(token);

    // Get user from database
    const user = await UserAccount.findById(decoded.userId)
      .populate("role", "name")
      .select("-password -otp -otpExpiry");

    if (!user) {
      return errorResponse(messages.AUTH.UNAUTHORIZED, 401);
    }

    return {
      user: {
        _id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: (user.role as any).name,
        employeeCode: user.employeeCode,
      },
    };
  } catch (error) {
    return errorResponse(messages.AUTH.TOKEN_INVALID, 401);
  }
};
