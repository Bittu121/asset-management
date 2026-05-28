import { NextRequest } from "next/server";
import { authenticate } from "../../../middleware/auth";
import { authorizeRoles } from "../../../middleware/role";
import { validateFields } from "../../../middleware/validate";
import { successResponse, errorResponse } from "../../../utils/response";
import * as supportGroupService from "./service";

export const getSupportGroups = async (req: NextRequest) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const supportGroups = await supportGroupService.getAllSupportGroups();
  return successResponse(supportGroups, "Support groups fetched successfully", 200);
};

export const getSingleSupportGroup = async (req: NextRequest, id: string) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const supportGroup = await supportGroupService.getSupportGroupById(id);
  if (!supportGroup) return errorResponse("Support group not found", 404);

  return successResponse(supportGroup, "Support group fetched successfully", 200);
};

export const createSupportGroup = async (req: NextRequest) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN", "MANAGER");
  if (roleCheck) return roleCheck;

  const body = await req.json();

  const validation = validateFields(body, ["name", "code"]);
  if (validation) return validation;

  const existing = await supportGroupService.getSupportGroupByCode(body.code);
  if (existing) return errorResponse("Support group code already exists", 409);

  const supportGroup = await supportGroupService.createSupportGroup(body);
  return successResponse(supportGroup, "Support group created successfully", 201);
};

export const updateSupportGroup = async (req: NextRequest, id: string) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN", "MANAGER");
  if (roleCheck) return roleCheck;

  const body = await req.json();

  const supportGroup = await supportGroupService.updateSupportGroup(id, body);
  if (!supportGroup) return errorResponse("Support group not found", 404);

  return successResponse(supportGroup, "Support group updated successfully", 200);
};

export const deleteSupportGroup = async (req: NextRequest, id: string) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN");
  if (roleCheck) return roleCheck;

  const supportGroup = await supportGroupService.deleteSupportGroup(id);
  if (!supportGroup) return errorResponse("Support group not found", 404);

  return successResponse(null, "Support group deleted successfully", 200);
};

export const addMember = async (req: NextRequest, id: string) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN", "MANAGER");
  if (roleCheck) return roleCheck;

  const body = await req.json();
  const { userId } = body;
  if (!userId) return errorResponse("userId is required", 400);

  const group = await supportGroupService.addMemberToGroup(id, userId);
  if (!group) return errorResponse("Support group not found", 404);

  return successResponse({ groupId: id, userId }, "Member added successfully", 200);
};

export const removeMember = async (req: NextRequest, groupId: string, userId: string) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN", "MANAGER");
  if (roleCheck) return roleCheck;

  const group = await supportGroupService.removeMemberFromGroup(groupId, userId);
  if (!group) return errorResponse("Support group not found", 404);

  return successResponse({ groupId, userId }, "Member removed successfully", 200);
};
