import { NextRequest } from "next/server";
import { authenticate } from "../../../middleware/auth";
import { authorizeRoles } from "../../../middleware/role";
import { successResponse } from "../../../utils/response";
import { getReportData } from "./service";

export async function getReports(req: NextRequest) {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN", "MANAGER");
  if (roleCheck) return roleCheck;

  const data = await getReportData();
  return successResponse(data, "Report data fetched successfully", 200);
}
