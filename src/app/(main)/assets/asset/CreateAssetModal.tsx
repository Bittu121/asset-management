"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

export type Asset = {
  id?: number;

  // Basic
  assetTag: string;
  serialNumber: string;
  category: string;
  subcategory: string;
  manufacturer: string;
  model: string;

  // Financial
  vendor: string;
  purchaseDate: string;
  purchaseCost: string;

  // Specs
  os: string;
  processor: string;
  ram: string;

  // Network
  hostname: string;
  ipAddress: string;
};

const steps = ["Basic", "Financial", "Specs", "Network"];

const emptyForm: Asset = {
  assetTag: "",
  serialNumber: "",
  category: "",
  subcategory: "",
  manufacturer: "",
  model: "",

  vendor: "",
  purchaseDate: "",
  purchaseCost: "",

  os: "",
  processor: "",
  ram: "",

  hostname: "",
  ipAddress: "",
};

export default function CreateAssetModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: any) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Asset>(emptyForm);

  // 🔥 Handle Create + Update
  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm(emptyForm);
    }
  }, [initialData]);

  const handleChange = (key: keyof Asset, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const next = () => setStep((prev) => prev + 1);
  const prev = () => setStep((prev) => prev - 1);

  const handleSubmit = () => {
    onSubmit(form);
    onClose();
    setStep(0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {initialData ? "Update Asset" : "Create Asset"}
            </h2>
            <p className="text-xs text-gray-500">
              Step {step + 1} of {steps.length}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        <div className="h-px bg-gray-100 mb-4" />

        {/* Stepper */}
        <div className="flex gap-2 mb-5">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`px-3 py-1.5 text-xs rounded-md ${
                step === i
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {s}
            </div>
          ))}
        </div>

        {/* FORM */}
        <div className="space-y-3">
          {/* BASIC */}
          {step === 0 && (
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="Asset Tag"
                value={form.assetTag}
                onChange={(v) => handleChange("assetTag", v)}
              />
              <Input
                placeholder="Serial Number"
                value={form.serialNumber}
                onChange={(v) => handleChange("serialNumber", v)}
              />
              <Input
                placeholder="Category"
                value={form.category}
                onChange={(v) => handleChange("category", v)}
              />
              <Input
                placeholder="Subcategory"
                value={form.subcategory}
                onChange={(v) => handleChange("subcategory", v)}
              />
              <Input
                placeholder="Manufacturer"
                value={form.manufacturer}
                onChange={(v) => handleChange("manufacturer", v)}
              />
              <Input
                placeholder="Model"
                value={form.model}
                onChange={(v) => handleChange("model", v)}
              />
            </div>
          )}

          {/* FINANCIAL */}
          {step === 1 && (
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="Vendor"
                value={form.vendor}
                onChange={(v) => handleChange("vendor", v)}
              />
              <Input
                type="date"
                value={form.purchaseDate}
                onChange={(v) => handleChange("purchaseDate", v)}
              />
              <Input
                placeholder="Purchase Cost"
                value={form.purchaseCost}
                onChange={(v) => handleChange("purchaseCost", v)}
              />
            </div>
          )}

          {/* SPECS */}
          {step === 2 && (
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="Operating System"
                value={form.os}
                onChange={(v) => handleChange("os", v)}
              />
              <Input
                placeholder="Processor"
                value={form.processor}
                onChange={(v) => handleChange("processor", v)}
              />
              <Input
                placeholder="RAM"
                value={form.ram}
                onChange={(v) => handleChange("ram", v)}
              />
            </div>
          )}

          {/* NETWORK */}
          {step === 3 && (
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="Hostname"
                value={form.hostname}
                onChange={(v) => handleChange("hostname", v)}
              />
              <Input
                placeholder="IP Address"
                value={form.ipAddress}
                onChange={(v) => handleChange("ipAddress", v)}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between mt-6">
          <div>
            {step > 0 && (
              <button
                onClick={prev}
                className="px-4 py-2 text-sm rounded-md border border-gray-200 hover:bg-gray-50"
              >
                Previous
              </button>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-md border border-gray-200 hover:bg-gray-50"
            >
              Cancel
            </button>

            {step < steps.length - 1 ? (
              <button
                onClick={next}
                className="px-4 py-2 text-sm rounded-md bg-gray-900 text-white hover:bg-gray-800"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-sm rounded-md bg-gray-900 text-white hover:bg-gray-800"
              >
                {initialData ? "Update" : "Create"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Input Component */
function Input({ placeholder, value, onChange, type = "text" }: any) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
    />
  );
}
