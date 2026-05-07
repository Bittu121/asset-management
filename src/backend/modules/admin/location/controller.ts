import { NextRequest } from "next/server";
import { authenticate } from "../../../middleware/auth";
import { authorizeRoles } from "../../../middleware/role";
import { validateFields } from "../../../middleware/validate";
import { successResponse, errorResponse } from "../../../utils/response";
import { handleError } from "../../../middleware/error";
import * as locationService from "./service";

// GET all locations
export const getLocations = async (req: NextRequest) => {
  // const auth = authenticate(req);
  // if ("status" in auth) return auth;

  const locations = await locationService.getAllLocations();
  return successResponse(locations, "Locations fetched successfully", 200);
};

// GET single location
export const getSingleLocation = async (req: NextRequest, id: string) => {
  // const auth = authenticate(req);
  // if ("status" in auth) return auth;

  const location = await locationService.getLocationById(id);
  if (!location) return errorResponse("Location not found", 404);

  return successResponse(location, "Location fetched successfully", 200);
};

// POST create location
export const createLocation = async (req: NextRequest) => {
  // const auth = authenticate(req);
  // if ("status" in auth) return auth;

  // const roleCheck = authorizeRoles(auth.user, "admin");
  // if (roleCheck) return roleCheck;

  const body = await req.json();

  const validation = validateFields(body, ["locationName", "address", "city"]);
  if (validation) return validation;

  const location = await locationService.createLocation(body);
  return successResponse(location, "Location created successfully", 201);
};

// PUT update location
export const updateLocation = async (req: NextRequest, id: string) => {
  // const auth = authenticate(req);
  // if ("status" in auth) return auth;

  // const roleCheck = authorizeRoles(auth.user, "admin");
  // if (roleCheck) return roleCheck;

  const body = await req.json();

  const location = await locationService.updateLocation(id, body);
  if (!location) return errorResponse("Location not found", 404);

  return successResponse(location, "Location updated successfully", 200);
};

// DELETE location
export const deleteLocation = async (req: NextRequest, id: string) => {
  // const auth = authenticate(req);
  // if ("status" in auth) return auth;

  // const roleCheck = authorizeRoles(auth.user, "admin");
  // if (roleCheck) return roleCheck;

  const location = await locationService.deleteLocation(id);
  if (!location) return errorResponse("Location not found", 404);

  return successResponse(null, "Location deleted successfully", 200);
};
