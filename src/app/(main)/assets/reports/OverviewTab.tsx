"use client";

import { useState } from "react";
import {
  FiPackage,
  FiLink,
  FiCheckCircle,
  FiDollarSign,
  FiClipboard,
} from "react-icons/fi";
import { SAMPLE_ASSETS, SAMPLE_GATE_PASSES, AUDIT_LOG } from "./sampleData";
import { StatCard, SectionHeader } from "./SharedComponents";
import Pagination from "../../../components/common/Pagination";

const ITEMS_PER_PAGE = 4;

export default function OverviewTab() {
  const [gatePage, setGatePage] = useState(1);
  const [categoryPage, setCategoryPage] = useState(1);
  const [activityPage, setActivityPage] = useState(1);

  const totalAssets = SAMPLE_ASSETS.length;
  const allocated = SAMPLE_ASSETS.filter(
    (a) => a.status === "ALLOCATED",
  ).length;
  const available = SAMPLE_ASSETS.filter(
    (a) => a.status === "AVAILABLE",
  ).length;

  let totalValue = 0;
  for (const asset of SAMPLE_ASSETS) totalValue += asset.value;

  const gatePassData = [
    {
      label: "Pending",
      count: SAMPLE_GATE_PASSES.filter((g) => g.status === "PENDING").length,
      color: "bg-amber-300",
    },
    {
      label: "Approved",
      count: SAMPLE_GATE_PASSES.filter((g) => g.status === "APPROVED").length,
      color: "bg-sky-400",
    },
    {
      label: "Issued",
      count: SAMPLE_GATE_PASSES.filter((g) => g.status === "ISSUED").length,
      color: "bg-violet-400",
    },
    {
      label: "Returned",
      count: SAMPLE_GATE_PASSES.filter((g) => g.status === "RETURNED").length,
      color: "bg-emerald-400",
    },
    {
      label: "Rejected",
      count: SAMPLE_GATE_PASSES.filter((g) => g.status === "REJECTED").length,
      color: "bg-rose-400",
    },
  ];

  const categories = Array.from(
    new Set(SAMPLE_ASSETS.map((item) => item.category)),
  );
  const categoryData = categories.map((cat) => ({
    cat,
    count: SAMPLE_ASSETS.filter((a) => a.category === cat).length,
  }));

  const activityData = AUDIT_LOG.slice(0, 8);

  // Returns a slice of an array for the current page
  function paginate<T>(data: T[], page: number): T[] {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return data.slice(start, start + ITEMS_PER_PAGE);
  }

  const cardClass =
    "bg-white border border-gray-200 rounded-2xl flex flex-col min-h-[320px]";

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
          sub={`${((allocated / totalAssets) * 100).toFixed(0)}% utilized`}
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
          value={`₹${(totalValue / 1000).toFixed(0)}K`}
          sub="Inventory worth"
          color="bg-violet-50 text-violet-500"
          icon={<FiDollarSign size={22} />}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 items-stretch">
        {/* Gate Pass summary */}
        <div className={cardClass}>
          <div className="p-6 flex-1">
            <SectionHeader
              title="Gate Pass Summary"
              subtitle="Status overview"
            />
            <div className="space-y-5 mt-5">
              {paginate(gatePassData, gatePage).map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">{item.label}</span>
                    <span className="font-medium text-gray-700">
                      {item.count}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`${item.color} h-full rounded-full`}
                      style={{
                        width: `${(item.count / SAMPLE_GATE_PASSES.length) * 100}%`,
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
            <SectionHeader
              title="Assets by Category"
              subtitle="Inventory split"
            />
            <div className="space-y-5 mt-5">
              {paginate(categoryData, categoryPage).map((item) => (
                <div key={item.cat}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">{item.cat}</span>
                    <span className="font-medium text-gray-700">
                      {item.count}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-300 h-full rounded-full"
                      style={{ width: `${(item.count / totalAssets) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-gray-100 px-6 py-4 mt-auto">
            <Pagination
              currentPage={categoryPage}
              totalPages={Math.ceil(categoryData.length / ITEMS_PER_PAGE)}
              onPageChange={setCategoryPage}
            />
          </div>
        </div>

        {/* Recent activity */}
        <div className={cardClass}>
          <div className="p-6 flex-1">
            <SectionHeader
              title="Recent Activity"
              subtitle="Latest internal logs"
            />
            <div className="space-y-3 mt-5">
              {paginate(activityData, activityPage).map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 p-3 rounded-2xl hover:bg-gray-50"
                >
                  <div className="w-10 h-10 rounded-2xl bg-violet-50 text-violet-500 flex items-center justify-center shrink-0">
                    <FiClipboard size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">
                      {item.action}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-gray-100 px-6 py-4 mt-auto">
            <Pagination
              currentPage={activityPage}
              totalPages={Math.ceil(activityData.length / ITEMS_PER_PAGE)}
              onPageChange={setActivityPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
