import { NextRequest } from "next/server";
import { authenticate } from "../../../middleware/auth";
import { authorizeRoles } from "../../../middleware/role";
import { validateFields } from "../../../middleware/validate";
import { successResponse, errorResponse } from "../../../utils/response";
import { handleError } from "../../../middleware/error";
import * as supportGroupService from "./service";

// GET all support groups
export const getSupportGroups = async (req: NextRequest) => {
  //   const auth = authenticate(req);
  //   if ("status" in auth) return auth;

  const supportGroups = await supportGroupService.getAllSupportGroups();
  return successResponse(
    supportGroups,
    "Support groups fetched successfully",
    200,
  );
};

// GET single support group
export const getSingleSupportGroup = async (req: NextRequest, id: string) => {
  //   const auth = authenticate(req);
  //   if ("status" in auth) return auth;

  const supportGroup = await supportGroupService.getSupportGroupById(id);
  if (!supportGroup) return errorResponse("Support group not found", 404);

  return successResponse(
    supportGroup,
    "Support group fetched successfully",
    200,
  );
};

// POST create support group
export const createSupportGroup = async (req: NextRequest) => {
  //   const auth = authenticate(req);
  //   if ("status" in auth) return auth;

  //   const roleCheck = authorizeRoles(auth.user, "admin");
  //   if (roleCheck) return roleCheck;

  const body = await req.json();

  const validation = validateFields(body, ["name", "code"]);
  if (validation) return validation;

  // Check duplicate code
  const existing = await supportGroupService.getSupportGroupByCode(body.code);
  if (existing) return errorResponse("Support group code already exists", 409);

  const supportGroup = await supportGroupService.createSupportGroup(body);
  return successResponse(
    supportGroup,
    "Support group created successfully",
    201,
  );
};

// PUT update support group
export const updateSupportGroup = async (req: NextRequest, id: string) => {
  // const auth = authenticate(req);
  // if ("status" in auth) return auth;

  // const roleCheck = authorizeRoles(auth.user, "admin");
  // if (roleCheck) return roleCheck;

  const body = await req.json();

  const supportGroup = await supportGroupService.updateSupportGroup(id, body);
  if (!supportGroup) return errorResponse("Support group not found", 404);

  return successResponse(
    supportGroup,
    "Support group updated successfully",
    200,
  );
};

// DELETE support group
export const deleteSupportGroup = async (req: NextRequest, id: string) => {
  // const auth = authenticate(req);
  // if ("status" in auth) return auth;

  // const roleCheck = authorizeRoles(auth.user, "admin");
  // if (roleCheck) return roleCheck;

  const supportGroup = await supportGroupService.deleteSupportGroup(id);
  if (!supportGroup) return errorResponse("Support group not found", 404);

  return successResponse(null, "Support group deleted successfully", 200);
};
