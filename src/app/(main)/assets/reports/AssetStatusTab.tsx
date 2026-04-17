"use client";
import React, { useEffect, useState } from "react";
import { SAMPLE_ASSETS } from "./sampleData";
import { StatCard, SectionHeader, Badge } from "./SharedComponents";
import { exportToCSV } from "./exportToCSV";
import Pagination from "../../../components/common/Pagination";

const AssetStatusTab: React.FC = () => {
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  // Pagination Only Added
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const categories = Array.from(new Set(SAMPLE_ASSETS.map((a) => a.category)));

  const filtered = SAMPLE_ASSETS.filter((a) => {
    const matchCat = categoryFilter === "ALL" || a.category === categoryFilter;
    const matchStatus = statusFilter === "ALL" || a.status === statusFilter;
    const matchSearch =
      a.assetTag.toLowerCase().includes(search.toLowerCase()) ||
      a.assetName.toLowerCase().includes(search.toLowerCase());

    return matchCat && matchStatus && matchSearch;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryFilter, statusFilter, search]);

  const paginatedData = filtered.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage,
  );

  const handleExport = () => {
    exportToCSV(
      "asset-status-report",
      filtered.map((a) => [
        a.assetTag,
        a.assetName,
        a.category,
        a.status,
        a.purchaseDate,
        `${a.value}`,
      ]),
      [
        "Asset Tag",
        "Asset Name",
        "Category",
        "Status",
        "Purchase Date",
        "Value (INR)",
      ],
    );
  };

  const totalValue = SAMPLE_ASSETS.reduce((s, a) => s + a.value, 0);
  const allocatedValue = SAMPLE_ASSETS.filter(
    (a) => a.status === "ALLOCATED",
  ).reduce((s, a) => s + a.value, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Assets"
          value={SAMPLE_ASSETS.length}
          color="bg-indigo-100 text-indigo-600"
          icon="📦"
        />
        <StatCard
          label="Available"
          value={SAMPLE_ASSETS.filter((a) => a.status === "AVAILABLE").length}
          color="bg-green-100 text-green-600"
          icon="✅"
        />
        <StatCard
          label="Allocated"
          value={SAMPLE_ASSETS.filter((a) => a.status === "ALLOCATED").length}
          color="bg-orange-100 text-orange-600"
          icon="🔗"
        />
        <StatCard
          label="Portfolio Value"
          value={`₹${(totalValue / 1000).toFixed(0)}K`}
          sub={`Allocated: ₹${(allocatedValue / 1000).toFixed(0)}K`}
          color="bg-purple-100 text-purple-600"
          icon="💰"
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <SectionHeader
          title="Asset Inventory"
          subtitle="All registered assets with status"
          onExport={handleExport}
        />

        <div className="flex flex-wrap gap-3 mb-4">
          <div className="relative flex-1 min-w-48">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              🔍
            </span>

            <input
              className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="Search asset..."
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
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
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
                {[
                  "Asset Tag",
                  "Asset Name",
                  "Category",
                  "Status",
                  "Purchase Date",
                  "Value (₹)",
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
                    No assets found.
                  </td>
                </tr>
              ) : (
                paginatedData.map((a) => (
                  <tr
                    key={a.id}
                    className="border-b border-gray-50 hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4 font-semibold text-indigo-600">
                      {a.assetTag}
                    </td>

                    <td className="py-3 px-4 text-gray-800">{a.assetName}</td>

                    <td className="py-3 px-4 text-gray-500">{a.category}</td>

                    <td className="py-3 px-4">
                      <Badge label={a.status} type={a.status} />
                    </td>

                    <td className="py-3 px-4 text-gray-500">
                      {a.purchaseDate}
                    </td>

                    <td className="py-3 px-4 font-medium text-gray-700">
                      ₹{a.value.toLocaleString()}
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
            totalPages={Math.ceil(filtered.length / recordsPerPage)}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default AssetStatusTab;
