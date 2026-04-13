"use client";
import React, { useState } from "react";

interface ActionModalProps {
  type: "approve" | "reject";
  onClose: () => void;
  onConfirm: (notes: string) => void;
}

const ActionModal: React.FC<ActionModalProps> = ({
  type,
  onClose,
  onConfirm,
}) => {
  const [notes, setNotes] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-black text-xl cursor-pointer font-bold"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          {type === "approve" ? "Approve Gate Pass" : "Reject Gate Pass"}
        </h2>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Notes
        </label>
        <textarea
          className="w-full border border-gray-200 rounded-lg p-3 text-sm text-gray-600 placeholder-gray-400 resize-y min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="Add notes (optional)..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-md bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(notes)}
            className="px-6 py-2.5 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionModal;
