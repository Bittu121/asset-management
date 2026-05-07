export type Role = {
  _id: string;
  name: string;
  description: string;
  isActive: boolean;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
};

export type RolesState = {
  roles: Role[];
  selectedRole: Role | null;
  loading: boolean;
  error: string | null;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
};
