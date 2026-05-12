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
  { timestamps: true },
);

const Allocation =
  mongoose.models.Allocation || mongoose.model("Allocation", allocationSchema);

export default Allocation;
