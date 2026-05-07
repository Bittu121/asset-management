import { NextRequest } from "next/server";
import { authenticate } from "../../../middleware/auth";
import { authorizeRoles } from "../../../middleware/role";
import { validateFields } from "../../../middleware/validate";
import { successResponse, errorResponse } from "../../../utils/response";
import * as userService from "./service";

export const getUserAccounts = async (req: NextRequest) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN", "MANAGER");
  if (roleCheck) return roleCheck;

  const users = await userService.getAllUserAccounts();
  return successResponse(users, "Users fetched successfully", 200);
};

export const getSingleUserAccount = async (req: NextRequest, id: string) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const user = await userService.getUserAccountById(id);
  if (!user) return errorResponse("User not found", 404);

  return successResponse(user, "User fetched successfully", 200);
};

export const createUserAccount = async (req: NextRequest) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN", "MANAGER");
  if (roleCheck) return roleCheck;

  const body = await req.json();

  const validation = validateFields(body, [
    "name",
    "email",
    "password",
    "employeeCode",
    "role",
  ]);
  if (validation) return validation;

  // Check duplicates
  const existingEmail = await userService.getUserByEmail(body.email);
  if (existingEmail) return errorResponse("Email already exists", 409);

  const existingCode = await userService.getUserByEmployeeCode(
    body.employeeCode,
  );
  if (existingCode) return errorResponse("Employee code already exists", 409);

  const user = await userService.createUserAccount(body);
  return successResponse(user, "User created successfully", 201);
};

export const updateUserAccount = async (req: NextRequest, id: string) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN", "MANAGER");
  if (roleCheck) return roleCheck;

  const body = await req.json();

  const user = await userService.updateUserAccount(id, body);
  if (!user) return errorResponse("User not found", 404);

  return successResponse(user, "User updated successfully", 200);
};

export const deleteUserAccount = async (req: NextRequest, id: string) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN");
  if (roleCheck) return roleCheck;

  const user = await userService.deleteUserAccount(id);
  if (!user) return errorResponse("User not found", 404);

  return successResponse(null, "User deleted successfully", 200);
};
