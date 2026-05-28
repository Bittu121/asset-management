import mongoose from "mongoose";

type VendorDocument = {
  vendorName: string;
  email: string;
  phone: string;
  address: string;
  gstNumber: string;
  contractExpiry: string;
  isActive: boolean;
  createdAt: Date;
};

const vendorSchema = new mongoose.Schema<VendorDocument>(
  {
    vendorName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, default: "", trim: true },
    gstNumber: { type: String, default: "", trim: true },
    contractExpiry: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Vendor = mongoose.models.Vendor || mongoose.model<VendorDocument>("Vendor", vendorSchema);

export default Vendor;
