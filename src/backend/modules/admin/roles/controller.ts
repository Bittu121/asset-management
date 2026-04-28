import { NextRequest } from "next/server";

import { authenticate } from "../../../middleware/auth";
import { authorizeRoles } from "../../../middleware/role";
import { validateFields } from "../../../middleware/validate";
import { successResponse, errorResponse } from "../../../utils/response";
import { handleError } from "../../../middleware/error";
import * as roleService from "./service";

// GET all roles
export const getRoles = async (req: NextRequest) => {
  // const auth = authenticate(req);
  // if ("status" in auth) return auth;

  const roles = await roleService.getAllRoles();
  return successResponse(roles, "Roles fetched successfully", 200);
};

// GET single role
export const getSingleRole = async (req: NextRequest, id: string) => {
  // const auth = authenticate(req);
  // if ("status" in auth) return auth;

  const role = await roleService.getRoleById(id);
  if (!role) return errorResponse("Role not found", 404);

  return successResponse(role, "Role fetched successfully", 200);
};

// POST create role
export const createRole = async (req: NextRequest) => {
  // const auth = authenticate(req);
  // if ("status" in auth) return auth;

  // const roleCheck = authorizeRoles(auth.user, "admin");
  // if (roleCheck) return roleCheck;

  const body = await req.json();

  const validation = validateFields(body, ["name"]);
  if (validation) return validation;

  const role = await roleService.createRole(body);
  if (!role) return errorResponse("Role with this name already exists", 409);

  return successResponse("Role created successfully", role.toObject(), 201);
};

// PUT update role
export const updateRole = async (req: NextRequest, id: string) => {
  // const auth = authenticate(req);
  // if ("status" in auth) return auth;

  // const roleCheck = authorizeRoles(auth.user, "admin");
  // if (roleCheck) return roleCheck;

  const body = await req.json();

  const role = await roleService.updateRole(id, body);
  if (!role) return errorResponse("Role not found", 404);

  return successResponse("Role updated successfully", role, 200);
};

// DELETE role
export const deleteRole = async (req: NextRequest, id: string) => {
  // const auth = authenticate(req);
  // if ("status" in auth) return auth;

  // const roleCheck = authorizeRoles(auth.user, "admin");
  // if (roleCheck) return roleCheck;

  const role = await roleService.deleteRole(id);
  if (!role) return errorResponse("Role not found", 404);

  return successResponse("Role deleted successfully", "", 200);
};
