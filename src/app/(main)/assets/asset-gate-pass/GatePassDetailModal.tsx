"use client";
import React from "react";

type Status = "PENDING" | "APPROVED" | "ISSUED" | "RETURNED" | "REJECTED";
type MovementType = "OUT" | "IN";

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

interface GatePassDetailModalProps {
  gatePass: GatePass;
  onClose: () => void;
}

const DetailRow: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
    <span className="text-gray-400 text-sm">{label}</span>
    <span className="font-semibold text-gray-800 text-sm">{value}</span>
  </div>
);

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <p className="text-xs font-bold text-gray-400 tracking-widest mt-4 mb-1">
    {children}
  </p>
);

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

const GatePassDetailModal: React.FC<GatePassDetailModalProps> = ({
  gatePass,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/30">
      <div className="bg-white h-full w-full max-w-lg overflow-y-auto shadow-2xl p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-xl font-light"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{gatePass.id}</h2>
        <div className="flex gap-2 mb-6">
          <StatusBadge status={gatePass.status} />
          <TypeBadge type={gatePass.type} />
        </div>

        <SectionLabel>ASSET</SectionLabel>
        <DetailRow label="Asset Tag" value={gatePass.assetTag} />
        <DetailRow label="Asset Model" value={gatePass.assetModel} />

        <SectionLabel>MOVEMENT</SectionLabel>
        <DetailRow label="Purpose" value={gatePass.purpose} />
        <DetailRow label="From" value={gatePass.from} />
        <DetailRow label="To" value={gatePass.to} />
        <DetailRow label="Expected Return" value={gatePass.expectedReturn} />
        <DetailRow label="Actual Return" value={gatePass.actualReturn} />

        <SectionLabel>CARRIER</SectionLabel>
        <DetailRow label="Name" value={gatePass.carrierName} />
        <DetailRow label="Contact" value={gatePass.carrierContact} />
        <DetailRow label="ID Proof" value={gatePass.carrierIdProof} />

        <SectionLabel>WORKFLOW</SectionLabel>
        <DetailRow label="Requested By" value={gatePass.requestedBy} />
        <DetailRow label="Created" value={gatePass.created} />
        <DetailRow label="Issued At" value={gatePass.issuedAt} />
        <DetailRow label="Returned At" value={gatePass.returnedAt} />
      </div>
    </div>
  );
};

export default GatePassDetailModal;
