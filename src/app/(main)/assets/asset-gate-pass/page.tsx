"use client";
import React, { useState, useRef, useEffect } from "react";
import GatePassDetailModal from "./GatePassDetailModal";
import ActionModal from "./ActionModal";
import GatePassRequestModal from "./GatePassRequestModal";

//Types
type Status = "PENDING" | "APPROVED" | "ISSUED" | "RETURNED" | "REJECTED";
type MovementType = "OUT" | "IN";
type FilterMovement = "All Movements" | "OUT only" | "IN only";

interface GatePass {
  id: string;
  assetTag: string;
  assetModel: string;
  type: MovementType;
  purpose: string;
  from: string;
  to: string;
  expectedReturn: string;
  actualReturn: string;
  carrierName: string;
  carrierContact: string;
  carrierIdProof: string;
  requestedBy: string;
  created: string;
  issuedAt: string;
  returnedAt: string;
  status: Status;
  date: string;
}

interface NewGatePassForm {
  asset: string;
  movementType: string;
  purpose: string;
  fromLocation: string;
  toLocation: string;
  carrierName: string;
  carrierContact: string;
  carrierIdProof: string;
  expectedReturnDate: string;
  expectedReturnTime: string;
}

//Sample Data 

const SAMPLE_ASSETS = [
  "LAPTOP-2025-001 — SN123456789",
  "Nostrum — 59",
  "LAPTOP-2025-002 — SN001234568",
  "DESKTOP-2025-001 — SN001234569",
  "MONITOR-2025-001 — SN001234570",
  "MONITOR-2025-002 — SN001234571",
  "PRINTER-2025-001 — SN001234572",
  "ROUTER-2025-001 — SN001234573",
  "SERVER-2025-001 — SN001234574",
  "LAPTOP-2025-003 — SN001234575",
  "TABLET-2025-001 — SN001234576",
  "PHONE-2025-001 — SN001234577",
  "SWITCH-2025-001 — SN001234578",
];

const INITIAL_GATE_PASSES: GatePass[] = [
  {
    id: "GP-2026-0001",
    assetTag: "LAPTOP-2025-001",
    assetModel: "Latitude 7430",
    type: "OUT",
    purpose: "ds",
    from: "noida",
    to: "Delhi",
    expectedReturn: "3 Apr 2026, 4:00 pm",
    actualReturn: "—",
    carrierName: "sd",
    carrierContact: "sd",
    carrierIdProof: "sd",
    requestedBy: "admin@gmail.com",
    created: "3 Apr 2026, 9:30 pm",
    issuedAt: "—",
    returnedAt: "—",
    status: "PENDING",
    date: "03 Apr 2026",
  },
];

//Helper Components 
const StatusBadge: React.FC<{ status: Status }> = ({ status }) => {
  const styles: Record<Status, string> = {
    PENDING: "bg-yellow-100 text-yellow-700 border border-yellow-300",
    APPROVED: "bg-blue-100 text-blue-700 border border-blue-300",
    ISSUED: "bg-purple-100 text-purple-700 border border-purple-300",
    RETURNED: "bg-green-100 text-green-700 border border-green-300",
    REJECTED: "bg-red-100 text-red-700 border border-red-300",
  };
  return (
    <span
      className={`px-2 py-0.5 rounded text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
};

const TypeBadge: React.FC<{ type: MovementType }> = ({ type }) => {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold border ${
        type === "OUT"
          ? "bg-yellow-50 text-yellow-700 border-yellow-300"
          : "bg-blue-50 text-blue-700 border-blue-300"
      }`}
    >
      <span className="text-base leading-none">⊕</span> {type}
    </span>
  );
};

// Main Component

function AssetGatePass() {
  const [gatePasses, setGatePasses] = useState<GatePass[]>(INITIAL_GATE_PASSES);
  const [search, setSearch] = useState("");
  const [filterMovement, setFilterMovement] =
    useState<FilterMovement>("All Movements");
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const [selectedGatePass, setSelectedGatePass] = useState<GatePass | null>(
    null,
  );
  const [actionModal, setActionModal] = useState<{
    type: "approve" | "reject";
    id: string;
  } | null>(null);
  const [showNewModal, setShowNewModal] = useState(false);

  // Close filter dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Stats
  const stats: { label: string; status: Status; color: string }[] = [
    { label: "Pending", status: "PENDING", color: "text-yellow-500" },
    { label: "Approved", status: "APPROVED", color: "text-blue-600" },
    { label: "Issued", status: "ISSUED", color: "text-purple-600" },
    { label: "Returned", status: "RETURNED", color: "text-green-600" },
    { label: "Rejected", status: "REJECTED", color: "text-red-500" },
  ];

  const countByStatus = (status: Status) =>
    gatePasses.filter((gp) => gp.status === status).length;

  // Filtered list
  const filtered = gatePasses.filter((gp) => {
    const matchSearch =
      gp.id.toLowerCase().includes(search.toLowerCase()) ||
      gp.assetTag.toLowerCase().includes(search.toLowerCase()) ||
      gp.carrierName.toLowerCase().includes(search.toLowerCase());
    const matchType =
      filterMovement === "All Movements" ||
      (filterMovement === "OUT only" && gp.type === "OUT") ||
      (filterMovement === "IN only" && gp.type === "IN");
    return matchSearch && matchType;
  });

  // Handlers
  const handleApprove = (notes: string) => {
    if (!actionModal) return;
    setGatePasses((prev) =>
      prev.map((gp) =>
        gp.id === actionModal.id ? { ...gp, status: "APPROVED" } : gp,
      ),
    );
    setActionModal(null);
  };

  const handleReject = (notes: string) => {
    if (!actionModal) return;
    setGatePasses((prev) =>
      prev.map((gp) =>
        gp.id === actionModal.id ? { ...gp, status: "REJECTED" } : gp,
      ),
    );
    setActionModal(null);
  };

  const handleNewGatePass = (form: NewGatePassForm) => {
    const newId = `GP-2026-${String(gatePasses.length + 1).padStart(4, "0")}`;
    const assetTag = form.asset.split(" — ")[0] || "UNKNOWN";
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const newPass: GatePass = {
      id: newId,
      assetTag,
      assetModel: "—",
      type: form.movementType.startsWith("OUT") ? "OUT" : "IN",
      purpose: form.purpose,
      from: form.fromLocation,
      to: form.toLocation,
      expectedReturn: form.expectedReturnDate
        ? `${form.expectedReturnDate}, ${form.expectedReturnTime}`
        : "—",
      actualReturn: "—",
      carrierName: form.carrierName || "—",
      carrierContact: form.carrierContact || "—",
      carrierIdProof: form.carrierIdProof || "—",
      requestedBy: "admin@gmail.com",
      created: `${dateStr}, ${now.toLocaleTimeString()}`,
      issuedAt: "—",
      returnedAt: "—",
      status: "PENDING",
      date: dateStr,
    };
    setGatePasses((prev) => [newPass, ...prev]);
    setShowNewModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">
            Gate Pass Management
          </h1>
          <p className="text-gray-400 text-sm mt-0.5">
            Track asset movement in and out of premises
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <button
            onClick={() => setGatePasses([...INITIAL_GATE_PASSES])}
            className="text-gray-400 hover:text-gray-600 text-lg"
            title="Refresh"
          >
            ↻
          </button>
          <button
            onClick={() => setShowNewModal(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition text-sm"
          >
            + New Gate Pass
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {stats.map(({ label, status, color }) => (
          <div
            key={status}
            className="bg-white rounded-xl border border-gray-200 p-5 text-center shadow-sm"
          >
            <p className={`text-3xl font-bold ${color}`}>
              {countByStatus(status)}
            </p>
            <p className="text-gray-500 text-sm mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            🔍
          </span>
          <input
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-white"
            placeholder="Search gate pass, asset, carrier..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div ref={filterRef} className="relative">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className={`flex items-center gap-2 border rounded-xl px-4 py-2.5 text-sm font-medium bg-white transition ${
              filterOpen
                ? "border-indigo-500 ring-2 ring-indigo-200 text-indigo-600"
                : "border-gray-200 text-gray-700 hover:border-gray-300"
            }`}
          >
            {filterMovement} <span className="text-gray-400">▾</span>
          </button>
          {filterOpen && (
            <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              {(
                ["All Movements", "OUT only", "IN only"] as FilterMovement[]
              ).map((opt) => (
                <div
                  key={opt}
                  onClick={() => {
                    setFilterMovement(opt);
                    setFilterOpen(false);
                  }}
                  className={`px-4 py-2.5 text-sm cursor-pointer ${
                    filterMovement === opt
                      ? "bg-gray-600 text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {opt}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-5 py-3 text-xs font-bold text-gray-400 tracking-widest">
                GATE PASS #
              </th>
              <th className="text-left px-5 py-3 text-xs font-bold text-gray-400 tracking-widest">
                ASSET
              </th>
              <th className="text-left px-5 py-3 text-xs font-bold text-gray-400 tracking-widest">
                TYPE
              </th>
              <th className="text-left px-5 py-3 text-xs font-bold text-gray-400 tracking-widest">
                PURPOSE
              </th>
              <th className="text-left px-5 py-3 text-xs font-bold text-gray-400 tracking-widest">
                CARRIER
              </th>
              <th className="text-left px-5 py-3 text-xs font-bold text-gray-400 tracking-widest">
                STATUS
              </th>
              <th className="text-left px-5 py-3 text-xs font-bold text-gray-400 tracking-widest">
                DATE
              </th>
              <th className="text-left px-5 py-3 text-xs font-bold text-gray-400 tracking-widest">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((gp) => (
              <tr
                key={gp.id}
                className="border-b border-gray-50 hover:bg-gray-50 transition"
              >
                <td className="px-5 py-4">
                  <button
                    onClick={() => setSelectedGatePass(gp)}
                    className="text-indigo-600 font-semibold hover:underline"
                  >
                    {gp.id}
                  </button>
                </td>
                <td className="px-5 py-4">
                  <p className="font-semibold text-gray-800">{gp.assetTag}</p>
                  <p className="text-gray-400 text-xs">{gp.assetModel}</p>
                </td>
                <td className="px-5 py-4">
                  <TypeBadge type={gp.type} />
                </td>
                <td className="px-5 py-4 text-gray-600">{gp.purpose}</td>
                <td className="px-5 py-4 text-gray-600">{gp.carrierName}</td>
                <td className="px-5 py-4">
                  <StatusBadge status={gp.status} />
                </td>
                <td className="px-5 py-4 text-gray-500">{gp.date}</td>
                <td className="px-5 py-4">
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() =>
                        setActionModal({ type: "approve", id: gp.id })
                      }
                      className="text-blue-500 hover:text-blue-700 text-xl"
                      title="Approve"
                    >
                      ✅
                    </button>
                    <button
                      onClick={() =>
                        setActionModal({ type: "reject", id: gp.id })
                      }
                      className="text-red-400 hover:text-red-600 text-xl"
                      title="Reject"
                    >
                      ❌
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-5 py-3 text-xs text-gray-400">
          Showing {filtered.length} of {gatePasses.length} gate passes
        </div>
      </div>

      {/* Gate Pass Detail Modal */}
      {selectedGatePass && (
        <GatePassDetailModal
          gatePass={selectedGatePass}
          onClose={() => setSelectedGatePass(null)}
        />
      )}

      {/* Approve / Reject Modal */}
      {actionModal && (
        <ActionModal
          type={actionModal.type}
          onClose={() => setActionModal(null)}
          onConfirm={
            actionModal.type === "approve" ? handleApprove : handleReject
          }
        />
      )}

      {/* New Gate Pass Modal */}
      {showNewModal && (
        <GatePassRequestModal
          onClose={() => setShowNewModal(false)}
          onSubmit={handleNewGatePass}
          assets={SAMPLE_ASSETS}
        />
      )}
    </div>
  );
}

export default AssetGatePass;
