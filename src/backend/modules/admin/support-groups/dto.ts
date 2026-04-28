export type CreateSupportGroupDto = {
  name: string;
  code: string;
  level?: string;
  manager?: string;
  maxTickets?: number;
  services?: string;
  description?: string;
  isActive?: boolean;
};

export type UpdateSupportGroupDto = {
  name?: string;
  code?: string;
  level?: string;
  manager?: string;
  maxTickets?: number;
  services?: string;
  description?: string;
  isActive?: boolean;
};
