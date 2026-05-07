export type AssetCategory = {
  _id: string;
  name: string;
  code: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AssetCategoriesState = {
  assetCategories: AssetCategory[];
  selectedAssetCategory: AssetCategory | null;
  loading: boolean;
  error: string | null;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
};
