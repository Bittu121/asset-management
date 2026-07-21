"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoPlusCircle } from "react-icons/go";

import ActiveAllocations from "./ActiveAllocations";
import OverdueAllocations from "./OverdueAllocations";
import ReturnHistory from "./ReturnHistory";
import DragDropArea from "./DragDropArea";
import AllocateAssetModal from "./AllocateAssetModal";
import ReturnAssetModal from "./ReturnAssetModal";

import {
  fetchAllocations,
  createAllocationAction,
  returnAllocationAction,
} from "../../../../store/allocations/allocationActions";
import { fetchAssets } from "../../../../store/assets/assetsActions";
import { fetchUserAccounts } from "../../../../store/userAccounts/userAccountsActions";
import { RootState, AppDispatch } from "../../../../store/auth/store";

import { Asset, User, Allocation, isOverdue, today, thirtyDaysFromNow } from "./types";

type Tab = "active" | "overdue" | "dragdrop" | "history";

const TABS: { key: Tab; label: string }[] = [
  { key: "active", label: "Active" },
  { key: "overdue", label: "Overdue" },
  { key: "dragdrop", label: "Drag & Drop" },
  { key: "history", label: "Return History" },
];

export default function AssetAllocationPage() {
  const dispatch = useDispatch<AppDispatch>();

  const rawAllocations = useSelector((s: RootState) => s.allocations.allocations);
  const rawAssets = useSelector((s: RootState) => s.assets.assets);
  const rawUsers = useSelector((s: RootState) => s.userAccounts.users);
  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchAllocations());
    dispatch(fetchAssets());
    dispatch(fetchUserAccounts());
  }, [dispatch]);

  // Compute asset status: AVAILABLE if no active allocation exists for it
  const assets: Asset[] = rawAssets.map((a: any) => {
    const isAllocated = rawAllocations.some(
      (al: Allocation) => al.asset?._id === a._id && al.status !== "RETURNED"
    );
    return {
      _id: a._id,
      assetTag: a.assetTag,
      device: a.device,
      isActive: a.isActive,
      status: isAllocated ? "ALLOCATED" : "AVAILABLE",
    };
  });

  const users: User[] = rawUsers.map((u: any) => ({
    _id: u._id,
    name: u.name,
    email: u.email,
    employeeCode: u.employeeCode,
  }));

  const allocations: Allocation[] = rawAllocations;

  const [activeTab, setActiveTab] = useState<Tab>("active");
  const [allocateModalOpen, setAllocateModalOpen] = useState(false);
  const [returnModalOpen, setReturnModalOpen] = useState(false);
  const [allocationToReturn, setAllocationToReturn] = useState<Allocation | null>(null);

  function handleReturnClick(allocation: Allocation) {
    setAllocationToReturn(allocation);
    setReturnModalOpen(true);
  }

  // Confirm return: send PUT to API via Redux action
  function handleReturnConfirm({ condition, notes }: { condition: string; notes: string }) {
    if (!allocationToReturn) return;
    dispatch(
      returnAllocationAction(allocationToReturn._id, { condition, notes }, () => {
        setReturnModalOpen(false);
        setAllocationToReturn(null);
      })
    );
  }

  // Submit from AllocateAssetModal: POST new allocation to API
  function handleAllocateSubmit(payload: {
    assetId: string;
    userId: string;
    expectedReturn: string;
    notes: string;
  }) {
    dispatch(
      createAllocationAction(
        {
          asset: payload.assetId,
          allocatedTo: payload.userId,
          allocationDate: today(),
          expectedReturn: payload.expectedReturn,
        },
        () => setAllocateModalOpen(false)
      )
    );
  }

  // Drop from DragDropArea: assign with default 30-day return window
  function handleDragAssign(assetId: string, userId: string) {
    dispatch(
      createAllocationAction({
        asset: assetId,
        allocatedTo: userId,
        allocationDate: today(),
        expectedReturn: thirtyDaysFromNow(),
      })
    );
  }

  // Summary counts for stat cards
  const activeCount = allocations.filter((a) => a.status !== "RETURNED" && !isOverdue(a)).length;
  const overdueCount = allocations.filter((a) => a.status !== "RETURNED" && isOverdue(a)).length;
  const returnedCount = allocations.filter((a) => a.status === "RETURNED").length;

  return (
    <div className="p-4 bg-[#f8fafc] min-h-screen space-y-4">
      {/* Page header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Asset Allocation</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Manage asset assignments, returns, and overdue tracking
          </p>
        </div>
        <button
          onClick={() => setAllocateModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium bg-gray-900 text-white rounded-md hover:bg-gray-700 transition"
        >
          <GoPlusCircle size={16} />
          Allocate Asset
        </button>
      </div>

      {/* Summary stat cards */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Active" value={activeCount} color="text-green-600" />
        <StatCard label="Overdue" value={overdueCount} color="text-red-600" />
        <StatCard label="Returned" value={returnedCount} color="text-gray-600" />
      </div>

      {/* Tab bar */}
      <div className="inline-flex bg-gray-100 p-1 rounded-lg gap-1">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-1.5 text-sm rounded-md transition-all duration-150 ${
              activeTab === key
                ? "bg-white text-gray-900 shadow-sm font-semibold"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "active" && (
        <ActiveAllocations allocations={allocations} onReturn={handleReturnClick} />
      )}
      {activeTab === "overdue" && (
        <OverdueAllocations allocations={allocations} onReturn={handleReturnClick} />
      )}
      {activeTab === "history" && <ReturnHistory allocations={allocations} />}
      {activeTab === "dragdrop" && (
        <DragDropArea
          assets={assets}
          users={users}
          allocations={allocations}
          onAssign={handleDragAssign}
        />
      )}

      {/* Allocate Asset modal */}
      <AllocateAssetModal
        isOpen={allocateModalOpen}
        onClose={() => setAllocateModalOpen(false)}
        assets={assets}
        users={users}
        onSubmit={handleAllocateSubmit}
      />

      {/* Return Asset modal */}
      <ReturnAssetModal
        isOpen={returnModalOpen}
        onClose={() => {
          setReturnModalOpen(false);
          setAllocationToReturn(null);
        }}
        assetTag={allocationToReturn?.asset?.assetTag ?? ""}
        onSubmit={handleReturnConfirm}
      />
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-white rounded-lg border border-gray-100 px-5 py-4 shadow-sm">
      <p className="text-xs text-gray-400 font-medium">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
    </div>
  );
}
