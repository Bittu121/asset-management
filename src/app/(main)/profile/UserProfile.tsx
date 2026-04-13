// import React from "react";

// function UserProfile() {
//   return (
//     <>
//       <div>User personal info, assigned assets, requests</div>
//     </>
//   );
// }

// export default UserProfile;
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  User,
  Mail,
  Phone,
  Building2,
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
} from "lucide-react";
import type { ProfileUser } from "./page";

type AllocationRaw = {
  assetTag: string;
  assetName: string;
  allocatedToId: number;
  status: string;
  allocationDate: string;
};

type Allocation = {
  assetTag: string;
  assetName: string;
  status: string;
  assignedDate: string;
};

const STORAGE_KEY = "assetAllocations";

type Props = { user: ProfileUser };

export default function UserProfile({ user }: Props) {
  const [assignedAssets, setAssignedAssets] = useState<Allocation[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return;
      const all = JSON.parse(stored) as AllocationRaw[];
      const filtered = all.filter(
        (a) => a.allocatedToId === 1 && a.status !== "RETURNED"
      );
      setAssignedAssets(
        filtered.map((a) => ({
          assetTag: a.assetTag,
          assetName: a.assetName,
          status: a.status === "OVERDUE" ? "Maintenance" : "Active",
          assignedDate: a.allocationDate,
        }))
      );
    } catch {
      setAssignedAssets([]);
    }
  }, []);

  const stats = useMemo(
    () => [
      { label: "Total Assets", value: assignedAssets.length, icon: Package },
      {
        label: "Active",
        value: assignedAssets.filter((a) => a.status === "Active").length,
        icon: CheckCircle2,
      },
      {
        label: "In Maintenance",
        value: assignedAssets.filter((a) => a.status === "Maintenance").length,
        icon: Clock,
      },
    ],
    [assignedAssets]
  );

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-50 text-green-700 border border-green-200";
      case "Maintenance":
        return "bg-yellow-50 text-yellow-700 border border-yellow-200";
      default:
        return "bg-gray-100 text-gray-600 border border-gray-200";
    }
  };

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const userInfoItems = [
    { icon: Hash, label: "Employee Code", value: user.employeeCode },
    { icon: Briefcase, label: "Designation", value: user.designation },
    { icon: LayoutGrid, label: "Department", value: user.department },
    { icon: LayoutGrid, label: "Sub Dept.", value: user.subDepartment },
    { icon: MapPin, label: "Location", value: user.location },
    { icon: MapPin, label: "Sub Location", value: user.subLocation },
    { icon: Users, label: "Reporting To", value: user.reportingTo },
    { icon: CalendarDays, label: "Join Date", value: user.joinDate },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 py-3 text-sm text-gray-400">
            <span className="hover:text-gray-600 cursor-pointer">Users</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-700 font-medium">{user.name}</span>
          </div>

          {/* Profile Hero */}
          <div className="flex items-center gap-4 pb-5">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-xl bg-gray-800 flex items-center justify-center text-white text-lg font-semibold shrink-0">
              {initials}
            </div>

            {/* Name + meta */}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold text-gray-900">
                  {user.name}
                </h1>
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
                  {user.status}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  Employee
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" />
                  {user.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  {user.phone}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          {/* Left Sidebar — User Info */}
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

          {/* Right Content */}
          <div className="lg:col-span-3 space-y-4">
            {/* Stats */}
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
                  {assignedAssets.length} items
                </span>
              </div>

              {assignedAssets.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <Package className="w-8 h-8 text-gray-200 mb-2" />
                  <p className="text-sm text-gray-400">
                    No assets assigned currently.
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {assignedAssets.map((asset, index) => (
                    <li key={index} className="py-3 first:pt-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {asset.assetName}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {asset.assetTag} · Assigned: {asset.assignedDate}
                          </p>
                        </div>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${getStatusStyle(asset.status)}`}
                        >
                          {asset.status}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Audit Trail */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h2 className="text-sm font-semibold text-gray-700 mb-3">
                Audit Trail
              </h2>
              <ul className="divide-y divide-gray-100">
                {[
                  {
                    event: "Asset Assigned",
                    detail: "Dell Latitude 5520",
                    date: "15 Jan 2023",
                  },
                  {
                    event: "Profile Created",
                    detail: "Account activated",
                    date: "15 Jan 2023",
                  },
                ].map((entry, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0"
                  >
                    <div>
                      <p className="text-sm text-gray-700">{entry.event}</p>
                      <p className="text-xs text-gray-400">{entry.detail}</p>
                    </div>
                    <span className="text-xs text-gray-400">{entry.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}