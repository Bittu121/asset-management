import { NextRequest } from "next/server";
import { authenticate } from "../../../middleware/auth";
import { authorizeRoles } from "../../../middleware/role";
import { validateFields } from "../../../middleware/validate";
import { successResponse, errorResponse } from "../../../utils/response";
import { handleError } from "../../../middleware/error";
import * as userAccountService from "./service";

// GET all user accounts
export const getUserAccounts = async (req: NextRequest) => {
  //   const auth = authenticate(req);
  //   if ("status" in auth) return auth;

  //   const roleCheck = authorizeRoles(auth.user, "admin");
  //   if (roleCheck) return roleCheck;

  const users = await userAccountService.getAllUserAccounts();
  return successResponse(users, "User accounts fetched successfully", 200);
};

// GET single user account
export const getSingleUserAccount = async (req: NextRequest, id: string) => {
  //   const auth = authenticate(req);
  //   if ("status" in auth) return auth;

  //   const roleCheck = authorizeRoles(auth.user, "admin");
  //   if (roleCheck) return roleCheck;

  const user = await userAccountService.getUserAccountById(id);
  if (!user) return errorResponse("User account not found", 404);

  return successResponse(user, "User account fetched successfully", 200);
};

// POST create user account
export const createUserAccount = async (req: NextRequest) => {
  //   const auth = authenticate(req);
  //   if ("status" in auth) return auth;

  //   const roleCheck = authorizeRoles(auth.user, "admin");
  //   if (roleCheck) return roleCheck;

  const body = await req.json();

  const validation = validateFields(body, [
    "role",
    "name",
    "employeeCode",
    "email",
    "password",
  ]);
  if (validation) return validation;

  // Check duplicate email
  const existingEmail = await userAccountService.getUserByEmail(body.email);
  if (existingEmail) return errorResponse("Email already exists", 409);

  // Check duplicate employee code
  const existingCode = await userAccountService.getUserByEmployeeCode(
    body.employeeCode,
  );
  if (existingCode) return errorResponse("Employee code already exists", 409);

  const user = await userAccountService.createUserAccount(body);
  return successResponse(user, "User account created successfully", 201);
};

// PUT update user account
export const updateUserAccount = async (req: NextRequest, id: string) => {
  //   const auth = authenticate(req);
  //   if ("status" in auth) return auth;

  //   const roleCheck = authorizeRoles(auth.user, "admin");
  //   if (roleCheck) return roleCheck;

  const body = await req.json();

  const user = await userAccountService.updateUserAccount(id, body);
  if (!user) return errorResponse("User account not found", 404);

  return successResponse(user, "User account updated successfully", 200);
};

// DELETE user account
export const deleteUserAccount = async (req: NextRequest, id: string) => {
  //   const auth = authenticate(req);
  //   if ("status" in auth) return auth;

  //   const roleCheck = authorizeRoles(auth.user, "admin");
  //   if (roleCheck) return roleCheck;

  const user = await userAccountService.deleteUserAccount(id);
  if (!user) return errorResponse("User account not found", 404);

  return successResponse(null, "User account deleted successfully", 200);
};
