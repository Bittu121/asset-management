"use client";

import { useState, useRef, useEffect } from "react";
import { FiX, FiChevronDown } from "react-icons/fi";

type NewGatePassForm = {
  asset: string;
  movementType: string;
  purpose: string;
  fromLocation: string;
  toLocation: string;
  carrierName: string;
  carrierContact: string;
  carrierIdProof: string;
  expectedReturnDate: string;
  expectedReturnTime: string;
};

type Props = {
  onClose: () => void;
  onSubmit: (form: NewGatePassForm) => void;
  assets: string[];
  isLoading?: boolean;
};

const MOVEMENT_OPTIONS = ["OUT (leaving premises)", "IN (arriving / returning)"];

export default function GatePassRequestModal({
  onClose,
  onSubmit,
  assets,
  isLoading = false,
}: Props) {
  const [form, setForm] = useState<NewGatePassForm>({
    asset: "",
    movementType: "",
    purpose: "",
    fromLocation: "",
    toLocation: "",
    carrierName: "",
    carrierContact: "",
    carrierIdProof: "",
    expectedReturnDate: "",
    expectedReturnTime: "",
  });

  const [assetOpen, setAssetOpen] = useState(false);
  const [movementOpen, setMovementOpen] = useState(false);

  const assetRef = useRef<HTMLDivElement>(null);
  const movementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (assetRef.current && !assetRef.current.contains(event.target as Node)) {
        setAssetOpen(false);
      }
      if (movementRef.current && !movementRef.current.contains(event.target as Node)) {
        setMovementOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function updateField(key: keyof NewGatePassForm, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const movementSelected = form.movementType !== "";
  const isOUT = form.movementType === "OUT (leaving premises)";
  const isIN = form.movementType === "IN (arriving / returning)";

  // Submit is only allowed when required fields are filled and not already loading
  const canSubmit =
    form.asset !== "" && form.movementType !== "" && form.purpose.trim() !== "" && !isLoading;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[95vh] overflow-hidden">
        <div className="bg-indigo-50 px-8 py-6 rounded-t-2xl flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Gate Pass Request</h2>
            <p className="text-gray-500 text-sm mt-1">
              Create and manage entry or exit permissions effortlessly
            </p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 cursor-pointer">
            <FiX size={18} />
          </button>
        </div>

        <div className="overflow-y-auto px-8 py-6 flex-1">
          <div className="border border-gray-200 rounded-xl p-6 bg-white">
            {/* Row 1: Asset selector + Movement type selector */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Asset dropdown */}
              <div ref={assetRef}>
                <label className="block text-sm font-semibold text-gray-500 mb-1">
                  Asset <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setAssetOpen(!assetOpen);
                      setMovementOpen(false);
                    }}
                    className={`w-full flex justify-between items-center border rounded-lg px-4 py-2.5 text-sm bg-white text-gray-700 font-medium focus:outline-none ${
                      assetOpen ? "border-indigo-500 ring-2 ring-indigo-200" : "border-gray-200"
                    }`}
                  >
                    <span className={form.asset ? "text-gray-800" : "text-gray-400"}>
                      {form.asset || "Select Asset"}
                    </span>
                    <FiChevronDown size={14} className="text-gray-400" />
                  </button>

                  {assetOpen && (
                    <div className="absolute z-50 top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-56 overflow-y-auto">
                      {/* Clear selection option */}
                      <div
                        className="px-4 py-2.5 text-sm bg-gray-500 text-white cursor-pointer"
                        onClick={() => {
                          updateField("asset", "");
                          setAssetOpen(false);
                        }}
                      >
                        Select Asset
                      </div>
                      {/* Asset list */}
                      {assets.map((asset) => (
                        <div
                          key={asset}
                          className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            updateField("asset", asset);
                            setAssetOpen(false);
                          }}
                        >
                          {asset}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Movement type dropdown */}
              <div ref={movementRef}>
                <label className="block text-sm font-semibold text-gray-500 mb-1">
                  Movement Type <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setMovementOpen(!movementOpen);
                      setAssetOpen(false);
                    }}
                    className={`w-full flex justify-between items-center border rounded-lg px-4 py-2.5 text-sm bg-white text-gray-700 font-medium focus:outline-none ${
                      movementOpen ? "border-indigo-500 ring-2 ring-indigo-200" : "border-gray-200"
                    }`}
                  >
                    <span className={form.movementType ? "text-gray-800" : "text-gray-400"}>
                      {form.movementType || "Select Movement Type"}
                    </span>
                    <FiChevronDown size={14} className="text-gray-400" />
                  </button>

                  {movementOpen && (
                    <div className="absolute z-50 top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                      {/* Clear selection option */}
                      <div
                        className="px-4 py-2.5 text-sm bg-gray-500 text-white cursor-pointer"
                        onClick={() => {
                          updateField("movementType", "");
                          setMovementOpen(false);
                        }}
                      >
                        Select Movement Type
                      </div>
                      {/* Movement options */}
                      {MOVEMENT_OPTIONS.map((option) => (
                        <div
                          key={option}
                          className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            updateField("movementType", option);
                            setMovementOpen(false);
                          }}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Purpose text area */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-500 mb-1">
                Purpose <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-gray-50 min-h-24 resize-y"
                placeholder="Reason For Movement..."
                value={form.purpose}
                onChange={(e) => updateField("purpose", e.target.value)}
              />
            </div>

            {/* Placeholder shown until movement type is chosen */}
            {!movementSelected && (
              <div className="border border-dashed border-gray-200 rounded-lg p-6 text-center text-gray-400 text-sm">
                Please select a Movement Type above to see additional fields
              </div>
            )}

            {/* Additional fields — shown only when a movement type is selected */}
            {(isOUT || isIN) && (
              <>
                {/* From / To locations */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">
                      From Location
                    </label>
                    <input
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-gray-50"
                      placeholder={isOUT ? "e.g. Server Room" : "e.g. Client Site"}
                      value={form.fromLocation}
                      onChange={(e) => updateField("fromLocation", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">
                      To Location
                    </label>
                    <input
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-gray-50"
                      placeholder={isOUT ? "e.g. Client Site" : "e.g. Server Room"}
                      value={form.toLocation}
                      onChange={(e) => updateField("toLocation", e.target.value)}
                    />
                  </div>
                </div>

                {/* Carrier name and contact */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">
                      Carrier Name
                    </label>
                    <input
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-gray-50"
                      placeholder="e.g. Shubham"
                      value={form.carrierName}
                      onChange={(e) => updateField("carrierName", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">
                      Carrier Contact
                    </label>
                    <input
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-gray-50"
                      placeholder="e.g. 4125487451"
                      value={form.carrierContact}
                      onChange={(e) => updateField("carrierContact", e.target.value)}
                    />
                  </div>
                </div>

                {/* Carrier ID proof */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Carrier ID Proof
                  </label>
                  <input
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-gray-50"
                    placeholder="e.g. Aadhar No. / Employee ID / Email"
                    value={form.carrierIdProof}
                    onChange={(e) => updateField("carrierIdProof", e.target.value)}
                  />
                </div>

                {/* Expected return date and time — only for OUT movements */}
                {isOUT && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1">
                        Expected Return Date
                      </label>
                      <input
                        type="date"
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-gray-50"
                        value={form.expectedReturnDate}
                        onChange={(e) => updateField("expectedReturnDate", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1">
                        Expected Return Time
                      </label>
                      <input
                        type="time"
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-gray-50"
                        value={form.expectedReturnTime}
                        onChange={(e) => updateField("expectedReturnTime", e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Footer action buttons */}
        <div className="px-8 py-5 flex justify-end gap-4 bg-white border-t border-gray-100 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => canSubmit && onSubmit(form)}
            disabled={!canSubmit}
            className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
