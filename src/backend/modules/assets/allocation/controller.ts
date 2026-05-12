import { NextRequest } from "next/server";
import { authenticate } from "../../../middleware/auth";
import { authorizeRoles } from "../../../middleware/role";
import { validateFields } from "../../../middleware/validate";
import { successResponse, errorResponse } from "../../../utils/response";
import * as allocationService from "./service";

// GET all allocations
export async function getAllocations(req: NextRequest) {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN", "MANAGER", "TECHNICIAN");
  if (roleCheck) return roleCheck;

  const allocations = await allocationService.getAllAllocations();
  return successResponse(allocations, "Allocations fetched successfully", 200);
}

// POST create a new allocation
export async function createAllocation(req: NextRequest) {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN", "MANAGER");
  if (roleCheck) return roleCheck;

  const body = await req.json();

  const validation = validateFields(body, [
    "asset",
    "allocatedTo",
    "allocationDate",
    "expectedReturn",
  ]);
  if (validation) return validation;

  // Prevent allocating an asset that is already active
  const existing = await allocationService.getActiveAllocationForAsset(
    body.asset,
  );
  if (existing) return errorResponse("This asset is already allocated", 409);

  const allocation = await allocationService.createAllocation(body);
  return successResponse(allocation, "Asset allocated successfully", 201);
}

// PUT return an asset (mark allocation as RETURNED)
export async function returnAsset(req: NextRequest, id: string) {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN", "MANAGER", "TECHNICIAN");
  if (roleCheck) return roleCheck;

  const body = await req.json();

  const allocation = await allocationService.returnAllocation(id, {
    returnCondition: body.condition || "Good",
    returnNotes: body.notes || "",
    returnDate: body.returnDate || new Date().toISOString().split("T")[0],
  });

  if (!allocation) return errorResponse("Allocation not found", 404);

  return successResponse(allocation, "Asset returned successfully", 200);
}

// DELETE remove an allocation record
export async function removeAllocation(req: NextRequest, id: string) {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN");
  if (roleCheck) return roleCheck;

  const allocation = await allocationService.deleteAllocation(id);
  if (!allocation) return errorResponse("Allocation not found", 404);

  return successResponse(null, "Allocation deleted successfully", 200);
}
