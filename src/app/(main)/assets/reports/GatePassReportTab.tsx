"use client";
import React, { useState } from "react";
import { SAMPLE_GATE_PASSES } from "./sampleData";
import { StatCard, SectionHeader, Badge } from "./SharedComponents";
import { exportToCSV } from "./exportToCSV";

type GatePassStatus =
  | "PENDING"
  | "APPROVED"
  | "ISSUED"
  | "RETURNED"
  | "REJECTED";

const GatePassReportTab: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const filtered = SAMPLE_GATE_PASSES.filter((g) => {
    const matchStatus = statusFilter === "ALL" || g.status === statusFilter;
    const matchType = typeFilter === "ALL" || g.type === typeFilter;
    const matchSearch =
      g.id.toLowerCase().includes(search.toLowerCase()) ||
      g.assetTag.toLowerCase().includes(search.toLowerCase()) ||
      g.carrierName.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchType && matchSearch;
  });

  const handleExport = () => {
    exportToCSV(
      "gatepass-report",
      filtered.map((g) => [
        g.id,
        g.assetTag,
        g.assetModel,
        g.type,
        g.purpose,
        g.carrierName,
        g.status,
        g.date,
      ]),
      [
        "Gate Pass #",
        "Asset Tag",
        "Asset Model",
        "Type",
        "Purpose",
        "Carrier",
        "Status",
        "Date",
      ],
    );
  };

  const outCount = SAMPLE_GATE_PASSES.filter((g) => g.type === "OUT").length;
  const inCount = SAMPLE_GATE_PASSES.filter((g) => g.type === "IN").length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {(
          [
            "PENDING",
            "APPROVED",
            "ISSUED",
            "RETURNED",
            "REJECTED",
          ] as GatePassStatus[]
        ).map((s) => {
          const colors: Record<GatePassStatus, string> = {
            PENDING: "bg-yellow-100 text-yellow-600",
            APPROVED: "bg-blue-100 text-blue-600",
            ISSUED: "bg-purple-100 text-purple-600",
            RETURNED: "bg-green-100 text-green-600",
            REJECTED: "bg-red-100 text-red-600",
          };
          const icons: Record<GatePassStatus, string> = {
            PENDING: "⏳",
            APPROVED: "✔️",
            ISSUED: "📤",
            RETURNED: "↩️",
            REJECTED: "❌",
          };
          return (
            <StatCard
              key={s}
              label={s}
              value={SAMPLE_GATE_PASSES.filter((g) => g.status === s).length}
              color={colors[s]}
              icon={icons[s]}
            />
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center text-xl">
            ⊕
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{outCount}</p>
            <p className="text-sm text-gray-500">OUT Movements</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl">
            ⊕
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{inCount}</p>
            <p className="text-sm text-gray-500">IN Movements</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <SectionHeader
          title="Gate Pass Detail"
          subtitle="All gate pass records"
          onExport={handleExport}
        />
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="relative flex-1 min-w-48">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              🔍
            </span>
            <input
              className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="Search gate pass, asset, carrier..."
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
            {["PENDING", "APPROVED", "ISSUED", "RETURNED", "REJECTED"].map(
              (s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ),
            )}
          </select>
          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="ALL">All Types</option>
            <option value="OUT">OUT only</option>
            <option value="IN">IN only</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {[
                  "Gate Pass #",
                  "Asset",
                  "Type",
                  "Purpose",
                  "Carrier",
                  "Status",
                  "Date",
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
                    colSpan={7}
                    className="py-8 text-center text-gray-400 text-sm"
                  >
                    No records found.
                  </td>
                </tr>
              ) : (
                filtered.map((g) => (
                  <tr
                    key={g.id}
                    className="border-b border-gray-50 hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4 font-semibold text-indigo-600">
                      {g.id}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-gray-800">{g.assetTag}</p>
                      <p className="text-xs text-gray-400">{g.assetModel}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-semibold border ${g.type === "OUT" ? "bg-yellow-50 text-yellow-700 border-yellow-300" : "bg-blue-50 text-blue-700 border-blue-300"}`}
                      >
                        ⊕ {g.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{g.purpose}</td>
                    <td className="py-3 px-4 text-gray-600">{g.carrierName}</td>
                    <td className="py-3 px-4">
                      <Badge label={g.status} type={g.status} />
                    </td>
                    <td className="py-3 px-4 text-gray-500">{g.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">
          Showing {filtered.length} of {SAMPLE_GATE_PASSES.length} records
        </p>
      </div>
    </div>
  );
};

export default GatePassReportTab;
