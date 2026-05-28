import mongoose from "mongoose";

type SupportGroupDocument = {
  name: string;
  code: string;
  level: string;
  manager: mongoose.Types.ObjectId; // Reference to UserAccount
  members: mongoose.Types.ObjectId[];
  maxTickets: number;
  services: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const supportGroupSchema = new mongoose.Schema<SupportGroupDocument>(
  {
    name: { type: String, required: true, trim: true },
    code: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      uppercase: true,
    },
    level: { type: String, default: "", trim: true },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserAccount",
      required: false,
    },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserAccount" }],
    maxTickets: { type: Number, default: 10 },
    services: { type: String, default: "None", trim: true },
    description: { type: String, default: "", trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const SupportGroup =
  mongoose.models.SupportGroup ||
  mongoose.model<SupportGroupDocument>("SupportGroup", supportGroupSchema);

export default SupportGroup;
