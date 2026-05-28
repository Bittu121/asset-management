import { NextRequest } from "next/server";
import { authenticate } from "../../middleware/auth";
import { authorizeRoles } from "../../middleware/role";
import { successResponse } from "../../utils/response";
import { getTechnicianData } from "./service";

export async function getTechnician(req: NextRequest) {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN", "SUPERADMIN", "TECHNICIAN", "MANAGER");
  if (roleCheck) return roleCheck;

  const data = await getTechnicianData();
  return successResponse(data, "Technician data fetched successfully", 200);
}
