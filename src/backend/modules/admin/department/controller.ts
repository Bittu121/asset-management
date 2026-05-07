import { NextRequest } from "next/server";
import { authenticate } from "../../../middleware/auth";
import { authorizeRoles } from "../../../middleware/role";
import { validateFields } from "../../../middleware/validate";
import { successResponse, errorResponse } from "../../../utils/response";
import { handleError } from "../../../middleware/error";
import * as departmentService from "./service";

// GET all departments
export const getDepartments = async (req: NextRequest) => {
  // const auth = authenticate(req);
  // if ("status" in auth) return auth;

  const departments = await departmentService.getAllDepartments();
  return successResponse(departments, "Departments fetched successfully", 200);
};

// GET single department
export const getSingleDepartment = async (req: NextRequest, id: string) => {
  // const auth = authenticate(req);
  // if ("status" in auth) return auth;

  const department = await departmentService.getDepartmentById(id);
  if (!department) return errorResponse("Department not found", 404);

  return successResponse(department, "Department fetched successfully", 200);
};

// POST create department
export const createDepartment = async (req: NextRequest) => {
  // const auth = authenticate(req);
  // if ("status" in auth) return auth;

  // const roleCheck = authorizeRoles(auth.user, "admin");
  // if (roleCheck) return roleCheck;

  const body = await req.json();

  const validation = validateFields(body, ["departmentName", "code"]);
  if (validation) return validation;

  // Check duplicate code
  const existing = await departmentService.getDepartmentByCode(body.code);
  if (existing) return errorResponse("Department code already exists", 409);

  const department = await departmentService.createDepartment(body);
  return successResponse(department, "Department created successfully", 201);
};

// PUT update department
export const updateDepartment = async (req: NextRequest, id: string) => {
  // const auth = authenticate(req);
  // if ("status" in auth) return auth;

  // const roleCheck = authorizeRoles(auth.user, "admin");
  // if (roleCheck) return roleCheck;

  const body = await req.json();

  const department = await departmentService.updateDepartment(id, body);
  if (!department) return errorResponse("Department not found", 404);

  return successResponse(department, "Department updated successfully", 200);
};

// DELETE department
export const deleteDepartment = async (req: NextRequest, id: string) => {
  // const auth = authenticate(req);
  // if ("status" in auth) return auth;

  // const roleCheck = authorizeRoles(auth.user, "admin");
  // if (roleCheck) return roleCheck;

  const department = await departmentService.deleteDepartment(id);
  if (!department) return errorResponse("Department not found", 404);

  return successResponse(null, "Department deleted successfully", 200);
};
