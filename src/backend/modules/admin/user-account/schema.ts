import mongoose from "mongoose";

type UserAccountDocument = {
  name: string;
  email: string;
  password: string;
  employeeCode: string;
  phone: string;
  designation: string;
  role: mongoose.Types.ObjectId;
  reportingManager: mongoose.Types.ObjectId | null;
  department: string;
  subDepartment: string;
  location: string;
  subLocation: string;
  otp: string;
  otpExpiry: Date | null;
  isVerified: boolean;
  otpAttempts: number;
  otpLockedUntil: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

const userAccountSchema = new mongoose.Schema<UserAccountDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true },
    employeeCode: { type: String, required: true, unique: true, trim: true },
    phone: { type: String, default: "" },
    designation: { type: String, default: "" },
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
    reportingManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserAccount",
      default: null,
    },
    department: { type: String, default: "" },
    subDepartment: { type: String, default: "" },
    location: { type: String, default: "" },
    subLocation: { type: String, default: "" },
    otp: { type: String, default: "" },
    otpExpiry: { type: Date, default: null },
    isVerified: { type: Boolean, default: false },
    otpAttempts: { type: Number, default: 0 },
    otpLockedUntil: { type: Date, default: null },
  },
  { timestamps: true }
);

const UserAccount =
  mongoose.models.UserAccount ||
  mongoose.model<UserAccountDocument>("UserAccount", userAccountSchema);

export default UserAccount;
