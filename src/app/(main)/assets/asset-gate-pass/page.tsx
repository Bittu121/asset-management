"use client";

import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import {
  FiSearch,
  FiRefreshCw,
  FiArrowUpRight,
  FiArrowDownLeft,
  FiLoader,
} from "react-icons/fi";

import GatePassDetailModal from "./GatePassDetailModal";
import ActionModal from "./ActionModal";
import GatePassRequestModal from "./GatePassRequestModal";

import { RootState, AppDispatch } from "../../../../store/auth/store";
import {
  fetchGatePasses,
  createGatePassAction,
  updateGatePassStatusAction,
} from "../../../../store/gatePasses/gatePassActions";
import { fetchAssets } from "../../../../store/assets/assetsActions";
import {
  GatePass,
  GatePassStatus,
  MovementType,
} from "../../../../store/gatePasses/gatePassTypes";

type FilterMovement = "All Movements" | "OUT only" | "IN only";

type NewGatePassForm = {
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
};

const STATUS_STATS: { label: string; status: GatePassStatus; color: string }[] =
  [
    { label: "Pending", status: "PENDING", color: "text-yellow-500" },
    { label: "Approved", status: "APPROVED", color: "text-blue-600" },
    { label: "Issued", status: "ISSUED", color: "text-purple-600" },
    { label: "Returned", status: "RETURNED", color: "text-green-600" },
    { label: "Rejected", status: "REJECTED", color: "text-red-500" },
  ];

const TABLE_HEADERS = [
  "Gate Pass #",
  "Asset",
  "Type",
  "Purpose",
  "Carrier",
  "Status",
  "Date",
  "Actions",
];

const FILTER_OPTIONS: FilterMovement[] = [
  "All Movements",
  "OUT only",
  "IN only",
];

function StatusBadge({ status }: { status: GatePassStatus }) {
  const styles: Record<GatePassStatus, string> = {
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
}

function TypeBadge({ type }: { type: MovementType }) {
  const isOut = type === "OUT";
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold border ${
        isOut
          ? "bg-yellow-50 text-yellow-700 border-yellow-300"
          : "bg-blue-50 text-blue-700 border-blue-300"
      }`}
    >
      {isOut ? <FiArrowUpRight size={12} /> : <FiArrowDownLeft size={12} />}
      {type}
    </span>
  );
}

export default function AssetGatePass() {
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((s: RootState) => s.auth);
  const isAdmin = ["admin", "superadmin", "manager"].includes(
    user?.role?.toLowerCase() ?? "",
  );

  const gatePasses = useSelector((s: RootState) => s.gatePasses.gatePasses);
  const isLoading = useSelector((s: RootState) => s.gatePasses.loading);
  const isCreating = useSelector((s: RootState) => s.gatePasses.createLoading);
  const isUpdating = useSelector((s: RootState) => s.gatePasses.updateLoading);
  const rawAssets = useSelector((s: RootState) => s.assets.assets) as any[];

  useEffect(() => {
    dispatch(fetchGatePasses());
    dispatch(fetchAssets());
  }, [dispatch]);

  const assetLabels = rawAssets.map(
    (a) => `${a.assetTag} — ${a.device || a.model || ""}`,
  );
  const assetIdMap: Record<string, string> = {};
  for (const a of rawAssets) {
    const label = `${a.assetTag} — ${a.device || a.model || ""}`;
    assetIdMap[label] = a._id;
  }

  const [search, setSearch] = useState("");
  const [filterMovement, setFilterMovement] =
    useState<FilterMovement>("All Movements");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedGatePass, setSelectedGatePass] = useState<GatePass | null>(
    null,
  );
  const [actionModal, setActionModal] = useState<{
    type: "approve" | "reject";
    id: string;
  } | null>(null);
  const [showNewModal, setShowNewModal] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function countByStatus(status: GatePassStatus): number {
    return gatePasses.filter((gp) => gp.status === status).length;
  }

  function formatDate(isoDate: string): string {
    if (!isoDate) return "—";
    return new Date(isoDate).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  const filteredPasses = gatePasses.filter((gp) => {
    const text = search.toLowerCase();
    const matchesSearch =
      gp.gatePassId?.toLowerCase().includes(text) ||
      gp.asset?.assetTag?.toLowerCase().includes(text) ||
      gp.carrierName?.toLowerCase().includes(text);

    const matchesType =
      filterMovement === "All Movements" ||
      (filterMovement === "OUT only" && gp.type === "OUT") ||
      (filterMovement === "IN only" && gp.type === "IN");

    return matchesSearch && matchesType;
  });

  function handleApprove(notes: string) {
    if (!actionModal) return;
    dispatch(
      updateGatePassStatusAction(
        actionModal.id,
        { status: "APPROVED", notes },
        () => setActionModal(null),
      ),
    );
  }

  function handleReject(notes: string) {
    if (!actionModal) return;
    dispatch(
      updateGatePassStatusAction(
        actionModal.id,
        { status: "REJECTED", notes },
        () => setActionModal(null),
      ),
    );
  }

  function handleNewGatePass(form: NewGatePassForm) {
    const assetId = assetIdMap[form.asset];
    if (!assetId) return;

    dispatch(
      createGatePassAction(
        {
          asset: assetId,
          type: form.movementType.startsWith("OUT") ? "OUT" : "IN",
          purpose: form.purpose,
          from: form.fromLocation,
          to: form.toLocation,
          expectedReturn: form.expectedReturnDate
            ? `${form.expectedReturnDate}, ${form.expectedReturnTime}`
            : "",
          carrierName: form.carrierName,
          carrierContact: form.carrierContact,
          carrierIdProof: form.carrierIdProof,
        },
        () => setShowNewModal(false),
      ),
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-600">
            Gate Pass Management
          </h1>
          <p className="text-gray-400 text-sm mt-0.5">
            Track asset movement in and out of premises
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <button
            onClick={() => dispatch(fetchGatePasses())}
            className="text-gray-400 hover:text-gray-600"
            title="Refresh"
          >
            <FiRefreshCw
              size={18}
              className={isLoading ? "animate-spin" : ""}
            />
          </button>
          <button
            onClick={() => setShowNewModal(true)}
            disabled={isCreating}
            className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-md font-semibold text-sm disabled:opacity-60"
          >
            {isCreating ? "Creating..." : "New Gate Pass"}
          </button>
        </div>
      </div>

      {/* Status stat cards */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {STATUS_STATS.map(({ label, status, color }) => (
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

      {/* Search and filter bar */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1 relative">
          <FiSearch
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-white"
            placeholder="Search gate pass ID, asset, carrier..."
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
            {filterMovement}
            <span className="text-gray-400">▾</span>
          </button>
          {filterOpen && (
            <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              {FILTER_OPTIONS.map((option) => (
                <div
                  key={option}
                  onClick={() => {
                    setFilterMovement(option);
                    setFilterOpen(false);
                  }}
                  className={`px-4 py-2.5 text-sm cursor-pointer ${
                    filterMovement === option
                      ? "bg-gray-600 text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Gate passes table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              {TABLE_HEADERS.map((header) => (
                <th
                  key={header}
                  className="text-left px-5 py-3 text-xs font-bold text-gray-400 tracking-widest"
                >
                  {header.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Loading skeleton row */}
            {isLoading && (
              <tr>
                <td
                  colSpan={8}
                  className="px-5 py-10 text-center text-sm text-gray-400"
                >
                  <div className="flex items-center justify-center gap-2">
                    <FiLoader size={16} className="animate-spin" />
                    Loading gate passes...
                  </div>
                </td>
              </tr>
            )}

            {/* Empty state */}
            {!isLoading && filteredPasses.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-5 py-10 text-center text-sm text-gray-400"
                >
                  No gate passes found.
                </td>
              </tr>
            )}

            {/* Data rows */}
            {!isLoading &&
              filteredPasses.map((gp) => (
                <tr
                  key={gp._id}
                  className="border-b border-gray-50 hover:bg-gray-50 transition"
                >
                  {/* Gate pass ID — clickable to open detail panel */}
                  <td className="px-5 py-4">
                    <button
                      onClick={() => setSelectedGatePass(gp)}
                      className="text-indigo-600 font-semibold hover:underline"
                    >
                      {gp.gatePassId}
                    </button>
                  </td>

                  {/* Asset tag and model */}
                  <td className="px-5 py-4">
                    <p className="font-semibold text-gray-800">
                      {gp.asset?.assetTag}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {gp.asset?.model || gp.asset?.device}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <TypeBadge type={gp.type} />
                  </td>
                  <td className="px-5 py-4 text-gray-600">{gp.purpose}</td>
                  <td className="px-5 py-4 text-gray-600">
                    {gp.carrierName || "—"}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={gp.status} />
                  </td>
                  <td className="px-5 py-4 text-gray-500">
                    {formatDate(gp.createdAt)}
                  </td>

                  {/* Approve / Reject — visible to admin/manager only */}
                  <td className="px-5 py-4">
                    {isAdmin ? (
                      <div className="flex gap-2 items-center">
                        <button
                          onClick={() =>
                            setActionModal({ type: "approve", id: gp._id })
                          }
                          disabled={isUpdating}
                          className="text-blue-500 hover:text-blue-700 disabled:opacity-40"
                          title="Approve"
                        >
                          <FaCheck size={18} />
                        </button>
                        <button
                          onClick={() =>
                            setActionModal({ type: "reject", id: gp._id })
                          }
                          disabled={isUpdating}
                          className="text-red-500 hover:text-red-700 disabled:opacity-40"
                          title="Reject"
                        >
                          <RxCross2 size={20} />
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="px-5 py-3 text-xs text-gray-400">
          Showing {filteredPasses.length} of {gatePasses.length} gate passes
        </div>
      </div>

      {/* Gate Pass Detail side panel */}
      {selectedGatePass && (
        <GatePassDetailModal
          gatePass={selectedGatePass}
          onClose={() => setSelectedGatePass(null)}
        />
      )}

      {/* Approve / Reject confirmation popup */}
      {actionModal && (
        <ActionModal
          type={actionModal.type}
          onClose={() => setActionModal(null)}
          onConfirm={
            actionModal.type === "approve" ? handleApprove : handleReject
          }
        />
      )}

      {/* New Gate Pass form popup */}
      {showNewModal && (
        <GatePassRequestModal
          onClose={() => setShowNewModal(false)}
          onSubmit={handleNewGatePass}
          assets={assetLabels}
          isLoading={isCreating}
        />
      )}
    </div>
  );
}
