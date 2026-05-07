export type CreateAssetCategoryDto = {
  name: string;
  code?: string;
  description?: string;
  isActive?: boolean;
};

export type UpdateAssetCategoryDto = Partial<CreateAssetCategoryDto>;
