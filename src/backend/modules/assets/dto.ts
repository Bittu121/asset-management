export type CreateAssetDto = {
  assetTag: string;
  serialNumber: string;
  category: string;
  subCategory?: string | null;
  assetType?: string | null;
  manufacturer?: string;
  model?: string;
  device?: string;
  isActive?: boolean;
  description?: string;
  vendor?: string | null;
  purchaseOrderId?: string;
  purchaseDate?: string;
  purchaseCost?: string;
  currentValue?: string;
  warrantyExpiry?: string;
  amcExpiry?: string;
  os?: string;
  osVersion?: string;
  processor?: string;
  ram?: string;
  storageSize?: string;
  hostname?: string;
  ipAddress?: string;
  macAddress?: string;
};

export type UpdateAssetDto = Partial<CreateAssetDto>;
