"use client";
import { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";

const steps = ["Basic", "Financial", "Specs", "Network"];

const osOptions = ["Windows", "Linux", "macOS", "Android", "iOS", "Other"];
const ramOptions = ["2GB", "4GB", "8GB", "16GB", "32GB", "64GB", "128GB"];

const defaultForm = {
  assetTag: "",
  serialNumber: "",
  category: "",
  subCategory: "",
  assetType: "",
  manufacturer: "",
  model: "",
  device: "",
  isActive: true,
  description: "",
  vendor: "",
  purchaseOrderId: "",
  purchaseDate: "",
  purchaseCost: "",
  currentValue: "",
  warrantyExpiry: "",
  amcExpiry: "",
  os: "",
  osVersion: "",
  processor: "",
  ram: "",
  storageSize: "",
  hostname: "",
  ipAddress: "",
  macAddress: "",
};

const muiStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "0.375rem",
    backgroundColor: "#ffffff",
    height: "42px",
    "& fieldset": { borderColor: "#e5e7eb" },
    "&:hover fieldset": { borderColor: "#9ca3af" },
    "&.Mui-focused": { boxShadow: "0 0 0 1px rgba(156,163,175,0.4)" },
    "&.Mui-focused fieldset": { borderColor: "#9ca3af" },
    "& input": { padding: "10px 14px", fontSize: "14px", color: "#374151" },
    "& .MuiAutocomplete-endAdornment": {
      top: "50%",
      transform: "translateY(-50%)",
    },
  },
};

export default function AssetForm({
  initialData,
  onSubmit,
  onClose,
  isEdit,
  loading,
  assetCategories = [],
  subCategories = [],
  vendors = [],
}: any) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (initialData) {
      setForm({
        ...defaultForm,
        ...initialData,
        // Normalize populated objects → _id strings
        category: initialData.category?._id || initialData.category || "",
        subCategory: initialData.subCategory?._id || initialData.subCategory || "",
        assetType: initialData.assetType?._id || initialData.assetType || "",
        vendor: initialData.vendor?._id || initialData.vendor || "",
      });
    } else {
      setForm(defaultForm);
      setStep(0);
    }
  }, [initialData]);

  const handleChange = (key: string, value: any) => setForm((prev) => ({ ...prev, [key]: value }));

  // Sub-categories filtered by selected category
  const filteredSubs = subCategories.filter((s: any) => s.category?._id === form.category);

  const selectedCategory = assetCategories.find((c: any) => c._id === form.category) || null;
  const selectedSubCategory = filteredSubs.find((s: any) => s._id === form.subCategory) || null;
  const selectedVendor = vendors.find((v: any) => v._id === form.vendor) || null;

  const nextStep = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };
  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Asset Tag *"
                placeholder="e.g. LAP-001"
                value={form.assetTag}
                onChange={(v: string) => handleChange("assetTag", v)}
                disabled={loading}
              />
              <Input
                label="Serial Number *"
                placeholder="e.g. SN12345"
                value={form.serialNumber}
                onChange={(v: string) => handleChange("serialNumber", v)}
                disabled={loading}
              />

              {/* Category */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-600">Category *</label>
                <Autocomplete
                  options={assetCategories}
                  getOptionLabel={(option: any) => option?.name || ""}
                  isOptionEqualToValue={(o: any, v: any) => o._id === v._id}
                  value={selectedCategory}
                  onChange={(_e, val: any) => {
                    handleChange("category", val?._id || "");
                    handleChange("subCategory", "");
                  }}
                  disabled={loading}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select category"
                      size="small"
                      sx={muiStyle}
                    />
                  )}
                />
              </div>

              {/* Sub-category */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-600">Sub Category</label>
                <Autocomplete
                  options={filteredSubs}
                  getOptionLabel={(option: any) => option?.name || ""}
                  isOptionEqualToValue={(o: any, v: any) => o._id === v._id}
                  value={selectedSubCategory}
                  onChange={(_e, val: any) => handleChange("subCategory", val?._id || "")}
                  disabled={loading || !form.category}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder={form.category ? "Select sub category" : "Select category first"}
                      size="small"
                      sx={muiStyle}
                    />
                  )}
                />
              </div>

              <Input
                label="Manufacturer"
                placeholder="e.g. Dell, HP, Apple"
                value={form.manufacturer}
                onChange={(v: string) => handleChange("manufacturer", v)}
                disabled={loading}
              />
              <Input
                label="Model"
                placeholder="e.g. EliteBook 840"
                value={form.model}
                onChange={(v: string) => handleChange("model", v)}
                disabled={loading}
              />
              <Input
                label="Device Name"
                placeholder="e.g. HP EliteBook 840 G9"
                value={form.device}
                onChange={(v: string) => handleChange("device", v)}
                disabled={loading}
              />

              {/* Active toggle */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-600">Status</label>
                <div className="flex items-center justify-between w-full px-3 py-2.5 rounded-md border border-gray-200">
                  <span className="text-sm text-gray-500">Active</span>
                  <button
                    type="button"
                    onClick={() => handleChange("isActive", !form.isActive)}
                    disabled={loading}
                    className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
                      form.isActive ? "bg-green-500" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                        form.isActive ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <textarea
              placeholder="Description (optional)"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              disabled={loading}
              className="w-full px-3 py-2.5 mt-4 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 resize-none"
              rows={3}
            />
          </>
        );

      case 1:
        return (
          <div className="grid grid-cols-2 gap-4">
            {/* Vendor */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-600">Vendor</label>
              <Autocomplete
                options={vendors}
                getOptionLabel={(option: any) => option?.vendorName || ""}
                isOptionEqualToValue={(o: any, v: any) => o._id === v._id}
                value={selectedVendor}
                onChange={(_e, val: any) => handleChange("vendor", val?._id || "")}
                disabled={loading}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select vendor" size="small" sx={muiStyle} />
                )}
              />
            </div>

            <Input
              label="Purchase Order ID"
              placeholder="e.g. PO-1001"
              value={form.purchaseOrderId}
              onChange={(v: string) => handleChange("purchaseOrderId", v)}
              disabled={loading}
            />
            <Input
              label="Purchase Date"
              type="date"
              value={form.purchaseDate}
              onChange={(v: string) => handleChange("purchaseDate", v)}
              disabled={loading}
            />
            <Input
              label="Purchase Cost (₹)"
              placeholder="e.g. 75000"
              value={form.purchaseCost}
              onChange={(v: string) => handleChange("purchaseCost", v)}
              disabled={loading}
            />
            <Input
              label="Current Value (₹)"
              placeholder="e.g. 60000"
              value={form.currentValue}
              onChange={(v: string) => handleChange("currentValue", v)}
              disabled={loading}
            />
            <Input
              label="Warranty Expiry"
              type="date"
              value={form.warrantyExpiry}
              onChange={(v: string) => handleChange("warrantyExpiry", v)}
              disabled={loading}
            />
            <Input
              label="AMC Expiry"
              type="date"
              value={form.amcExpiry}
              onChange={(v: string) => handleChange("amcExpiry", v)}
              disabled={loading}
            />
          </div>
        );

      case 2:
        return (
          <div className="grid grid-cols-2 gap-4">
            <StringDropdown
              label="OS"
              value={form.os}
              onChange={(v: string) => handleChange("os", v)}
              options={osOptions}
              placeholder="Select OS"
              disabled={loading}
            />
            <Input
              label="OS Version"
              placeholder="e.g. Windows 11 Pro"
              value={form.osVersion}
              onChange={(v: string) => handleChange("osVersion", v)}
              disabled={loading}
            />
            <Input
              label="Processor"
              placeholder="e.g. Intel Core i7-12th Gen"
              value={form.processor}
              onChange={(v: string) => handleChange("processor", v)}
              disabled={loading}
            />
            <StringDropdown
              label="RAM"
              value={form.ram}
              onChange={(v: string) => handleChange("ram", v)}
              options={ramOptions}
              placeholder="Select RAM"
              disabled={loading}
            />
            <Input
              label="Storage Size"
              placeholder="e.g. 512GB SSD"
              value={form.storageSize}
              onChange={(v: string) => handleChange("storageSize", v)}
              disabled={loading}
            />
          </div>
        );

      case 3:
        return (
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Hostname"
              placeholder="e.g. DESKTOP-01"
              value={form.hostname}
              onChange={(v: string) => handleChange("hostname", v)}
              disabled={loading}
            />
            <Input
              label="IP Address"
              placeholder="e.g. 192.168.1.10"
              value={form.ipAddress}
              onChange={(v: string) => handleChange("ipAddress", v)}
              disabled={loading}
            />
            <Input
              label="MAC Address"
              placeholder="e.g. 00:1A:2B:3C:4D:5E"
              value={form.macAddress}
              onChange={(v: string) => handleChange("macAddress", v)}
              disabled={loading}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      {/* Step indicator */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center w-96">
          {steps.map((label, i) => (
            <div key={i} className="flex items-center flex-1">
              <div
                className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                  step > i
                    ? "bg-green-500 border-green-500 text-white"
                    : step === i
                      ? "border-green-500 text-green-500 bg-white"
                      : "border-gray-300 text-gray-400 bg-white"
                }`}
                title={label}
              >
                {step > i ? "✓" : <span className="text-sm font-medium">{i + 1}</span>}
              </div>
              {i !== steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 transition-all duration-500 ${
                    step > i ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      {renderStep()}

      {/* Footer */}
      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          disabled={step === 0 || loading}
          className="px-4 py-2 border disabled:opacity-40 text-sm rounded-md border-gray-200 hover:bg-gray-50"
        >
          Previous
        </button>

        <div className="flex gap-2">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-sm rounded-md border border-gray-200 hover:bg-gray-50"
          >
            Cancel
          </button>

          {step === steps.length - 1 ? (
            <button
              onClick={() => onSubmit(form)}
              disabled={loading}
              className="px-4 py-2 text-sm rounded-md bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (isEdit ? "Updating..." : "Creating...") : isEdit ? "Update" : "Create"}
            </button>
          ) : (
            <button
              onClick={nextStep}
              disabled={loading}
              className="px-4 py-2 text-sm rounded-md bg-gray-900 text-white hover:bg-gray-800"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", placeholder, disabled }: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-gray-600">{label}</label>
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full px-3 py-2.5 rounded-md border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 disabled:opacity-60"
      />
    </div>
  );
}

function StringDropdown({ label, value, onChange, options, placeholder, disabled }: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-gray-600">{label}</label>
      <Autocomplete
        options={options}
        value={value || null}
        onChange={(_e: any, newValue: any) => onChange(newValue || "")}
        disabled={disabled}
        renderInput={(params) => (
          <TextField {...params} placeholder={placeholder} size="small" sx={muiStyle} />
        )}
      />
    </div>
  );
}
