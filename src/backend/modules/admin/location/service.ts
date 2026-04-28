import Location from "./schema";
import { CreateLocationDto, UpdateLocationDto } from "./dto";

// Get all locations
export const getAllLocations = async () => {
  const locations = await Location.find().sort({ createdAt: -1 });
  return locations;
};

// Get location by id
export const getLocationById = async (id: string) => {
  const location = await Location.findById(id);
  return location;
};

// Create location
export const createLocation = async (data: CreateLocationDto) => {
  const location = await Location.create(data);
  return location;
};

// Update location
export const updateLocation = async (id: string, data: UpdateLocationDto) => {
  const location = await Location.findByIdAndUpdate(id, data, { new: true });
  return location;
};

// Delete location
export const deleteLocation = async (id: string) => {
  const location = await Location.findByIdAndDelete(id);
  return location;
};
