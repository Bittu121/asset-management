"use client";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

function UpdateLocation({ isOpen, onClose, selectedLocation, onUpdate }: any) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    isActive: true,
  });
  const cities = [
    { label: "Mumbai" },
    { label: "Delhi" },
    { label: "Bangalore" },
    { label: "Hyderabad" },
    { label: "Chennai" },
    { label: "Kolkata" },
    { label: "Pune" },
    { label: "Ahmedabad" },
  ];

  useEffect(() => {
    if (selectedLocation) {
      setFormData(selectedLocation);
    }
  }, [selectedLocation]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden">
          <div className="bg-indigo-50 px-6 py-5 flex justify-between items-start">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Update Location
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Update location details
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
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-500 mb-1">
                  Location Name <span className="text-red-500">*</span>
                </label>
                <input
                  value={formData.name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Location name"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-500 mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.address || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="Address"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 min-h-[70px]"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-semibold text-gray-500 mb-1">
                  City <span className="text-red-500">*</span>
                </label>

                <Autocomplete
                  options={cities}
                  value={cities.find((c) => c.label === formData.city) || null}
                  onChange={(e, value) =>
                    setFormData((prev) => ({
                      ...prev,
                      city: value?.label || "",
                    }))
                  }
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select City"
                      size="small"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "0.5rem",
                          backgroundColor: "#f9fafb",
                          height: "42px",

                          "& fieldset": {
                            borderColor: "#e5e7eb",
                          },

                          "&:hover fieldset": {
                            borderColor: "#e5e7eb",
                          },

                          "&.Mui-focused": {
                            boxShadow: "0 0 0 2px rgba(199,210,254,0.8)",
                          },

                          "&.Mui-focused fieldset": {
                            borderColor: "#c7d2fe",
                          },

                          "& input": {
                            padding: "10px 16px",
                            fontSize: "14px",
                            color: "#374151",
                          },

                          "& .MuiAutocomplete-endAdornment": {
                            top: "50%",
                            transform: "translateY(-50%)",
                          },
                        },
                      }}
                    />
                  )}
                />
              </div>

              {/* Active Toggle */}
              <div className="flex justify-between items-center border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-50 mt-5">
                <span className="text-sm font-semibold text-gray-500">
                  Active Status
                </span>

                <button
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      isActive: !prev.isActive,
                    }))
                  }
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition ${
                    formData.isActive ? "bg-indigo-600" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                      formData.isActive ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 flex justify-end gap-3 bg-white border-t border-gray-100">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                onUpdate(formData);
                onClose();
              }}
              className="px-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateLocation;
