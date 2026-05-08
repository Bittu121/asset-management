"use client";

import { X } from "lucide-react";
import AllocateAssetForm from "./AllocateAssetForm";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    assetId: number;
    userId: number;
    returnDate: string;
    notes: string;
  }) => void;
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
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 px-3">
      <div className="bg-white w-full max-w-xl rounded-lg shadow-lg overflow-hidden">
        <div className="bg-indigo-50 px-6 py-5 flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Allocate Asset</h2>
            <p className="text-gray-500 text-sm mt-1">Assign asset to a user</p>
          </div>

          <button
            onClick={onClose}
            className="text-black text-xl font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-5">
          <AllocateAssetForm
            assets={assets}
            users={users}
            onSubmit={onSubmit}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
}
