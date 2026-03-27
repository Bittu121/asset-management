"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function UpdateDepartmentModal({
  isOpen,
  onClose,
  department,
  onUpdate,
}: any) {
  const [form, setForm] = useState({
    name: "",
    code: "",
    head: "",
  });

  useEffect(() => {
    if (department) setForm(department);
  }, [department]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Update Department
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
            value={form.name}
            placeholder="Department name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />

          <input
            value={form.code}
            placeholder="Cost center code"
            onChange={(e) => setForm({ ...form, code: e.target.value })}
            className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />

          <input
            value={form.head}
            placeholder="Department head email"
            onChange={(e) => setForm({ ...form, head: e.target.value })}
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
            onClick={() => {
              onUpdate(form);
              onClose();
            }}
            className="px-4 py-2 text-sm rounded-md bg-gray-900 text-white hover:bg-gray-800"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
