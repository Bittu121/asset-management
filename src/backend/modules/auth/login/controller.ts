import { NextRequest, NextResponse } from "next/server";
import { validateFields } from "../../../middleware/validate";
import { errorResponse } from "../../../utils/response";
import { messages } from "../../../constants/messages";
import { loginService } from "./service";

const login = async (req: NextRequest) => {
  const body = await req.json();

  const validation = validateFields(body, ["email", "password"]);
  if (validation) return validation;

  const result = await loginService(body.email, body.password);
  if (!result) {
    return NextResponse.json(
      { message: messages.AUTH.INVALID_CREDENTIALS },
      { status: 401 },
    );
  }
  const res = NextResponse.json(
    {
      message: messages.AUTH.LOGIN_SUCCESS,
      data: {
        user: result.user,
      },
    },
    { status: 200 },
  );
  res.cookies.set("accessToken", result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 15,
    path: "/",
  });

  res.cookies.set("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return res;
};
export default login;
