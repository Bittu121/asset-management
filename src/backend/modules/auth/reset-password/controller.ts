import { NextRequest } from "next/server";
import { validateFields } from "../../../middleware/validate";
import { successResponse, errorResponse } from "../../../utils/response";
import { resetPasswordService } from "./service";

export const resetPassword = async (req: NextRequest) => {
  const body = await req.json();

  const validation = validateFields(body, ["email", "password"]);
  if (validation) return validation;

  const result = await resetPasswordService(body.email, body.password);
  if (!result) return errorResponse("User not found", 404);

  return successResponse(null, "Password reset successfully", 200);
};
