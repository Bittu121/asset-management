"use client";
import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";

type OverdueRow = {
  _id: string;
  assetTag: string;
  device: string;
  allocatedTo: string;
  allocatedToEmail: string;
  department: string;
  allocationDate: string;
  expectedReturn: string;
  daysOverdue: number;
};

export default function TechOverduePage() {
  const [list, setList] = useState<OverdueRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/technician", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        if (d.data) setList(d.data.overdueList ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Overdue Allocations</h1>
        <p className="text-sm text-gray-500 mt-1">Assets past their expected return date</p>
      </div>
      {!loading && list.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-3 text-red-700 text-sm">
          <AlertTriangle size={16} className="shrink-0" />
          <span>
            <strong>{list.length}</strong> overdue allocation
            {list.length > 1 ? "s" : ""} require immediate follow-up.
          </span>
        </div>
      )}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : list.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <AlertTriangle size={40} className="mb-3 opacity-40" />
            <p className="text-sm font-medium text-green-600">No overdue allocations!</p>
            <p className="text-xs mt-1">All assets are returned on time</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {[
                    "Asset Tag",
                    "Device",
                    "Assigned To",
                    "Email",
                    "Department",
                    "Expected Return",
                    "Days Overdue",
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
                {list.map((a) => (
                  <tr
                    key={a._id}
                    className="border-b border-red-50 hover:bg-red-50 transition-colors"
                  >
                    <td className="py-3 pr-4 font-semibold text-red-600">{a.assetTag}</td>
                    <td className="py-3 pr-4 text-gray-700">{a.device || "—"}</td>
                    <td className="py-3 pr-4 text-gray-700">{a.allocatedTo}</td>
                    <td className="py-3 pr-4 text-gray-500 text-xs">{a.allocatedToEmail}</td>
                    <td className="py-3 pr-4 text-gray-500 text-xs">{a.department || "—"}</td>
                    <td className="py-3 pr-4 text-gray-500 text-xs whitespace-nowrap">
                      {a.expectedReturn}
                    </td>
                    <td className="py-3 pr-4">
                      <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                        {a.daysOverdue}d
                      </span>
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
