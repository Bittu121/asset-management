"use client";

import { useEffect, useState } from "react";
import { Package, Monitor } from "lucide-react";

type BadgeColor = "green" | "red" | "yellow" | "gray" | "orange";
const badgeClasses: Record<BadgeColor, string> = {
  green: "bg-green-50 text-green-600 border-green-200",
  red: "bg-red-50 text-red-500 border-red-200",
  yellow: "bg-yellow-50 text-yellow-600 border-yellow-200",
  gray: "bg-gray-50 text-gray-500 border-gray-200",
  orange: "bg-orange-50 text-orange-600 border-orange-200",
};

function Badge({
  label,
  color = "gray",
}: {
  label: string;
  color?: BadgeColor;
}) {
  return (
    <span
      className={`text-xs font-semibold px-2 py-0.5 rounded border ${badgeClasses[color]}`}
    >
      {label}
    </span>
  );
}

type Asset = {
  _id: string;
  assetTag: string;
  device: string;
  assetType: string;
  allocationDate: string;
  expectedReturn: string;
  warrantyExpiry: string;
  value: number;
  status: string;
};

function statusColor(s: string): BadgeColor {
  switch (s) {
    case "ACTIVE":
      return "green";
    case "OVERDUE":
      return "red";
    case "RETURNED":
      return "gray";
    default:
      return "gray";
  }
}

export default function MyAssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/end-user", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        if (d.data) setAssets(d.data.myAssets ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = assets.filter(
    (a) =>
      a.assetTag.toLowerCase().includes(search.toLowerCase()) ||
      a.device.toLowerCase().includes(search.toLowerCase()) ||
      a.assetType.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">My Assets</h1>
        <p className="text-sm text-gray-500 mt-1">
          All assets currently assigned to you
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by asset tag, device..."
            className="w-full sm:max-w-xs h-10 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
          <span className="text-sm text-gray-400 self-center">
            {filtered.length} asset{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-14 bg-gray-100 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <Package size={40} className="mb-3 opacity-40" />
            <p className="text-sm">No assets found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {[
                    "Asset Tag",
                    "Device",
                    "Type",
                    "Allocated On",
                    "Expected Return",
                    "Warranty Expiry",
                    "Value",
                    "Status",
                  ].map((c) => (
                    <th
                      key={c}
                      className="text-left text-xs font-semibold text-gray-400 uppercase pb-3 pr-4 whitespace-nowrap"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr
                    key={a._id}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 pr-4 font-semibold text-indigo-600">
                      {a.assetTag}
                    </td>
                    <td className="py-3 pr-4 text-gray-800 font-medium">
                      {a.device || "—"}
                    </td>
                    <td className="py-3 pr-4 text-gray-500">
                      {a.assetType || "—"}
                    </td>
                    <td className="py-3 pr-4 text-gray-500 text-xs whitespace-nowrap">
                      {a.allocationDate}
                    </td>
                    <td className="py-3 pr-4 text-gray-500 text-xs whitespace-nowrap">
                      {a.expectedReturn || "Permanent"}
                    </td>
                    <td className="py-3 pr-4 text-gray-500 text-xs whitespace-nowrap">
                      {a.warrantyExpiry || "N/A"}
                    </td>
                    <td className="py-3 pr-4 text-gray-700 text-xs font-medium">
                      {a.value > 0 ? `Rs.${a.value.toLocaleString()}` : "—"}
                    </td>
                    <td className="py-3">
                      <Badge label={a.status} color={statusColor(a.status)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
