"use client";

import { useEffect, useState } from "react";
import {
  FiClock,
  FiCheck,
  FiSend,
  FiRotateCcw,
  FiXCircle,
  FiArrowUpRight,
  FiArrowDownLeft,
  FiSearch,
} from "react-icons/fi";
import { ReactNode } from "react";
import { SAMPLE_GATE_PASSES } from "./sampleData";
import { StatCard, SectionHeader, Badge } from "./SharedComponents";
import { exportToCSV } from "./exportToCSV";
import Pagination from "../../../components/common/Pagination";

type GatePassStatus =
  | "PENDING"
  | "APPROVED"
  | "ISSUED"
  | "RETURNED"
  | "REJECTED";

const ROWS_PER_PAGE = 4;

const STATUS_COLOR: Record<GatePassStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-600",
  APPROVED: "bg-blue-100 text-blue-600",
  ISSUED: "bg-purple-100 text-purple-600",
  RETURNED: "bg-green-100 text-green-600",
  REJECTED: "bg-red-100 text-red-600",
};

const STATUS_ICON: Record<GatePassStatus, ReactNode> = {
  PENDING: <FiClock size={22} />,
  APPROVED: <FiCheck size={22} />,
  ISSUED: <FiSend size={22} />,
  RETURNED: <FiRotateCcw size={22} />,
  REJECTED: <FiXCircle size={22} />,
};

const ALL_STATUSES: GatePassStatus[] = [
  "PENDING",
  "APPROVED",
  "ISSUED",
  "RETURNED",
  "REJECTED",
];

const TABLE_HEADERS = [
  "Gate Pass #",
  "Asset",
  "Type",
  "Purpose",
  "Carrier",
  "Status",
  "Date",
];

export default function GatePassReportTab() {
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPasses = SAMPLE_GATE_PASSES.filter((pass) => {
    const matchesStatus =
      statusFilter === "ALL" || pass.status === statusFilter;
    const matchesType = typeFilter === "ALL" || pass.type === typeFilter;
    const searchText = search.toLowerCase();
    const matchesSearch =
      pass.id.toLowerCase().includes(searchText) ||
      pass.assetTag.toLowerCase().includes(searchText) ||
      pass.carrierName.toLowerCase().includes(searchText);

    return matchesStatus && matchesType && matchesSearch;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, typeFilter, search]);

  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const endIndex = currentPage * ROWS_PER_PAGE;
  const currentPageItems = filteredPasses.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredPasses.length / ROWS_PER_PAGE);

  const outCount = SAMPLE_GATE_PASSES.filter(
    (pass) => pass.type === "OUT",
  ).length;
  const inCount = SAMPLE_GATE_PASSES.filter(
    (pass) => pass.type === "IN",
  ).length;

  function handleExport() {
    const rows = filteredPasses.map((pass) => [
      pass.id,
      pass.assetTag,
      pass.assetModel,
      pass.type,
      pass.purpose,
      pass.carrierName,
      pass.status,
      pass.date,
    ]);
    exportToCSV("gatepass-report", rows, [
      "Gate Pass #",
      "Asset Tag",
      "Asset Model",
      "Type",
      "Purpose",
      "Carrier",
      "Status",
      "Date",
    ]);
  }

  return (
    <div className="space-y-6">
      {/* Status stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {ALL_STATUSES.map((status) => (
          <StatCard
            key={status}
            label={status}
            value={
              SAMPLE_GATE_PASSES.filter((pass) => pass.status === status).length
            }
            color={STATUS_COLOR[status]}
            icon={STATUS_ICON[status]}
          />
        ))}
      </div>

      {/* OUT / IN movement cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center">
            <FiArrowUpRight size={22} />
          </div>
          <div>
            <p className="text-xl font-bold text-gray-900">{outCount}</p>
            <p className="text-sm text-gray-500">OUT Movements</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <FiArrowDownLeft size={22} />
          </div>
          <div>
            <p className="text-xl font-bold text-gray-900">{inCount}</p>
            <p className="text-sm text-gray-500">IN Movements</p>
          </div>
        </div>
      </div>

      {/* Gate pass detail table */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <SectionHeader
          title="Gate Pass Detail"
          subtitle="All gate pass records"
          onExport={handleExport}
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="relative flex-1 min-w-48">
            <FiSearch
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
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
            {ALL_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
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

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {TABLE_HEADERS.map((header) => (
                  <th
                    key={header}
                    className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wide"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredPasses.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="py-8 text-center text-gray-400 text-sm"
                  >
                    No records found.
                  </td>
                </tr>
              ) : (
                currentPageItems.map((pass) => (
                  <tr
                    key={pass.id}
                    className="border-b border-gray-50 hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4 font-semibold text-indigo-600">
                      {pass.id}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-gray-800">
                        {pass.assetTag}
                      </p>
                      <p className="text-xs text-gray-400">{pass.assetModel}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold border ${
                          pass.type === "OUT"
                            ? "bg-yellow-50 text-yellow-700 border-yellow-300"
                            : "bg-blue-50 text-blue-700 border-blue-300"
                        }`}
                      >
                        {pass.type === "OUT" ? (
                          <FiArrowUpRight size={11} />
                        ) : (
                          <FiArrowDownLeft size={11} />
                        )}
                        {pass.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{pass.purpose}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {pass.carrierName}
                    </td>
                    <td className="py-3 px-4">
                      <Badge label={pass.status} type={pass.status} />
                    </td>
                    <td className="py-3 px-4 text-gray-500">{pass.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
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
