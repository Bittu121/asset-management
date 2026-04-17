"use client";

import React, { useMemo, useState } from "react";
import { SAMPLE_ALLOCATIONS } from "./sampleData";
import { StatCard, SectionHeader, Badge } from "./SharedComponents";
import { exportToCSV } from "./exportToCSV";
import Pagination from "../../../components/common/Pagination";

const ITEMS_PER_PAGE = 4;

const AllocationReportTab: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const [summaryPage, setSummaryPage] = useState(1);
  const [detailPage, setDetailPage] = useState(1);

  const filtered = SAMPLE_ALLOCATIONS.filter((a) => {
    const matchStatus = statusFilter === "ALL" || a.status === statusFilter;

    const keyword = search.toLowerCase();

    const matchSearch =
      a.assetTag.toLowerCase().includes(keyword) ||
      a.assetName.toLowerCase().includes(keyword) ||
      a.allocatedTo.toLowerCase().includes(keyword);

    return matchStatus && matchSearch;
  });

  const handleExport = () => {
    exportToCSV(
      "allocation-report",
      filtered.map((a) => [
        a.assetTag,
        a.assetName,
        a.allocatedTo,
        a.allocationDate,
        a.expectedReturn,
        a.status,
      ]),
      [
        "Asset Tag",
        "Asset Name",
        "Allocated To",
        "Allocation Date",
        "Expected Return",
        "Status",
      ],
    );
  };

  const userSummary = Array.from(
    new Set(SAMPLE_ALLOCATIONS.map((a) => a.allocatedTo)),
  ).map((user) => {
    const rows = SAMPLE_ALLOCATIONS.filter((a) => a.allocatedTo === user);

    return {
      user,
      active: rows.filter((a) => a.status === "ACTIVE").length,
      overdue: rows.filter((a) => a.status === "OVERDUE").length,
      returned: rows.filter((a) => a.status === "RETURNED").length,
      total: rows.length,
    };
  });

  const summaryTotalPages = Math.ceil(userSummary.length / ITEMS_PER_PAGE);

  const detailTotalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginatedSummary = useMemo(() => {
    const start = (summaryPage - 1) * ITEMS_PER_PAGE;
    return userSummary.slice(start, start + ITEMS_PER_PAGE);
  }, [summaryPage, userSummary]);

  const paginatedDetail = useMemo(() => {
    const start = (detailPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [detailPage, filtered]);

  const card =
    "bg-white/80 backdrop-blur-sm border border-gray-100 rounded-3xl shadow-[0_8px_30px_rgba(15,23,42,0.04)]";

  return (
    <div className="space-y-6">
      {/* KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <StatCard
          label="Active"
          value={SAMPLE_ALLOCATIONS.filter((a) => a.status === "ACTIVE").length}
          color="bg-emerald-50 text-emerald-500"
          icon="✅"
        />

        <StatCard
          label="Overdue"
          value={
            SAMPLE_ALLOCATIONS.filter((a) => a.status === "OVERDUE").length
          }
          color="bg-rose-50 text-rose-500"
          icon="⚠️"
        />

        <StatCard
          label="Returned"
          value={
            SAMPLE_ALLOCATIONS.filter((a) => a.status === "RETURNED").length
          }
          color="bg-slate-50 text-slate-500"
          icon="↩️"
        />
      </div>

      {/* Summary */}
      <div className={card}>
        <div className="p-6">
          <SectionHeader
            title="Per-User Allocation Summary"
            subtitle="Assets allocated per employee"
            onExport={() =>
              exportToCSV(
                "per-user-allocation-summary",
                userSummary.map((row) => [
                  row.user,
                  String(row.active),
                  String(row.overdue),
                  String(row.returned),
                  String(row.total),
                ]),
                ["User", "Active", "Overdue", "Returned", "Total"],
              )
            }
          />

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {["User", "Active", "Overdue", "Returned", "Total"].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>

              <tbody>
                {paginatedSummary.map((row) => (
                  <tr
                    key={row.user}
                    className="border-b border-gray-50 hover:bg-gray-50/70"
                  >
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {row.user}
                    </td>
                    <td className="py-3 px-4 text-emerald-500 font-semibold">
                      {row.active}
                    </td>
                    <td className="py-3 px-4 text-rose-500 font-semibold">
                      {row.overdue}
                    </td>
                    <td className="py-3 px-4 text-slate-500 font-semibold">
                      {row.returned}
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-700">
                      {row.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5">
            <Pagination
              currentPage={summaryPage}
              totalPages={summaryTotalPages}
              onPageChange={setSummaryPage}
            />
          </div>
        </div>
      </div>

      {/* Detail */}
      <div className={card}>
        <div className="p-6">
          <SectionHeader
            title="Allocation Detail"
            subtitle="Full allocation records"
            onExport={handleExport}
          />

          {/* Improved Search */}
          <div className="flex flex-col md:flex-row gap-3 mt-4 mb-5">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                🔍
              </span>

              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setDetailPage(1);
                }}
                placeholder="Search by asset tag, asset name or employee..."
                className="w-full h-11 pl-11 pr-4 rounded-2xl border border-gray-200 bg-gray-50/70 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-200 transition"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setDetailPage(1);
              }}
              className="h-11 px-4 rounded-2xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100"
            >
              <option value="ALL">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="OVERDUE">Overdue</option>
              <option value="RETURNED">Returned</option>
            </select>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-100">
            <table className="w-full text-sm">
              <thead className="bg-gray-50/80">
                <tr>
                  {[
                    "Asset Tag",
                    "Asset Name",
                    "Allocated To",
                    "Allocation Date",
                    "Expected Return",
                    "Status",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {paginatedDetail.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-10 text-center text-sm text-gray-400"
                    >
                      No records found
                    </td>
                  </tr>
                ) : (
                  paginatedDetail.map((a) => (
                    <tr
                      key={a.id}
                      className="border-t border-gray-50 hover:bg-gray-50/70"
                    >
                      <td className="py-3 px-4 font-semibold text-indigo-600">
                        {a.assetTag}
                      </td>
                      <td className="py-3 px-4 text-gray-700">{a.assetName}</td>
                      <td className="py-3 px-4 text-gray-700">
                        {a.allocatedTo}
                      </td>
                      <td className="py-3 px-4 text-gray-500">
                        {a.allocationDate}
                      </td>
                      <td className="py-3 px-4 text-gray-500">
                        {a.expectedReturn}
                      </td>
                      <td className="py-3 px-4">
                        <Badge label={a.status} type={a.status} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-5">
            <p className="text-xs text-gray-400">
              Showing {paginatedDetail.length} of {filtered.length} records
            </p>

            <Pagination
              currentPage={detailPage}
              totalPages={detailTotalPages}
              onPageChange={setDetailPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllocationReportTab;
