export interface AllocationReportRecord {
  _id: string;
  assetTag: string;
  assetName: string;
  allocatedTo: string;
  allocatedToEmail: string;
  allocationDate: string;
  expectedReturn: string;
  status: "ACTIVE" | "OVERDUE" | "RETURNED";
  returnDate: string;
}

export interface GatePassReportRecord {
  _id: string;
  gatePassId: string;
  assetTag: string;
  assetModel: string;
  type: "OUT" | "IN";
  purpose: string;
  from: string;
  to: string;
  expectedReturn: string;
  carrierName: string;
  requestedBy: string;
  status: "PENDING" | "APPROVED" | "ISSUED" | "RETURNED" | "REJECTED";
  date: string;
  createdAt: string;
}

export interface AssetReportRecord {
  _id: string;
  assetTag: string;
  assetName: string;
  category: string;
  status: "AVAILABLE" | "ALLOCATED";
  purchaseDate: string;
  value: number;
  isActive: boolean;
}

export interface AuditEntry {
  action: string;
  detail: string;
  user: string;
  date: string;
  type: "allocation" | "return" | "gatepass";
}

export interface ReportData {
  overview: {
    totalAssets: number;
    allocated: number;
    available: number;
    totalValue: number;
    gatePassSummary: Record<string, number>;
    categoryBreakdown: { category: string; count: number }[];
    recentActivity: AuditEntry[];
  };
  allocations: {
    summary: { active: number; overdue: number; returned: number };
    userSummary: {
      user: string;
      active: number;
      overdue: number;
      returned: number;
      total: number;
    }[];
    records: AllocationReportRecord[];
  };
  gatePasses: {
    summary: Record<string, number>;
    outCount: number;
    inCount: number;
    records: GatePassReportRecord[];
  };
  assets: {
    summary: {
      total: number;
      available: number;
      allocated: number;
      totalValue: number;
      allocatedValue: number;
    };
    records: AssetReportRecord[];
  };
  auditTrail: {
    summary: { allocation: number; return: number; gatepass: number };
    records: AuditEntry[];
  };
}

export interface ReportState {
  data: ReportData | null;
  loading: boolean;
  error: string | null;
}
