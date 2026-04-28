import mongoose from "mongoose";

type SupportGroupDocument = {
  name: string;
  code: string;
  level: string;
  manager: string;
  maxTickets: number;
  services: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
};

const supportGroupSchema = new mongoose.Schema<SupportGroupDocument>(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, trim: true, unique: true },
    level: { type: String, default: "", trim: true },
    manager: { type: String, default: "", trim: true },
    maxTickets: { type: Number, default: 10 },
    services: { type: String, default: "None", trim: true },
    description: { type: String, default: "", trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const SupportGroup =
  mongoose.models.SupportGroup ||
  mongoose.model<SupportGroupDocument>("SupportGroup", supportGroupSchema);

export default SupportGroup;
