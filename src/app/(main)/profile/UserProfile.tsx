"use client";

import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Package,
  CheckCircle2,
  Clock,
  ChevronRight,
  CalendarDays,
  Hash,
  Users,
  LayoutGrid,
  FileText,
} from "lucide-react";
import type { ProfileData } from "./page";

type Props = { profile: ProfileData };

export default function UserProfile({ profile }: Props) {
  const { user, allocations = [], gatePasses = [] } = profile;

  const activeAllocations = allocations.filter((a) => a.status === "ACTIVE");
  const returnedAllocations = allocations.filter(
    (a) => a.status === "RETURNED",
  );

  const today = new Date().toISOString().split("T")[0];

  const stats = [
    { label: "Total Assets", value: allocations.length, icon: Package },
    { label: "Active", value: activeAllocations.length, icon: CheckCircle2 },
    { label: "Returned", value: returnedAllocations.length, icon: Clock },
  ];

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const userInfoItems = [
    { icon: Hash, label: "Employee Code", value: user.employeeCode },
    { icon: Briefcase, label: "Designation", value: user.designation || "—" },
    { icon: LayoutGrid, label: "Department", value: user.department || "—" },
    { icon: LayoutGrid, label: "Sub Dept.", value: user.subDepartment || "—" },
    { icon: MapPin, label: "Location", value: user.location || "—" },
    { icon: MapPin, label: "Sub Location", value: user.subLocation || "—" },
    { icon: Users, label: "Reporting To", value: user.reportingTo },
    { icon: CalendarDays, label: "Join Date", value: user.joinDate },
  ];

  const getAssetStatus = (a: (typeof allocations)[number]) => {
    if (a.status === "RETURNED") return "Returned";
    if (a.expectedReturn && a.expectedReturn < today) return "Overdue";
    return "Active";
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-50 text-green-700 border border-green-200";
      case "Overdue":
        return "bg-red-50 text-red-600 border border-red-200";
      case "Returned":
        return "bg-gray-100 text-gray-500 border border-gray-200";
      default:
        return "bg-gray-100 text-gray-600 border border-gray-200";
    }
  };

  const getGatePassStyle = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-blue-50 text-blue-700 border border-blue-200";
      case "PENDING":
        return "bg-yellow-50 text-yellow-700 border border-yellow-200";
      case "ISSUED":
        return "bg-purple-50 text-purple-700 border border-purple-200";
      case "RETURNED":
        return "bg-green-50 text-green-700 border border-green-200";
      case "REJECTED":
        return "bg-red-50 text-red-600 border border-red-200";
      default:
        return "bg-gray-100 text-gray-500 border border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 py-3 text-sm text-gray-400">
            <span>Users</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-700 font-medium">{user.name}</span>
          </div>

          <div className="flex items-center gap-4 pb-5">
            <div className="w-14 h-14 rounded-xl bg-gray-800 flex items-center justify-center text-white text-lg font-semibold shrink-0">
              {initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold text-gray-900">
                  {user.name}
                </h1>
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">
                  {user.status}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  {user.role || "Employee"}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" />
                  {user.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  {user.phone || "—"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h2 className="text-sm font-semibold text-gray-700 mb-3">
                User Info
              </h2>
              <ul className="space-y-3">
                {userInfoItems.map((item) => (
                  <li key={item.label} className="flex items-start gap-2.5">
                    <item.icon className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400">{item.label}</p>
                      <p className="text-sm text-gray-700 font-medium">
                        {item.value}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-xl border border-gray-200 p-4"
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs text-gray-400">{stat.label}</p>
                    <stat.icon className="w-4 h-4 text-gray-300" />
                  </div>
                  <p className="text-2xl font-semibold text-gray-800">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Assigned Assets */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-700">
                  Assigned Assets
                </h2>
                <span className="text-xs text-gray-400">
                  {allocations.length} items
                </span>
              </div>

              {allocations.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <Package className="w-8 h-8 text-gray-200 mb-2" />
                  <p className="text-sm text-gray-400">
                    No assets assigned currently.
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {allocations.map((asset) => {
                    const status = getAssetStatus(asset);
                    const assetName =
                      [
                        asset.asset.manufacturer,
                        asset.asset.model || asset.asset.device,
                      ]
                        .filter(Boolean)
                        .join(" ") || asset.asset.device;
                    return (
                      <li
                        key={String(asset._id)}
                        className="py-3 first:pt-0 last:pb-0"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-800">
                              {assetName}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {asset.asset.assetTag} · Assigned:{" "}
                              {asset.allocationDate}
                              {asset.expectedReturn
                                ? ` · Due: ${asset.expectedReturn}`
                                : ""}
                            </p>
                          </div>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${getStatusStyle(status)}`}
                          >
                            {status}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Gate Pass History */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-gray-700">
                  Gate Pass History
                </h2>
                <span className="text-xs text-gray-400">
                  {gatePasses.length} records
                </span>
              </div>
              {gatePasses.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <FileText className="w-8 h-8 text-gray-200 mb-2" />
                  <p className="text-sm text-gray-400">No gate passes found.</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {gatePasses.map((gp, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0"
                    >
                      <div>
                        <p className="text-sm text-gray-700 font-medium">
                          {gp.gatePassId}
                        </p>
                        <p className="text-xs text-gray-400">
                          {gp.type} · {gp.purpose}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full border ${getGatePassStyle(gp.status)}`}
                        >
                          {gp.status}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(gp.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
