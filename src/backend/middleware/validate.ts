import { errorResponse } from "../utils/response";

export const validateFields = (
  fields: Record<string, unknown>,
  required: string[],
): ReturnType<typeof errorResponse> | null => {
  for (const field of required) {
    if (!fields[field]) {
      return errorResponse(`${field} is required`, 400);
    }
  }
  return null;
};
