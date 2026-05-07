import { NextRequest } from "next/server";
import { authenticate } from "../../../middleware/auth";
import { authorizeRoles } from "../../../middleware/role";
import { validateFields } from "../../../middleware/validate";
import { successResponse, errorResponse } from "../../../utils/response";
import * as assetTypeService from "./service";

export const getAssetTypes = async (req: NextRequest) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN", "MANAGER");
  if (roleCheck) return roleCheck;

  const assetTypes = await assetTypeService.getAllAssetTypes();
  return successResponse(assetTypes, "Asset types fetched successfully", 200);
};

export const getSingleAssetType = async (req: NextRequest, id: string) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN", "MANAGER");
  if (roleCheck) return roleCheck;

  const assetType = await assetTypeService.getAssetTypeById(id);
  if (!assetType) return errorResponse("Asset type not found", 404);

  return successResponse(assetType, "Asset type fetched successfully", 200);
};

export const createAssetType = async (req: NextRequest) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN");
  if (roleCheck) return roleCheck;

  const body = await req.json();

  const validation = validateFields(body, ["name", "category"]);
  if (validation) return validation;

  const existing = await assetTypeService.getAssetTypeByName(body.name);
  if (existing) return errorResponse("Asset type name already exists", 409);

  if (!body.subCategory) {
    body.subCategory = null;
  }

  const assetType = await assetTypeService.createAssetType(body);
  return successResponse(assetType, "Asset type created successfully", 201);
};

export const updateAssetType = async (req: NextRequest, id: string) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN");
  if (roleCheck) return roleCheck;

  const body = await req.json();

  if (body.subCategory === "") {
    body.subCategory = null;
  }

  const assetType = await assetTypeService.updateAssetType(id, body);
  if (!assetType) return errorResponse("Asset type not found", 404);

  return successResponse(assetType, "Asset type updated successfully", 200);
};

export const deleteAssetType = async (req: NextRequest, id: string) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN");
  if (roleCheck) return roleCheck;

  const assetType = await assetTypeService.deleteAssetType(id);
  if (!assetType) return errorResponse("Asset type not found", 404);

  return successResponse(null, "Asset type deleted successfully", 200);
};
