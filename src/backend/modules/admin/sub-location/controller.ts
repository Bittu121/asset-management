import { NextRequest } from "next/server";
import { authenticate } from "../../../middleware/auth";
import { authorizeRoles } from "../../../middleware/role";
import { validateFields } from "../../../middleware/validate";
import { successResponse, errorResponse } from "../../../utils/response";
import { handleError } from "../../../middleware/error";
import * as subLocationService from "./service";

// GET all sub locations
export const getSubLocations = async (req: NextRequest) => {
  //   const auth = authenticate(req);
  //   if ("status" in auth) return auth;

  const subLocations = await subLocationService.getAllSubLocations();
  return successResponse(
    subLocations,
    "Sub locations fetched successfully",
    200,
  );
};

// GET single sub location
export const getSingleSubLocation = async (req: NextRequest, id: string) => {
  //   const auth = authenticate(req);
  //   if ("status" in auth) return auth;

  const subLocation = await subLocationService.getSubLocationById(id);

  if (!subLocation) return errorResponse("Sub location not found", 404);

  return successResponse(subLocation, "Sub location fetched successfully", 200);
};

// POST create sub location
export const createSubLocation = async (req: NextRequest) => {
  //   const auth = authenticate(req);
  //   if ("status" in auth) return auth;

  //   const roleCheck = authorizeRoles(auth.user, "admin");
  //   if (roleCheck) return roleCheck;

  const body = await req.json();

  const validation = validateFields(body, [
    "subLocationName",
    "locationId",
    "locationName",
  ]);
  if (validation) return validation;

  const subLocation = await subLocationService.createSubLocation(body);
  return successResponse(subLocation, "Sub location created successfully", 201);
};

// PUT update sub location
export const updateSubLocation = async (req: NextRequest, id: string) => {
  //   const auth = authenticate(req);
  //   if ("status" in auth) return auth;

  //   const roleCheck = authorizeRoles(auth.user, "admin");
  //   if (roleCheck) return roleCheck;

  const body = await req.json();

  const subLocation = await subLocationService.updateSubLocation(id, body);
  if (!subLocation) return errorResponse("Sub location not found", 404);

  return successResponse(subLocation, "Sub location updated successfully", 200);
};

// DELETE sub location
export const deleteSubLocation = async (req: NextRequest, id: string) => {
  //   const auth = authenticate(req);
  //   if ("status" in auth) return auth;

  //   const roleCheck = authorizeRoles(auth.user, "admin");
  //   if (roleCheck) return roleCheck;

  const subLocation = await subLocationService.deleteSubLocation(id);
  if (!subLocation) return errorResponse("Sub location not found", 404);

  return successResponse(null, "Sub location deleted successfully", 200);
};
