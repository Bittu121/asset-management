import mongoose from "mongoose";

type RoleDocument = {
  name: string;
  description: string;
  isActive: boolean;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
};

const roleSchema = new mongoose.Schema<RoleDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    description: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    permissions: [{ type: String }],
  },
  { timestamps: true }
);

const Role = mongoose.models.Role || mongoose.model<RoleDocument>("Role", roleSchema);

export default Role;
