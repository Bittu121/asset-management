"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/auth/store";
import {
  FiPackage,
  FiCheckCircle,
  FiLink,
  FiDollarSign,
  FiSearch,
} from "react-icons/fi";
import { StatCard, SectionHeader, Badge } from "./SharedComponents";
import { exportToCSV } from "./exportToCSV";
import Pagination from "../../../components/common/Pagination";

const TABLE_HEADERS = [
  "Asset Tag",
  "Asset Name",
  "Category",
  "Status",
  "Purchase Date",
  "Value (₹)",
];

const ROWS_PER_PAGE = 5;

export default function AssetStatusTab() {
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const assets = useSelector(
    (state: RootState) => state.reports.data?.assets,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryFilter, statusFilter, search]);

  if (!assets) return null;

  const { summary, records } = assets;

  const categories = Array.from(new Set(records.map((a) => a.category))).filter(Boolean);

  const filteredAssets = records.filter((asset) => {
    const matchesCategory =
      categoryFilter === "ALL" || asset.category === categoryFilter;
    const matchesStatus =
      statusFilter === "ALL" || asset.status === statusFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      asset.assetTag.toLowerCase().includes(q) ||
      asset.assetName.toLowerCase().includes(q);
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const currentPageItems = filteredAssets.slice(
    startIndex,
    startIndex + ROWS_PER_PAGE,
  );
  const totalPages = Math.ceil(filteredAssets.length / ROWS_PER_PAGE);

  function handleExport() {
    const rows = filteredAssets.map((asset) => [
      asset.assetTag,
      asset.assetName,
      asset.category,
      asset.status,
      asset.purchaseDate,
      String(asset.value),
    ]);
    exportToCSV("asset-status-report", rows, TABLE_HEADERS);
  }

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Assets"
          value={summary.total}
          color="bg-indigo-100 text-indigo-600"
          icon={<FiPackage size={22} />}
        />
        <StatCard
          label="Available"
          value={summary.available}
          color="bg-green-100 text-green-600"
          icon={<FiCheckCircle size={22} />}
        />
        <StatCard
          label="Allocated"
          value={summary.allocated}
          color="bg-orange-100 text-orange-600"
          icon={<FiLink size={22} />}
        />
        <StatCard
          label="Portfolio Value"
          value={
            summary.totalValue >= 1000
              ? `₹${(summary.totalValue / 1000).toFixed(0)}K`
              : `₹${summary.totalValue.toLocaleString()}`
          }
          sub={
            summary.allocatedValue >= 1000
              ? `Allocated: ₹${(summary.allocatedValue / 1000).toFixed(0)}K`
              : `Allocated: ₹${summary.allocatedValue.toLocaleString()}`
          }
          color="bg-purple-100 text-purple-600"
          icon={<FiDollarSign size={22} />}
        />
      </div>

      {/* Asset inventory table */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <SectionHeader
          title="Asset Inventory"
          subtitle="All registered assets with status"
          onExport={handleExport}
        />

        <div className="flex flex-wrap gap-3 mb-4">
          <div className="relative flex-1 min-w-48">
            <FiSearch
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="Search asset…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="ALL">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Status</option>
            <option value="AVAILABLE">Available</option>
            <option value="ALLOCATED">Allocated</option>
          </select>
        </div>

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
              {filteredAssets.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-8 text-center text-gray-400 text-sm"
                  >
                    No assets found.
                  </td>
                </tr>
              ) : (
                currentPageItems.map((asset) => (
                  <tr
                    key={asset._id}
                    className="border-b border-gray-50 hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4 font-semibold text-indigo-600">
                      {asset.assetTag}
                    </td>
                    <td className="py-3 px-4 text-gray-800">
                      {asset.assetName || "—"}
                    </td>
                    <td className="py-3 px-4 text-gray-500">
                      {asset.category || "—"}
                    </td>
                    <td className="py-3 px-4">
                      <Badge label={asset.status} type={asset.status} />
                    </td>
                    <td className="py-3 px-4 text-gray-500">
                      {asset.purchaseDate || "—"}
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-700">
                      {asset.value > 0
                        ? `₹${asset.value.toLocaleString()}`
                        : "—"}
                    </td>
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
