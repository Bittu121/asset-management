"use client";
import React, { useState, useRef, useEffect } from "react";

interface NewGatePassForm {
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
}

interface GatePassRequestModalProps {
  onClose: () => void;
  onSubmit: (form: NewGatePassForm) => void;
  assets: string[];
}

const GatePassRequestModal: React.FC<GatePassRequestModalProps> = ({
  onClose,
  onSubmit,
  assets,
}) => {
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
    const handler = (e: MouseEvent) => {
      if (assetRef.current && !assetRef.current.contains(e.target as Node))
        setAssetOpen(false);
      if (
        movementRef.current &&
        !movementRef.current.contains(e.target as Node)
      )
        setMovementOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const set = (key: keyof NewGatePassForm, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const showAdditionalFields = form.movementType !== "";
  const isOUT = form.movementType === "OUT (leaving premises)";
  const isIN = form.movementType === "IN (arriving / returning)";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-50 px-8 py-6 rounded-t-2xl flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Gate Pass Request
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Create and manage entry or exit permissions effortlessly
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-black-800 text-xl font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-8 py-6 flex-1">
          <div className="border border-gray-200 rounded-xl p-6 bg-white">
            {/* Row 1: Asset + Movement Type */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Asset Dropdown */}
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
                      assetOpen
                        ? "border-indigo-500 ring-2 ring-indigo-200"
                        : "border-gray-200"
                    }`}
                  >
                    <span
                      className={form.asset ? "text-gray-800" : "text-gray-400"}
                    >
                      {form.asset || "Select Asset"}
                    </span>
                    <span className="text-gray-400">▾</span>
                  </button>
                  {assetOpen && (
                    <div className="absolute z-50 top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-56 overflow-y-auto">
                      <div
                        className="px-4 py-2.5 text-sm bg-gray-500 text-white cursor-pointer"
                        onClick={() => {
                          set("asset", "");
                          setAssetOpen(false);
                        }}
                      >
                        Select Asset
                      </div>
                      {assets.map((a) => (
                        <div
                          key={a}
                          className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            set("asset", a);
                            setAssetOpen(false);
                          }}
                        >
                          {a}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Movement Type Dropdown */}
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
                      movementOpen
                        ? "border-indigo-500 ring-2 ring-indigo-200"
                        : "border-gray-200"
                    }`}
                  >
                    <span
                      className={
                        form.movementType ? "text-gray-800" : "text-gray-400"
                      }
                    >
                      {form.movementType || "Select Movement Type"}
                    </span>
                    <span className="text-gray-400">▾</span>
                  </button>
                  {movementOpen && (
                    <div className="absolute z-50 top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                      <div
                        className="px-4 py-2.5 text-sm bg-gray-500 text-white cursor-pointer"
                        onClick={() => {
                          set("movementType", "");
                          setMovementOpen(false);
                        }}
                      >
                        Select Movement Type
                      </div>
                      {[
                        "OUT (leaving premises)",
                        "IN (arriving / returning)",
                      ].map((m) => (
                        <div
                          key={m}
                          className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            set("movementType", m);
                            setMovementOpen(false);
                          }}
                        >
                          {m}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Purpose */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-500 mb-1">
                Purpose <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-gray-50 min-h-[90px] resize-y"
                placeholder="Reason For Movement..."
                value={form.purpose}
                onChange={(e) => set("purpose", e.target.value)}
              />
            </div>

            {/* Additional Fields */}
            {!showAdditionalFields && (
              <div className="border border-dashed border-gray-200 rounded-lg p-6 text-center text-gray-400 text-sm">
                Please select a Movement Type above to see additional fields
              </div>
            )}

            {(isOUT || isIN) && (
              <>
                {/* From / To */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">
                      From Location
                    </label>
                    <input
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-gray-50"
                      placeholder={
                        isOUT ? "e.g. Server Room" : "e.g. Client Site"
                      }
                      value={form.fromLocation}
                      onChange={(e) => set("fromLocation", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">
                      TO Location
                    </label>
                    <input
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-gray-50"
                      placeholder={
                        isOUT ? "e.g. Client Site" : "e.g. Server Room"
                      }
                      value={form.toLocation}
                      onChange={(e) => set("toLocation", e.target.value)}
                    />
                  </div>
                </div>

                {/* Carrier Name / Contact */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">
                      Carrier Name
                    </label>
                    <input
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-gray-50"
                      placeholder="e.g. Shubham"
                      value={form.carrierName}
                      onChange={(e) => set("carrierName", e.target.value)}
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
                      onChange={(e) => set("carrierContact", e.target.value)}
                    />
                  </div>
                </div>

                {/* Carrier ID Proof */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Carrier ID Proof
                  </label>
                  <input
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-gray-50"
                    placeholder="e.g. Aadhar No. / Employee ID / Email"
                    value={form.carrierIdProof}
                    onChange={(e) => set("carrierIdProof", e.target.value)}
                  />
                </div>

                {/* Expected Return — only for OUT */}
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
                        onChange={(e) =>
                          set("expectedReturnDate", e.target.value)
                        }
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
                        onChange={(e) =>
                          set("expectedReturnTime", e.target.value)
                        }
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 flex justify-end gap-4 bg-white border-t border-gray-100 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-700 font-normal bg-gray-100 rounded-md cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(form)}
            className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md cursor-pointer font-normal hover:bg-indigo-700 transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default GatePassRequestModal;
