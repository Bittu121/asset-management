import Allocation from "../assets/allocation/schema";
import GatePass from "../assets/asset-gate-pass/schema";
import "../admin/asset-categories/schema";

export async function getEndUserData(userId: string, userEmail: string) {
  const today = new Date().toISOString().split("T")[0];

  const allocations = await Allocation.find({ allocatedTo: userId })
    .select("asset allocatedTo status allocationDate expectedReturn returnDate createdAt")
    .populate([
      {
        path: "asset",
        select: "assetTag device manufacturer model warrantyExpiry purchaseCost currentValue",
      },
    ])
    .sort({ createdAt: -1 })
    .lean();

  // Fetch gate passes scoped to this user by email (not by asset, which leaks cross-user data)
  const myGatePasses = await GatePass.find({ requestedBy: userEmail })
    .select("asset gatePassId type purpose expectedReturn status requestedBy createdAt")
    .populate([{ path: "asset", select: "assetTag device manufacturer model" }])
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();

  // Active allocations
  const activeAllocations = allocations.filter((a) => a.status === "ACTIVE");
  const overdueAllocations = activeAllocations.filter((a) => a.expectedReturn < today);
  const returnedAllocations = allocations.filter((a) => a.status === "RETURNED");

  const stats = {
    totalAssets: activeAllocations.length,
    pendingGatePasses: myGatePasses.filter((gp) => gp.status === "PENDING").length,
    activeGatePasses: myGatePasses.filter((gp) => ["APPROVED", "ISSUED"].includes(gp.status))
      .length,
    returnDue: overdueAllocations.length,
  };

  const myAssets = activeAllocations.map((a) => {
    const asset = a.asset as any;
    const isOverdue = a.expectedReturn < today;
    return {
      _id: String(a._id),
      assetId: String(asset?._id ?? ""),
      assetTag: asset?.assetTag ?? "",
      device:
        `${asset?.manufacturer ?? ""} ${asset?.model ?? asset?.device ?? ""}`.trim() ||
        asset?.device ||
        "",
      assetType: asset?.device || "Asset",
      allocationDate: a.allocationDate ?? "",
      expectedReturn: a.expectedReturn ?? "",
      warrantyExpiry: asset?.warrantyExpiry ?? "",
      value: parseFloat(asset?.purchaseCost || asset?.currentValue || "0") || 0,
      status: isOverdue ? "OVERDUE" : "ACTIVE",
    };
  });

  // Also include recent returned assets
  const recentReturned = returnedAllocations.slice(0, 5).map((a) => {
    const asset = a.asset as any;
    return {
      _id: String(a._id),
      assetId: String(asset?._id ?? ""),
      assetTag: asset?.assetTag ?? "",
      device: `${asset?.manufacturer ?? ""} ${asset?.model ?? asset?.device ?? ""}`.trim() || "",
      assetType: asset?.device || "Asset",
      allocationDate: a.allocationDate ?? "",
      returnDate: a.returnDate ?? "",
      status: "RETURNED" as const,
    };
  });

  const gatePassList = myGatePasses.slice(0, 20).map((gp) => ({
    _id: String(gp._id),
    gatePassId: gp.gatePassId ?? "",
    assetTag: (gp.asset as any)?.assetTag ?? "",
    assetModel:
      `${(gp.asset as any)?.manufacturer ?? ""} ${(gp.asset as any)?.model ?? (gp.asset as any)?.device ?? ""}`.trim(),
    type: gp.type as "OUT" | "IN",
    purpose: gp.purpose ?? "",
    expectedReturn: gp.expectedReturn ?? "",
    status: gp.status as "PENDING" | "APPROVED" | "ISSUED" | "RETURNED" | "REJECTED",
    date: String(gp.createdAt).split("T")[0],
  }));

  // Alerts
  const alerts: {
    title: string;
    message: string;
    severity: "warning" | "danger" | "info";
  }[] = [];
  for (const a of overdueAllocations) {
    const asset = a.asset as any;
    alerts.push({
      title: `Return Overdue: ${asset?.assetTag ?? "Asset"}`,
      message: `${asset?.device || "Asset"} was due for return on ${a.expectedReturn}`,
      severity: "danger",
    });
  }
  for (const a of activeAllocations) {
    const asset = a.asset as any;
    if (
      asset?.warrantyExpiry &&
      asset.warrantyExpiry > today &&
      asset.warrantyExpiry <= today.substring(0, 7) + "-30"
    ) {
      alerts.push({
        title: `Warranty Expiring: ${asset.assetTag}`,
        message: `Warranty expires on ${asset.warrantyExpiry}`,
        severity: "warning",
      });
    }
  }
  for (const gp of myGatePasses.filter((gp) => gp.status === "PENDING")) {
    alerts.push({
      title: `Gate Pass Pending`,
      message: `${gp.gatePassId ?? "Gate pass"} is awaiting approval`,
      severity: "info",
    });
  }

  return { stats, myAssets, recentReturned, gatePassList, alerts };
}
