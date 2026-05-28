import SubDepartment from "./schema";
import { CreateSubDepartmentDto, UpdateSubDepartmentDto } from "./dto";

// Get all sub departments
export const getAllSubDepartments = async () => {
  const subDepartments = await SubDepartment.find()
    .populate("departmentId", "departmentName code")
    .sort({ createdAt: -1 });
  return subDepartments;
};

// Get single sub department
export const getSubDepartmentById = async (id: string) => {
  const subDepartment = await SubDepartment.findById(id).populate(
    "departmentId",
    "departmentName code"
  );
  return subDepartment;
};

// Create sub department
export const createSubDepartment = async (data: CreateSubDepartmentDto) => {
  const subDepartment = await SubDepartment.create(data);
  return subDepartment;
};

// Update sub department
export const updateSubDepartment = async (id: string, data: UpdateSubDepartmentDto) => {
  const subDepartment = await SubDepartment.findByIdAndUpdate(id, data, {
    new: true,
  });
  return subDepartment;
};

// Delete sub department
export const deleteSubDepartment = async (id: string) => {
  const subDepartment = await SubDepartment.findByIdAndDelete(id);
  return subDepartment;
};
