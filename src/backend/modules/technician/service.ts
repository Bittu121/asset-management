import Allocation from "../assets/allocation/schema";
import GatePass from "../assets/asset-gate-pass/schema";
import Asset from "../assets/schema";
import "../admin/asset-categories/schema";
import "../admin/user-account/schema";

export async function getTechnicianData() {
  const today = new Date().toISOString().split("T")[0];

  const [assets, allocations, gatePasses] = await Promise.all([
    Asset.find()
      .populate([{ path: "category", select: "name" }])
      .sort({ createdAt: -1 }),
    Allocation.find()
      .populate([
        {
          path: "asset",
          select: "assetTag device manufacturer model warrantyExpiry",
        },
        { path: "allocatedTo", select: "name email department" },
      ])
      .sort({ createdAt: -1 }),
    GatePass.find()
      .populate([
        { path: "asset", select: "assetTag device manufacturer model" },
      ])
      .sort({ createdAt: -1 }),
  ]);

  const activeAllocations = allocations.filter((a) => a.status === "ACTIVE");
  const overdueAllocations = activeAllocations.filter(
    (a) => a.expectedReturn < today,
  );
  const returnedAllocations = allocations.filter(
    (a) => a.status === "RETURNED",
  );
  const pendingGatePasses = gatePasses.filter((gp) => gp.status === "PENDING");

  const allocatedAssetIds = new Set(
    activeAllocations.map((a) => String((a.asset as any)?._id ?? a.asset)),
  );

  const stats = {
    totalAssets: assets.length,
    activeAllocations: activeAllocations.length,
    overdueAllocations: overdueAllocations.length,
    pendingGatePasses: pendingGatePasses.length,
    totalReturned: returnedAllocations.length,
    available: assets.length - allocatedAssetIds.size,
  };

  const allocationList = allocations.slice(0, 50).map((a) => {
    const isOverdue = a.status === "ACTIVE" && a.expectedReturn < today;
    const asset = a.asset as any;
    const user = a.allocatedTo as any;
    return {
      _id: String(a._id),
      assetTag: asset?.assetTag ?? "",
      device:
        `${asset?.manufacturer ?? ""} ${asset?.model ?? asset?.device ?? ""}`.trim() ||
        asset?.device ||
        "",
      allocatedTo: user?.name ?? user?.email ?? "",
      allocatedToEmail: user?.email ?? "",
      department: user?.department ?? "",
      allocationDate: a.allocationDate ?? "",
      expectedReturn: a.expectedReturn ?? "",
      returnDate: a.returnDate ?? "",
      returnCondition: a.returnCondition ?? "",
      status: isOverdue ? "OVERDUE" : a.status,
    };
  });

  const overdueList = overdueAllocations.map((a) => {
    const asset = a.asset as any;
    const user = a.allocatedTo as any;
    const daysOverdue = Math.floor(
      (new Date().getTime() - new Date(a.expectedReturn).getTime()) /
        (1000 * 60 * 60 * 24),
    );
    return {
      _id: String(a._id),
      assetTag: asset?.assetTag ?? "",
      device:
        `${asset?.manufacturer ?? ""} ${asset?.model ?? asset?.device ?? ""}`.trim() ||
        "",
      allocatedTo: user?.name ?? user?.email ?? "",
      allocatedToEmail: user?.email ?? "",
      department: user?.department ?? "",
      allocationDate: a.allocationDate ?? "",
      expectedReturn: a.expectedReturn ?? "",
      daysOverdue: Math.max(0, daysOverdue),
    };
  });

  const gatePassList = gatePasses.slice(0, 50).map((gp) => ({
    _id: String(gp._id),
    gatePassId: gp.gatePassId ?? "",
    assetTag: (gp.asset as any)?.assetTag ?? "",
    assetModel:
      `${(gp.asset as any)?.manufacturer ?? ""} ${(gp.asset as any)?.model ?? (gp.asset as any)?.device ?? ""}`.trim(),
    type: gp.type as "OUT" | "IN",
    purpose: gp.purpose ?? "",
    carrierName: gp.carrierName ?? "",
    requestedBy: gp.requestedBy ?? "",
    status: gp.status as
      | "PENDING"
      | "APPROVED"
      | "ISSUED"
      | "RETURNED"
      | "REJECTED",
    date: String(gp.createdAt).split("T")[0],
    issuedAt: gp.issuedAt ?? "",
  }));

  const returnHistory = returnedAllocations.slice(0, 30).map((a) => {
    const asset = a.asset as any;
    const user = a.allocatedTo as any;
    return {
      _id: String(a._id),
      assetTag: asset?.assetTag ?? "",
      device:
        `${asset?.manufacturer ?? ""} ${asset?.model ?? asset?.device ?? ""}`.trim() ||
        "",
      returnedBy: user?.name ?? user?.email ?? "",
      returnedByEmail: user?.email ?? "",
      allocationDate: a.allocationDate ?? "",
      returnDate: a.returnDate ?? "",
      returnCondition: a.returnCondition ?? "",
      returnNotes: a.returnNotes ?? "",
    };
  });

  const assetList = assets.slice(0, 50).map((a) => ({
    _id: String(a._id),
    assetTag: a.assetTag,
    device:
      `${a.manufacturer ?? ""} ${a.model ?? a.device ?? ""}`.trim() ||
      a.device ||
      "",
    category: (a.category as any)?.name ?? "",
    warrantyExpiry: a.warrantyExpiry ?? "",
    isActive: a.isActive,
    status: allocatedAssetIds.has(String(a._id)) ? "ALLOCATED" : "AVAILABLE",
  }));

  return {
    stats,
    allocationList,
    overdueList,
    gatePassList,
    returnHistory,
    assetList,
  };
}
