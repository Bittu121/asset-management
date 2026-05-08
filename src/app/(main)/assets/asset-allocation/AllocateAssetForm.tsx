"use client";
import { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

type Asset = {
  id: number;
  assetTag: string;
  assetName: string;
  status: "AVAILABLE" | "ALLOCATED";
};

type User = {
  id: number;
  name: string;
  email: string;
};

type Props = {
  assets: Asset[];
  users: User[];
  onSubmit: (data: {
    assetId: number;
    userId: number;
    returnDate: string;
    notes: string;
  }) => void;
  onClose: () => void;
};

export default function AllocateAssetForm({
  assets,
  users,
  onSubmit,
  onClose,
}: Props) {
  const availableAssets = assets.filter((a) => a.status === "AVAILABLE");

  const [form, setForm] = useState({
    asset: null as Asset | null,
    user: null as User | null,
    returnDate: "",
    notes: "",
  });

  const canSubmit = form.asset && form.user && form.returnDate !== "";

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden">
        <div className="bg-indigo-50 px-6 py-5 flex justify-between">
          <div>
            <h2 className="text-lg font-bold">Allocate Asset</h2>
            <p className="text-sm text-gray-500">Assign asset to user</p>
          </div>
          <button onClick={onClose} className="text-lg">
            ✕
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          {/* Asset Autocomplete */}
          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              Asset <span className="text-red-500">*</span>
            </label>

            <Autocomplete
              options={availableAssets}
              getOptionLabel={(a) => `${a.assetTag} - ${a.assetName}`}
              value={form.asset}
              onChange={(e, value) =>
                setForm((prev) => ({ ...prev, asset: value }))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select Asset"
                  size="small"
                  sx={muiStyle}
                />
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              User <span className="text-red-500">*</span>
            </label>

            <Autocomplete
              options={users}
              getOptionLabel={(u) => u.name}
              value={form.user}
              onChange={(e, value) =>
                setForm((prev) => ({ ...prev, user: value }))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select User"
                  size="small"
                  sx={muiStyle}
                />
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              Expected Return Date *
            </label>
            <input
              type="date"
              value={form.returnDate}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  returnDate: e.target.value,
                }))
              }
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              Notes
            </label>
            <textarea
              value={form.notes}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  notes: e.target.value,
                }))
              }
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50"
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 rounded-md text-sm"
          >
            Cancel
          </button>

          <button
            disabled={!canSubmit}
            onClick={() => {
              if (!canSubmit) return;

              onSubmit({
                assetId: form.asset!.id,
                userId: form.user!.id,
                returnDate: form.returnDate,
                notes: form.notes,
              });
            }}
            className={`px-4 text-sm py-2 text-white rounded-md ${
              canSubmit ? "bg-indigo-600 hover:bg-indigo-700" : "bg-indigo-300"
            }`}
          >
            Allocate
          </button>
        </div>
      </div>
    </div>
  );
}

const muiStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "0.5rem",
    backgroundColor: "#f9fafb",
    height: "42px",

    "& fieldset": {
      borderColor: "#e5e7eb",
    },

    "&:hover fieldset": {
      borderColor: "#e5e7eb",
    },

    "&.Mui-focused": {
      boxShadow: "0 0 0 2px rgba(199,210,254,0.8)",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#c7d2fe",
    },

    "& input": {
      padding: "10px 16px",
      fontSize: "14px",
      color: "#374151",
    },
  },
};
