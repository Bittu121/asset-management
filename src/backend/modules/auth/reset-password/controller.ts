import { NextRequest, NextResponse } from "next/server";
import { validateFields } from "../../../middleware/validate";
import { successResponse, errorResponse } from "../../../utils/response";
import { resetPasswordService } from "./service";

export const resetPassword = async (req: NextRequest) => {
  const body = await req.json();

  const validation = validateFields(body, ["email", "password"]);
  if (validation) return validation;

  const result = await resetPasswordService(body.email, body.password);
  if (!result) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json(
    { message: "Password reset successfully" },
    { status: 200 },
  );
};
