import { NextRequest } from "next/server";
import { validateFields } from "../../../middleware/validate";
import { successResponse, errorResponse } from "../../../utils/response";
import { messages } from "../../../constants/messages";
import { forgotPasswordService } from "./service";

export const forgotPassword = async (req: NextRequest) => {
  const body = await req.json();

  const validation = validateFields(body, ["email"]);
  if (validation) return validation;

  const result = await forgotPasswordService(body.email);
  if (!result) return errorResponse(messages.AUTH.EMAIL_NOT_FOUND, 404);

  return successResponse(null, messages.AUTH.FORGOT_PASSWORD_SUCCESS, 200);
};
