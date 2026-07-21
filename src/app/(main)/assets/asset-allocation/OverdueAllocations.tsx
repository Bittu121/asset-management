"use client";

import { useState } from "react";
import { RotateCcw, AlertCircle } from "lucide-react";
import Pagination from "../../../components/common/Pagination";
import { Allocation, isOverdue, formatDate, getInitials } from "./types";

type Props = {
  allocations: Allocation[];
  onReturn: (allocation: Allocation) => void;
};

const PER_PAGE = 5;

function getDaysOverdue(expectedReturn: string): number {
  const expected = new Date(expectedReturn);
  const now = new Date();
  return Math.floor((now.getTime() - expected.getTime()) / (1000 * 60 * 60 * 24));
}

export default function OverdueAllocations({ allocations, onReturn }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  // ACTIVE allocations that are past their expected return date
  const overdueList = allocations.filter((a) => a.status !== "RETURNED" && isOverdue(a));

  const totalPages = Math.ceil(overdueList.length / PER_PAGE);
  const pageItems = overdueList.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Overdue Allocations</h2>
          <p className="text-xs text-gray-400 mt-0.5">{overdueList.length} overdue</p>
        </div>
        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">
          Overdue
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100 text-xs text-gray-500 uppercase tracking-wide">
            <tr>
              <th className="px-6 py-3 text-left">Asset</th>
              <th className="px-6 py-3 text-left">Allocated To</th>
              <th className="px-6 py-3 text-left">Allocated On</th>
              <th className="px-6 py-3 text-left">Was Due</th>
              <th className="px-6 py-3 text-left">Days Overdue</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {pageItems.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-14 text-center">
                  <div className="flex flex-col items-center gap-2 text-gray-400">
                    <AlertCircle size={32} strokeWidth={1.5} />
                    <p className="text-sm font-medium text-gray-600">No overdue allocations</p>
                    <p className="text-xs">All assets returned on time</p>
                  </div>
                </td>
              </tr>
            )}

            {pageItems.map((item) => {
              const days = getDaysOverdue(item.expectedReturn);
              return (
                <tr key={item._id} className="hover:bg-red-50/30 transition-colors">
                  {/* Asset */}
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">{item.asset?.assetTag ?? "—"}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.asset?.device ?? "—"}</p>
                  </td>

                  {/* User */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                        <span className="text-xs font-bold text-red-700">
                          {getInitials(item.allocatedTo?.name ?? "?")}
                        </span>
                      </div>
                      <span className="text-gray-800">{item.allocatedTo?.name ?? "—"}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-gray-500">{formatDate(item.allocationDate)}</td>
                  <td className="px-6 py-4 text-gray-500">{formatDate(item.expectedReturn)}</td>

                  <td className="px-6 py-4">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                      {days} {days === 1 ? "day" : "days"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      Overdue
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => onReturn(item)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-800 transition"
                    >
                      <RotateCcw size={13} />
                      Return
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="border-t border-gray-100 px-6 py-3 flex items-center justify-between text-xs text-gray-500">
          <span>
            Showing {(currentPage - 1) * PER_PAGE + 1}–
            {Math.min(currentPage * PER_PAGE, overdueList.length)} of {overdueList.length}
          </span>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
