import mongoose from "mongoose";

const gatePassSchema = new mongoose.Schema(
  {
    gatePassId: { type: String, unique: true },
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
      required: true,
    },
    type: {
      type: String,
      enum: ["OUT", "IN"],
      required: true,
    },
    purpose: { type: String, required: true },
    from: { type: String, default: "" },
    to: { type: String, default: "" },
    expectedReturn: { type: String, default: "" },
    actualReturn: { type: String, default: "" },
    carrierName: { type: String, default: "" },
    carrierContact: { type: String, default: "" },
    carrierIdProof: { type: String, default: "" },
    requestedBy: { type: String, default: "" }, // logged-in user's email
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "ISSUED", "RETURNED", "REJECTED"],
      default: "PENDING",
    },
    notes: { type: String, default: "" },
    issuedAt: { type: String, default: "" },
    returnedAt: { type: String, default: "" },
  },
  { timestamps: true },
);

const GatePass =
  mongoose.models.GatePass || mongoose.model("GatePass", gatePassSchema);

export default GatePass;
