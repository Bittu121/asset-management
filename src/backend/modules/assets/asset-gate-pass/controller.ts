import { NextRequest } from "next/server";
import { authenticate } from "../../../middleware/auth";
import { authorizeRoles } from "../../../middleware/role";
import { validateFields } from "../../../middleware/validate";
import { successResponse, errorResponse } from "../../../utils/response";
import * as gatePassService from "./service";

// GET all gate passes
export async function getGatePasses(req: NextRequest) {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN", "MANAGER", "TECHNICIAN");
  if (roleCheck) return roleCheck;

  const gatePasses = await gatePassService.getAllGatePasses();
  return successResponse(gatePasses, "Gate passes fetched successfully", 200);
}

// GET single gate pass by ID
export async function getSingleGatePass(req: NextRequest, id: string) {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN", "MANAGER", "TECHNICIAN");
  if (roleCheck) return roleCheck;

  const gatePass = await gatePassService.getGatePassById(id);
  if (!gatePass) return errorResponse("Gate pass not found", 404);

  return successResponse(gatePass, "Gate pass fetched successfully", 200);
}

// POST create a new gate pass
export async function createGatePass(req: NextRequest) {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN", "MANAGER", "TECHNICIAN");
  if (roleCheck) return roleCheck;

  const body = await req.json();

  const validation = validateFields(body, ["asset", "type", "purpose"]);
  if (validation) return validation;

  // Attach the logged-in user's email as the requester
  body.requestedBy = (auth.user as any).email || "";

  const gatePass = await gatePassService.createGatePass(body);
  return successResponse(gatePass, "Gate pass created successfully", 201);
}

// PUT update gate pass status (approve / reject / issue / return)
export async function updateGatePassStatus(req: NextRequest, id: string) {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN", "MANAGER");
  if (roleCheck) return roleCheck;

  const body = await req.json();

  const validation = validateFields(body, ["status"]);
  if (validation) return validation;

  // If marking as RETURNED, record the actual return time
  if (body.status === "RETURNED") {
    body.returnedAt = new Date().toLocaleString("en-GB");
    body.actualReturn = new Date().toLocaleString("en-GB");
  }

  // If marking as ISSUED, record the issue time
  if (body.status === "ISSUED") {
    body.issuedAt = new Date().toLocaleString("en-GB");
  }

  const gatePass = await gatePassService.updateGatePassStatus(id, body);
  if (!gatePass) return errorResponse("Gate pass not found", 404);

  return successResponse(
    gatePass,
    `Gate pass ${body.status.toLowerCase()} successfully`,
    200,
  );
}

// DELETE
export async function deleteGatePass(req: NextRequest, id: string) {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN");
  if (roleCheck) return roleCheck;

  const gatePass = await gatePassService.deleteGatePass(id);
  if (!gatePass) return errorResponse("Gate pass not found", 404);

  return successResponse(null, "Gate pass deleted successfully", 200);
}
