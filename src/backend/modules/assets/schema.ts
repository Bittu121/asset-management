import mongoose from "mongoose";

const assetSchema = new mongoose.Schema(
  {
    assetTag: { type: String, required: true, unique: true, trim: true },
    serialNumber: { type: String, required: true, unique: true, trim: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AssetCategory",
      required: true,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      default: null,
    },
    assetType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AssetType",
      default: null,
    },
    manufacturer: { type: String, default: "" },
    model: { type: String, default: "" },
    device: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    description: { type: String, default: "" },

    // Financial
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      default: null,
    },
    purchaseOrderId: { type: String, default: "" },
    purchaseDate: { type: String, default: "" },
    purchaseCost: { type: String, default: "" },
    currentValue: { type: String, default: "" },
    warrantyExpiry: { type: String, default: "" },
    amcExpiry: { type: String, default: "" },

    // Specs
    os: { type: String, default: "" },
    osVersion: { type: String, default: "" },
    processor: { type: String, default: "" },
    ram: { type: String, default: "" },
    storageSize: { type: String, default: "" },

    // Network
    hostname: { type: String, default: "" },
    ipAddress: { type: String, default: "" },
    macAddress: { type: String, default: "" },
  },
  { timestamps: true },
);

const Asset = mongoose.models.Asset || mongoose.model("Asset", assetSchema);

export default Asset;
