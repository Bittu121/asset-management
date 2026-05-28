"use client";

import { useEffect, useState } from "react";
import {
  Package,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  RotateCcw,
  ArrowUpRight,
  Clock,
  Users,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/auth/store";
import { useRouter } from "next/navigation";

type BadgeColor = "green" | "red" | "yellow" | "blue" | "purple" | "gray" | "orange";
const badgeClasses: Record<BadgeColor, string> = {
  green: "bg-green-50 text-green-600 border-green-200",
  red: "bg-red-50 text-red-500 border-red-200",
  yellow: "bg-yellow-50 text-yellow-600 border-yellow-200",
  blue: "bg-blue-50 text-blue-600 border-blue-200",
  purple: "bg-purple-50 text-purple-600 border-purple-200",
  gray: "bg-gray-50 text-gray-500 border-gray-200",
  orange: "bg-orange-50 text-orange-600 border-orange-200",
};
function Badge({ label, color = "gray" }: { label: string | number; color?: BadgeColor }) {
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${badgeClasses[color]}`}>
      {label}
    </span>
  );
}
function statusColor(s: string): BadgeColor {
  switch (s) {
    case "ACTIVE":
    case "AVAILABLE":
      return "green";
    case "OVERDUE":
    case "REJECTED":
      return "red";
    case "RETURNED":
      return "gray";
    case "PENDING":
      return "yellow";
    case "ISSUED":
      return "purple";
    case "ALLOCATED":
      return "orange";
    default:
      return "gray";
  }
}

type Stats = {
  totalAssets: number;
  activeAllocations: number;
  overdueAllocations: number;
  pendingGatePasses: number;
  totalReturned: number;
  available: number;
};
type AllocRow = {
  _id: string;
  assetTag: string;
  device: string;
  allocatedTo: string;
  department: string;
  allocationDate: string;
  expectedReturn: string;
  status: string;
};
type OverdueRow = {
  _id: string;
  assetTag: string;
  device: string;
  allocatedTo: string;
  department: string;
  expectedReturn: string;
  daysOverdue: number;
};
type GatePassRow = {
  _id: string;
  gatePassId: string;
  assetTag: string;
  assetModel: string;
  type: string;
  purpose: string;
  requestedBy: string;
  status: string;
  date: string;
};

function StatCard({
  title,
  value,
  icon,
  iconBg,
  iconColor,
  sub,
}: {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  sub?: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-start justify-between hover:shadow-md transition-shadow">
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
        {sub && <span className="text-xs text-gray-400">{sub}</span>}
      </div>
      <div
        className={`w-11 h-11 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center flex-shrink-0 ml-3`}
      >
        {icon}
      </div>
    </div>
  );
}

export default function TechnicianDashboard() {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const [stats, setStats] = useState<Stats>({
    totalAssets: 0,
    activeAllocations: 0,
    overdueAllocations: 0,
    pendingGatePasses: 0,
    totalReturned: 0,
    available: 0,
  });
  const [recentAllocations, setRecentAllocations] = useState<AllocRow[]>([]);
  const [overdueList, setOverdueList] = useState<OverdueRow[]>([]);
  const [pendingGatePasses, setPendingGatePasses] = useState<GatePassRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/technician", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        if (d.data) {
          setStats(d.data.stats);
          setRecentAllocations((d.data.allocationList ?? []).slice(0, 5));
          setOverdueList(d.data.overdueList ?? []);
          setPendingGatePasses(
            (d.data.gatePassList ?? [])
              .filter((g: GatePassRow) => g.status === "PENDING")
              .slice(0, 5)
          );
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 p-6 space-y-6">
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl h-24 animate-pulse border border-gray-100"
            />
          ))}
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Technician Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome, {user?.name ?? "Technician"} — Operational overview
        </p>
      </div>

      {overdueList.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-3 text-red-700 text-sm">
          <AlertTriangle size={16} className="shrink-0" />
          <span>
            <strong>{overdueList.length}</strong> allocation
            {overdueList.length > 1 ? "s" : ""} are overdue and need immediate follow-up.
          </span>
        </div>
      )}

      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
        <StatCard
          title="Total Assets"
          value={stats.totalAssets}
          icon={<Package size={20} />}
          iconBg="bg-indigo-50"
          iconColor="text-indigo-600"
          sub="In system"
        />
        <StatCard
          title="Active Allocations"
          value={stats.activeAllocations}
          icon={<Users size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          sub="Currently assigned"
        />
        <StatCard
          title="Available"
          value={stats.available}
          icon={<CheckCircle2 size={20} />}
          iconBg="bg-green-50"
          iconColor="text-green-600"
          sub="Ready to allocate"
        />
        <StatCard
          title="Overdue Allocations"
          value={stats.overdueAllocations}
          icon={<AlertTriangle size={20} />}
          iconBg="bg-red-50"
          iconColor="text-red-500"
          sub="Needs follow-up"
        />
        <StatCard
          title="Pending Gate Passes"
          value={stats.pendingGatePasses}
          icon={<ShieldCheck size={20} />}
          iconBg="bg-yellow-50"
          iconColor="text-yellow-600"
          sub="Awaiting action"
        />
        <StatCard
          title="Total Returned"
          value={stats.totalReturned}
          icon={<RotateCcw size={20} />}
          iconBg="bg-gray-50"
          iconColor="text-gray-500"
          sub="Completed returns"
        />
      </div>

      <div className="grid xl:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">Overdue Allocations</h3>
              <p className="text-xs text-gray-400 mt-0.5">Require immediate action</p>
            </div>
            <button
              onClick={() => router.push("/technician/asset-overdue")}
              className="flex items-center gap-1 text-xs text-indigo-500 hover:text-indigo-700 font-medium"
            >
              View All <ArrowUpRight size={13} />
            </button>
          </div>
          {overdueList.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">No overdue allocations</p>
          ) : (
            <div className="space-y-3">
              {overdueList.slice(0, 4).map((o) => (
                <div key={o._id} className="p-3 rounded-xl bg-red-50 border border-red-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-red-700">{o.assetTag}</span>
                    <Badge label={`${o.daysOverdue}d overdue`} color="red" />
                  </div>
                  <p className="text-xs text-red-600 mt-1">
                    {o.device || "Asset"} — {o.allocatedTo}
                  </p>
                  <p className="text-xs text-red-500 mt-0.5">Due: {o.expectedReturn}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">Pending Gate Passes</h3>
              <p className="text-xs text-gray-400 mt-0.5">Awaiting approval</p>
            </div>
            <button
              onClick={() => router.push("/technician/asset-gate-pass")}
              className="flex items-center gap-1 text-xs text-indigo-500 hover:text-indigo-700 font-medium"
            >
              View All <ArrowUpRight size={13} />
            </button>
          </div>
          {pendingGatePasses.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">No pending gate passes</p>
          ) : (
            <div className="space-y-3">
              {pendingGatePasses.map((gp) => (
                <div key={gp._id} className="p-3 rounded-xl bg-yellow-50 border border-yellow-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-yellow-700">
                      {gp.gatePassId || "Gate Pass"}
                    </span>
                    <span
                      className={`text-xs font-semibold border px-2 py-0.5 rounded ${gp.type === "OUT" ? "text-yellow-600 border-yellow-300 bg-yellow-100" : "text-blue-600 border-blue-300 bg-blue-100"}`}
                    >
                      {gp.type}
                    </span>
                  </div>
                  <p className="text-xs text-yellow-700 mt-1">
                    {gp.assetTag} — {gp.purpose}
                  </p>
                  <p className="text-xs text-yellow-600 mt-0.5">By: {gp.requestedBy}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">Recent Allocations</h3>
              <p className="text-xs text-gray-400 mt-0.5">Latest assignments</p>
            </div>
            <button
              onClick={() => router.push("/technician/asset-allocation")}
              className="flex items-center gap-1 text-xs text-indigo-500 hover:text-indigo-700 font-medium"
            >
              View All <ArrowUpRight size={13} />
            </button>
          </div>
          {recentAllocations.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">No allocations yet</p>
          ) : (
            <div className="space-y-3">
              {recentAllocations.map((a) => (
                <div
                  key={a._id}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{a.assetTag}</p>
                    <p className="text-xs text-gray-500">
                      {a.allocatedTo} · {a.allocationDate}
                    </p>
                  </div>
                  <Badge label={a.status} color={statusColor(a.status)} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-800 text-sm mb-4">Quick Navigation</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            {
              label: "Asset List",
              icon: <Package size={20} />,
              path: "/technician/asset",
              bg: "bg-indigo-50",
              color: "text-indigo-600",
            },
            {
              label: "Allocations",
              icon: <Users size={20} />,
              path: "/technician/asset-allocation",
              bg: "bg-blue-50",
              color: "text-blue-600",
            },
            {
              label: "Returns",
              icon: <RotateCcw size={20} />,
              path: "/technician/asset-returns",
              bg: "bg-green-50",
              color: "text-green-600",
            },
            {
              label: "Overdue",
              icon: <AlertTriangle size={20} />,
              path: "/technician/asset-overdue",
              bg: "bg-red-50",
              color: "text-red-500",
            },
            {
              label: "Gate Pass",
              icon: <ShieldCheck size={20} />,
              path: "/technician/asset-gate-pass",
              bg: "bg-yellow-50",
              color: "text-yellow-600",
            },
            {
              label: "History",
              icon: <Clock size={20} />,
              path: "/technician/asset-history",
              bg: "bg-purple-50",
              color: "text-purple-600",
            },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => router.push(item.path)}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
            >
              <div
                className={`w-10 h-10 rounded-xl ${item.bg} ${item.color} flex items-center justify-center`}
              >
                {item.icon}
              </div>
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
