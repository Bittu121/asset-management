"use client";

import { useEffect, useState } from "react";

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
    if (department) {
      setForm(department);
    }
  }, [department]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Update Department</h2>

        <div className="space-y-3">
          <input
            value={form.name}
            className="w-full border p-2 rounded"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            value={form.code}
            className="w-full border p-2 rounded"
            onChange={(e) => setForm({ ...form, code: e.target.value })}
          />
          <input
            value={form.head}
            className="w-full border p-2 rounded"
            onChange={(e) => setForm({ ...form, head: e.target.value })}
          />
        </div>

        <div className="flex justify-end gap-2 mt-5">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={() => {
              onUpdate(form);
              onClose();
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
