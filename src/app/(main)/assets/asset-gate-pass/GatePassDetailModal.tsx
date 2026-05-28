"use client";

import type { ReactNode } from "react";
import { FiX, FiArrowUpRight, FiArrowDownLeft } from "react-icons/fi";
import { GatePass, GatePassStatus, MovementType } from "../../../../store/gatePasses/gatePassTypes";

type Props = {
  gatePass: GatePass;
  onClose: () => void;
};

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
      <span className="text-gray-400 text-sm">{label}</span>
      <span className="font-semibold text-gray-800 text-sm">{value || "—"}</span>
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="text-xs font-bold text-gray-400 tracking-widest mt-4 mb-1">{children}</p>;
}

function StatusBadge({ status }: { status: GatePassStatus }) {
  const styles: Record<GatePassStatus, string> = {
    PENDING: "bg-yellow-100 text-yellow-700 border border-yellow-300",
    APPROVED: "bg-blue-100 text-blue-700 border border-blue-300",
    ISSUED: "bg-purple-100 text-purple-700 border border-purple-300",
    RETURNED: "bg-green-100 text-green-700 border border-green-300",
    REJECTED: "bg-red-100 text-red-700 border border-red-300",
  };
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${styles[status]}`}>{status}</span>
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

export default function GatePassDetailModal({ gatePass, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/30">
      <div className="bg-white h-full w-full max-w-lg overflow-y-auto shadow-2xl p-8 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600"
        >
          <FiX size={20} />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{gatePass.gatePassId}</h2>
        <div className="flex gap-2 mb-6">
          <StatusBadge status={gatePass.status} />
          <TypeBadge type={gatePass.type} />
        </div>

        {/* Asset */}
        <SectionLabel>ASSET</SectionLabel>
        <DetailRow label="Asset Tag" value={gatePass.asset.assetTag} />
        <DetailRow label="Asset Model" value={gatePass.asset.model || gatePass.asset.device} />

        {/* Movement */}
        <SectionLabel>MOVEMENT</SectionLabel>
        <DetailRow label="Purpose" value={gatePass.purpose} />
        <DetailRow label="From" value={gatePass.from} />
        <DetailRow label="To" value={gatePass.to} />
        <DetailRow label="Expected Return" value={gatePass.expectedReturn} />
        <DetailRow label="Actual Return" value={gatePass.actualReturn} />

        {/* Carrier */}
        <SectionLabel>CARRIER</SectionLabel>
        <DetailRow label="Name" value={gatePass.carrierName} />
        <DetailRow label="Contact" value={gatePass.carrierContact} />
        <DetailRow label="ID Proof" value={gatePass.carrierIdProof} />

        {/* Workflow */}
        <SectionLabel>WORKFLOW</SectionLabel>
        <DetailRow label="Requested By" value={gatePass.requestedBy} />
        <DetailRow label="Notes" value={gatePass.notes} />
        <DetailRow label="Issued At" value={gatePass.issuedAt} />
        <DetailRow label="Returned At" value={gatePass.returnedAt} />
      </div>
    </div>
  );
}
