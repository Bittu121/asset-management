"use client";
import React, { useState } from "react";
import { SAMPLE_ALLOCATIONS } from "./sampleData";
import { StatCard, SectionHeader, Badge } from "./SharedComponents";
import { exportToCSV } from "./exportToCSV";

const AllocationReportTab: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const filtered = SAMPLE_ALLOCATIONS.filter((a) => {
    const matchStatus = statusFilter === "ALL" || a.status === statusFilter;
    const matchSearch =
      a.assetTag.toLowerCase().includes(search.toLowerCase()) ||
      a.allocatedTo.toLowerCase().includes(search.toLowerCase()) ||
      a.assetName.toLowerCase().includes(search.toLowerCase());
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
    const userAllocs = SAMPLE_ALLOCATIONS.filter((a) => a.allocatedTo === user);
    return {
      user,
      active: userAllocs.filter((a) => a.status === "ACTIVE").length,
      overdue: userAllocs.filter((a) => a.status === "OVERDUE").length,
      returned: userAllocs.filter((a) => a.status === "RETURNED").length,
      total: userAllocs.length,
    };
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          label="Active"
          value={SAMPLE_ALLOCATIONS.filter((a) => a.status === "ACTIVE").length}
          color="bg-green-100 text-green-600"
          icon="✅"
        />
        <StatCard
          label="Overdue"
          value={
            SAMPLE_ALLOCATIONS.filter((a) => a.status === "OVERDUE").length
          }
          color="bg-red-100 text-red-600"
          icon="⚠️"
        />
        <StatCard
          label="Returned"
          value={
            SAMPLE_ALLOCATIONS.filter((a) => a.status === "RETURNED").length
          }
          color="bg-gray-100 text-gray-600"
          icon="↩️"
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <SectionHeader
          title="Per-User Allocation Summary"
          subtitle="Assets allocated per employee"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {["User", "Active", "Overdue", "Returned", "Total"].map((h) => (
                  <th
                    key={h}
                    className="text-left py-2 px-3 text-xs font-bold text-gray-400 uppercase tracking-wide"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {userSummary.map((row) => (
                <tr
                  key={row.user}
                  className="border-b border-gray-50 hover:bg-gray-50"
                >
                  <td className="py-2.5 px-3 font-medium text-gray-800">
                    {row.user}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="text-green-600 font-semibold">
                      {row.active}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="text-red-500 font-semibold">
                      {row.overdue}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="text-gray-500 font-semibold">
                      {row.returned}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-bold text-gray-700">
                    {row.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <SectionHeader
          title="Allocation Detail"
          subtitle="Full allocation records"
          onExport={handleExport}
        />
        <div className="flex gap-3 mb-4">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              🔍
            </span>
            <input
              className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="Search asset or user..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="OVERDUE">Overdue</option>
            <option value="RETURNED">Returned</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
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
                    className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wide"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-8 text-center text-gray-400 text-sm"
                  >
                    No records found.
                  </td>
                </tr>
              ) : (
                filtered.map((a) => (
                  <tr
                    key={a.id}
                    className="border-b border-gray-50 hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4 font-semibold text-indigo-600">
                      {a.assetTag}
                    </td>
                    <td className="py-3 px-4 text-gray-700">{a.assetName}</td>
                    <td className="py-3 px-4 text-gray-700">{a.allocatedTo}</td>
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
        <p className="text-xs text-gray-400 mt-3">
          Showing {filtered.length} of {SAMPLE_ALLOCATIONS.length} records
        </p>
      </div>
    </div>
  );
};

export default AllocationReportTab;
