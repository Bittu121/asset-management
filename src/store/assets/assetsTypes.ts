export type AssetRef = { _id: string; name?: string; vendorName?: string };

export type Asset = {
  _id: string;
  assetTag: string;
  serialNumber: string;
  category: AssetRef;
  subCategory: AssetRef | null;
  assetType: AssetRef | null;
  manufacturer: string;
  model: string;
  device: string;
  isActive: boolean;
  description: string;
  vendor: AssetRef | null;
  purchaseOrderId: string;
  purchaseDate: string;
  purchaseCost: string;
  currentValue: string;
  warrantyExpiry: string;
  amcExpiry: string;
  os: string;
  osVersion: string;
  processor: string;
  ram: string;
  storageSize: string;
  hostname: string;
  ipAddress: string;
  macAddress: string;
  createdAt: string;
  updatedAt: string;
};

export type AssetsState = {
  assets: Asset[];
  loading: boolean;
  error: string | null;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
};
