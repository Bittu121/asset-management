"use client";

import { useEffect, useState } from "react";

export default function UpdateDepartmentModal({
  isOpen,
  onClose,
  department,
  onUpdate,
}: any) {
  const [form, setForm] = useState({
    departmentName: "",
    code: "",
  });

  useEffect(() => {
    if (department) setForm(department);
  }, [department]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-50 px-6 py-5 flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Update Department
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Update department details
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
          <div className="space-y-3">
            {/* Department Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-500 mb-1">
                Department Name <span className="text-red-500">*</span>
              </label>
              <input
                value={form.departmentName || ""}
                onChange={(e) =>
                  setForm({ ...form, departmentName: e.target.value })
                }
                placeholder="Department name"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            {/* Code */}
            <div>
              <label className="block text-sm font-semibold text-gray-500 mb-1">
                Cost Center Code
              </label>
              <input
                value={form.code || ""}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                placeholder="Cost center code"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 flex justify-end gap-3 bg-white border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onUpdate(form);
              onClose();
            }}
            className="px-4 py-2 text-sm bg-indigo-500 text-white rounded-md hover:bg-indigo-700"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
