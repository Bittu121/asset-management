import { NextRequest } from "next/server";
import { authenticate } from "../../../middleware/auth";
import { authorizeRoles } from "../../../middleware/role";
import { validateFields } from "../../../middleware/validate";
import { successResponse, errorResponse } from "../../../utils/response";
import * as subCategoryService from "./service";

export const getSubCategories = async (req: NextRequest) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN", "MANAGER");
  if (roleCheck) return roleCheck;

  const subCategories = await subCategoryService.getAllSubCategories();
  return successResponse(
    subCategories,
    "Sub categories fetched successfully",
    200,
  );
};

export const getSingleSubCategory = async (req: NextRequest, id: string) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN", "MANAGER");
  if (roleCheck) return roleCheck;

  const subCategory = await subCategoryService.getSubCategoryById(id);
  if (!subCategory) return errorResponse("Sub category not found", 404);

  return successResponse(subCategory, "Sub category fetched successfully", 200);
};

export const createSubCategory = async (req: NextRequest) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN");
  if (roleCheck) return roleCheck;

  const body = await req.json();

  const validation = validateFields(body, ["name", "category"]);
  if (validation) return validation;

  const existing = await subCategoryService.getSubCategoryByNameAndCategory(
    body.name,
    body.category,
  );
  if (existing)
    return errorResponse(
      "Sub category with this name already exists in the selected category",
      409,
    );

  const subCategory = await subCategoryService.createSubCategory(body);
  return successResponse(
    subCategory,
    "Sub category created successfully",
    201,
  );
};

export const updateSubCategory = async (req: NextRequest, id: string) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN");
  if (roleCheck) return roleCheck;

  const body = await req.json();

  const subCategory = await subCategoryService.updateSubCategory(id, body);
  if (!subCategory) return errorResponse("Sub category not found", 404);

  return successResponse(subCategory, "Sub category updated successfully", 200);
};

export const deleteSubCategory = async (req: NextRequest, id: string) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN");
  if (roleCheck) return roleCheck;

  const subCategory = await subCategoryService.deleteSubCategory(id);
  if (!subCategory) return errorResponse("Sub category not found", 404);

  return successResponse(null, "Sub category deleted successfully", 200);
};
