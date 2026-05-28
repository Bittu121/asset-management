import mongoose from "mongoose";
import "../department/schema";

type SubDepartmentDocument = {
  subDepartmentName: string;
  departmentId: mongoose.Types.ObjectId;
  departmentName: string;
  manager: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
};

const subDepartmentSchema = new mongoose.Schema<SubDepartmentDocument>(
  {
    subDepartmentName: { type: String, required: true, trim: true },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    departmentName: { type: String, required: true, trim: true },
    manager: { type: String, default: "", trim: true },
    description: { type: String, default: "", trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const SubDepartment =
  mongoose.models.SubDepartment ||
  mongoose.model<SubDepartmentDocument>("SubDepartment", subDepartmentSchema);

export default SubDepartment;
