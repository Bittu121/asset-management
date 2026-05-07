export type AssetTypeRef = {
  _id: string;
  name: string;
  code?: string;
};

export type AssetType = {
  _id: string;
  name: string;
  category: AssetTypeRef;
  subCategory: AssetTypeRef | null;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AssetTypesState = {
  assetTypes: AssetType[];
  selectedAssetType: AssetType | null;
  loading: boolean;
  error: string | null;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
};
