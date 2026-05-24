"use client";

import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/auth/store";
import { FiLink, FiRotateCcw, FiFileText, FiSearch } from "react-icons/fi";
import { StatCard, SectionHeader, Badge } from "./SharedComponents";
import { exportToCSV } from "./exportToCSV";
import Pagination from "../../../components/common/Pagination";

const ROWS_PER_PAGE = 4;

const TYPE_ICON: Record<string, ReactNode> = {
  allocation: <FiLink size={16} />,
  return: <FiRotateCcw size={16} />,
  gatepass: <FiFileText size={16} />,
};

const TYPE_COLOR: Record<string, string> = {
  allocation: "bg-blue-100 text-blue-600",
  return: "bg-green-100 text-green-600",
  gatepass: "bg-purple-100 text-purple-600",
};

export default function AuditTrailTab() {
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const auditTrail = useSelector(
    (state: RootState) => state.reports.data?.auditTrail,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [typeFilter, search]);

  if (!auditTrail) return null;

  const { summary, records } = auditTrail;

  const filteredEntries = records.filter((entry) => {
    const matchesType = typeFilter === "ALL" || entry.type === typeFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      entry.action.toLowerCase().includes(q) ||
      entry.detail.toLowerCase().includes(q) ||
      entry.user.toLowerCase().includes(q);
    return matchesType && matchesSearch;
  });

  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const currentPageItems = filteredEntries.slice(
    startIndex,
    startIndex + ROWS_PER_PAGE,
  );
  const totalPages = Math.ceil(filteredEntries.length / ROWS_PER_PAGE);

  function handleExport() {
    const rows = filteredEntries.map((entry) => [
      entry.action,
      entry.detail,
      entry.user,
      entry.date,
      entry.type,
    ]);
    exportToCSV("audit-trail", rows, [
      "Action",
      "Detail",
      "User",
      "Date",
      "Type",
    ]);
  }

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          label="Allocation Events"
          value={summary.allocation}
          color="bg-blue-100 text-blue-600"
          icon={<FiLink size={22} />}
        />
        <StatCard
          label="Return Events"
          value={summary.return}
          color="bg-green-100 text-green-600"
          icon={<FiRotateCcw size={22} />}
        />
        <StatCard
          label="Gate Pass Events"
          value={summary.gatepass}
          color="bg-purple-100 text-purple-600"
          icon={<FiFileText size={22} />}
        />
      </div>

      {/* Audit log */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <SectionHeader
          title="Full Audit Trail"
          subtitle="Complete activity log"
          onExport={handleExport}
        />

        <div className="flex gap-3 mb-4">
          <div className="relative flex-1">
            <FiSearch
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="Search actions, assets, users…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="ALL">All Types</option>
            <option value="allocation">Allocation</option>
            <option value="return">Return</option>
            <option value="gatepass">Gate Pass</option>
          </select>
        </div>

        <div className="space-y-2">
          {filteredEntries.length === 0 && (
            <p className="text-center text-sm text-gray-400 py-8">
              No audit entries found.
            </p>
          )}

          {currentPageItems.map((entry, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition"
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${TYPE_COLOR[entry.type] ?? "bg-gray-100 text-gray-600"}`}
              >
                {TYPE_ICON[entry.type]}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-gray-800">
                    {entry.action}
                  </p>
                  <Badge label={entry.type} type={entry.type} />
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{entry.detail}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  By: {entry.user}
                </p>
              </div>

              <span className="text-xs text-gray-400 shrink-0 mt-1">
                {entry.date}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 px-6 py-4 mt-auto">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
