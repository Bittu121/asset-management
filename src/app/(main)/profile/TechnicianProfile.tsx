"use client";

import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Hash,
  LayoutGrid,
  CalendarDays,
  Users,
  Clock,
  Package,
} from "lucide-react";
import type { ProfileData } from "./page";

type Props = { profile: ProfileData };

export default function TechnicianProfile({ profile }: Props) {
  const {
    user,
    activeCount = 0,
    returnedCount = 0,
    recentActivity = [],
  } = profile;

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const infoItems = [
    { icon: Hash, label: "Employee Code", value: user.employeeCode },
    { icon: Briefcase, label: "Designation", value: user.designation || "—" },
    { icon: LayoutGrid, label: "Department", value: user.department || "—" },
    { icon: MapPin, label: "Location", value: user.location || "—" },
    { icon: Users, label: "Reporting To", value: user.reportingTo },
    { icon: CalendarDays, label: "Join Date", value: user.joinDate },
  ];

  const stats = [
    { label: "Active Allocations", value: activeCount, icon: AlertCircle },
    { label: "Total Returned", value: returnedCount, icon: CheckCircle2 },
    { label: "Status", value: user.status, icon: Clock },
  ];

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
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
                  Technician
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">
                  {user.status}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" />
                  {user.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  {user.phone || "—"}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {user.location || "—"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h2 className="text-sm font-semibold text-gray-700 mb-3">
                Technician Info
              </h2>
              <ul className="space-y-3">
                {infoItems.map((item) => (
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

            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h2 className="text-sm font-semibold text-gray-700 mb-3">
                Recent Activity
              </h2>
              {recentActivity.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <Package className="w-8 h-8 text-gray-200 mb-2" />
                  <p className="text-sm text-gray-400">No recent activity.</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {recentActivity.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0"
                    >
                      <div>
                        <p className="text-sm text-gray-700">{item.action}</p>
                        <p className="text-xs text-gray-400">{item.detail}</p>
                      </div>
                      <span className="text-xs text-gray-400 shrink-0 ml-4">
                        {item.date}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h2 className="text-sm font-semibold text-gray-700 mb-3">
                Department Overview
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400">Department</p>
                  <p className="text-sm text-gray-700 font-medium mt-0.5">
                    {user.department || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Sub Department</p>
                  <p className="text-sm text-gray-700 font-medium mt-0.5">
                    {user.subDepartment || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Location</p>
                  <p className="text-sm text-gray-700 font-medium mt-0.5">
                    {user.location || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Reporting To</p>
                  <p className="text-sm text-gray-700 font-medium mt-0.5">
                    {user.reportingTo}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
