export type SupportGroup = {
  _id: string;
  name: string;
  code: string;
  level: string;
  manager?: {
    _id: string;
    name: string;
    email: string;
    employeeCode: string;
    designation: string;
  };
  members: string[];
  maxTickets: number;
  services: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type SupportGroupsState = {
  supportGroups: SupportGroup[];
  selectedGroup: SupportGroup | null;
  loading: boolean;
  error: string | null;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
  addMemberLoading: boolean;
  removeMemberLoading: boolean;
};
