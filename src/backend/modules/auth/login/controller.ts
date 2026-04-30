import { NextRequest } from "next/server";
import { validateFields } from "../../../middleware/validate";
import { successResponse, errorResponse } from "../../../utils/response";
import { messages } from "../../../constants/messages";
import { loginService } from "./service";

export const login = async (req: NextRequest) => {
  const body = await req.json();

  const validation = validateFields(body, ["email", "password"]);
  if (validation) return validation;

  const result = await loginService(body.email, body.password);
  if (!result) return errorResponse(messages.AUTH.INVALID_CREDENTIALS, 401);

  return successResponse(result, messages.AUTH.LOGIN_SUCCESS, 200);
};
