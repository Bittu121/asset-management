"use client";
import { useRouter } from "next/navigation";
import {
  CubeIcon,
  CheckCircleIcon,
  WrenchScrewdriverIcon,
  CurrencyRupeeIcon,
  UserCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

function ActionBtn({ label, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 text-xs rounded-md bg-gray-900 text-white hover:bg-gray-800 transition"
    >
      {label}
    </button>
  );
}

export default function Dashboard() {
  const router = useRouter();

  const cards = [
    {
      title: "Total Assets",
      value: 16,
      icon: CubeIcon,
      bg: "bg-indigo-50 border-indigo-100",
      text: "text-indigo-600",
    },
    {
      title: "Active",
      value: 5,
      icon: CheckCircleIcon,
      bg: "bg-green-50 border-green-100",
      text: "text-green-600",
    },
    {
      title: "In Maintenance",
      value: 1,
      icon: WrenchScrewdriverIcon,
      bg: "bg-amber-50 border-amber-100",
      text: "text-amber-600",
    },
    {
      title: "Total Value",
      value: "₹8,000",
      icon: CurrencyRupeeIcon,
      bg: "bg-blue-50 border-blue-100",
      text: "text-blue-600",
    },
    {
      title: "Assigned",
      value: 8,
      icon: UserCircleIcon,
      bg: "bg-purple-50 border-purple-100",
      text: "text-purple-600",
    },
    {
      title: "Warranty Issues",
      value: 8,
      icon: ExclamationTriangleIcon,
      bg: "bg-red-50 border-red-100",
      text: "text-red-600",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* LEFT */}
        <div>
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
            Asset Management
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Manage assets, allocations, and lifecycle tracking
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          {/* ACTION GROUP */}
          <div className="flex flex-wrap items-center bg-gray-100 rounded-lg p-1 gap-2">
            <button
              onClick={() => router.push("/assets/asset")}
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs rounded-md bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition"
            >
              Assets
            </button>

            <button
              onClick={() => router.push("/assets/asset-allocation")}
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs rounded-md bg-green-100 text-green-600 hover:bg-green-200 transition"
            >
              Allocation
            </button>

            <button
              onClick={() => router.push("/assets/asset-bulk-upload")}
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs rounded-md bg-amber-100 text-amber-600 hover:bg-amber-200 transition"
            >
              Bulk Upload
            </button>

            <button
              onClick={() => router.push("/assets/asset-gate-pass")}
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs rounded-md bg-purple-100 text-purple-600 hover:bg-purple-200 transition"
            >
              Gate Pass
            </button>
          </div>

          {/* Divider (hidden on mobile) */}
          <div className="hidden sm:block h-5 w-px bg-gray-200" />

          {/* EXPORT BUTTON */}
          <button className="w-full sm:w-auto px-3 py-1.5 text-xs rounded-md bg-gray-900 text-white hover:bg-black transition">
            Export
          </button>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 w-full mt-10 mb-5">
        {cards.map((card, i) => {
          const Icon = card.icon;

          return (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl px-3 py-3 flex items-center justify-between hover:shadow-sm transition min-h-[70px]"
            >
              {/* LEFT */}
              <div>
                <p className="text-[11px] text-gray-500 font-medium leading-tight">
                  {card.title}
                </p>
                <h2 className="text-lg font-semibold text-gray-800 mt-1">
                  {card.value}
                </h2>
              </div>

              {/* RIGHT ICON */}
              <div
                className={`${card.bg} border p-1.5 rounded-md flex items-center justify-center`}
              >
                <Icon className={`h-4 w-4 ${card.text}`} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Status Breakdown
          </h3>

          {[
            { label: "Active", value: 5, color: "bg-green-500" },
            { label: "Maintenance", value: 1, color: "bg-yellow-500" },
            { label: "Retired", value: 0, color: "bg-gray-400" },
            { label: "Disposed", value: 0, color: "bg-red-500" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${item.color}`} />
                <span className="text-sm text-gray-600">{item.label}</span>
              </div>

              <div className="flex items-center gap-2 w-28">
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`${item.color} h-full`}
                    style={{ width: `${item.value * 20}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Warranty Status
          </h3>

          {[
            { label: "Valid", value: 1, color: "text-green-600 bg-green-50" },
            {
              label: "Expiring Soon",
              value: 0,
              color: "text-yellow-600 bg-yellow-50",
            },
            { label: "Expired", value: 1, color: "text-red-600 bg-red-50" },
            {
              label: "No Warranty",
              value: 14,
              color: "text-gray-600 bg-gray-100",
            },
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-600">{item.label}</span>

              <span
                className={`text-xs px-2 py-0.5 rounded-full ${item.color}`}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            By Category
          </h3>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Uncategorized</span>
            <span className="text-sm font-medium text-gray-700">16</span>
          </div>

          <div className="mt-3 h-2 bg-gray-100 rounded-full">
            <div className="h-2 bg-indigo-500 rounded-full w-full" />
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">By Type</h3>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Other</span>
            <span className="text-sm font-medium text-gray-700">16</span>
          </div>

          <div className="mt-3 h-2 bg-gray-100 rounded-full">
            <div className="h-2 bg-gray-700 rounded-full w-full" />
          </div>
        </div>
      </div>

      {/* STATUS + WARRANTY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* STATUS BREAKDOWN */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Status Breakdown
          </h3>

          {[
            { label: "Active", value: 5, color: "bg-green-500" },
            { label: "Maintenance", value: 1, color: "bg-yellow-500" },
            { label: "Retired", value: 0, color: "bg-gray-400" },
            { label: "Disposed", value: 0, color: "bg-red-500" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between mb-3">
              {/* Left */}
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${item.color}`} />
                <span className="text-sm text-gray-600">{item.label}</span>
              </div>

              {/* Right */}
              <div className="flex items-center gap-3 w-32">
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`${item.color} h-full`}
                    style={{ width: `${item.value * 20}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500">{item.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* WARRANTY STATUS */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Warranty Status
          </h3>

          {[
            { label: "Valid", value: 1, style: "bg-green-50 text-green-600" },
            {
              label: "Expiring Soon",
              value: 0,
              style: "bg-yellow-50 text-yellow-600",
            },
            { label: "Expired", value: 1, style: "bg-red-50 text-red-600" },
            {
              label: "No Warranty",
              value: 14,
              style: "bg-gray-100 text-gray-600",
            },
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-600">{item.label}</span>

              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${item.style}`}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* PREMIUM CARDS */}
      <div className="grid grid-col-1 sm:grid-cols-2 gap-4">
        {/* VALUE */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-gray-700">
            Asset Value Overview
          </h3>

          <div className="flex justify-between">
            <div>
              <p className="text-xs text-gray-500">Total Purchase</p>
              <h2 className="text-lg font-semibold text-gray-800">₹1,00,055</h2>
            </div>

            <div>
              <p className="text-xs text-gray-500">Current Value</p>
              <h2 className="text-lg font-semibold text-gray-800">₹89,110</h2>
            </div>
          </div>

          <div className="border-t pt-3 flex justify-between text-sm">
            <span className="text-gray-500">Depreciation</span>
            <span className="text-red-500 font-medium">₹10,945 (10.9%)</span>
          </div>
        </div>

        {/* ASSIGNMENT */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-gray-700">
            Assignment Overview
          </h3>

          <div className="flex justify-between">
            <div>
              <p className="text-xs text-gray-500">Assigned</p>
              <h2 className="text-lg font-semibold text-gray-800">8</h2>
            </div>

            <div>
              <p className="text-xs text-gray-500">Unassigned</p>
              <h2 className="text-lg font-semibold text-gray-800">8</h2>
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Assigned</span>
                <span>50%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div className="h-2 bg-indigo-500 rounded-full w-1/2" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Unassigned</span>
                <span>50%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div className="h-2 bg-gray-400 rounded-full w-1/2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
