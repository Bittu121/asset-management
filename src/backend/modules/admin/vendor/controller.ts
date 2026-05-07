import { NextRequest } from "next/server";
import { authenticate } from "../../../middleware/auth";
import { authorizeRoles } from "../../../middleware/role";
import { validateFields } from "../../../middleware/validate";
import { successResponse, errorResponse } from "../../../utils/response";
import * as vendorService from "./service";

export const getVendors = async (req: NextRequest) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN", "MANAGER");
  if (roleCheck) return roleCheck;

  const vendors = await vendorService.getAllVendors();
  return successResponse(vendors, "Vendors fetched successfully", 200);
};

export const getSingleVendor = async (req: NextRequest, id: string) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN", "MANAGER");
  if (roleCheck) return roleCheck;

  const vendor = await vendorService.getVendorById(id);
  if (!vendor) return errorResponse("Vendor not found", 404);

  return successResponse(vendor, "Vendor fetched successfully", 200);
};

export const createVendor = async (req: NextRequest) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN");
  if (roleCheck) return roleCheck;

  const body = await req.json();

  const validation = validateFields(body, ["vendorName", "email", "phone"]);
  if (validation) return validation;

  const existing = await vendorService.getVendorByEmail(body.email);
  if (existing)
    return errorResponse("Vendor with this email already exists", 409);

  const vendor = await vendorService.createVendor(body);
  return successResponse(vendor, "Vendor created successfully", 201);
};

export const updateVendor = async (req: NextRequest, id: string) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN");
  if (roleCheck) return roleCheck;

  const body = await req.json();

  const vendor = await vendorService.updateVendor(id, body);
  if (!vendor) return errorResponse("Vendor not found", 404);

  return successResponse(vendor, "Vendor updated successfully", 200);
};

export const deleteVendor = async (req: NextRequest, id: string) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN");
  if (roleCheck) return roleCheck;

  const vendor = await vendorService.deleteVendor(id);
  if (!vendor) return errorResponse("Vendor not found", 404);

  return successResponse(null, "Vendor deleted successfully", 200);
};
