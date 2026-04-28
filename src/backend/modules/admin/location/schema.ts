import mongoose from "mongoose";

type LocationDocument = {
  locationName: string;
  address: string;
  city: string;
  isActive: boolean;
  createdAt: Date;
};

const locationSchema = new mongoose.Schema<LocationDocument>(
  {
    locationName: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Location =
  mongoose.models.Location ||
  mongoose.model<LocationDocument>("Location", locationSchema);

export default Location;
