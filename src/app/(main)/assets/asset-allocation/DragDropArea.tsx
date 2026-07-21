"use client";

import { useState } from "react";
import { GripVertical, User } from "lucide-react";
import { Asset, User as UserType, Allocation } from "./types";

type Props = {
  assets: Asset[];
  users: UserType[];
  allocations: Allocation[];
  onAssign: (assetId: string, userId: string) => void;
};

export default function DragDropArea({ assets, users, allocations, onAssign }: Props) {
  const [draggingAssetId, setDraggingAssetId] = useState<string | null>(null);
  const [hoverUserId, setHoverUserId] = useState<string | null>(null);

  const availableAssets = assets.filter((a) => a.status === "AVAILABLE");

  function countAssigned(userId: string): number {
    return allocations.filter((a) => a.allocatedTo?._id === userId && a.status !== "RETURNED")
      .length;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* LEFT — Available assets */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-gray-100 bg-gray-50">
          <h3 className="text-sm font-semibold text-gray-700">Available Assets</h3>
          <p className="text-xs text-gray-400 mt-0.5">Drag an asset onto a user to assign it</p>
        </div>

        <div className="p-4 space-y-2 min-h-48">
          {availableAssets.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-10">
              All assets are currently allocated
            </p>
          ) : (
            availableAssets.map((asset) => (
              <div
                key={asset._id}
                draggable
                onDragStart={() => setDraggingAssetId(asset._id)}
                onDragEnd={() => setDraggingAssetId(null)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-grab active:cursor-grabbing select-none transition-all ${
                  draggingAssetId === asset._id
                    ? "border-indigo-300 bg-indigo-50 opacity-60 scale-95"
                    : "border-gray-200 bg-gray-50 hover:border-indigo-200"
                }`}
              >
                <GripVertical size={14} className="text-gray-300 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-800">{asset.assetTag}</p>
                  <p className="text-xs text-gray-400">{asset.device}</p>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
                  Available
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* RIGHT — Users drop targets */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-gray-100 bg-gray-50">
          <h3 className="text-sm font-semibold text-gray-700">Users</h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Drop an asset here to assign it to this user
          </p>
        </div>

        <div className="p-4 space-y-2">
          {users.map((user) => (
            <div
              key={user._id}
              onDragOver={(e) => {
                e.preventDefault();
                setHoverUserId(user._id);
              }}
              onDragLeave={() => setHoverUserId(null)}
              onDrop={() => {
                if (draggingAssetId !== null) onAssign(draggingAssetId, user._id);
                setDraggingAssetId(null);
                setHoverUserId(null);
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all ${
                hoverUserId === user._id
                  ? "border-indigo-400 bg-indigo-50 shadow-sm"
                  : "border-gray-200 bg-gray-50 hover:border-gray-300"
              }`}
            >
              <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                <User size={15} className="text-indigo-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full shrink-0">
                {countAssigned(user._id)} assigned
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
