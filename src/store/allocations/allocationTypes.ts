export type AllocationRecord = {
  _id: string;
  asset: {
    _id: string;
    assetTag: string;
    device: string;
    manufacturer: string;
    model: string;
    isActive: boolean;
  };
  allocatedTo: {
    _id: string;
    name: string;
    email: string;
    employeeCode: string;
  };
  allocationDate: string;
  expectedReturn: string;
  status: "ACTIVE" | "RETURNED";
  returnCondition: string;
  returnNotes: string;
  returnDate: string;
  createdAt: string;
};

export type AllocationState = {
  allocations: AllocationRecord[];
  loading: boolean;
  createLoading: boolean;
  returnLoading: boolean;
  error: string | null;
};
