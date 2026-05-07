import Role from "./schema";
import { CreateRoleDto, UpdateRoleDto } from "./dto";

export const getAllRoles = async () => {
  return await Role.find().sort({ createdAt: -1 });
};

export const getRoleById = async (id: string) => {
  return await Role.findById(id);
};

export const getRoleByName = async (name: string) => {
  return await Role.findOne({ name: name.toUpperCase() });
};

export const createRole = async (data: CreateRoleDto) => {
  const role = await Role.create({
    ...data,
    name: data.name.toUpperCase(),
  });
  return role;
};

export const updateRole = async (id: string, data: UpdateRoleDto) => {
  if (data.name) {
    data.name = data.name.toUpperCase();
  }
  return await Role.findByIdAndUpdate(id, data, { new: true });
};

export const deleteRole = async (id: string) => {
  return await Role.findByIdAndDelete(id);
};
