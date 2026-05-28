import mongoose from "mongoose";

const allocationSchema = new mongoose.Schema(
  {
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
      required: true,
    },
    allocatedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserAccount",
      required: true,
    },
    allocationDate: { type: String, required: true },
    expectedReturn: { type: String, required: true },
    status: { type: String, enum: ["ACTIVE", "RETURNED"], default: "ACTIVE" },
    returnCondition: { type: String, default: "" },
    returnNotes: { type: String, default: "" },
    returnDate: { type: String, default: "" },
  },
  { timestamps: true }
);

// Prevent double-allocating the same asset: only one ACTIVE record per asset allowed
allocationSchema.index(
  { asset: 1 },
  { unique: true, partialFilterExpression: { status: "ACTIVE" }, name: "unique_active_per_asset" }
);

const Allocation = mongoose.models.Allocation || mongoose.model("Allocation", allocationSchema);

export default Allocation;
