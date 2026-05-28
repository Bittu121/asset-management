import mongoose from "mongoose";
import "../location/schema";

type SubLocationDocument = {
  subLocationName: string;
  locationId: mongoose.Types.ObjectId;
  locationName: string;
  floor: string;
  isActive: boolean;
  createdAt: Date;
};

const subLocationSchema = new mongoose.Schema<SubLocationDocument>(
  {
    subLocationName: { type: String, required: true, trim: true },
    locationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    locationName: { type: String, required: true, trim: true },
    floor: { type: String, default: "", trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const SubLocation =
  mongoose.models.SubLocation ||
  mongoose.model<SubLocationDocument>("SubLocation", subLocationSchema);

export default SubLocation;
