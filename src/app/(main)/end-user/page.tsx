"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/auth/store";
import {
  Monitor,
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Package,
  ArrowUpRight,
  RotateCcw,
} from "lucide-react";
import { useRouter } from "next/navigation";

type BadgeColor =
  | "green"
  | "red"
  | "yellow"
  | "blue"
  | "purple"
  | "gray"
  | "orange";
const badgeClasses: Record<BadgeColor, string> = {
  green: "bg-green-50 text-green-600 border-green-200",
  red: "bg-red-50 text-red-500 border-red-200",
  yellow: "bg-yellow-50 text-yellow-600 border-yellow-200",
  blue: "bg-blue-50 text-blue-600 border-blue-200",
  purple: "bg-purple-50 text-purple-600 border-purple-200",
  gray: "bg-gray-50 text-gray-500 border-gray-200",
  orange: "bg-orange-50 text-orange-600 border-orange-200",
};

function Badge({
  label,
  color = "gray",
}: {
  label: string | number;
  color?: BadgeColor;
}) {
  return (
    <span
      className={`text-xs font-semibold px-2 py-0.5 rounded border ${badgeClasses[color]}`}
    >
      {label}
    </span>
  );
}

type Stats = {
  totalAssets: number;
  pendingGatePasses: number;
  activeGatePasses: number;
  returnDue: number;
};
type Asset = {
  _id: string;
  assetTag: string;
  device: string;
  assetType: string;
  allocationDate: string;
  expectedReturn: string;
  warrantyExpiry: string;
  value: number;
  status: string;
};
type GatePass = {
  _id: string;
  gatePassId: string;
  assetTag: string;
  assetModel: string;
  type: string;
  purpose: string;
  expectedReturn: string;
  status: string;
  date: string;
};
type Alert = {
  title: string;
  message: string;
  severity: "warning" | "danger" | "info";
};

function statusColor(s: string): BadgeColor {
  switch (s) {
    case "ACTIVE":
      return "green";
    case "RETURNED":
      return "gray";
    case "OVERDUE":
      return "red";
    case "PENDING":
      return "yellow";
    case "APPROVED":
      return "blue";
    case "ISSUED":
      return "purple";
    case "REJECTED":
      return "red";
    default:
      return "gray";
  }
}

function StatCard({
  title,
  value,
  icon,
  iconBg,
  iconColor,
  sub,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  sub?: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-start justify-between hover:shadow-md transition-shadow">
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
          {title}
        </p>
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

export default function EndUserDashboard() {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const [stats, setStats] = useState<Stats>({
    totalAssets: 0,
    pendingGatePasses: 0,
    activeGatePasses: 0,
    returnDue: 0,
  });
  const [myAssets, setMyAssets] = useState<Asset[]>([]);
  const [gatePassList, setGatePassList] = useState<GatePass[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/end-user", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        if (d.data) {
          setStats(d.data.stats);
          setMyAssets(d.data.myAssets ?? []);
          setGatePassList(d.data.gatePassList ?? []);
          setAlerts(d.data.alerts ?? []);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const alertBg = {
    danger: "bg-red-50 border-red-200 text-red-700",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-700",
    info: "bg-blue-50 border-blue-200 text-blue-700",
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">My Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome back, {user?.name ?? "User"}
        </p>
      </div>

      {!loading && alerts.length > 0 && (
        <div className="space-y-2">
          {alerts.map((a, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 border rounded-xl px-4 py-3 text-sm ${alertBg[a.severity]}`}
            >
              <AlertTriangle size={16} className="mt-0.5 shrink-0" />
              <div>
                <span className="font-semibold">{a.title}:</span> {a.message}
              </div>
            </div>
          ))}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl h-24 animate-pulse border border-gray-100"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard
            title="My Assets"
            value={stats.totalAssets}
            icon={<Monitor size={20} />}
            iconBg="bg-indigo-50"
            iconColor="text-indigo-600"
            sub="Currently assigned"
          />
          <StatCard
            title="Pending Requests"
            value={stats.pendingGatePasses}
            icon={<Clock size={20} />}
            iconBg="bg-yellow-50"
            iconColor="text-yellow-600"
            sub="Awaiting approval"
          />
          <StatCard
            title="Active Gate Passes"
            value={stats.activeGatePasses}
            icon={<ShieldCheck size={20} />}
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
            sub="Approved/Issued"
          />
          <StatCard
            title="Return Overdue"
            value={stats.returnDue}
            icon={<AlertTriangle size={20} />}
            iconBg="bg-red-50"
            iconColor="text-red-500"
            sub="Action required"
          />
        </div>
      )}

      <div className="grid xl:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">
                My Assigned Assets
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Assets currently allocated to you
              </p>
            </div>
            <button
              onClick={() => router.push("/end-user/assets")}
              className="flex items-center gap-1 text-xs text-indigo-500 hover:text-indigo-700 font-medium"
            >
              View All <ArrowUpRight size={13} />
            </button>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 rounded-lg bg-gray-100 animate-pulse"
                />
              ))}
            </div>
          ) : myAssets.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <Package size={32} className="mb-3 opacity-40" />
              <p className="text-sm">No assets assigned to you</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    {[
                      "Asset Tag",
                      "Device",
                      "Allocated",
                      "Expected Return",
                      "Warranty",
                      "Status",
                    ].map((c) => (
                      <th
                        key={c}
                        className="text-left text-xs font-semibold text-gray-400 uppercase pb-3 pr-4 whitespace-nowrap"
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {myAssets.map((a) => (
                    <tr
                      key={a._id}
                      className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 pr-4 font-semibold text-indigo-600 text-sm">
                        {a.assetTag}
                      </td>
                      <td className="py-3 pr-4 text-gray-700">
                        {a.device || a.assetType}
                      </td>
                      <td className="py-3 pr-4 text-gray-500 text-xs whitespace-nowrap">
                        {a.allocationDate}
                      </td>
                      <td className="py-3 pr-4 text-gray-500 text-xs whitespace-nowrap">
                        {a.expectedReturn || "Permanent"}
                      </td>
                      <td className="py-3 pr-4 text-gray-500 text-xs whitespace-nowrap">
                        {a.warrantyExpiry || "N/A"}
                      </td>
                      <td className="py-3">
                        <Badge label={a.status} color={statusColor(a.status)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">
                My Gate Passes
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Asset movement history for your devices
              </p>
            </div>
            <button
              onClick={() => router.push("/end-user/gate-pass")}
              className="flex items-center gap-1 text-xs text-indigo-500 hover:text-indigo-700 font-medium"
            >
              View All <ArrowUpRight size={13} />
            </button>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-12 rounded-xl bg-gray-100 animate-pulse"
                />
              ))}
            </div>
          ) : gatePassList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <ShieldCheck size={32} className="mb-3 opacity-40" />
              <p className="text-sm">No gate passes found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {gatePassList.slice(0, 5).map((gp) => (
                <div
                  key={gp._id}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white border border-gray-100 flex items-center justify-center">
                      <ShieldCheck size={14} className="text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {gp.gatePassId || "Gate Pass"} — {gp.assetTag}
                      </p>
                      <p className="text-xs text-gray-400">
                        {gp.purpose} · {gp.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-semibold border px-2 py-0.5 rounded ${gp.type === "OUT" ? "text-yellow-600 border-yellow-300 bg-yellow-50" : "text-blue-600 border-blue-300 bg-blue-50"}`}
                    >
                      {gp.type}
                    </span>
                    <Badge label={gp.status} color={statusColor(gp.status)} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-800 text-sm">
              Quick Actions
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Navigate to sections relevant to you
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            {
              label: "My Assets",
              icon: <Monitor size={20} />,
              path: "/end-user/assets",
              bg: "bg-indigo-50",
              color: "text-indigo-600",
            },
            {
              label: "Gate Passes",
              icon: <ShieldCheck size={20} />,
              path: "/end-user/gate-pass",
              bg: "bg-blue-50",
              color: "text-blue-600",
            },
            {
              label: "My Requests",
              icon: <Package size={20} />,
              path: "/end-user/requests",
              bg: "bg-purple-50",
              color: "text-purple-600",
            },
            {
              label: "Return History",
              icon: <RotateCcw size={20} />,
              path: "/end-user/assets",
              bg: "bg-green-50",
              color: "text-green-600",
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
              <span className="text-sm font-medium text-gray-700">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
