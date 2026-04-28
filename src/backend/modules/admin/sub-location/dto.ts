export type CreateSubLocationDto = {
  subLocationName: string;
  locationId: string;
  locationName: string;
  floor?: string;
  isActive?: boolean;
};

export type UpdateSubLocationDto = {
  subLocationName?: string;
  locationId?: string;
  locationName?: string;
  floor?: string;
  isActive?: boolean;
};
