import SubLocation from "./schema";
import { CreateSubLocationDto, UpdateSubLocationDto } from "./dto";

// Get all sub locations
export const getAllSubLocations = async () => {
  const subLocations = await SubLocation.find()
    .populate("locationId", "locationName city")
    .sort({ createdAt: -1 });
  return subLocations;
};

// Get single sub location
export const getSubLocationById = async (id: string) => {
  const subLocation = await SubLocation.findById(id).populate(
    "locationId",
    "locationName city",
  );
  return subLocation;
};

// Create sub location
export const createSubLocation = async (data: CreateSubLocationDto) => {
  const subLocation = await SubLocation.create(data);
  return subLocation;
};

// Update sub location
export const updateSubLocation = async (
  id: string,
  data: UpdateSubLocationDto,
) => {
  const subLocation = await SubLocation.findByIdAndUpdate(id, data, {
    new: true,
  });
  return subLocation;
};

// Delete sub location
export const deleteSubLocation = async (id: string) => {
  const subLocation = await SubLocation.findByIdAndDelete(id);
  return subLocation;
};
