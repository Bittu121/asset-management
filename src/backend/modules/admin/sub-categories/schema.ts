import mongoose from "mongoose";

type SubCategoryDocument = {
  name: string;
  category: mongoose.Types.ObjectId;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const subCategorySchema = new mongoose.Schema<SubCategoryDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AssetCategory",
      required: true,
    },
    description: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

subCategorySchema.index({ name: 1, category: 1 }, { unique: true });

const SubCategory =
  mongoose.models.SubCategory ||
  mongoose.model<SubCategoryDocument>("SubCategory", subCategorySchema);

export default SubCategory;
