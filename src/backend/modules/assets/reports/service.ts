import Asset from "../schema";
import Allocation from "../allocation/schema";
import GatePass from "../asset-gate-pass/schema";
import "../../admin/user-account/schema";
import "../../admin/asset-categories/schema";

import type { ReportData, AuditEntry } from "./dto";

const ASSET_POPULATE = [{ path: "category", select: "name" }];

const ALLOCATION_POPULATE = [
  { path: "asset", select: "assetTag device manufacturer model" },
  { path: "allocatedTo", select: "name email" },
];

const GATE_PASS_POPULATE = [{ path: "asset", select: "assetTag device model manufacturer" }];

export async function getReportData(): Promise<ReportData> {
  const today = new Date().toISOString().split("T")[0];

  const [assets, allocations, gatePasses] = await Promise.all([
    Asset.find().populate(ASSET_POPULATE).sort({ createdAt: -1 }),
    Allocation.find().populate(ALLOCATION_POPULATE).sort({ createdAt: -1 }),
    GatePass.find().populate(GATE_PASS_POPULATE).sort({ createdAt: -1 }),
  ]);

  // Determine allocated asset IDs (ACTIVE or OVERDUE)
  const allocatedAssetIds = new Set<string>();
  for (const alloc of allocations) {
    if (alloc.status === "ACTIVE") {
      allocatedAssetIds.add(String((alloc.asset as any)?._id ?? alloc.asset));
    }
  }

  // Asset value totals
  let totalValue = 0;
  let allocatedValue = 0;
  for (const asset of assets) {
    const v = parseFloat(asset.purchaseCost || asset.currentValue || "0") || 0;
    totalValue += v;
    if (allocatedAssetIds.has(String(asset._id))) allocatedValue += v;
  }

  // Gate pass status summary
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

  // Category breakdown
  const categoryMap: Record<string, number> = {};
  for (const asset of assets) {
    const name = (asset.category as any)?.name ?? "Unknown";
    categoryMap[name] = (categoryMap[name] ?? 0) + 1;
  }
  const categoryBreakdown = Object.entries(categoryMap).map(([category, count]) => ({
    category,
    count,
  }));

  // Build audit trail from allocations + gate passes
  const auditEntries: (AuditEntry & { sortKey: string })[] = [];

  for (const alloc of allocations) {
    const assetTag = (alloc.asset as any)?.assetTag ?? "Unknown";
    const userName =
      (alloc.allocatedTo as any)?.name ?? (alloc.allocatedTo as any)?.email ?? "Unknown";
    const userEmail = (alloc.allocatedTo as any)?.email ?? "Unknown";
    const allocDate = alloc.allocationDate ?? String(alloc.createdAt).split("T")[0];

    auditEntries.push({
      action: "Asset Allocated",
      detail: `${assetTag} assigned to ${userName}`,
      user: userEmail,
      date: allocDate,
      type: "allocation",
      sortKey: String(alloc.createdAt),
    });

    if (alloc.status === "RETURNED" && alloc.returnDate) {
      auditEntries.push({
        action: "Asset Returned",
        detail: `${assetTag} returned by ${userName}`,
        user: userEmail,
        date: alloc.returnDate,
        type: "return",
        sortKey: alloc.returnDate,
      });
    }
  }

  for (const gp of gatePasses) {
    const assetTag = (gp.asset as any)?.assetTag ?? "Unknown";
    const createdDate = String(gp.createdAt).split("T")[0];
    const user = gp.requestedBy ?? "Unknown";

    auditEntries.push({
      action: "Gate Pass Created",
      detail: `${gp.gatePassId} created for ${assetTag}`,
      user,
      date: createdDate,
      type: "gatepass",
      sortKey: String(gp.createdAt),
    });

    if (gp.status === "APPROVED") {
      auditEntries.push({
        action: "Gate Pass Approved",
        detail: `${gp.gatePassId} approved`,
        user,
        date: createdDate,
        type: "gatepass",
        sortKey: String(gp.createdAt) + "1",
      });
    }

    if (gp.status === "ISSUED" || gp.status === "RETURNED") {
      auditEntries.push({
        action: "Gate Pass Issued",
        detail: `${gp.gatePassId} issued`,
        user,
        date: gp.issuedAt ? gp.issuedAt.split("T")[0] : createdDate,
        type: "gatepass",
        sortKey: gp.issuedAt ?? String(gp.createdAt) + "2",
      });
    }

    if (gp.status === "REJECTED") {
      auditEntries.push({
        action: "Gate Pass Rejected",
        detail: `${gp.gatePassId} rejected`,
        user,
        date: createdDate,
        type: "gatepass",
        sortKey: String(gp.createdAt) + "1",
      });
    }

    if (gp.status === "RETURNED" && gp.returnedAt) {
      auditEntries.push({
        action: "Gate Pass Returned",
        detail: `${gp.gatePassId} returned`,
        user,
        date: gp.returnedAt.split("T")[0],
        type: "gatepass",
        sortKey: gp.returnedAt,
      });
    }
  }

  auditEntries.sort((a, b) => b.sortKey.localeCompare(a.sortKey));
  const fullAuditTrail: AuditEntry[] = auditEntries.map(({ sortKey: _s, ...rest }) => rest);

  // Allocation records (compute OVERDUE from ACTIVE + past expectedReturn)
  const allocationRecords = allocations.map((alloc) => {
    const isOverdue = alloc.status === "ACTIVE" && alloc.expectedReturn < today;
    return {
      _id: String(alloc._id),
      assetTag: (alloc.asset as any)?.assetTag ?? "",
      assetName:
        `${(alloc.asset as any)?.manufacturer ?? ""} ${(alloc.asset as any)?.model ?? (alloc.asset as any)?.device ?? ""}`.trim(),
      allocatedTo: (alloc.allocatedTo as any)?.name ?? (alloc.allocatedTo as any)?.email ?? "",
      allocatedToEmail: (alloc.allocatedTo as any)?.email ?? "",
      allocationDate: alloc.allocationDate ?? "",
      expectedReturn: alloc.expectedReturn ?? "",
      status: (isOverdue ? "OVERDUE" : alloc.status) as "ACTIVE" | "OVERDUE" | "RETURNED",
      returnDate: alloc.returnDate ?? "",
    };
  });

  const activeCount = allocationRecords.filter((a) => a.status === "ACTIVE").length;
  const overdueCount = allocationRecords.filter((a) => a.status === "OVERDUE").length;
  const returnedCount = allocationRecords.filter((a) => a.status === "RETURNED").length;

  const userMap: Record<
    string,
    { active: number; overdue: number; returned: number; total: number }
  > = {};
  for (const alloc of allocationRecords) {
    const user = alloc.allocatedTo;
    if (!userMap[user]) userMap[user] = { active: 0, overdue: 0, returned: 0, total: 0 };
    userMap[user].total++;
    if (alloc.status === "ACTIVE") userMap[user].active++;
    else if (alloc.status === "OVERDUE") userMap[user].overdue++;
    else if (alloc.status === "RETURNED") userMap[user].returned++;
  }
  const userSummary = Object.entries(userMap).map(([user, stats]) => ({
    user,
    ...stats,
  }));

  // Gate pass records
  const gatePassRecords = gatePasses.map((gp) => ({
    _id: String(gp._id),
    gatePassId: gp.gatePassId ?? "",
    assetTag: (gp.asset as any)?.assetTag ?? "",
    assetModel:
      `${(gp.asset as any)?.manufacturer ?? ""} ${(gp.asset as any)?.model ?? (gp.asset as any)?.device ?? ""}`.trim(),
    type: gp.type as "OUT" | "IN",
    purpose: gp.purpose ?? "",
    from: gp.from ?? "",
    to: gp.to ?? "",
    expectedReturn: gp.expectedReturn ?? "",
    carrierName: gp.carrierName ?? "",
    requestedBy: gp.requestedBy ?? "",
    status: gp.status as "PENDING" | "APPROVED" | "ISSUED" | "RETURNED" | "REJECTED",
    date: String(gp.createdAt).split("T")[0],
    createdAt: String(gp.createdAt),
  }));

  // Asset records
  const totalAssets = assets.length;
  const allocated = allocatedAssetIds.size;
  const available = totalAssets - allocated;

  const assetRecords = assets.map((asset) => ({
    _id: String(asset._id),
    assetTag: asset.assetTag,
    assetName: `${asset.manufacturer ?? ""} ${asset.model ?? asset.device ?? ""}`.trim(),
    category: (asset.category as any)?.name ?? "",
    status: (allocatedAssetIds.has(String(asset._id)) ? "ALLOCATED" : "AVAILABLE") as
      | "ALLOCATED"
      | "AVAILABLE",
    purchaseDate: asset.purchaseDate ?? "",
    value: parseFloat(asset.purchaseCost || asset.currentValue || "0") || 0,
    isActive: asset.isActive,
  }));

  return {
    overview: {
      totalAssets,
      allocated,
      available,
      totalValue,
      gatePassSummary,
      categoryBreakdown,
      recentActivity: fullAuditTrail.slice(0, 20),
    },
    allocations: {
      summary: { active: activeCount, overdue: overdueCount, returned: returnedCount },
      userSummary,
      records: allocationRecords,
    },
    gatePasses: {
      summary: gatePassSummary,
      outCount: gatePasses.filter((gp) => gp.type === "OUT").length,
      inCount: gatePasses.filter((gp) => gp.type === "IN").length,
      records: gatePassRecords,
    },
    assets: {
      summary: { total: totalAssets, available, allocated, totalValue, allocatedValue },
      records: assetRecords,
    },
    auditTrail: {
      summary: {
        allocation: fullAuditTrail.filter((e) => e.type === "allocation").length,
        return: fullAuditTrail.filter((e) => e.type === "return").length,
        gatepass: fullAuditTrail.filter((e) => e.type === "gatepass").length,
      },
      records: fullAuditTrail,
    },
  };
}
