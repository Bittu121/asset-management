import mongoose from "mongoose";

type AssetCategoryDocument = {
  name: string;
  code: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const assetCategorySchema = new mongoose.Schema<AssetCategoryDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    code: {
      type: String,
      unique: true,
      sparse: true,
      uppercase: true,
      trim: true,
    },
    description: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const AssetCategory =
  mongoose.models.AssetCategory ||
  mongoose.model<AssetCategoryDocument>("AssetCategory", assetCategorySchema);

export default AssetCategory;
