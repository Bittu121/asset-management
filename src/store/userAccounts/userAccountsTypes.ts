export type UserAccount = {
  _id: string;
  name: string;
  email: string;
  employeeCode: string;
  phone: string;
  designation: string;
  role: {
    _id: string;
    name: string;
    permissions: string[];
  };
  reportingManager?: {
    _id: string;
    name: string;
    email: string;
    employeeCode: string;
  };
  department: string;
  subDepartment: string;
  location: string;
  subLocation: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

export type UserAccountsState = {
  users: UserAccount[];
  selectedUser: UserAccount | null;
  loading: boolean;
  error: string | null;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
};
