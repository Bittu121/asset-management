"use client";
import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

type AllocRow = {
  _id: string;
  assetTag: string;
  device: string;
  allocatedTo: string;
  department: string;
  allocationDate: string;
  expectedReturn: string;
  returnDate: string;
  returnCondition: string;
  status: string;
};
type BadgeColor = "green" | "red" | "gray" | "orange";
const bCls: Record<BadgeColor, string> = {
  green: "bg-green-50 text-green-600 border-green-200",
  red: "bg-red-50 text-red-500 border-red-200",
  gray: "bg-gray-50 text-gray-500 border-gray-200",
  orange: "bg-orange-50 text-orange-600 border-orange-200",
};
function Badge({ label, color = "gray" }: { label: string; color?: BadgeColor }) {
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${bCls[color]}`}>
      {label}
    </span>
  );
}
function statusColor(s: string): BadgeColor {
  return s === "ACTIVE" ? "green" : s === "OVERDUE" ? "red" : s === "RETURNED" ? "gray" : "orange";
}

export default function TechHistoryPage() {
  const [list, setList] = useState<AllocRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/technician", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        if (d.data) setList(d.data.allocationList ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = list.filter((a) => {
    const q = search.toLowerCase();
    return (
      (filter === "ALL" || a.status === filter) &&
      (a.assetTag.toLowerCase().includes(q) || a.allocatedTo.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Asset History</h1>
        <p className="text-sm text-gray-500 mt-1">Full allocation and return history</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex flex-wrap gap-2 mb-5 items-center">
          {["ALL", "ACTIVE", "OVERDUE", "RETURNED"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${filter === s ? "bg-indigo-600 text-white border-indigo-600" : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}
            >
              {s}
            </button>
          ))}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="ml-auto h-8 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <Clock size={40} className="mb-3 opacity-40" />
            <p className="text-sm">No history records found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {[
                    "Asset Tag",
                    "Device",
                    "Allocated To",
                    "Department",
                    "Allocated",
                    "Expected Return",
                    "Return Date",
                    "Condition",
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
                    <td className="py-3 pr-4 font-semibold text-indigo-600">{a.assetTag}</td>
                    <td className="py-3 pr-4 text-gray-700">{a.device || "—"}</td>
                    <td className="py-3 pr-4 text-gray-700">{a.allocatedTo}</td>
                    <td className="py-3 pr-4 text-gray-500 text-xs">{a.department || "—"}</td>
                    <td className="py-3 pr-4 text-gray-500 text-xs whitespace-nowrap">
                      {a.allocationDate}
                    </td>
                    <td className="py-3 pr-4 text-gray-500 text-xs whitespace-nowrap">
                      {a.expectedReturn || "Permanent"}
                    </td>
                    <td className="py-3 pr-4 text-gray-500 text-xs whitespace-nowrap">
                      {a.returnDate || "—"}
                    </td>
                    <td className="py-3 pr-4 text-gray-500 text-xs">{a.returnCondition || "—"}</td>
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
