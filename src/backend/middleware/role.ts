import { errorResponse } from "../utils/response";
import { AuthUser } from "./auth";

export const authorizeRoles = (user: AuthUser, ...allowedRoles: string[]) => {
  if (!allowedRoles.includes(user.role)) {
    return errorResponse("Access denied. Insufficient permissions.", 403);
  }
  return null;
};
