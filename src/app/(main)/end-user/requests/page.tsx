"use client";

import { useEffect, useState } from "react";
import { Package, ShieldCheck } from "lucide-react";

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

export default function MyRequestsPage() {
  const [gatePasses, setGatePasses] = useState<GatePass[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/end-user", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        if (d.data)
          setGatePasses(
            (d.data.gatePassList ?? []).filter((g: GatePass) =>
              ["PENDING", "APPROVED", "ISSUED"].includes(g.status),
            ),
          );
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">My Requests</h1>
        <p className="text-sm text-gray-500 mt-1">
          Pending and active gate pass requests
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-800 text-sm mb-4">
          Active Gate Pass Requests
        </h3>
        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-14 bg-gray-100 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : gatePasses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <ShieldCheck size={40} className="mb-3 opacity-40" />
            <p className="text-sm">No active requests</p>
            <p className="text-xs mt-1">
              Gate pass requests you have submitted will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {gatePasses.map((gp) => (
              <div
                key={gp._id}
                className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <ShieldCheck size={18} className="text-indigo-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {gp.gatePassId || "Gate Pass"} — {gp.assetTag}
                    </p>
                    <p className="text-xs text-gray-500">
                      {gp.purpose} · {gp.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-semibold border px-2 py-0.5 rounded ${gp.type === "OUT" ? "text-yellow-600 border-yellow-300 bg-yellow-50" : "text-blue-600 border-blue-300 bg-blue-50"}`}
                  >
                    {gp.type}
                  </span>
                  <Badge label={gp.status} color={statusColor(gp.status)} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex flex-col items-center py-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
            <Package size={24} className="text-indigo-500" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">Asset Requests</h3>
          <p className="text-sm text-gray-400 max-w-xs">
            To request a new asset, please contact your admin or IT department.
            They will allocate the asset and it will appear in your dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
