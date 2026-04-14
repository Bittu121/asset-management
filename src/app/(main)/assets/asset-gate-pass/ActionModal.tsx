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
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg overflow-hidden">
        <div className="bg-indigo-50 px-6 py-5 flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {type === "approve" ? "Approve Gate Pass" : "Reject Gate Pass"}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {type === "approve"
                ? "Approve this gate pass request"
                : "Reject this gate pass request"}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-black text-xl font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes"
              rows={4}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 flex justify-end gap-3 bg-white">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={() => onConfirm(notes)}
            className="px-4 py-2 text-sm bg-indigo-500 text-white rounded-md hover:bg-indigo-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionModal;
