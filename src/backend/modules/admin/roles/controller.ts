import { NextRequest } from "next/server";
import { authenticate } from "../../../middleware/auth";
import { authorizeRoles } from "../../../middleware/role";
import { validateFields } from "../../../middleware/validate";
import { successResponse, errorResponse } from "../../../utils/response";
import * as roleService from "./service";

export const getRoles = async (req: NextRequest) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN", "MANAGER");
  if (roleCheck) return roleCheck;

  const roles = await roleService.getAllRoles();
  return successResponse(roles, "Roles fetched successfully", 200);
};

export const getSingleRole = async (req: NextRequest, id: string) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN", "MANAGER");
  if (roleCheck) return roleCheck;

  const role = await roleService.getRoleById(id);
  if (!role) return errorResponse("Role not found", 404);

  return successResponse(role, "Role fetched successfully", 200);
};

export const createRole = async (req: NextRequest) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN");
  if (roleCheck) return roleCheck;

  const body = await req.json();

  const validation = validateFields(body, ["name"]);
  if (validation) return validation;

  // Check duplicate
  const existing = await roleService.getRoleByName(body.name);
  if (existing) return errorResponse("Role name already exists", 409);

  const role = await roleService.createRole(body);
  return successResponse(role, "Role created successfully", 201);
};

export const updateRole = async (req: NextRequest, id: string) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN");
  if (roleCheck) return roleCheck;

  const body = await req.json();

  const role = await roleService.updateRole(id, body);
  if (!role) return errorResponse("Role not found", 404);

  return successResponse(role, "Role updated successfully", 200);
};

export const deleteRole = async (req: NextRequest, id: string) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN");
  if (roleCheck) return roleCheck;

  const role = await roleService.deleteRole(id);
  if (!role) return errorResponse("Role not found", 404);

  return successResponse(null, "Role deleted successfully", 200);
};
