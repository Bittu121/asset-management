import { NextRequest } from "next/server";
import { authenticate } from "../../middleware/auth";
import { authorizeRoles } from "../../middleware/role";
import { validateFields } from "../../middleware/validate";
import { successResponse, errorResponse } from "../../utils/response";
import * as assetService from "./service";

export const getAssets = async (req: NextRequest) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN", "MANAGER", "TECHNICIAN");
  if (roleCheck) return roleCheck;

  const assets = await assetService.getAllAssets();
  return successResponse(assets, "Assets fetched successfully", 200);
};

export const getSingleAsset = async (req: NextRequest, id: string) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN", "MANAGER", "TECHNICIAN");
  if (roleCheck) return roleCheck;

  const asset = await assetService.getAssetById(id);
  if (!asset) return errorResponse("Asset not found", 404);

  return successResponse(asset, "Asset fetched successfully", 200);
};

export const createAsset = async (req: NextRequest) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN", "MANAGER");
  if (roleCheck) return roleCheck;

  const body = await req.json();

  const validation = validateFields(body, ["assetTag", "serialNumber", "category"]);
  if (validation) return validation;

  const tagExists = await assetService.getAssetByTag(body.assetTag);
  if (tagExists) return errorResponse("Asset tag already exists", 409);

  const serialExists = await assetService.getAssetBySerial(body.serialNumber);
  if (serialExists) return errorResponse("Serial number already exists", 409);

  // Coerce empty strings to null for optional refs
  if (!body.subCategory) body.subCategory = null;
  if (!body.assetType) body.assetType = null;
  if (!body.vendor) body.vendor = null;

  const asset = await assetService.createAsset(body);
  return successResponse(asset, "Asset created successfully", 201);
};

export const updateAsset = async (req: NextRequest, id: string) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN", "MANAGER");
  if (roleCheck) return roleCheck;

  const body = await req.json();

  if (!body.subCategory) body.subCategory = null;
  if (!body.assetType) body.assetType = null;
  if (!body.vendor) body.vendor = null;

  const asset = await assetService.updateAsset(id, body);
  if (!asset) return errorResponse("Asset not found", 404);

  return successResponse(asset, "Asset updated successfully", 200);
};

export const deleteAsset = async (req: NextRequest, id: string) => {
  const auth = await authenticate(req);
  if ("statusCode" in auth) return auth;

  const roleCheck = authorizeRoles(auth.user, "ADMIN");
  if (roleCheck) return roleCheck;

  const asset = await assetService.deleteAsset(id);
  if (!asset) return errorResponse("Asset not found", 404);

  return successResponse(null, "Asset deleted successfully", 200);
};
