"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store/auth/store";
import { fetchDashboard } from "../../../store/dashboard/dashboardActions";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import {
  Package,
  ClipboardList,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Filter,
  Download,
  ChevronRight,
  Users,
  Activity,
  Zap,
} from "lucide-react";

type BadgeColor =
  | "green"
  | "red"
  | "yellow"
  | "blue"
  | "purple"
  | "gray"
  | "orange"
  | "teal";
const COLORS = [
  "#4f46e5",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
  "#8b5cf6",
];
const badgeClasses: Record<BadgeColor, string> = {
  green: "bg-green-50 text-green-600 border-green-200",
  red: "bg-red-50 text-red-500 border-red-200",
  yellow: "bg-yellow-50 text-yellow-600 border-yellow-200",
  blue: "bg-blue-50 text-blue-600 border-blue-200",
  purple: "bg-purple-50 text-purple-600 border-purple-200",
  gray: "bg-gray-50 text-gray-500 border-gray-200",
  orange: "bg-orange-50 text-orange-600 border-orange-200",
  teal: "bg-teal-50 text-teal-600 border-teal-200",
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
function Trend({ up, value }: { up: boolean; value: string }) {
  return (
    <span
      className={`flex items-center gap-0.5 text-xs font-medium ${up ? "text-green-500" : "text-red-500"}`}
    >
      {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
      {value}
    </span>
  );
}
function StatCard({
  title,
  value,
  icon,
  iconBg = "bg-indigo-50",
  iconColor = "text-indigo-600",
  trend,
  trendUp,
  sub,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBg?: string;
  iconColor?: string;
  trend?: string;
  trendUp?: boolean;
  sub?: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-start justify-between hover:shadow-md transition-shadow">
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide truncate">
          {title}
        </p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1 mb-1">{value}</h3>
        <div className="flex items-center gap-2 flex-wrap">
          {trend && <Trend up={!!trendUp} value={trend} />}
          {sub && <span className="text-xs text-gray-400">{sub}</span>}
        </div>
      </div>
      <div
        className={`w-11 h-11 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center flex-shrink-0 ml-3`}
      >
        {icon}
      </div>
    </div>
  );
}
function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-800 text-sm">{title}</h3>
          {subtitle && (
            <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
          )}
        </div>
        <button className="text-gray-300 hover:text-gray-500">
          <MoreHorizontal size={16} />
        </button>
      </div>
      <div className="h-60">{children}</div>
    </div>
  );
}
function SectionCard({
  title,
  subtitle,
  children,
  action,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-800 text-sm">{title}</h3>
          {subtitle && (
            <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
          )}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
function THead({ cols }: { cols: string[] }) {
  return (
    <thead>
      <tr className="border-b border-gray-100">
        {cols.map((c) => (
          <th
            key={c}
            className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-3 pr-4 whitespace-nowrap"
          >
            {c}
          </th>
        ))}
      </tr>
    </thead>
  );
}
function ProgressRow({
  label,
  value,
  max,
  color,
  count,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
  count: number | string;
}) {
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full shrink-0 ${color}`} />
          {label}
        </span>
        <span className="font-medium">{count}</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full">
        <div
          className={`h-1.5 rounded-full ${color}`}
          style={{
            width: `${Math.min((value / Math.max(max, 1)) * 100, 100)}%`,
          }}
        />
      </div>
    </div>
  );
}
function GradDef({ id, color }: { id: string; color: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor={color} stopOpacity={0.18} />
        <stop offset="95%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}
function TypeBadge({ type }: { type: string }) {
  return (
    <span
      className={`text-xs font-semibold border px-2 py-0.5 rounded ${type === "OUT" ? "text-yellow-600 border-yellow-300 bg-yellow-50" : "text-blue-600 border-blue-300 bg-blue-50"}`}
    >
      {type}
    </span>
  );
}
function statusColor(status: string): BadgeColor {
  switch (status) {
    case "ACTIVE":
    case "APPROVED":
    case "AVAILABLE":
      return "green";
    case "RETURNED":
      return "gray";
    case "OVERDUE":
    case "REJECTED":
      return "red";
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
function fmtVal(v: number) {
  if (v >= 100000) return `Rs.${(v / 100000).toFixed(1)}L`;
  if (v >= 1000) return `Rs.${(v / 1000).toFixed(0)}K`;
  return `Rs.${v.toLocaleString()}`;
}

export default function AdminDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.dashboard,
  );
  useEffect(() => {
    dispatch(fetchDashboard() as any);
  }, [dispatch]);

  if (loading || !data)
    return (
      <div className="min-h-screen bg-gray-50 p-6 space-y-6">
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl h-24 animate-pulse border border-gray-100"
            />
          ))}
        </div>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );

  const {
    stats,
    gatePassSummary,
    categoryBreakdown,
    monthlyTrend,
    assetTrend,
    recentAllocations,
    recentGatePasses,
    recentActivity,
  } = data;
  const pieData = categoryBreakdown.map((c) => ({
    name: c.category,
    value: c.count,
  }));
  const gpPieData = Object.entries(gatePassSummary).map(([name, value]) => ({
    name,
    value,
  }));
  const utilPct =
    stats.totalAssets > 0
      ? Math.round((stats.allocated / stats.totalAssets) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Assets"
          value={stats.totalAssets}
          icon={<Package size={20} />}
          sub="All registered"
          iconBg="bg-indigo-50"
          iconColor="text-indigo-600"
        />
        <StatCard
          title="Allocated"
          value={stats.allocated}
          icon={<ClipboardList size={20} />}
          trend={`${utilPct}% utilization`}
          trendUp
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Available"
          value={stats.available}
          icon={<CheckCircle2 size={20} />}
          sub="Ready for use"
          iconBg="bg-green-50"
          iconColor="text-green-600"
        />
        <StatCard
          title="Asset Value"
          value={fmtVal(stats.totalValue)}
          icon={<TrendingUp size={20} />}
          sub="Portfolio worth"
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Overdue Returns"
          value={stats.overdueAllocations}
          icon={<Clock size={20} />}
          trend={stats.overdueAllocations > 0 ? "Action needed" : "All on time"}
          trendUp={stats.overdueAllocations === 0}
          iconBg="bg-red-50"
          iconColor="text-red-500"
        />
        <StatCard
          title="Expired Warranty"
          value={stats.expiredWarranty}
          icon={<AlertTriangle size={20} />}
          sub="Needs renewal"
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
        />
        <StatCard
          title="Pending Gate Pass"
          value={stats.pendingGatePasses}
          icon={<ShieldCheck size={20} />}
          sub="Awaiting approval"
          iconBg="bg-yellow-50"
          iconColor="text-yellow-600"
        />
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<Users size={20} />}
          sub="Registered accounts"
          iconBg="bg-teal-50"
          iconColor="text-teal-600"
        />
      </div>

      <div className="grid xl:grid-cols-3 gap-5">
        <ChartCard
          title="Asset Category Distribution"
          subtitle="By device type"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={
                  pieData.length ? pieData : [{ name: "No data", value: 1 }]
                }
                cx="50%"
                cy="50%"
                outerRadius={85}
                innerRadius={38}
                dataKey="value"
                label={({ name, percent }: { name?: string; percent?: number }) =>
                  `${name ?? ""} ${((percent ?? 0) * 100).toFixed(0)}%`
                }
                labelLine={false}
              >
                {(pieData.length ? pieData : [{}]).map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
        <div className="xl:col-span-2">
          <ChartCard
            title="Monthly Allocation vs Returns"
            subtitle="Last 6 months"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyTrend} barSize={16}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend iconType="circle" iconSize={8} />
                <Bar
                  dataKey="allocated"
                  fill="#4f46e5"
                  radius={[6, 6, 0, 0]}
                  name="Allocated"
                />
                <Bar
                  dataKey="returned"
                  fill="#22c55e"
                  radius={[6, 6, 0, 0]}
                  name="Returned"
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>

      <div className="grid xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2">
          <ChartCard
            title="Asset Growth Trend"
            subtitle="Registered assets over time"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={assetTrend}>
                <GradDef id="assetGrad" color="#4f46e5" />
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#4f46e5"
                  strokeWidth={2.5}
                  fill="url(#assetGrad)"
                  name="Total Assets"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
        <ChartCard title="Gate Pass Status" subtitle="Current breakdown">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={gpPieData.filter((d) => d.value > 0)}
                cx="50%"
                cy="50%"
                outerRadius={85}
                innerRadius={38}
                dataKey="value"
                label={({ name }: { name?: string }) => name ?? ""}
                labelLine={false}
              >
                {gpPieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2">
          <SectionCard
            title="Recent Asset Allocations"
            subtitle="Latest assignments"
            action={
              <button className="flex items-center gap-1 text-xs text-indigo-500 hover:text-indigo-700 font-medium">
                View All <ChevronRight size={13} />
              </button>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <THead
                  cols={[
                    "Asset Tag",
                    "Device",
                    "Assigned To",
                    "Dept",
                    "Date",
                    "Status",
                  ]}
                />
                <tbody>
                  {recentAllocations.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-8 text-center text-gray-400 text-sm"
                      >
                        No allocations yet
                      </td>
                    </tr>
                  ) : (
                    recentAllocations.map((row) => (
                      <tr
                        key={row._id}
                        className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 pr-4 font-semibold text-indigo-600 text-sm">
                          {row.assetTag}
                        </td>
                        <td className="py-3 pr-4 text-gray-700">
                          {row.device || "?"}
                        </td>
                        <td className="py-3 pr-4 text-gray-600">
                          {row.allocatedTo}
                        </td>
                        <td className="py-3 pr-4 text-gray-500 text-xs">
                          {row.department || "?"}
                        </td>
                        <td className="py-3 pr-4 text-gray-400 text-xs whitespace-nowrap">
                          {row.allocationDate}
                        </td>
                        <td className="py-3">
                          <Badge
                            label={row.status}
                            color={statusColor(row.status)}
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>
        <SectionCard title="Recent Activity" subtitle="Latest asset events">
          {recentActivity.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">
              No activity yet
            </p>
          ) : (
            recentActivity.slice(0, 8).map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0"
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${item.type === "allocation" ? "bg-indigo-50" : "bg-yellow-50"}`}
                >
                  {item.type === "allocation" ? (
                    <Package size={14} className="text-indigo-500" />
                  ) : (
                    <ShieldCheck size={14} className="text-yellow-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700">
                    {item.action}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))
          )}
        </SectionCard>
      </div>

      <div className="grid xl:grid-cols-4 gap-5">
        <SectionCard title="Asset Status" subtitle="Current breakdown">
          <ProgressRow
            label="Allocated"
            value={stats.allocated}
            max={stats.totalAssets}
            color="bg-blue-500"
            count={stats.allocated}
          />
          <ProgressRow
            label="Available"
            value={stats.available}
            max={stats.totalAssets}
            color="bg-green-500"
            count={stats.available}
          />
          <ProgressRow
            label="Overdue"
            value={stats.overdueAllocations}
            max={stats.totalAssets}
            color="bg-red-400"
            count={stats.overdueAllocations}
          />
        </SectionCard>
        <SectionCard title="Warranty Status" subtitle="Expiry overview">
          <ProgressRow
            label="Valid"
            value={
              stats.totalAssets - stats.expiredWarranty - stats.expiringSoon
            }
            max={stats.totalAssets}
            color="bg-green-400"
            count={
              stats.totalAssets - stats.expiredWarranty - stats.expiringSoon
            }
          />
          <ProgressRow
            label="Expiring Soon"
            value={stats.expiringSoon}
            max={stats.totalAssets}
            color="bg-yellow-400"
            count={stats.expiringSoon}
          />
          <ProgressRow
            label="Expired"
            value={stats.expiredWarranty}
            max={stats.totalAssets}
            color="bg-red-400"
            count={stats.expiredWarranty}
          />
        </SectionCard>
        <SectionCard title="Gate Passes" subtitle="By status">
          {Object.entries(gatePassSummary).map(([label, count]) => {
            const c: Record<string, BadgeColor> = {
              PENDING: "yellow",
              APPROVED: "blue",
              ISSUED: "purple",
              RETURNED: "green",
              REJECTED: "red",
            };
            return (
              <div
                key={label}
                className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
              >
                <span className="text-sm text-gray-600">{label}</span>
                <Badge label={count} color={c[label] ?? "gray"} />
              </div>
            );
          })}
        </SectionCard>
        <SectionCard title="Quick Stats" subtitle="At a glance">
          {[
            {
              label: "Total Assets",
              val: stats.totalAssets,
              icon: <Package size={13} className="text-gray-400" />,
            },
            {
              label: "Utilization",
              val: `${utilPct}%`,
              icon: <Activity size={13} className="text-gray-400" />,
            },
            {
              label: "Total Users",
              val: stats.totalUsers,
              icon: <Users size={13} className="text-gray-400" />,
            },
            {
              label: "Overdue",
              val: stats.overdueAllocations,
              icon: <Clock size={13} className="text-gray-400" />,
            },
            {
              label: "Warranty Issues",
              val: stats.expiredWarranty + stats.expiringSoon,
              icon: <Zap size={13} className="text-gray-400" />,
            },
          ].map(({ label, val, icon }) => (
            <div
              key={label}
              className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
            >
              <span className="flex items-center gap-2 text-sm text-gray-500">
                {icon}
                {label}
              </span>
              <span className="text-sm font-bold text-gray-800">{val}</span>
            </div>
          ))}
        </SectionCard>
      </div>

      <SectionCard
        title="Gate Pass Records"
        subtitle="All recent asset movements"
        action={
          <div className="flex gap-2">
            <button className="flex items-center gap-1 text-xs border border-gray-200 px-3 py-1.5 rounded-lg text-gray-500 hover:bg-gray-50">
              <Filter size={11} /> Filter
            </button>
            <button className="flex items-center gap-1 text-xs border border-gray-200 px-3 py-1.5 rounded-lg text-gray-500 hover:bg-gray-50">
              <Download size={11} /> Export
            </button>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <THead
              cols={[
                "Gate Pass #",
                "Asset",
                "Type",
                "Purpose",
                "Carrier",
                "Requested By",
                "Status",
                "Date",
              ]}
            />
            <tbody>
              {recentGatePasses.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="py-8 text-center text-gray-400 text-sm"
                  >
                    No gate passes yet
                  </td>
                </tr>
              ) : (
                recentGatePasses.map((gp) => (
                  <tr
                    key={gp._id}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 pr-4 font-semibold text-indigo-600">
                      {gp.gatePassId || "?"}
                    </td>
                    <td className="py-3 pr-4">
                      <div className="font-medium text-gray-700">
                        {gp.assetTag}
                      </div>
                      <div className="text-xs text-gray-400">
                        {gp.assetModel}
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <TypeBadge type={gp.type} />
                    </td>
                    <td className="py-3 pr-4 text-gray-600">{gp.purpose}</td>
                    <td className="py-3 pr-4 text-gray-500">
                      {gp.carrierName || "?"}
                    </td>
                    <td className="py-3 pr-4 text-gray-500 text-xs">
                      {gp.requestedBy}
                    </td>
                    <td className="py-3 pr-4">
                      <Badge label={gp.status} color={statusColor(gp.status)} />
                    </td>
                    <td className="py-3 text-gray-400 text-xs whitespace-nowrap">
                      {gp.date}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
