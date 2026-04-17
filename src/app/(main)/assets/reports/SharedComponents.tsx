"use client";
import React from "react";

export const StatCard: React.FC<{
  label: string;
  value: string | number;
  sub?: string;
  color: string;
  icon: string;
}> = ({ label, value, sub, color, icon }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-4 shadow-sm">
    <div
      className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl ${color}`}
    >
      {icon}
    </div>
    <div>
      <p className="text-xl font-bold text-gray-800">{value}</p>
      <p className="text-sm text-gray-500 mt-0.5">{label}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  </div>
);

export const SectionHeader: React.FC<{
  title: string;
  subtitle?: string;
  onExport?: () => void;
}> = ({ title, subtitle, onExport }) => (
  <div className="flex justify-between items-start mb-4">
    <div>
      <h3 className="text-base font-bold text-gray-800">{title}</h3>
      {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
    </div>
    {onExport && (
      <button
        onClick={onExport}
        className="inline-flex items-center gap-2 h-9 px-4 rounded-xl border border-indigo-200 bg-indigo-50 text-sm font-medium text-indigo-700 hover:bg-indigo-100 hover:border-indigo-300 transition"
      >
        <span className="text-sm">📄</span>
        <span>Export CSV</span>
      </button>
    )}
  </div>
);

export const Badge: React.FC<{ label: string; type: string }> = ({
  label,
  type,
}) => {
  const styles: Record<string, string> = {
    ACTIVE: "bg-green-100 text-green-700",
    OVERDUE: "bg-red-100 text-red-700",
    RETURNED: "bg-gray-100 text-gray-600",
    PENDING: "bg-yellow-100 text-yellow-700",
    APPROVED: "bg-blue-100 text-blue-700",
    ISSUED: "bg-purple-100 text-purple-700",
    REJECTED: "bg-red-100 text-red-700",
    AVAILABLE: "bg-emerald-100 text-emerald-700",
    ALLOCATED: "bg-orange-100 text-orange-700",
    allocation: "bg-blue-100 text-blue-700",
    return: "bg-green-100 text-green-700",
    gatepass: "bg-purple-100 text-purple-700",
  };
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${styles[type] || "bg-gray-100 text-gray-600"}`}
    >
      {label}
    </span>
  );
};
