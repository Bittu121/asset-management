import mongoose from "mongoose";

type UserAccountDocument = {
  role: string;
  name: string;
  employeeCode: string;
  email: string;
  phone: string;
  designation: string;
  reportingTo: string;
  department: string;
  subDepartment: string;
  location: string;
  subLocation: string;
  supportGroup: string;
  password: string;
  otp: string;
  otpExpiry: Date | null;
  isVerified: boolean;
  createdAt: Date;
};

const userAccountSchema = new mongoose.Schema<UserAccountDocument>(
  {
    role: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    employeeCode: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    phone: { type: String, default: "", trim: true },
    designation: { type: String, default: "", trim: true },
    reportingTo: { type: String, default: "", trim: true },
    department: { type: String, default: "", trim: true },
    subDepartment: { type: String, default: "", trim: true },
    location: { type: String, default: "", trim: true },
    subLocation: { type: String, default: "", trim: true },
    supportGroup: { type: String, default: "", trim: true },
    password: { type: String, required: true },
    otp: { type: String, default: "" },
    otpExpiry: { type: Date, default: null },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const UserAccount =
  mongoose.models.UserAccount ||
  mongoose.model<UserAccountDocument>("UserAccount", userAccountSchema);

export default UserAccount;
