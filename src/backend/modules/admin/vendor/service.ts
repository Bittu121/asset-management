import Vendor from "./schema";
import { CreateVendorDto, UpdateVendorDto } from "./dto";

// Get all vendors
export const getAllVendors = async () => {
  const vendors = await Vendor.find().sort({ createdAt: -1 });
  return vendors;
};

// Get single vendor
export const getVendorById = async (id: string) => {
  const vendor = await Vendor.findById(id);
  return vendor;
};

// Check duplicate email
export const getVendorByEmail = async (email: string) => {
  const vendor = await Vendor.findOne({ email });
  return vendor;
};

// Create vendor
export const createVendor = async (data: CreateVendorDto) => {
  const vendor = await Vendor.create(data);
  return vendor;
};

// Update vendor
export const updateVendor = async (id: string, data: UpdateVendorDto) => {
  const vendor = await Vendor.findByIdAndUpdate(id, data, { new: true });
  return vendor;
};

// Delete vendor
export const deleteVendor = async (id: string) => {
  const vendor = await Vendor.findByIdAndDelete(id);
  return vendor;
};
