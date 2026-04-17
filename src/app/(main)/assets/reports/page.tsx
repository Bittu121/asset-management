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
    { key: "overview", label: "Overview", icon: "LayoutDashboard" },
    { key: "allocation", label: "Allocations", icon: "Link2" },
    { key: "gatepass", label: "Gate Passes", icon: "Ticket" },
    { key: "asset-status", label: "Asset Status", icon: "Package" },
    { key: "audit", label: "Audit Trail", icon: "ClipboardList" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />;
      case "allocation":
        return <AllocationReportTab />;
      case "gatepass":
        return <GatePassReportTab />;
      case "asset-status":
        return <AssetStatusTab />;
      case "audit":
        return <AuditTrailTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8fb] p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
            Reports & Analytics
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Monitor allocations, gate passes, asset movement and activity logs.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-500 shadow-sm">
          Last updated:{" "}
          <span className="font-medium text-gray-700">
            {new Date().toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center gap-1 px-3 pt-3 border-b border-gray-100 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative px-4 py-2.5 text-sm font-medium rounded-t-xl whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                <span>{tab.label}</span>

                {/* Active underline */}
                {isActive && (
                  <div className="absolute left-0 bottom-0 w-full h-[2px] bg-indigo-600 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
        <div className="p-5 bg-white">{renderContent()}</div>
      </div>
    </div>
  );
}

export default Reports;
