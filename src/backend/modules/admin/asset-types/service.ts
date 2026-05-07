import AssetType from "./schema";
import { CreateAssetTypeDto, UpdateAssetTypeDto } from "./dto";

const populateFields = [
  { path: "category", select: "name code" },
  { path: "subCategory", select: "name" },
];

export const getAllAssetTypes = async () => {
  return await AssetType.find().populate(populateFields).sort({ createdAt: -1 });
};

export const getAssetTypeById = async (id: string) => {
  return await AssetType.findById(id).populate(populateFields);
};

export const getAssetTypeByName = async (name: string) => {
  return await AssetType.findOne({ name: name.trim() });
};

export const createAssetType = async (data: CreateAssetTypeDto) => {
  const created = await AssetType.create(data);
  return await AssetType.findById(created._id).populate(populateFields);
};

export const updateAssetType = async (id: string, data: UpdateAssetTypeDto) => {
  return await AssetType.findByIdAndUpdate(id, data, { new: true }).populate(
    populateFields,
  );
};

export const deleteAssetType = async (id: string) => {
  return await AssetType.findByIdAndDelete(id);
};
