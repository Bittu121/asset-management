import { NextRequest } from "next/server";
import { authenticate } from "../../../middleware/auth";
import { authorizeRoles } from "../../../middleware/role";
import { validateFields } from "../../../middleware/validate";
import { successResponse, errorResponse } from "../../../utils/response";
import { handleError } from "../../../middleware/error";
import * as subDepartmentService from "./service";

// GET all sub departments
export const getSubDepartments = async (req: NextRequest) => {
  const auth = authenticate(req);
  if ("status" in auth) return auth;

  const subDepartments = await subDepartmentService.getAllSubDepartments();
  return successResponse(
    subDepartments,
    "Sub departments fetched successfully",
    200,
  );
};

// GET single sub department
export const getSingleSubDepartment = async (req: NextRequest, id: string) => {
  const auth = authenticate(req);
  if ("status" in auth) return auth;

  const subDepartment = await subDepartmentService.getSubDepartmentById(id);
  if (!subDepartment) return errorResponse("Sub department not found", 404);

  return successResponse(
    subDepartment,
    "Sub department fetched successfully",
    200,
  );
};

// POST create sub department
export const createSubDepartment = async (req: NextRequest) => {
  const auth = authenticate(req);
  if ("status" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "admin");
  if (roleCheck) return roleCheck;

  const body = await req.json();

  const validation = validateFields(body, [
    "subDepartmentName",
    "departmentId",
    "departmentName",
  ]);
  if (validation) return validation;

  const subDepartment = await subDepartmentService.createSubDepartment(body);
  return successResponse(
    subDepartment,
    "Sub department created successfully",
    201,
  );
};

// PUT update sub department
export const updateSubDepartment = async (req: NextRequest, id: string) => {
  const auth = authenticate(req);
  if ("status" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "admin");
  if (roleCheck) return roleCheck;

  const body = await req.json();

  const subDepartment = await subDepartmentService.updateSubDepartment(
    id,
    body,
  );
  if (!subDepartment) return errorResponse("Sub department not found", 404);

  return successResponse(
    subDepartment,
    "Sub department updated successfully",
    200,
  );
};

// DELETE sub department
export const deleteSubDepartment = async (req: NextRequest, id: string) => {
  const auth = authenticate(req);
  if ("status" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "admin");
  if (roleCheck) return roleCheck;

  const subDepartment = await subDepartmentService.deleteSubDepartment(id);
  if (!subDepartment) return errorResponse("Sub department not found", 404);

  return successResponse(null, "Sub department deleted successfully", 200);
};
