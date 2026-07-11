import { NextRequest, NextResponse } from "next/server";
import { validateFields } from "../../../middleware/validate";
import { successResponse, errorResponse } from "../../../utils/response";
import { messages } from "../../../constants/messages";
import { loginService } from "./service";

export const login = async (req: NextRequest) => {
  const body = await req.json();

  const validation = validateFields(body, ["email", "password"]);
  if (validation) return validation;

  const result = await loginService(body.email, body.password);

  if (!result.success) {
    return errorResponse(result.message, 401);
  }

  const response = NextResponse.json(
    successResponse({ user: result.user }, messages.AUTH.LOGIN_SUCCESS, 200),
    { status: 200 },
  );

  // Set access token cookie (httpOnly for security)
  response.cookies.set("accessToken", result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60, // 1 day
    path: "/",
  });

  // Set refresh token cookie
  response.cookies.set("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
  });

  return response;
};
