"use client";

import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

function UpdateSubDepartment({
  isOpen,
  onClose,
  selectedSubDepartment,
  onUpdate,
  departmentName,
  manager,
}: any) {
  const [form, setForm] = useState({
    subDepartmentName: "",
    departmentName: "",
    manager: "",
    description: "",
    isActive: true,
  });

  useEffect(() => {
    if (selectedSubDepartment) {
      setForm(selectedSubDepartment);
    }
  }, [selectedSubDepartment]);

  if (!isOpen) return null;

  const deptOptions = departmentName
    .filter((d: any) => d.name && d.name.trim() !== "")
    .map((d: any) => ({ id: d.id, label: d.name }));

  const managerOptions = manager
    .filter((m: any) => m.name && m.name.trim() !== "")
    .map((m: any) => ({ id: m.id, label: m.name }));

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden">
        <div className="bg-indigo-50 px-6 py-5 flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Update Sub Department
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Update sub department details
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
                Sub Department Name <span className="text-red-500">*</span>
              </label>
              <input
                value={form.subDepartmentName || ""}
                onChange={(e) =>
                  setForm({ ...form, subDepartmentName: e.target.value })
                }
                placeholder="Sub Department Name"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-semibold text-gray-500 mb-1">
                Department <span className="text-red-500">*</span>
              </label>

              <Autocomplete
                options={deptOptions}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(o, v) => o.id === v.id}
                value={
                  deptOptions.find(
                    (d: any) => d.label === form.departmentName,
                  ) || null
                }
                onChange={(e, value) =>
                  setForm((prev) => ({
                    ...prev,
                    departmentName: value?.label || "",
                  }))
                }
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select Department"
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "0.5rem",
                        backgroundColor: "#f9fafb",
                        height: "42px",
                        "& fieldset": { borderColor: "#e5e7eb" },
                        "&:hover fieldset": { borderColor: "#e5e7eb" },
                        "&.Mui-focused": {
                          boxShadow: "0 0 0 2px rgba(199,210,254,0.8)",
                        },
                        "& input": {
                          padding: "10px 16px",
                          fontSize: "14px",
                        },
                      },
                    }}
                  />
                )}
              />
            </div>

            {/* Manager */}
            <div>
              <label className="block text-sm font-semibold text-gray-500 mb-1">
                Manager
              </label>

              <Autocomplete
                options={managerOptions}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(o, v) => o.id === v.id}
                value={
                  managerOptions.find((m) => m.label === form.manager) || null
                }
                onChange={(e, value) =>
                  setForm((prev) => ({
                    ...prev,
                    manager: value?.label || "",
                  }))
                }
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select Manager"
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "0.5rem",
                        backgroundColor: "#f9fafb",
                        height: "42px",
                        "& fieldset": { borderColor: "#e5e7eb" },
                        "&:hover fieldset": { borderColor: "#e5e7eb" },
                        "&.Mui-focused": {
                          boxShadow: "0 0 0 2px rgba(199,210,254,0.8)",
                        },
                        "& input": {
                          padding: "10px 16px",
                          fontSize: "14px",
                        },
                      },
                    }}
                  />
                )}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-500 mb-1">
                Description
              </label>
              <textarea
                value={form.description || ""}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Description"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            {/* Toggle */}
            <div className="flex justify-between items-center border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-50 mt-5">
              <span className="text-sm font-semibold text-gray-500">
                Active Status
              </span>

              <button
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    isActive: !prev.isActive,
                  }))
                }
                className={`w-11 h-6 flex items-center rounded-full p-1 transition ${
                  form.isActive ? "bg-indigo-600" : "bg-gray-300"
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
              onUpdate(form);
              onClose();
            }}
            className="px-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateSubDepartment;
