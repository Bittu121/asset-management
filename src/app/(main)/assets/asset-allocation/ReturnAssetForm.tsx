"use client";
import { useState } from "react";

export default function ReturnAssetForm({ onSubmit, onClose }: any) {
  const [form, setForm] = useState({
    condition: "Good",
    notes: "",
  });

  const conditions = ["Good", "Fair", "Poor", "Damaged"];

  return (
    <div className="space-y-5">
      <Select
        label="Return Condition"
        value={form.condition}
        options={conditions}
        onChange={(v) => setForm({ ...form, condition: v })}
      />

      <Textarea
        label="Return Notes"
        value={form.notes}
        onChange={(v) => setForm({ ...form, notes: v })}
        placeholder="Any notes about the return..."
      />

      <div className="flex justify-end gap-3 pt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm rounded-md border border-gray-200 hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          onClick={() => onSubmit(form)}
          className="px-5 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          Return Asset
        </button>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text" }: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-gray-600">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}

function Textarea({ label, value, onChange, placeholder }: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-gray-600">{label}</label>
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}

function Select({ label, value, options, onChange, placeholder }: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-gray-600">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="">{placeholder || "Select"}</option>
        {options.map((opt: string, i: number) => (
          <option key={i}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
