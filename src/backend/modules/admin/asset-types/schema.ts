import mongoose from "mongoose";

type AssetTypeDocument = {
  name: string;
  category: mongoose.Types.ObjectId;
  subCategory: mongoose.Types.ObjectId;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const assetTypeSchema = new mongoose.Schema<AssetTypeDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
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
    description: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const AssetType =
  mongoose.models.AssetType ||
  mongoose.model<AssetTypeDocument>("AssetType", assetTypeSchema);

export default AssetType;
