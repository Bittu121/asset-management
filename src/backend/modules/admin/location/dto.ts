export type CreateLocationDto = {
  locationName: string;
  address: string;
  city: string;
  isActive?: boolean;
};

export type UpdateLocationDto = {
  locationName?: string;
  address?: string;
  city?: string;
  isActive?: boolean;
};
