"use client";
import { useEffect, useMemo, useState } from "react";
import {
  User,
  Mail,
  Phone,
  Building2,
  MapPin,
  Briefcase,
  Users,
  Shield,
  Edit3,
  ChevronRight,
  Package,
  History,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  MoreHorizontal,
  Camera,
  BadgeCheck,
} from "lucide-react";

type UserProfileType = {
  role: string;
  name: string;
  employeeCode: string;
  email: string;
  phone: string;
  designation: string;
  reportingTo: string;
  department: string;
  subDepartment: string;
  location: string;
  subLocation: string;
  joinDate: string;
  status: string;
};

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
  allocatedToId: number;
  status: string;
  assignedDate: string;
};

const STORAGE_KEY = "assetAllocations";

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("assets");

  const [form] = useState<UserProfileType>({
    role: "Employee",
    name: "John Doe",
    employeeCode: "EMP001",
    email: "john.doe@company.com",
    phone: "+91 98765 43210",
    designation: "Senior Software Engineer",
    reportingTo: "Sarah Wilson",
    department: "Engineering",
    subDepartment: "Frontend Development",
    location: "Bangalore",
    subLocation: "HSR Layout, Sector 2",
    joinDate: "15 Jan 2023",
    status: "Active",
  });

  const [assignedAssets, setAssignedAssets] = useState<Allocation[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    const all = JSON.parse(stored) as AllocationRaw[];
    const filtered = all.filter((a) => a.allocatedToId === 1 && a.status !== "RETURNED");
    setAssignedAssets(
      filtered.map((a) => ({
        assetTag: a.assetTag,
        assetName: a.assetName,
        allocatedToId: a.allocatedToId,
        status: a.status === "OVERDUE" ? "Maintenance" : "Active",
        assignedDate: a.allocationDate,
      }))
    );
  }, []);

  const stats = useMemo(
    () => [
      { label: "Total Assets", value: assignedAssets.length, icon: Package },
      { label: "Active", value: assignedAssets.filter((a) => a.status === "Active").length, icon: CheckCircle2 },
      { label: "In Maintenance", value: assignedAssets.filter((a) => a.status === "Maintenance").length, icon: Clock },
    ],
    [assignedAssets]
  );

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Inactive":
        return "bg-gray-50 text-gray-600 border-gray-200";
      case "Maintenance":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getAuditIcon = (type: string) => {
    switch (type) {
      case "assign":
        return "bg-emerald-100 text-emerald-600";
      case "return":
        return "bg-blue-100 text-blue-600";
      case "update":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4 border-b border-slate-100">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="hover:text-slate-700 cursor-pointer">Users</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-900 font-medium">{form.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <MoreHorizontal className="w-5 h-5 text-slate-500" />
              </button>
            </div>
          </div>

          <div className="py-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-5">
                <div className="relative group">
                  <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-semibold shadow-lg shadow-indigo-200">
                    {form.name.split(" ")[0].slice(0, 1)}
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">{form.name}</h1>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mt-2">
                    <span className="inline-flex items-center gap-1"><User className="w-4 h-4" />{form.role}</span>
                    <span className="inline-flex items-center gap-1"><Mail className="w-4 h-4" />{form.email}</span>
                    <span className="inline-flex items-center gap-1"><Phone className="w-4 h-4" />{form.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-1 bg-white p-4 rounded-xl border border-gray-200">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">User Info</h2>
            <p className="text-xs text-gray-500 mb-2">Employee Code: {form.employeeCode}</p>
            <p className="text-xs text-gray-500 mb-2">Designation: {form.designation}</p>
            <p className="text-xs text-gray-500 mb-2">Department: {form.department}</p>
            <p className="text-xs text-gray-500 mb-2">Location: {form.location}</p>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500">{stat.label}</p>
                      <h3 className="text-xl font-semibold text-gray-900">{stat.value}</h3>
                    </div>
                    <stat.icon className="w-5 h-5 text-slate-500" />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-700">Assigned Assets</h2>
                <div className="text-xs text-gray-500">{assignedAssets.length} items</div>
              </div>
              {assignedAssets.length === 0 ? (
                <p className="text-sm text-gray-500">No assigned assets currently.</p>
              ) : (
                <ul className="space-y-2">
                  {assignedAssets.map((asset, index) => (
                    <li key={index} className="border p-2 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-sm">{asset.assetName}</p>
                          <p className="text-xs text-gray-500">{asset.assetTag}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded ${getStatusStyle(asset.status)}`}>{asset.status}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Assigned: {asset.assignedDate}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h2 className="text-sm font-semibold text-gray-700 mb-3">Audit Trail</h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Asset Assigned</span>
                  <span>15 Jan 2023</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
