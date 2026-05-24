import { NextRequest } from "next/server";
import { authenticate } from "../../middleware/auth";
import { authorizeRoles } from "../../middleware/role";
import { successResponse } from "../../utils/response";
import { getAdminDashboard } from "./service";

export async function getDashboard(req: NextRequest) {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN", "SUPERADMIN", "MANAGER");
  if (roleCheck) return roleCheck;

  const data = await getAdminDashboard();
  return successResponse(data, "Dashboard data fetched successfully", 200);
}
