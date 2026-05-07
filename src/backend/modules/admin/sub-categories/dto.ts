export type CreateSubCategoryDto = {
  name: string;
  category: string;
  description?: string;
  isActive?: boolean;
};

export type UpdateSubCategoryDto = Partial<CreateSubCategoryDto>;
