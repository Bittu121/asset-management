"use client";

import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";

type BadgeColor = "green" | "red" | "yellow" | "blue" | "purple" | "gray";
const badgeClasses: Record<BadgeColor, string> = {
  green: "bg-green-50 text-green-600 border-green-200",
  red: "bg-red-50 text-red-500 border-red-200",
  yellow: "bg-yellow-50 text-yellow-600 border-yellow-200",
  blue: "bg-blue-50 text-blue-600 border-blue-200",
  purple: "bg-purple-50 text-purple-600 border-purple-200",
  gray: "bg-gray-50 text-gray-500 border-gray-200",
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

type GatePass = {
  _id: string;
  gatePassId: string;
  assetTag: string;
  assetModel: string;
  type: string;
  purpose: string;
  expectedReturn: string;
  status: string;
  date: string;
};

function statusColor(s: string): BadgeColor {
  switch (s) {
    case "APPROVED":
      return "blue";
    case "RETURNED":
      return "green";
    case "PENDING":
      return "yellow";
    case "ISSUED":
      return "purple";
    case "REJECTED":
      return "red";
    default:
      return "gray";
  }
}

export default function MyGatePassPage() {
  const [list, setList] = useState<GatePass[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    fetch("/api/end-user", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        if (d.data) setList(d.data.gatePassList ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    filter === "ALL" ? list : list.filter((g) => g.status === filter);

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">My Gate Passes</h1>
        <p className="text-sm text-gray-500 mt-1">
          Asset movement history for your devices
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex gap-2 mb-5 flex-wrap">
          {["ALL", "PENDING", "APPROVED", "ISSUED", "RETURNED", "REJECTED"].map(
            (s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${filter === s ? "bg-indigo-600 text-white border-indigo-600" : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}
              >
                {s}
              </button>
            ),
          )}
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-14 bg-gray-100 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <ShieldCheck size={40} className="mb-3 opacity-40" />
            <p className="text-sm">No gate passes found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {[
                    "Gate Pass #",
                    "Asset Tag",
                    "Model",
                    "Type",
                    "Purpose",
                    "Expected Return",
                    "Date",
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
                {filtered.map((gp) => (
                  <tr
                    key={gp._id}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 pr-4 font-semibold text-indigo-600">
                      {gp.gatePassId || "—"}
                    </td>
                    <td className="py-3 pr-4 text-gray-700">{gp.assetTag}</td>
                    <td className="py-3 pr-4 text-gray-600">
                      {gp.assetModel || "—"}
                    </td>
                    <td className="py-3 pr-4">
                      <span
                        className={`text-xs font-semibold border px-2 py-0.5 rounded ${gp.type === "OUT" ? "text-yellow-600 border-yellow-300 bg-yellow-50" : "text-blue-600 border-blue-300 bg-blue-50"}`}
                      >
                        {gp.type}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-gray-600">{gp.purpose}</td>
                    <td className="py-3 pr-4 text-gray-500 text-xs whitespace-nowrap">
                      {gp.expectedReturn || "—"}
                    </td>
                    <td className="py-3 pr-4 text-gray-400 text-xs whitespace-nowrap">
                      {gp.date}
                    </td>
                    <td className="py-3">
                      <Badge label={gp.status} color={statusColor(gp.status)} />
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
