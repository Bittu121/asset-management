"use client";
import React, { useState } from "react";
import OverviewTab from "./OverviewTab";
import AllocationReportTab from "./AllocationReportTab";
import GatePassReportTab from "./GatePassReportTab";
import AssetStatusTab from "./AssetStatusTab";
import AuditTrailTab from "./AuditTrailTab";

type ReportTab =
  | "overview"
  | "allocation"
  | "gatepass"
  | "asset-status"
  | "audit";

function Reports() {
  const [activeTab, setActiveTab] = useState<ReportTab>("overview");

  const tabs: { key: ReportTab; label: string; icon: string }[] = [
    { key: "overview", label: "Overview", icon: "📊" },
    { key: "allocation", label: "Allocations", icon: "🔗" },
    { key: "gatepass", label: "Gate Passes", icon: "🎫" },
    { key: "asset-status", label: "Asset Status", icon: "📦" },
    { key: "audit", label: "Audit Trail", icon: "📋" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Page Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Reports & Analytics
          </h1>
          <p className="text-gray-400 text-sm mt-0.5">
            Detailed insights across asset allocation, gate passes, and
            activities
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400 bg-white border border-gray-200 px-3 py-2 rounded-lg">
          <span>🕒</span>
          <span>
            Last updated:{" "}
            {new Date().toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-6 overflow-x-auto shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.key
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && <OverviewTab />}
      {activeTab === "allocation" && <AllocationReportTab />}
      {activeTab === "gatepass" && <GatePassReportTab />}
      {activeTab === "asset-status" && <AssetStatusTab />}
      {activeTab === "audit" && <AuditTrailTab />}
    </div>
  );
}

export default Reports;

// your-project/
// ├── app/
// │   └── reports/
// │       └── page.tsx                    (Main component)
// ├── components/
// │   └── reports/
// │       ├── SharedComponents.tsx        (StatCard, Badge, SectionHeader)
// │       ├── OverviewTab.tsx
// │       ├── AllocationReportTab.tsx
// │       ├── GatePassReportTab.tsx
// │       ├── AssetStatusTab.tsx
// │       └── AuditTrailTab.tsx
// ├── data/
// │   └── sampleData.ts                   (All sample data)
// └── utils/
//     └── exportCSV.ts                    (CSV export utility)
