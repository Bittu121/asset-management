"use client";

import { useState } from "react";
import { CheckCircle, User, Calendar, ClipboardList } from "lucide-react";
import Pagination from "../../../components/common/Pagination";
import { Allocation, formatDate } from "./types";

type Props = {
  allocations: Allocation[]; // passed from page — we filter here for RETURNED ones
};

const PER_PAGE = 5;

export default function ReturnHistory({ allocations }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  // Show only returned allocations (newest first via slice)
  const returnedList = allocations.filter((a) => a.status === "RETURNED");

  const totalPages = Math.ceil(returnedList.length / PER_PAGE);
  const pageItems = returnedList.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Return History</h2>
          <p className="text-xs text-gray-400 mt-0.5">All processed asset returns</p>
        </div>
        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600">
          {returnedList.length} {returnedList.length === 1 ? "Return" : "Returns"}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        {returnedList.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-12 text-gray-400">
            <ClipboardList size={36} strokeWidth={1.5} />
            <p className="text-sm font-medium text-gray-600">No returns yet</p>
            <p className="text-xs">Returned assets will appear here</p>
          </div>
        )}

        <div className="space-y-3">
          {pageItems.map((item, index) => (
            <div
              key={item._id}
              className="flex items-start gap-4 p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
            >
              {/* Green check icon */}
              <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                <CheckCircle size={18} className="text-green-600" />
              </div>

              {/* Asset + user + dates */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-gray-900">{item.asset.assetTag}</span>
                  <span className="text-gray-300 text-xs">•</span>
                  <span className="text-sm text-gray-500 truncate">{item.asset.device}</span>
                </div>
                <div className="flex flex-wrap items-center gap-4 mt-1.5 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <User size={11} />
                    {item.allocatedTo.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={11} />
                    Returned: {item.returnDate ? formatDate(item.returnDate) : "—"}
                  </span>
                  {item.returnCondition && (
                    <span className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-500">
                      {item.returnCondition}
                    </span>
                  )}
                </div>
              </div>

              {/* Row number */}
              <span className="shrink-0 text-xs text-gray-400 bg-gray-100 rounded px-2 py-1">
                #{(currentPage - 1) * PER_PAGE + index + 1}
              </span>
            </div>
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="border-t border-gray-100 px-6 py-3 flex items-center justify-between text-xs text-gray-500">
          <span>
            Showing {(currentPage - 1) * PER_PAGE + 1}–
            {Math.min(currentPage * PER_PAGE, returnedList.length)} of {returnedList.length}
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
