import { NextRequest } from "next/server";
import { verifyAccessToken } from "../config/jwt";
import { errorResponse } from "../utils/response";
import { messages } from "../constants/messages";

export type AuthUser = {
  id: string;
  email: string;
  role: string;
};

type AuthSuccess = {
  user: AuthUser;
};

type AuthError = {
  message: string;
  statusCode: number;
};

export const authenticate = (
  req: NextRequest,
): { user: AuthUser } | ReturnType<typeof errorResponse> => {
  try {
    const token = req.cookies.get("accessToken")?.value;

    if (!token) {
      return errorResponse(messages.AUTH.TOKEN_REQUIRED, 401);
    }

    const decoded = verifyAccessToken(token) as {
      id: string;
      email: string;
      role: string;
    };

    return {
      user: {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      },
    };
  } catch {
    return errorResponse(messages.AUTH.TOKEN_INVALID, 401);
  }
};
