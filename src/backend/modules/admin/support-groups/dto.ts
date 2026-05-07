export type CreateSupportGroupDto = {
  name: string;
  code: string;
  level?: string;
  manager?: string; // User ID
  maxTickets?: number;
  services?: string;
  description?: string;
  isActive?: boolean;
};

export type UpdateSupportGroupDto = Partial<CreateSupportGroupDto>;
