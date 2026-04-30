import { NextRequest } from "next/server";
import { validateFields } from "../../../middleware/validate";
import { successResponse, errorResponse } from "../../../utils/response";
import { verifyOtpService } from "./service";

export const verifyOtp = async (req: NextRequest) => {
  const body = await req.json();

  const validation = validateFields(body, ["email", "otp"]);
  if (validation) return validation;

  const result = await verifyOtpService(body.email, body.otp);

  if (!result.success) return errorResponse(result.message, 400);

  return successResponse(null, result.message, 200);
};
