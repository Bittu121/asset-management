import { NextRequest } from "next/server";
import { verifyAccessToken } from "../config/jwt";
import { errorResponse } from "../utils/response";
import { messages } from "../constants/messages";

export type AuthUser = {
  id: string;
  email: string;
  role: string;
};

export const authenticate = (
  req: NextRequest,
): { user: AuthUser } | ReturnType<typeof errorResponse> => {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return errorResponse(messages.AUTH.TOKEN_REQUIRED, 401);
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyAccessToken(token);

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
