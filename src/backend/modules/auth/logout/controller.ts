import { NextRequest, NextResponse } from "next/server";
import { successResponse } from "../../../utils/response";
import { messages } from "../../../constants/messages";

export const logout = async (req: NextRequest) => {
  const response = NextResponse.json(successResponse(null, messages.AUTH.LOGOUT_SUCCESS, 200), {
    status: 200,
  });

  // Clear cookies
  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");

  return response;
};
