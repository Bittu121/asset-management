export type Vendor = {
  _id: string;
  vendorName: string;
  email: string;
  phone: string;
  address: string;
  gstNumber: string;
  contractExpiry: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type VendorState = {
  vendors: Vendor[];
  loading: boolean;
  error: string | null;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
};
