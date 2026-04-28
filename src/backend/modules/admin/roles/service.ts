import Role from "./schema";
import { CreateRoleDto, UpdateRoleDto } from "./dto";

// Get all roles
export const getAllRoles = async () => {
  const roles = await Role.find().sort({ createdAt: -1 });
  return roles;
};

// Get role by id
export const getRoleById = async (id: string) => {
  const role = await Role.findById(id);
  return role;
};

// Create role
export const createRole = async (data: CreateRoleDto) => {
  const existing = await Role.findOne({ name: data.name.toUpperCase() });
  if (existing) return null;

  const role = await Role.create(data);
  return role;
};

// Update role
export const updateRole = async (id: string, data: UpdateRoleDto) => {
  const role = await Role.findByIdAndUpdate(id, data, { new: true });
  return role;
};

// Delete role
export const deleteRole = async (id: string) => {
  const role = await Role.findByIdAndDelete(id);
  return role;
};
