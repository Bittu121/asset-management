import { AuthUser } from "./auth";
import { errorResponse } from "../utils/response";

export const authorizeRoles = (
  user: AuthUser,
  ...allowedRoles: string[]
): ReturnType<typeof errorResponse> | null => {
  if (!allowedRoles.includes(user.role)) {
    return errorResponse("Access denied. Insufficient permissions.", 403);
  }
  return null;
};
