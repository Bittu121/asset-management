export type CreateVendorDto = {
  vendorName: string;
  email: string;
  phone: string;
  address?: string;
  gstNumber?: string;
  contractExpiry?: string;
  isActive?: boolean;
};

export type UpdateVendorDto = {
  vendorName?: string;
  email?: string;
  phone?: string;
  address?: string;
  gstNumber?: string;
  contractExpiry?: string;
  isActive?: boolean;
};
