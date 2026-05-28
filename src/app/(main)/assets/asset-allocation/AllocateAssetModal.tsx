"use client";

import { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Asset, User } from "./types";

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "0.5rem",
    backgroundColor: "#f9fafb",
    height: "42px",
    "& fieldset": { borderColor: "#e5e7eb" },
    "&:hover fieldset": { borderColor: "#e5e7eb" },
    "&.Mui-focused": { boxShadow: "0 0 0 2px rgba(199,210,254,0.8)" },
    "&.Mui-focused fieldset": { borderColor: "#c7d2fe" },
    "& input": { padding: "10px 16px", fontSize: "14px", color: "#374151" },
  },
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  assets: Asset[];
  users: User[];
  onSubmit: (data: {
    assetId: string;
    userId: string;
    expectedReturn: string;
    notes: string;
  }) => void;
};

export default function AllocateAssetModal({ isOpen, onClose, assets, users, onSubmit }: Props) {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [expectedReturn, setExpectedReturn] = useState("");
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const availableAssets = assets.filter((a) => a.status === "AVAILABLE");
  const isReady = selectedAsset !== null && selectedUser !== null && expectedReturn !== "";

  function handleSubmit() {
    if (!isReady) return;
    onSubmit({
      assetId: selectedAsset!._id,
      userId: selectedUser!._id,
      expectedReturn,
      notes,
    });
  }

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 px-3">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-2xl overflow-hidden">
        <div className="bg-indigo-50 px-6 py-5 flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Allocate Asset</h2>
            <p className="text-sm text-gray-500 mt-1">Assign an asset to a user</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-xl font-bold leading-none"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              Asset <span className="text-red-500">*</span>
            </label>
            <Autocomplete
              options={availableAssets}
              getOptionLabel={(a) => `${a.assetTag} — ${a.device}`}
              value={selectedAsset}
              onChange={(_e, value) => setSelectedAsset(value)}
              noOptionsText="No available assets"
              renderInput={(params) => (
                <TextField {...params} placeholder="Select asset" size="small" sx={inputStyle} />
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              Assign To <span className="text-red-500">*</span>
            </label>
            <Autocomplete
              options={users}
              getOptionLabel={(u) => `${u.name} (${u.employeeCode})`}
              value={selectedUser}
              onChange={(_e, value) => setSelectedUser(value)}
              renderInput={(params) => (
                <TextField {...params} placeholder="Select user" size="small" sx={inputStyle} />
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              Expected Return Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">Notes</label>
            <textarea
              value={notes}
              placeholder="Any notes about this allocation..."
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isReady}
              className="px-4 py-2 text-sm text-white rounded-md bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed"
            >
              Allocate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
