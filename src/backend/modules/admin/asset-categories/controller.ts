import { NextRequest } from "next/server";
import { authenticate } from "../../../middleware/auth";
import { authorizeRoles } from "../../../middleware/role";
import { validateFields } from "../../../middleware/validate";
import { successResponse, errorResponse } from "../../../utils/response";
import * as assetCategoryService from "./service";

export const getAssetCategories = async (req: NextRequest) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN", "MANAGER");
  if (roleCheck) return roleCheck;

  const categories = await assetCategoryService.getAllAssetCategories();
  return successResponse(categories, "Asset categories fetched successfully", 200);
};

export const getSingleAssetCategory = async (req: NextRequest, id: string) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN", "MANAGER");
  if (roleCheck) return roleCheck;

  const category = await assetCategoryService.getAssetCategoryById(id);
  if (!category) return errorResponse("Asset category not found", 404);

  return successResponse(category, "Asset category fetched successfully", 200);
};

export const createAssetCategory = async (req: NextRequest) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN");
  if (roleCheck) return roleCheck;

  const body = await req.json();

  const validation = validateFields(body, ["name"]);
  if (validation) return validation;

  const existing = await assetCategoryService.getAssetCategoryByName(body.name);
  if (existing) return errorResponse("Asset category name already exists", 409);

  const category = await assetCategoryService.createAssetCategory(body);
  return successResponse(category, "Asset category created successfully", 201);
};

export const updateAssetCategory = async (req: NextRequest, id: string) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN");
  if (roleCheck) return roleCheck;

  const body = await req.json();

  const category = await assetCategoryService.updateAssetCategory(id, body);
  if (!category) return errorResponse("Asset category not found", 404);

  return successResponse(category, "Asset category updated successfully", 200);
};

export const deleteAssetCategory = async (req: NextRequest, id: string) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN");
  if (roleCheck) return roleCheck;

  const category = await assetCategoryService.deleteAssetCategory(id);
  if (!category) return errorResponse("Asset category not found", 404);

  return successResponse(null, "Asset category deleted successfully", 200);
};
