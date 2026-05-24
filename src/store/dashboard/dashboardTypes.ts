export type DashboardStats = {
  totalAssets: number;
  allocated: number;
  available: number;
  totalValue: number;
  totalUsers: number;
  pendingGatePasses: number;
  expiredWarranty: number;
  expiringSoon: number;
  overdueAllocations: number;
};

export type AllocationRow = {
  _id: string;
  assetTag: string;
  device: string;
  allocatedTo: string;
  department: string;
  allocationDate: string;
  expectedReturn: string;
  status: string;
};

export type GatePassRow = {
  _id: string;
  gatePassId: string;
  assetTag: string;
  assetModel: string;
  type: "OUT" | "IN";
  purpose: string;
  carrierName: string;
  requestedBy: string;
  status: string;
  date: string;
};

export type ActivityItem = {
  action: string;
  detail: string;
  time: string;
  type: string;
};

export type DashboardData = {
  stats: DashboardStats;
  gatePassSummary: Record<string, number>;
  categoryBreakdown: { category: string; count: number }[];
  monthlyTrend: { month: string; allocated: number; returned: number }[];
  assetTrend: { month: string; total: number }[];
  recentAllocations: AllocationRow[];
  recentGatePasses: GatePassRow[];
  recentActivity: ActivityItem[];
};

export type DashboardState = {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
};
