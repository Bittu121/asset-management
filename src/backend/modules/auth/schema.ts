import mongoose from "mongoose";

type AuthUserDocument = {
  email: string;
  password: string;
  otp: string;
  otpExpiry: Date;
  isVerified: boolean;
  createdAt: Date;
};

const authUserSchema = new mongoose.Schema<AuthUserDocument>(
  {
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    otp: { type: String, default: "" },
    otpExpiry: { type: Date, default: null },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const AuthUser =
  mongoose.models.AuthUser || mongoose.model<AuthUserDocument>("AuthUser", authUserSchema);

export default AuthUser;
