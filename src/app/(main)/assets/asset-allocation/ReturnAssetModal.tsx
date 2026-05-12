"use client";

import { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

const CONDITIONS = ["Good", "Fair", "Poor", "Damaged"];

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
  assetTag: string;
  onSubmit: (data: { condition: string; notes: string }) => void;
};

export default function ReturnAssetModal({
  isOpen,
  onClose,
  assetTag,
  onSubmit,
}: Props) {
  const [condition, setCondition] = useState("Good");
  const [notes, setNotes] = useState("");
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-3">
      <div className="bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden">
        <div className="bg-indigo-50 px-6 py-5 flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Return Asset</h2>
            <p className="text-sm text-gray-500 mt-1">
              Record the asset return details
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-xl font-bold leading-none"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-5">
          <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-100 text-sm text-gray-600">
            Returning:{" "}
            <span className="font-semibold text-gray-900">{assetTag}</span>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              Return Condition <span className="text-red-500">*</span>
            </label>
            <Autocomplete
              options={CONDITIONS}
              value={condition}
              disableClearable
              onChange={(_e, value) => setCondition(value ?? "Good")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select condition"
                  size="small"
                  sx={inputStyle}
                />
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              Notes
            </label>
            <textarea
              value={notes}
              placeholder="Any notes about this return..."
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
              onClick={() => onSubmit({ condition, notes })}
              className="px-4 py-2 text-sm text-white rounded-md bg-indigo-600 hover:bg-indigo-700"
            >
              Confirm Return
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
