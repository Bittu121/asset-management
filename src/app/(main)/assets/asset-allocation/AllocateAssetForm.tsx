"use client";
import { useState } from "react";

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
  onSubmit: (data: { assetId: number; userId: number; returnDate: string; notes: string }) => void;
  onClose: () => void;
};

export default function AllocateAssetForm({ assets, users, onSubmit, onClose }: Props) {
  const [form, setForm] = useState({
    assetId: "",
    userId: "",
    returnDate: "",
    notes: "",
  });

  const availableAssets = assets.filter((a) => a.status === "AVAILABLE");

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const canSubmit = form.assetId !== "" && form.userId !== "" && form.returnDate !== "";

  return (
    <div className="space-y-5">
      <Select
        label="Asset *"
        value={form.assetId}
        options={availableAssets.map((a) => ({ label: `${a.assetTag} - ${a.assetName}`, value: `${a.id}` }))}
        onChange={(v: string) => handleChange("assetId", v)}
        placeholder="Select an asset"
      />

      <Select
        label="User *"
        value={form.userId}
        options={users.map((u) => ({ label: u.name, value: `${u.id}` }))}
        onChange={(v: string) => handleChange("userId", v)}
        placeholder="Select a user"
      />

      <Input
        label="Expected Return Date"
        type="date"
        value={form.returnDate}
        onChange={(v: string) => handleChange("returnDate", v)}
      />

      <Textarea
        label="Notes"
        value={form.notes}
        onChange={(v: string) => handleChange("notes", v)}
      />

      {/* Footer */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm rounded-md border border-gray-200 hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            if (!canSubmit) return;
            onSubmit({
              assetId: Number(form.assetId),
              userId: Number(form.userId),
              returnDate: form.returnDate,
              notes: form.notes,
            });
          }}
          disabled={!canSubmit}
          className={`px-5 py-2 text-sm rounded-md text-white ${
            canSubmit ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"
          }`}
        >
          Allocate
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
        {options.map((opt: any, i: number) => (
          <option key={i} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
