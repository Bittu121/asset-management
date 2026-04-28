export type CreateDepartmentDto = {
  departmentName: string;
  code: string;
};

export type UpdateDepartmentDto = {
  departmentName?: string;
  code?: string;
};
