// "use client";
// import React, { useState } from "react";
// import { AUDIT_LOG } from "./sampleData";
// import { StatCard, SectionHeader, Badge } from "./SharedComponents";
// import { exportToCSV } from "./exportToCSV";

// const AuditTrailTab: React.FC = () => {
//   const [typeFilter, setTypeFilter] = useState("ALL");
//   const [search, setSearch] = useState("");

//   const filtered = AUDIT_LOG.filter((e) => {
//     const matchType = typeFilter === "ALL" || e.type === typeFilter;
//     const matchSearch =
//       e.action.toLowerCase().includes(search.toLowerCase()) ||
//       e.detail.toLowerCase().includes(search.toLowerCase()) ||
//       e.user.toLowerCase().includes(search.toLowerCase());
//     return matchType && matchSearch;
//   });

//   const handleExport = () => {
//     exportToCSV(
//       "audit-trail",
//       filtered.map((e) => [e.action, e.detail, e.user, e.date, e.type]),
//       ["Action", "Detail", "User", "Date", "Type"],
//     );
//   };

//   const typeIcon: Record<string, string> = {
//     allocation: "🔗",
//     return: "↩️",
//     gatepass: "🎫",
//   };

//   const typeColor: Record<string, string> = {
//     allocation: "bg-blue-100 text-blue-600",
//     return: "bg-green-100 text-green-600",
//     gatepass: "bg-purple-100 text-purple-600",
//   };

//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-3 gap-4">
//         <StatCard
//           label="Allocation Events"
//           value={AUDIT_LOG.filter((e) => e.type === "allocation").length}
//           color="bg-blue-100 text-blue-600"
//           icon="🔗"
//         />
//         <StatCard
//           label="Return Events"
//           value={AUDIT_LOG.filter((e) => e.type === "return").length}
//           color="bg-green-100 text-green-600"
//           icon="↩️"
//         />
//         <StatCard
//           label="Gate Pass Events"
//           value={AUDIT_LOG.filter((e) => e.type === "gatepass").length}
//           color="bg-purple-100 text-purple-600"
//           icon="🎫"
//         />
//       </div>

//       <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
//         <SectionHeader
//           title="Full Audit Trail"
//           subtitle="Complete activity log"
//           onExport={handleExport}
//         />
//         <div className="flex gap-3 mb-4">
//           <div className="relative flex-1">
//             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
//               🔍
//             </span>
//             <input
//               className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
//               placeholder="Search actions, assets, users..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </div>
//           <select
//             className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
//             value={typeFilter}
//             onChange={(e) => setTypeFilter(e.target.value)}
//           >
//             <option value="ALL">All Types</option>
//             <option value="allocation">Allocation</option>
//             <option value="return">Return</option>
//             <option value="gatepass">Gate Pass</option>
//           </select>
//         </div>

//         <div className="space-y-2">
//           {filtered.length === 0 ? (
//             <p className="text-center text-sm text-gray-400 py-8">
//               No audit entries found.
//             </p>
//           ) : (
//             filtered.map((entry) => (
//               <div
//                 key={entry.id}
//                 className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition"
//               >
//                 <div
//                   className={`w-9 h-9 rounded-full flex items-center justify-center text-base shrink-0 ${typeColor[entry.type]}`}
//                 >
//                   {typeIcon[entry.type]}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center gap-2 flex-wrap">
//                     <p className="text-sm font-semibold text-gray-800">
//                       {entry.action}
//                     </p>
//                     <Badge label={entry.type} type={entry.type} />
//                   </div>
//                   <p className="text-xs text-gray-500 mt-0.5">{entry.detail}</p>
//                   <p className="text-xs text-gray-400 mt-0.5">
//                     By: {entry.user}
//                   </p>
//                 </div>
//                 <span className="text-xs text-gray-400 shrink-0 mt-1">
//                   {entry.date}
//                 </span>
//               </div>
//             ))
//           )}
//         </div>
//         <p className="text-xs text-gray-400 mt-3">
//           Showing {filtered.length} of {AUDIT_LOG.length} entries
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AuditTrailTab;

"use client";
import React, { useEffect, useState } from "react";
import { AUDIT_LOG } from "./sampleData";
import { StatCard, SectionHeader, Badge } from "./SharedComponents";
import { exportToCSV } from "./exportToCSV";
import Pagination from "../../../components/common/Pagination";

const AuditTrailTab: React.FC = () => {
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 4;

  const filtered = AUDIT_LOG.filter((e) => {
    const matchType = typeFilter === "ALL" || e.type === typeFilter;
    const matchSearch =
      e.action.toLowerCase().includes(search.toLowerCase()) ||
      e.detail.toLowerCase().includes(search.toLowerCase()) ||
      e.user.toLowerCase().includes(search.toLowerCase());

    return matchType && matchSearch;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [typeFilter, search]);

  const paginatedData = filtered.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage,
  );

  const handleExport = () => {
    exportToCSV(
      "audit-trail",
      filtered.map((e) => [e.action, e.detail, e.user, e.date, e.type]),
      ["Action", "Detail", "User", "Date", "Type"],
    );
  };

  const typeIcon: Record<string, string> = {
    allocation: "🔗",
    return: "↩️",
    gatepass: "🎫",
  };

  const typeColor: Record<string, string> = {
    allocation: "bg-blue-100 text-blue-600",
    return: "bg-green-100 text-green-600",
    gatepass: "bg-purple-100 text-purple-600",
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          label="Allocation Events"
          value={AUDIT_LOG.filter((e) => e.type === "allocation").length}
          color="bg-blue-100 text-blue-600"
          icon="🔗"
        />

        <StatCard
          label="Return Events"
          value={AUDIT_LOG.filter((e) => e.type === "return").length}
          color="bg-green-100 text-green-600"
          icon="↩️"
        />

        <StatCard
          label="Gate Pass Events"
          value={AUDIT_LOG.filter((e) => e.type === "gatepass").length}
          color="bg-purple-100 text-purple-600"
          icon="🎫"
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <SectionHeader
          title="Full Audit Trail"
          subtitle="Complete activity log"
          onExport={handleExport}
        />

        <div className="flex gap-3 mb-4">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              🔍
            </span>

            <input
              className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="Search actions, assets, users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="ALL">All Types</option>
            <option value="allocation">Allocation</option>
            <option value="return">Return</option>
            <option value="gatepass">Gate Pass</option>
          </select>
        </div>

        <div className="space-y-2">
          {filtered.length === 0 ? (
            <p className="text-center text-sm text-gray-400 py-8">
              No audit entries found.
            </p>
          ) : (
            paginatedData.map((entry) => (
              <div
                key={entry.id}
                className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition"
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-base shrink-0 ${typeColor[entry.type]}`}
                >
                  {typeIcon[entry.type]}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-gray-800">
                      {entry.action}
                    </p>

                    <Badge label={entry.type} type={entry.type} />
                  </div>

                  <p className="text-xs text-gray-500 mt-0.5">{entry.detail}</p>

                  <p className="text-xs text-gray-400 mt-0.5">
                    By: {entry.user}
                  </p>
                </div>

                <span className="text-xs text-gray-400 shrink-0 mt-1">
                  {entry.date}
                </span>
              </div>
            ))
          )}
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

export default AuditTrailTab;
