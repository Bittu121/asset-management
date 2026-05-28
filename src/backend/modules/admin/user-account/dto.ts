export type CreateUserAccountDto = {
  name: string;
  email: string;
  password: string;
  employeeCode: string;
  phone?: string;
  designation?: string;
  role: string; // Role ID
  reportingManager?: string; // User ID
  department?: string;
  subDepartment?: string;
  location?: string;
  subLocation?: string;
};

export type UpdateUserAccountDto = Partial<Omit<CreateUserAccountDto, "password">> & {
  password?: string;
};
