"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/auth/store";
import { fetchAssets } from "@/store/assets/assetsActions";
import { fetchAllocations } from "@/store/allocations/allocationActions";
import {
  CubeIcon,
  CheckCircleIcon,
  XCircleIcon,
  CurrencyRupeeIcon,
  UserCircleIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  ClockIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

// Types
type StatCard = {
  title: string;
  value: string | number;
  icon: any;
  iconBg: string;
  iconColor: string;
};

type QuickAction = {
  label: string;
  route: string;
  variant: "primary" | "secondary" | "tertiary" | "outline";
};

type StatusItem = {
  label: string;
  value: number;
  color: string;
  percentage: number;
};

type WarrantyItem = {
  label: string;
  value: number;
  badgeColor: string;
};

type DistItem = { label: string; value: number };

// Format a number as Indian-style currency
const formatINR = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;
const pct = (value: number, total: number) => (total > 0 ? Math.round((value / total) * 100) : 0);

// Component: Stat Card
function StatCard({ card }: { card: StatCard }) {
  const Icon = card.icon;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-500 font-medium mb-1">{card.title}</p>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{card.value}</h3>
        </div>
        <div className={`${card.iconBg} p-2 rounded-lg`}>
          <Icon className={`w-5 h-5 ${card.iconColor}`} />
        </div>
      </div>
    </div>
  );
}

// Component: Quick Action Button
function QuickActionBtn({ action, onClick }: { action: QuickAction; onClick: () => void }) {
  const variants = {
    primary: "bg-slate-700 hover:bg-slate-800 text-white border-slate-700",
    secondary: "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200",
    tertiary: "bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200",
    outline: "bg-white hover:bg-gray-50 text-gray-700 border-gray-300",
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2.5 text-sm font-medium rounded-lg border transition-colors duration-200 ${variants[action.variant]}`}
    >
      {action.label}
    </button>
  );
}

// Component: Progress Bar
function ProgressBar({ percentage, color }: { percentage: number; color: string }) {
  return (
    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
      <div
        className={`h-full ${color} transition-all duration-300`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

// Component: Status Breakdown Card
function StatusBreakdown({ items }: { items: StatusItem[] }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-gray-700">Status Breakdown</h3>
        <ChartBarIcon className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${item.color}`} />
                <span className="text-sm text-gray-700 font-medium">{item.label}</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{item.value}</span>
            </div>
            <ProgressBar percentage={item.percentage} color={item.color} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Component: Warranty Status Card
function WarrantyStatus({ items }: { items: WarrantyItem[] }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-gray-700">Warranty Status</h3>
        <ClockIcon className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
          >
            <span className="text-sm text-gray-700">{item.label}</span>
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${item.badgeColor}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Component: Distribution Card (By Category / By Type)
function DistributionCard({ title, items, icon: Icon }: { title: string; items: DistItem[]; icon: any }) {
  const max = items.reduce((m, i) => Math.max(m, i.value), 0) || 1;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-gray-700">{title}</h3>
        <Icon className="w-5 h-5 text-gray-400" />
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-gray-400">No data yet</p>
      ) : (
        <div className="space-y-3">
          {items.slice(0, 6).map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-gray-700 truncate pr-2">{item.label}</span>
                <span className="text-sm font-semibold text-gray-900">{item.value}</span>
              </div>
              <ProgressBar percentage={(item.value / max) * 100} color="bg-slate-600" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Component: Value Overview Card
function ValueOverview({
  totalPurchase,
  currentValue,
  depreciation,
  depreciationPct,
}: {
  totalPurchase: number;
  currentValue: number;
  depreciation: number;
  depreciationPct: number;
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-base font-semibold text-gray-900 mb-5">Asset Value Overview</h3>

      <div className="grid grid-cols-2 gap-6 mb-5">
        <div>
          <p className="text-xs text-gray-500 mb-1">Total Purchase</p>
          <h4 className="text-xl font-semibold text-gray-600">{formatINR(totalPurchase)}</h4>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Current Value</p>
          <h4 className="text-xl font-semibold text-gray-700">{formatINR(currentValue)}</h4>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Total Depreciation</span>
          <div className="text-right">
            <span className="text-lg font-semibold text-red-600">{formatINR(depreciation)}</span>
            <span className="text-xs text-red-500 ml-2">({depreciationPct.toFixed(1)}%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component: Assignment Overview Card
function AssignmentOverview({
  assigned,
  unassigned,
  total,
}: {
  assigned: number;
  unassigned: number;
  total: number;
}) {
  const assignedPct = pct(assigned, total);
  const unassignedPct = pct(unassigned, total);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-base font-semibold text-gray-900 mb-5">Assignment Overview</h3>

      <div className="grid grid-cols-2 gap-6 mb-5">
        <div>
          <p className="text-xs text-gray-500 mb-1">Assigned</p>
          <h4 className="text-xl font-semibold text-gray-700">{assigned}</h4>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Unassigned</p>
          <h4 className="text-xl font-semibold text-gray-700">{unassigned}</h4>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-gray-600">Assigned</span>
            <span className="text-xs font-semibold text-slate-700">{assignedPct}%</span>
          </div>
          <ProgressBar percentage={assignedPct} color="bg-slate-600" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-gray-600">Unassigned</span>
            <span className="text-xs font-semibold text-gray-600">{unassignedPct}%</span>
          </div>
          <ProgressBar percentage={unassignedPct} color="bg-gray-400" />
        </div>
      </div>
    </div>
  );
}

// Main Dashboard Component
function Dashboard() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { assets, loading } = useSelector((state: RootState) => state.assets);
  const { allocations } = useSelector((state: RootState) => state.allocations);

  useEffect(() => {
    dispatch(fetchAssets());
    dispatch(fetchAllocations());
  }, [dispatch]);

  // Derive every metric from real assets + allocations
  const m = useMemo(() => {
    const total = assets.length;
    const active = assets.filter((a) => a.isActive).length;
    const inactive = total - active;

    // Assets that currently have an ACTIVE allocation
    const activeAllocatedIds = new Set(
      allocations.filter((a) => a.status === "ACTIVE").map((a) => a.asset?._id)
    );
    const assigned = assets.filter((a) => activeAllocatedIds.has(a._id)).length;
    const unassigned = total - assigned;

    const num = (v: string) => parseFloat(v || "0") || 0;
    const totalPurchase = assets.reduce((s, a) => s + num(a.purchaseCost), 0);
    const currentValue = assets.reduce((s, a) => s + num(a.currentValue || a.purchaseCost), 0);
    const depreciation = totalPurchase - currentValue;
    const depreciationPct = totalPurchase > 0 ? (depreciation / totalPurchase) * 100 : 0;

    // Warranty buckets
    const today = new Date().toISOString().split("T")[0];
    const in30 = new Date();
    in30.setDate(in30.getDate() + 30);
    const in30Str = in30.toISOString().split("T")[0];
    let valid = 0,
      expiringSoon = 0,
      expired = 0,
      noWarranty = 0;
    for (const a of assets) {
      if (!a.warrantyExpiry) noWarranty++;
      else if (a.warrantyExpiry < today) expired++;
      else if (a.warrantyExpiry <= in30Str) expiringSoon++;
      else valid++;
    }

    // Category & type distribution
    const groupBy = (getName: (a: (typeof assets)[number]) => string): DistItem[] => {
      const map: Record<string, number> = {};
      for (const a of assets) {
        const name = getName(a);
        map[name] = (map[name] ?? 0) + 1;
      }
      return Object.entries(map)
        .map(([label, value]) => ({ label, value }))
        .sort((x, y) => y.value - x.value);
    };
    const categoryItems = groupBy((a) => a.category?.name || "Uncategorized");
    const typeItems = groupBy((a) => a.assetType?.name || "Untyped");

    return {
      total,
      active,
      inactive,
      assigned,
      unassigned,
      totalPurchase,
      currentValue,
      depreciation,
      depreciationPct,
      valid,
      expiringSoon,
      expired,
      noWarranty,
      categoryItems,
      typeItems,
    };
  }, [assets, allocations]);

  const statCards: StatCard[] = [
    {
      title: "Total Assets",
      value: m.total,
      icon: CubeIcon,
      iconBg: "bg-slate-100",
      iconColor: "text-slate-700",
    },
    {
      title: "Active Assets",
      value: m.active,
      icon: CheckCircleIcon,
      iconBg: "bg-green-100",
      iconColor: "text-green-700",
    },
    {
      title: "Inactive",
      value: m.inactive,
      icon: XCircleIcon,
      iconBg: "bg-gray-100",
      iconColor: "text-gray-700",
    },
    {
      title: "Current Value",
      value: formatINR(m.currentValue),
      icon: CurrencyRupeeIcon,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-700",
    },
    {
      title: "Assigned",
      value: m.assigned,
      icon: UserCircleIcon,
      iconBg: "bg-slate-100",
      iconColor: "text-slate-700",
    },
    {
      title: "Expired Warranty",
      value: m.expired,
      icon: ExclamationTriangleIcon,
      iconBg: "bg-red-100",
      iconColor: "text-red-700",
    },
  ];

  const quickActions: QuickAction[] = [
    { label: "Add Asset", route: "/assets/asset", variant: "primary" },
    { label: "Asset Allocation", route: "/assets/asset-allocation", variant: "secondary" },
    { label: "Bulk Upload", route: "/assets/asset-bulk-upload", variant: "tertiary" },
    { label: "Gate Pass", route: "/assets/asset-gate-pass", variant: "outline" },
  ];

  const statusItems: StatusItem[] = [
    { label: "Active", value: m.active, color: "bg-green-500", percentage: pct(m.active, m.total) },
    {
      label: "Inactive",
      value: m.inactive,
      color: "bg-gray-400",
      percentage: pct(m.inactive, m.total),
    },
    {
      label: "Assigned",
      value: m.assigned,
      color: "bg-blue-500",
      percentage: pct(m.assigned, m.total),
    },
    {
      label: "Available",
      value: m.unassigned,
      color: "bg-amber-500",
      percentage: pct(m.unassigned, m.total),
    },
  ];

  const warrantyItems: WarrantyItem[] = [
    {
      label: "Valid",
      value: m.valid,
      badgeColor: "bg-green-50 text-green-700 border border-green-200",
    },
    {
      label: "Expiring Soon",
      value: m.expiringSoon,
      badgeColor: "bg-amber-50 text-amber-700 border border-amber-200",
    },
    {
      label: "Expired",
      value: m.expired,
      badgeColor: "bg-red-50 text-red-700 border border-red-200",
    },
    {
      label: "No Warranty",
      value: m.noWarranty,
      badgeColor: "bg-gray-50 text-gray-700 border border-gray-200",
    },
  ];

  if (loading && assets.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-slate-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Asset Management Dashboard</h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {quickActions.map((action, index) => (
              <QuickActionBtn
                key={index}
                action={action}
                onClick={() => router.push(action.route)}
              />
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {statCards.map((card, index) => (
            <StatCard key={index} card={card} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatusBreakdown items={statusItems} />
          <WarrantyStatus items={warrantyItems} />
          <DistributionCard title="By Category" items={m.categoryItems} icon={ChartBarIcon} />
          <DistributionCard title="By Type" items={m.typeItems} icon={TagIcon} />
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ValueOverview
            totalPurchase={m.totalPurchase}
            currentValue={m.currentValue}
            depreciation={m.depreciation}
            depreciationPct={m.depreciationPct}
          />
          <AssignmentOverview assigned={m.assigned} unassigned={m.unassigned} total={m.total} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
