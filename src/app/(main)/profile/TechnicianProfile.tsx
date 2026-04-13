// import React from "react";

// function TechnicianProfile() {
//   return (
//     <>
//       <div>Technician, Assigned assets, activity, workload</div>
//     </>
//   );
// }

// export default TechnicianProfile;
"use client";

import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Wrench,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Hash,
  LayoutGrid,
  CalendarDays,
  Users,
  Clock,
} from "lucide-react";
import type { ProfileUser } from "./page";

type Props = { user: ProfileUser };

const recentActivity = [
  {
    action: "Asset Assigned",
    detail: "Dell Latitude 5520 → EMP012",
    date: "Today, 10:30 AM",
    type: "assign",
  },
  {
    action: "Maintenance Completed",
    detail: "HP LaserJet Pro",
    date: "Yesterday",
    type: "fix",
  },
  {
    action: "Asset Returned",
    detail: "Logitech MX Keys",
    date: "2 days ago",
    type: "return",
  },
  {
    action: "Ticket Resolved",
    detail: 'BenQ 27" Monitor — Screen flickering',
    date: "3 days ago",
    type: "resolve",
  },
];

const openTickets = [
  { asset: "MacBook Air M2", issue: "Battery drain issue", priority: "High" },
  { asset: "Cisco IP Phone", issue: "No dial tone", priority: "Medium" },
  { asset: "HP EliteBook", issue: "Keyboard not working", priority: "Low" },
];

export default function TechnicianProfile({ user }: Props) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const infoItems = [
    { icon: Hash, label: "Employee Code", value: user.employeeCode },
    { icon: Briefcase, label: "Designation", value: user.designation },
    { icon: LayoutGrid, label: "Department", value: user.department },
    { icon: MapPin, label: "Location", value: user.location },
    { icon: Users, label: "Reporting To", value: user.reportingTo },
    { icon: CalendarDays, label: "Join Date", value: user.joinDate },
  ];

  const stats = [
    {
      label: "Assigned Tickets",
      value: user.assignedTickets ?? 0,
      icon: AlertCircle,
    },
    {
      label: "Resolved This Month",
      value: user.resolvedThisMonth ?? 0,
      icon: CheckCircle2,
    },
    { label: "Status", value: user.status, icon: Clock },
  ];

  const priorityStyle: Record<string, string> = {
    High: "bg-red-50 text-red-600 border-red-200",
    Medium: "bg-yellow-50 text-yellow-700 border-yellow-200",
    Low: "bg-gray-100 text-gray-500 border-gray-200",
  };

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
                  Technician
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

            {/* Open Tickets */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-700">
                  Open Tickets
                </h2>
                <span className="text-xs text-gray-400">
                  {openTickets.length} open
                </span>
              </div>
              <ul className="divide-y divide-gray-100">
                {openTickets.map((ticket, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <Wrench className="w-4 h-4 text-gray-300 shrink-0" />
                      <div>
                        <p className="text-sm text-gray-800 font-medium">
                          {ticket.asset}
                        </p>
                        <p className="text-xs text-gray-400">{ticket.issue}</p>
                      </div>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border ${priorityStyle[ticket.priority]}`}
                    >
                      {ticket.priority}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h2 className="text-sm font-semibold text-gray-700 mb-3">
                Recent Activity
              </h2>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}