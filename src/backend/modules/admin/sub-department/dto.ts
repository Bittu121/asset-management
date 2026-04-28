export type CreateSubDepartmentDto = {
  subDepartmentName: string;
  departmentId: string;
  departmentName: string;
  manager?: string;
  description?: string;
  isActive?: boolean;
};

export type UpdateSubDepartmentDto = {
  subDepartmentName?: string;
  departmentId?: string;
  departmentName?: string;
  manager?: string;
  description?: string;
  isActive?: boolean;
};
