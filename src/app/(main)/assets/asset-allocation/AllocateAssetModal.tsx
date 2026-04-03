"use client";
import { X } from "lucide-react";
import AllocateAssetForm from "./AllocateAssetForm";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { assetId: number; userId: number; returnDate: string; notes: string }) => void;
  assets: {
    id: number;
    assetTag: string;
    assetName: string;
    status: "AVAILABLE" | "ALLOCATED";
  }[];
  users: {
    id: number;
    name: string;
    email: string;
  }[];
};

export default function AllocateAssetModal({
  isOpen,
  onClose,
  onSubmit,
  assets,
  users,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-lg animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Allocate Asset
          </h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500 hover:text-black" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <AllocateAssetForm assets={assets} users={users} onSubmit={onSubmit} onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
