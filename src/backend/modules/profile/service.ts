import UserAccount from "../admin/user-account/schema";
import Allocation from "../assets/allocation/schema";
import GatePass from "../assets/asset-gate-pass/schema";
import "../admin/asset-categories/schema";

export async function getProfileData(userId: string) {
  const user = await UserAccount.findById(userId)
    .populate("role", "name")
    .populate("reportingManager", "name")
    .select(
      "-password -otp -otpExpiry -otpAttempts -otpLockedUntil -isVerified",
    )
    .lean();

  if (!user) return null;

  const roleName: string = (user.role as any)?.name ?? "";
  const roleUpper = roleName.toUpperCase();

  const joinDate = (user.createdAt as Date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const baseUser = {
    name: user.name,
    email: user.email,
    phone: user.phone ?? "",
    employeeCode: user.employeeCode,
    designation: user.designation ?? "",
    role: roleName,
    reportingTo: (user.reportingManager as any)?.name ?? "—",
    department: user.department ?? "",
    subDepartment: user.subDepartment ?? "",
    location: user.location ?? "",
    subLocation: user.subLocation ?? "",
    joinDate,
    status: "Active",
  };

  // Active allocations for this user
  const allocations = await Allocation.find({ allocatedTo: userId })
    .populate("asset", "assetTag device manufacturer model warrantyExpiry")
    .sort({ createdAt: -1 })
    .lean();

  if (
    roleUpper === "ADMIN" ||
    roleUpper === "MANAGER" ||
    roleUpper === "SUPERADMIN"
  ) {
    const teamSize = user.department
      ? await UserAccount.countDocuments({ department: user.department })
      : 0;

    const recentUsers = await UserAccount.find()
      .populate("role", "name")
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name employeeCode role createdAt")
      .lean();

    const formattedRecentUsers = recentUsers.map((u) => ({
      name: u.name,
      employeeCode: u.employeeCode,
      role: (u.role as any)?.name ?? "",
      joinedAt: (u.createdAt as Date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    }));

    return {
      user: baseUser,
      allocations,
      teamSize,
      recentUsers: formattedRecentUsers,
    };
  }

  if (roleUpper === "TECHNICIAN") {
    const recentAllocations = await Allocation.find()
      .populate("asset", "assetTag device manufacturer model")
      .populate("allocatedTo", "name employeeCode")
      .sort({ updatedAt: -1 })
      .limit(8)
      .lean();

    const activeCount = await Allocation.countDocuments({ status: "ACTIVE" });
    const returnedCount = await Allocation.countDocuments({
      status: "RETURNED",
    });

    const recentGatePasses = await GatePass.find()
      .populate("asset", "assetTag device")
      .sort({ updatedAt: -1 })
      .limit(5)
      .lean();

    const activity = [
      ...recentAllocations.slice(0, 4).map((a) => ({
        action: a.status === "RETURNED" ? "Asset Returned" : "Asset Assigned",
        detail: `${(a.asset as any)?.assetTag ?? ""} → ${(a.allocatedTo as any)?.name ?? ""}`,
        date: new Date(a.updatedAt as Date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      })),
      ...recentGatePasses.slice(0, 3).map((gp) => ({
        action: `Gate Pass ${gp.status}`,
        detail: `${(gp.asset as any)?.assetTag ?? ""} — ${gp.purpose ?? ""}`,
        date: new Date(gp.updatedAt as Date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      })),
    ].slice(0, 6);

    return {
      user: baseUser,
      allocations,
      activeCount,
      returnedCount,
      recentActivity: activity,
    };
  }

  // End user — return allocations and gate passes
  const gatePasses = await GatePass.find({ requestedBy: (user as any).email })
    .select("gatePassId type purpose status createdAt")
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  return { user: baseUser, allocations, gatePasses };
}
