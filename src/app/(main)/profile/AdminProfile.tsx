// import React from "react";

// function AdminProfile() {
//   return (
//     <>
//       <div>Admin, Full details, Team / reports, system info</div>
//     </>
//   );
// }

// export default AdminProfile;
"use client";

import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Users,
  Shield,
  ChevronRight,
  Hash,
  LayoutGrid,
  CalendarDays,
  Clock,
  Monitor,
  Activity,
} from "lucide-react";
import type { ProfileUser } from "./page";

type Props = { user: ProfileUser };

const teamMembers = [
  { name: "Sarah Wilson", role: "Frontend Lead", status: "Active" },
  { name: "Mike Chen", role: "Backend Engineer", status: "Active" },
  { name: "Priya Sharma", role: "QA Engineer", status: "On Leave" },
  { name: "Tom Hayes", role: "DevOps Engineer", status: "Active" },
];

const systemLogs = [
  { event: "User Created", detail: "EMP045 — Rita Patel", date: "10 Jun 2024" },
  { event: "Role Changed", detail: "EMP012 — Admin → Viewer", date: "8 Jun 2024" },
  { event: "Asset Assigned", detail: "MacBook Pro → EMP033", date: "5 Jun 2024" },
];

export default function AdminProfile({ user }: Props) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const infoItems = [
    { icon: Hash, label: "Employee Code", value: user.employeeCode },
    { icon: Briefcase, label: "Designation", value: user.designation },
    { icon: LayoutGrid, label: "Department", value: user.department },
    { icon: MapPin, label: "Location", value: user.location },
    { icon: Shield, label: "System Role", value: user.systemRole ?? "—" },
    { icon: Clock, label: "Last Login", value: user.lastLogin ?? "—" },
    { icon: CalendarDays, label: "Join Date", value: user.joinDate },
  ];

  const stats = [
    { label: "Team Size", value: user.teamSize ?? 0, icon: Users },
    { label: "System Role", value: user.systemRole ?? "—", icon: Shield },
    { label: "Status", value: user.status, icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
            <div className="w-14 h-14 rounded-xl bg-gray-800 flex items-center justify-center text-white text-lg font-semibold shrink-0">
              {initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold text-gray-900">
                  {user.name}
                </h1>
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
                  Admin
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
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
                  {user.phone}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {user.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h2 className="text-sm font-semibold text-gray-700 mb-3">
                Admin Info
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

          {/* Main Content */}
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

            {/* Team Members */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-700">
                  Team Members
                </h2>
                <span className="text-xs text-gray-400">
                  {teamMembers.length} members
                </span>
              </div>
              <ul className="divide-y divide-gray-100">
                {teamMembers.map((member) => (
                  <li
                    key={member.name}
                    className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 text-xs font-semibold">
                        {member.name[0]}
                      </div>
                      <div>
                        <p className="text-sm text-gray-800 font-medium">
                          {member.name}
                        </p>
                        <p className="text-xs text-gray-400">{member.role}</p>
                      </div>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border ${
                        member.status === "Active"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-yellow-50 text-yellow-700 border-yellow-200"
                      }`}
                    >
                      {member.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* System Logs */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h2 className="text-sm font-semibold text-gray-700 mb-3">
                System Logs
              </h2>
              <ul className="divide-y divide-gray-100">
                {systemLogs.map((log, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0"
                  >
                    <div>
                      <p className="text-sm text-gray-700">{log.event}</p>
                      <p className="text-xs text-gray-400">{log.detail}</p>
                    </div>
                    <span className="text-xs text-gray-400">{log.date}</span>
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