"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/auth/store";
import { FiPackage, FiLink, FiCheckCircle, FiDollarSign, FiClipboard } from "react-icons/fi";
import { StatCard, SectionHeader } from "./SharedComponents";
import Pagination from "../../../components/common/Pagination";

const ITEMS_PER_PAGE = 4;

function paginate<T>(data: T[], page: number): T[] {
  const start = (page - 1) * ITEMS_PER_PAGE;
  return data.slice(start, start + ITEMS_PER_PAGE);
}

export default function OverviewTab() {
  const [gatePage, setGatePage] = useState(1);
  const [categoryPage, setCategoryPage] = useState(1);
  const [activityPage, setActivityPage] = useState(1);

  const overview = useSelector((state: RootState) => state.reports.data?.overview);

  if (!overview) return null;

  const {
    totalAssets,
    allocated,
    available,
    totalValue,
    gatePassSummary,
    categoryBreakdown,
    recentActivity,
  } = overview;

  const gatePassData = Object.entries(gatePassSummary).map(([label, count]) => ({
    label,
    count,
    color:
      label === "PENDING"
        ? "bg-amber-300"
        : label === "APPROVED"
          ? "bg-sky-400"
          : label === "ISSUED"
            ? "bg-violet-400"
            : label === "RETURNED"
              ? "bg-emerald-400"
              : "bg-rose-400",
  }));

  const totalGatePasses = Object.values(gatePassSummary).reduce((s, n) => s + n, 0);

  const cardClass = "bg-white border border-gray-200 rounded-2xl flex flex-col min-h-[320px]";

  return (
    <div className="space-y-6">
      {/* KPI stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Total Assets"
          value={totalAssets}
          sub="All registered assets"
          color="bg-indigo-50 text-indigo-500"
          icon={<FiPackage size={22} />}
        />
        <StatCard
          label="Allocated"
          value={allocated}
          sub={
            totalAssets > 0
              ? `${((allocated / totalAssets) * 100).toFixed(0)}% utilized`
              : "0% utilized"
          }
          color="bg-orange-50 text-orange-500"
          icon={<FiLink size={22} />}
        />
        <StatCard
          label="Available"
          value={available}
          sub="Ready for use"
          color="bg-emerald-50 text-emerald-500"
          icon={<FiCheckCircle size={22} />}
        />
        <StatCard
          label="Asset Value"
          value={
            totalValue >= 1000
              ? `₹${(totalValue / 1000).toFixed(0)}K`
              : `₹${totalValue.toLocaleString()}`
          }
          sub="Inventory worth"
          color="bg-violet-50 text-violet-500"
          icon={<FiDollarSign size={22} />}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 items-stretch">
        {/* Gate Pass summary */}
        <div className={cardClass}>
          <div className="p-6 flex-1">
            <SectionHeader title="Gate Pass Summary" subtitle="Status overview" />
            <div className="space-y-5 mt-5">
              {paginate(gatePassData, gatePage).map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">{item.label}</span>
                    <span className="font-medium text-gray-700">{item.count}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`${item.color} h-full rounded-full`}
                      style={{
                        width:
                          totalGatePasses > 0 ? `${(item.count / totalGatePasses) * 100}%` : "0%",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-gray-100 px-6 py-4 mt-auto">
            <Pagination
              currentPage={gatePage}
              totalPages={Math.ceil(gatePassData.length / ITEMS_PER_PAGE)}
              onPageChange={setGatePage}
            />
          </div>
        </div>

        {/* Assets by category */}
        <div className={cardClass}>
          <div className="p-6 flex-1">
            <SectionHeader title="Assets by Category" subtitle="Inventory split" />
            <div className="space-y-5 mt-5">
              {paginate(categoryBreakdown, categoryPage).map((item) => (
                <div key={item.category}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">{item.category}</span>
                    <span className="font-medium text-gray-700">{item.count}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-300 h-full rounded-full"
                      style={{
                        width: totalAssets > 0 ? `${(item.count / totalAssets) * 100}%` : "0%",
                      }}
                    />
                  </div>
                </div>
              ))}
              {categoryBreakdown.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">No data</p>
              )}
            </div>
          </div>
          <div className="border-t border-gray-100 px-6 py-4 mt-auto">
            <Pagination
              currentPage={categoryPage}
              totalPages={Math.ceil(categoryBreakdown.length / ITEMS_PER_PAGE)}
              onPageChange={setCategoryPage}
            />
          </div>
        </div>

        {/* Recent activity */}
        <div className={cardClass}>
          <div className="p-6 flex-1">
            <SectionHeader title="Recent Activity" subtitle="Latest internal logs" />
            <div className="space-y-3 mt-5">
              {paginate(recentActivity, activityPage).map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-2xl hover:bg-gray-50">
                  <div className="w-10 h-10 rounded-2xl bg-violet-50 text-violet-500 flex items-center justify-center shrink-0">
                    <FiClipboard size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">{item.action}</p>
                    <p className="text-xs text-gray-500 truncate">{item.detail}</p>
                  </div>
                </div>
              ))}
              {recentActivity.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">No activity yet</p>
              )}
            </div>
          </div>
          <div className="border-t border-gray-100 px-6 py-4 mt-auto">
            <Pagination
              currentPage={activityPage}
              totalPages={Math.ceil(recentActivity.length / ITEMS_PER_PAGE)}
              onPageChange={setActivityPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
