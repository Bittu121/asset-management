"use client";

import { useState } from "react";

export default function AddDepartmentModal({ isOpen, onClose, onAdd }: any) {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    head: "",
  });

  if (!isOpen) return null;

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onAdd(formData);
    setFormData({ name: "", code: "", head: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Add Department</h2>

        <div className="space-y-4">
          <input
            name="name"
            placeholder="Department Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />

          <input
            name="code"
            placeholder="Cost Center Code"
            value={formData.code}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />

          <input
            name="head"
            placeholder="Department Head Email"
            value={formData.head}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="flex justify-end gap-2 mt-5">
          <button onClick={onClose} className="border px-4 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
