import Asset from "./schema";
import { CreateAssetDto, UpdateAssetDto } from "./dto";

// Register referenced models so Mongoose can resolve them during populate
import "../admin/asset-categories/schema";
import "../admin/sub-categories/schema";
import "../admin/asset-types/schema";
import "../admin/vendor/schema";

const populateFields = [
  { path: "category", select: "name" },
  { path: "subCategory", select: "name" },
  { path: "assetType", select: "name" },
  { path: "vendor", select: "vendorName email phone" },
];

export const getAllAssets = async () => {
  return await Asset.find().populate(populateFields).sort({ createdAt: -1 });
};

export const getAssetById = async (id: string) => {
  return await Asset.findById(id).populate(populateFields);
};

export const getAssetByTag = async (assetTag: string) => {
  return await Asset.findOne({ assetTag: assetTag.trim() });
};

export const getAssetBySerial = async (serialNumber: string) => {
  return await Asset.findOne({ serialNumber: serialNumber.trim() });
};

export const createAsset = async (data: CreateAssetDto) => {
  const created = await Asset.create(data);
  return await Asset.findById(created._id).populate(populateFields);
};

export const updateAsset = async (id: string, data: UpdateAssetDto) => {
  return await Asset.findByIdAndUpdate(id, data, { new: true }).populate(populateFields);
};

export const deleteAsset = async (id: string) => {
  return await Asset.findByIdAndDelete(id);
};
