import SubCategory from "./schema";
import { CreateSubCategoryDto, UpdateSubCategoryDto } from "./dto";

export const getAllSubCategories = async () => {
  return await SubCategory.find()
    .populate("category", "name code")
    .sort({ createdAt: -1 });
};

export const getSubCategoryById = async (id: string) => {
  return await SubCategory.findById(id).populate("category", "name code");
};

export const getSubCategoryByNameAndCategory = async (
  name: string,
  categoryId: string,
) => {
  return await SubCategory.findOne({ name: name.trim(), category: categoryId });
};

export const createSubCategory = async (data: CreateSubCategoryDto) => {
  return await SubCategory.create(data);
};

export const updateSubCategory = async (
  id: string,
  data: UpdateSubCategoryDto,
) => {
  return await SubCategory.findByIdAndUpdate(id, data, { new: true }).populate(
    "category",
    "name code",
  );
};

export const deleteSubCategory = async (id: string) => {
  return await SubCategory.findByIdAndDelete(id);
};
