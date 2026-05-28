import mongoose from "mongoose";

type DepartmentDocument = {
  departmentName: string;
  code: string;
  createdAt: Date;
};

const departmentSchema = new mongoose.Schema<DepartmentDocument>(
  {
    departmentName: { type: String, required: true, trim: true },
    code: { type: String, required: true, trim: true, unique: true },
  },
  { timestamps: true }
);

const Department =
  mongoose.models.Department || mongoose.model<DepartmentDocument>("Department", departmentSchema);

export default Department;
