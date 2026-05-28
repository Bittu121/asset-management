import { errorResponse } from "../utils/response";

export const validateFields = (body: Record<string, any>, requiredFields: string[]) => {
  const missing = requiredFields.filter((field) => {
    const val = body[field];
    if (val === undefined || val === null) return true;
    if (typeof val === "string") return val.trim() === "";
    return false;
  });

  if (missing.length > 0) {
    return errorResponse(`Missing fields: ${missing.join(", ")}`, 400);
  }
  return null;
};
