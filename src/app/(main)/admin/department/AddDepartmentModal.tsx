"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function AddDepartmentModal({ isOpen, onClose, onAdd }: any) {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
  });

  if (!isOpen) return null;

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onAdd(formData);
    setFormData({ name: "", code: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Add Department
          </h2>

          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Light Divider */}
        <div className="h-px bg-gray-100 mb-5"></div>
        <div className="space-y-3">
          <input
            name="name"
            placeholder="Department name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />

          <input
            name="code"
            placeholder="Cost center code"
            value={formData.code}
            onChange={handleChange}
            className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md border border-gray-200 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm rounded-md bg-gray-900 text-white hover:bg-gray-800"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
