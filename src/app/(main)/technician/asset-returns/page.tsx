"use client";
import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";

type ReturnRow = {
  _id: string;
  assetTag: string;
  device: string;
  returnedBy: string;
  returnedByEmail: string;
  allocationDate: string;
  returnDate: string;
  returnCondition: string;
  returnNotes: string;
};

export default function TechReturnsPage() {
  const [list, setList] = useState<ReturnRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/technician", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        if (d.data) setList(d.data.returnHistory ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = list.filter(
    (r) =>
      r.assetTag.toLowerCase().includes(search.toLowerCase()) ||
      r.returnedBy.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Asset Returns</h1>
        <p className="text-sm text-gray-500 mt-1">
          History of all returned assets
        </p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex gap-3 mb-5">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by asset tag or user..."
            className="h-10 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 w-full max-w-xs"
          />
          <span className="text-sm text-gray-400 self-center">
            {filtered.length} records
          </span>
        </div>
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-12 bg-gray-100 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <RotateCcw size={40} className="mb-3 opacity-40" />
            <p className="text-sm">No return records found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {[
                    "Asset Tag",
                    "Device",
                    "Returned By",
                    "Email",
                    "Allocated On",
                    "Return Date",
                    "Condition",
                    "Notes",
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
                {filtered.map((r) => (
                  <tr
                    key={r._id}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 pr-4 font-semibold text-indigo-600">
                      {r.assetTag}
                    </td>
                    <td className="py-3 pr-4 text-gray-700">
                      {r.device || "—"}
                    </td>
                    <td className="py-3 pr-4 text-gray-700">{r.returnedBy}</td>
                    <td className="py-3 pr-4 text-gray-500 text-xs">
                      {r.returnedByEmail}
                    </td>
                    <td className="py-3 pr-4 text-gray-500 text-xs whitespace-nowrap">
                      {r.allocationDate}
                    </td>
                    <td className="py-3 pr-4 text-gray-500 text-xs whitespace-nowrap">
                      {r.returnDate || "—"}
                    </td>
                    <td className="py-3 pr-4 text-gray-600 text-xs">
                      {r.returnCondition || "—"}
                    </td>
                    <td className="py-3 text-gray-400 text-xs max-w-xs truncate">
                      {r.returnNotes || "—"}
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
