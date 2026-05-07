export type CreateRoleDto = {
  name: string;
  description?: string;
  isActive?: boolean;
  permissions?: string[];
};

export type UpdateRoleDto = Partial<CreateRoleDto>;
