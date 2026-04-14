"use client";
import { X } from "lucide-react";
import AssetForm from "./AssetForm";

export default function AddAssetModal({ isOpen, onClose, onSubmit }: any) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg overflow-hidden">
        <div className="bg-indigo-50 px-6 py-5 flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Create Asset</h2>
            <p className="text-gray-500 text-sm mt-1">
              Add a new asset to the system
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-black text-xl font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <AssetForm onSubmit={onSubmit} onClose={onClose} isEdit={false} />
        </div>
      </div>
    </div>
  );
}
