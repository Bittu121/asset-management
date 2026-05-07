import AssetCategory from "./schema";
import { CreateAssetCategoryDto, UpdateAssetCategoryDto } from "./dto";

export const getAllAssetCategories = async () => {
  return await AssetCategory.find().sort({ createdAt: -1 });
};

export const getAssetCategoryById = async (id: string) => {
  return await AssetCategory.findById(id);
};

export const getAssetCategoryByName = async (name: string) => {
  return await AssetCategory.findOne({ name: name.trim() });
};

export const createAssetCategory = async (data: CreateAssetCategoryDto) => {
  return await AssetCategory.create(data);
};

export const updateAssetCategory = async (
  id: string,
  data: UpdateAssetCategoryDto,
) => {
  return await AssetCategory.findByIdAndUpdate(id, data, { new: true });
};

export const deleteAssetCategory = async (id: string) => {
  return await AssetCategory.findByIdAndDelete(id);
};
