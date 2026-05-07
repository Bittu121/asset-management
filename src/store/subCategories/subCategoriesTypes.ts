export type SubCategoryRef = {
  _id: string;
  name: string;
  code?: string;
};

export type SubCategory = {
  _id: string;
  name: string;
  category: SubCategoryRef;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type SubCategoriesState = {
  subCategories: SubCategory[];
  selectedSubCategory: SubCategory | null;
  loading: boolean;
  error: string | null;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
};
