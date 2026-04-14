"use client";
import React from "react";
import {
  SAMPLE_ASSETS,
  SAMPLE_ALLOCATIONS,
  SAMPLE_GATE_PASSES,
  AUDIT_LOG,
} from "./sampleData";
import { StatCard, SectionHeader } from "./SharedComponents";

const OverviewTab: React.FC = () => {
  const totalAssets = SAMPLE_ASSETS.length;
  const allocated = SAMPLE_ASSETS.filter(
    (a) => a.status === "ALLOCATED",
  ).length;
  const available = SAMPLE_ASSETS.filter(
    (a) => a.status === "AVAILABLE",
  ).length;
  const totalValue = SAMPLE_ASSETS.reduce((s, a) => s + a.value, 0);
  const activeAllocations = SAMPLE_ALLOCATIONS.filter(
    (a) => a.status === "ACTIVE",
  ).length;
  const overdueAllocations = SAMPLE_ALLOCATIONS.filter(
    (a) => a.status === "OVERDUE",
  ).length;
  const returnedAllocations = SAMPLE_ALLOCATIONS.filter(
    (a) => a.status === "RETURNED",
  ).length;
  const pendingGP = SAMPLE_GATE_PASSES.filter(
    (g) => g.status === "PENDING",
  ).length;
  const approvedGP = SAMPLE_GATE_PASSES.filter(
    (g) => g.status === "APPROVED",
  ).length;
  const issuedGP = SAMPLE_GATE_PASSES.filter(
    (g) => g.status === "ISSUED",
  ).length;

  const categories = Array.from(new Set(SAMPLE_ASSETS.map((a) => a.category)));
  const categoryData = categories.map((cat) => ({
    cat,
    count: SAMPLE_ASSETS.filter((a) => a.category === cat).length,
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Assets"
          value={totalAssets}
          sub="All registered assets"
          color="bg-indigo-100 text-indigo-600"
          icon="📦"
        />
        <StatCard
          label="Allocated"
          value={allocated}
          sub={`${((allocated / totalAssets) * 100).toFixed(0)}% of total`}
          color="bg-orange-100 text-orange-600"
          icon="🔗"
        />
        <StatCard
          label="Available"
          value={available}
          sub="Ready to allocate"
          color="bg-green-100 text-green-600"
          icon="✅"
        />
        <StatCard
          label="Total Value"
          value={`₹${(totalValue / 1000).toFixed(0)}K`}
          sub="Portfolio value"
          color="bg-purple-100 text-purple-600"
          icon="💰"
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Active Allocations"
          value={activeAllocations}
          color="bg-blue-100 text-blue-600"
          icon="📋"
        />
        <StatCard
          label="Overdue Returns"
          value={overdueAllocations}
          color="bg-red-100 text-red-600"
          icon="⚠️"
        />
        <StatCard
          label="Returned"
          value={returnedAllocations}
          color="bg-gray-100 text-gray-600"
          icon="↩️"
        />
        <StatCard
          label="Pending Gate Passes"
          value={pendingGP}
          color="bg-yellow-100 text-yellow-600"
          icon="🎫"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <SectionHeader
            title="Gate Pass Summary"
            subtitle="Current status distribution"
          />
          <div className="space-y-3 mt-2">
            {[
              {
                label: "Pending",
                count: pendingGP,
                color: "bg-yellow-400",
                total: SAMPLE_GATE_PASSES.length,
              },
              {
                label: "Approved",
                count: approvedGP,
                color: "bg-blue-400",
                total: SAMPLE_GATE_PASSES.length,
              },
              {
                label: "Issued",
                count: issuedGP,
                color: "bg-purple-400",
                total: SAMPLE_GATE_PASSES.length,
              },
              {
                label: "Returned",
                count: SAMPLE_GATE_PASSES.filter((g) => g.status === "RETURNED")
                  .length,
                color: "bg-green-400",
                total: SAMPLE_GATE_PASSES.length,
              },
              {
                label: "Rejected",
                count: SAMPLE_GATE_PASSES.filter((g) => g.status === "REJECTED")
                  .length,
                color: "bg-red-400",
                total: SAMPLE_GATE_PASSES.length,
              },
            ].map(({ label, count, color, total }) => (
              <div key={label}>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>{label}</span>
                  <span className="font-semibold text-gray-700">{count}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`${color} h-2 rounded-full transition-all`}
                    style={{ width: `${total ? (count / total) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <SectionHeader
            title="Assets by Category"
            subtitle="Distribution across categories"
          />
          <div className="space-y-3 mt-2">
            {categoryData.map(({ cat, count }) => (
              <div key={cat}>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>{cat}</span>
                  <span className="font-semibold text-gray-700">{count}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-indigo-400 h-2 rounded-full transition-all"
                    style={{ width: `${(count / totalAssets) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <SectionHeader
          title="Recent Activity"
          subtitle="Latest 5 audit entries"
        />
        <div className="space-y-2">
          {AUDIT_LOG.slice(0, 5).map((entry) => (
            <div
              key={entry.id}
              className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${
                  entry.type === "allocation"
                    ? "bg-blue-100 text-blue-600"
                    : entry.type === "return"
                      ? "bg-green-100 text-green-600"
                      : "bg-purple-100 text-purple-600"
                }`}
              >
                {entry.type === "allocation"
                  ? "🔗"
                  : entry.type === "return"
                    ? "↩"
                    : "🎫"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800">
                  {entry.action}
                </p>
                <p className="text-xs text-gray-400 truncate">{entry.detail}</p>
              </div>
              <span className="text-xs text-gray-400 shrink-0">
                {entry.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
