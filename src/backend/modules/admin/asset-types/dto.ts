export type CreateAssetTypeDto = {
  name: string;
  category: string;
  subCategory?: string;
  description?: string;
  isActive?: boolean;
};

export type UpdateAssetTypeDto = Partial<CreateAssetTypeDto>;
