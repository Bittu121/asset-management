export type CreateUserAccountDto = {
  role: string;
  name: string;
  employeeCode: string;
  email: string;
  phone?: string;
  designation?: string;
  reportingTo?: string;
  department?: string;
  subDepartment?: string;
  location?: string;
  subLocation?: string;
  supportGroup?: string;
  password: string;
};

export type UpdateUserAccountDto = {
  role?: string;
  name?: string;
  employeeCode?: string;
  email?: string;
  phone?: string;
  designation?: string;
  reportingTo?: string;
  department?: string;
  subDepartment?: string;
  location?: string;
  subLocation?: string;
  supportGroup?: string;
  password?: string;
};
