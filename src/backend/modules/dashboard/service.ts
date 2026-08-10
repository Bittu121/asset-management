import Asset from "../assets/schema";
import Allocation from "../assets/allocation/schema";
import GatePass from "../assets/asset-gate-pass/schema";
import UserAccount from "../admin/user-account/schema";
import "../admin/asset-categories/schema";
import "../admin/user-account/schema";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Normalizes Date objects or date strings to YYYY-MM-DD for display.
function toDateOnly(value: unknown) {
  if (!value) return "";
  const d = new Date(value as string | Date);
  return isNaN(d.getTime()) ? "" : d.toISOString().split("T")[0];
}

function monthKey(dateStr: string) {
  const d = new Date(dateStr);
  return isNaN(d.getTime())
    ? null
    : `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function last6MonthKeys() {
  const keys: string[] = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    keys.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
  }
  return keys;
}

export async function getAdminDashboard() {
  const today = new Date().toISOString().split("T")[0];
  const monthKeys = last6MonthKeys();

  const [assets, allocations, gatePasses, users] = await Promise.all([
    Asset.find()
      .populate([{ path: "category", select: "name" }])
      .sort({ createdAt: -1 }),
    Allocation.find()
      .populate([
        { path: "asset", select: "assetTag device manufacturer model" },
        { path: "allocatedTo", select: "name email department" },
      ])
      .sort({ createdAt: -1 }),
    GatePass.find()
      .populate([{ path: "asset", select: "assetTag device manufacturer model" }])
      .sort({ createdAt: -1 }),
    UserAccount.find().select("name email department isVerified createdAt"),
  ]);

  // Allocated asset IDs (ACTIVE only)
  const allocatedAssetIds = new Set<string>();
  for (const a of allocations) {
    if (a.status === "ACTIVE") allocatedAssetIds.add(String((a.asset as any)?._id ?? a.asset));
  }

  const totalAssets = assets.length;
  const allocated = allocatedAssetIds.size;
  const available = totalAssets - allocated;

  // Total value
  let totalValue = 0;
  for (const a of assets) {
    totalValue += parseFloat(a.purchaseCost || a.currentValue || "0") || 0;
  }

  // Warranty stats
  let expiredWarranty = 0;
  let expiringSoon = 0;
  const thirtyDays = new Date();
  thirtyDays.setDate(thirtyDays.getDate() + 30);
  const thirtyDaysStr = thirtyDays.toISOString().split("T")[0];
  for (const a of assets) {
    if (a.warrantyExpiry) {
      if (a.warrantyExpiry < today) expiredWarranty++;
      else if (a.warrantyExpiry <= thirtyDaysStr) expiringSoon++;
    }
  }

  // Category breakdown
  const categoryMap: Record<string, number> = {};
  for (const a of assets) {
    const name = (a.category as any)?.name ?? "Unknown";
    categoryMap[name] = (categoryMap[name] ?? 0) + 1;
  }
  const categoryBreakdown = Object.entries(categoryMap).map(([category, count]) => ({
    category,
    count,
  }));

  // Gate pass status counts
  const gatePassSummary: Record<string, number> = {
    PENDING: 0,
    APPROVED: 0,
    ISSUED: 0,
    RETURNED: 0,
    REJECTED: 0,
  };
  for (const gp of gatePasses) {
    if (gp.status in gatePassSummary) gatePassSummary[gp.status]++;
  }

  // Overdue allocations
  const overdueCount = allocations.filter(
    (a) => a.status === "ACTIVE" && a.expectedReturn < today
  ).length;

  // Monthly allocation trend (last 6 months)
  const allocByMonth: Record<string, number> = {};
  const returnByMonth: Record<string, number> = {};
  for (const key of monthKeys) {
    allocByMonth[key] = 0;
    returnByMonth[key] = 0;
  }
  for (const alloc of allocations) {
    const k = monthKey(String(alloc.createdAt));
    if (k && allocByMonth[k] !== undefined) allocByMonth[k]++;
    if (alloc.status === "RETURNED" && alloc.returnDate) {
      const rk = monthKey(alloc.returnDate);
      if (rk && returnByMonth[rk] !== undefined) returnByMonth[rk]++;
    }
  }
  const monthlyTrend = monthKeys.map((key) => {
    const [year, month] = key.split("-");
    return {
      month: MONTHS[parseInt(month) - 1],
      allocated: allocByMonth[key],
      returned: returnByMonth[key],
    };
  });

  // Asset growth trend (cumulative assets by month)
  const assetByMonth: Record<string, number> = {};
  for (const key of monthKeys) assetByMonth[key] = 0;
  for (const a of assets) {
    const k = monthKey(String(a.createdAt));
    if (k && assetByMonth[k] !== undefined) assetByMonth[k]++;
  }
  let cumulative = 0;
  // Count assets created before the window
  for (const a of assets) {
    const k = monthKey(String(a.createdAt));
    if (!k || assetByMonth[k] === undefined) cumulative++;
  }
  const assetTrend = monthKeys.map((key) => {
    cumulative += assetByMonth[key];
    const [, month] = key.split("-");
    return { month: MONTHS[parseInt(month) - 1], total: cumulative };
  });

  // Recent allocations (last 10)
  const recentAllocations = allocations.slice(0, 10).map((a) => {
    const isOverdue = a.status === "ACTIVE" && a.expectedReturn < today;
    return {
      _id: String(a._id),
      assetTag: (a.asset as any)?.assetTag ?? "",
      device:
        `${(a.asset as any)?.manufacturer ?? ""} ${(a.asset as any)?.model ?? (a.asset as any)?.device ?? ""}`.trim(),
      allocatedTo: (a.allocatedTo as any)?.name ?? (a.allocatedTo as any)?.email ?? "",
      department: (a.allocatedTo as any)?.department ?? "",
      allocationDate: a.allocationDate ?? "",
      expectedReturn: a.expectedReturn ?? "",
      status: isOverdue ? "OVERDUE" : a.status,
    };
  });

  // Recent gate passes (last 10)
  const recentGatePasses = gatePasses.slice(0, 10).map((gp) => ({
    _id: String(gp._id),
    gatePassId: gp.gatePassId ?? "",
    assetTag: (gp.asset as any)?.assetTag ?? "",
    assetModel:
      `${(gp.asset as any)?.manufacturer ?? ""} ${(gp.asset as any)?.model ?? (gp.asset as any)?.device ?? ""}`.trim(),
    type: gp.type as "OUT" | "IN",
    purpose: gp.purpose ?? "",
    carrierName: gp.carrierName ?? "",
    requestedBy: gp.requestedBy ?? "",
    status: gp.status,
    date: toDateOnly(gp.createdAt),
  }));

  // Recent activity (last 15 events combined)
  const activityItems: {
    action: string;
    detail: string;
    time: string;
    type: string;
  }[] = [];
  for (const alloc of allocations.slice(0, 10)) {
    const tag = (alloc.asset as any)?.assetTag ?? "Unknown";
    const user = (alloc.allocatedTo as any)?.name ?? (alloc.allocatedTo as any)?.email ?? "Unknown";
    activityItems.push({
      action: "Asset Allocated",
      detail: `${tag} → ${user}`,
      time: String(alloc.createdAt),
      type: "allocation",
    });
  }
  for (const gp of gatePasses.slice(0, 5)) {
    activityItems.push({
      action: "Gate Pass Created",
      detail: `${gp.gatePassId ?? "Gate Pass"} for ${(gp.asset as any)?.assetTag ?? "asset"}`,
      time: String(gp.createdAt),
      type: "gatepass",
    });
  }
  activityItems.sort((a, b) => b.time.localeCompare(a.time));
  const recentActivity = activityItems.slice(0, 15).map((item) => ({
    action: item.action,
    detail: item.detail,
    time: item.time,
    type: item.type,
  }));

  return {
    stats: {
      totalAssets,
      allocated,
      available,
      totalValue,
      totalUsers: users.length,
      pendingGatePasses: gatePassSummary.PENDING,
      expiredWarranty,
      expiringSoon,
      overdueAllocations: overdueCount,
    },
    gatePassSummary,
    categoryBreakdown,
    monthlyTrend,
    assetTrend,
    recentAllocations,
    recentGatePasses,
    recentActivity,
  };
}
