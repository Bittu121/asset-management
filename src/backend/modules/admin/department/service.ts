import Department from "./schema";
import { CreateDepartmentDto, UpdateDepartmentDto } from "./dto";

// Get all departments
export const getAllDepartments = async () => {
  const departments = await Department.find().sort({ createdAt: -1 });
  return departments;
};

// Get single department
export const getDepartmentById = async (id: string) => {
  const department = await Department.findById(id);
  return department;
};

// Check duplicate code
export const getDepartmentByCode = async (code: string) => {
  const department = await Department.findOne({ code: code.toUpperCase() });
  return department;
};

// Create department
export const createDepartment = async (data: CreateDepartmentDto) => {
  const department = await Department.create({
    ...data,
    code: data.code.toUpperCase(),
  });
  return department;
};

// Update department
export const updateDepartment = async (
  id: string,
  data: UpdateDepartmentDto,
) => {
  const updateData = data.code
    ? { ...data, code: data.code.toUpperCase() }
    : data;

  const department = await Department.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return department;
};

// Delete department
export const deleteDepartment = async (id: string) => {
  const department = await Department.findByIdAndDelete(id);
  return department;
};
