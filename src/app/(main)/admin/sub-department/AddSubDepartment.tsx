"use client";

import React, { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

function AddSubDepartment({ isOpen, onClose, onAdd, departments }: any) {
  const [formData, setFormData] = useState({
    subDepartmentName: "",
    departmentId: "",
    departmentName: "",
    manager: "",
    description: "",
    isActive: true,
  });

  if (!isOpen) return null;

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.subDepartmentName || !formData.departmentId || !formData.departmentName) {
      alert("Please fill all required fields");
      return;
    }

    onAdd(formData);
    setFormData({
      subDepartmentName: "",
      departmentId: "",
      departmentName: "",
      manager: "",
      description: "",
      isActive: true,
    });
    onClose();
  };

  const deptOptions = departments.map((d: any) => ({
    id: d._id,
    label: d.departmentName,
  }));

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-50 px-6 py-5 flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Add Sub Department</h2>
            <p className="text-gray-500 text-sm mt-1">Create a new sub department</p>
          </div>

          <button onClick={onClose} className="text-black text-xl font-bold cursor-pointer">
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
                name="subDepartmentName"
                value={formData.subDepartmentName}
                onChange={handleChange}
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
                getOptionLabel={(option: any) => option.label}
                isOptionEqualToValue={(option, value: any) => option.id === value.id}
                value={deptOptions.find((d: any) => d.id === formData.departmentId) || null}
                onChange={(e, value) =>
                  setFormData((prev) => ({
                    ...prev,
                    departmentId: value?.id || "",
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
                Manager{" "}
                <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-md">
                  Optional
                </span>
              </label>
              <input
                name="manager"
                value={formData.manager}
                onChange={handleChange}
                placeholder="Manager email"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-500 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Description"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 min-h-[70px]"
              />
            </div>

            {/* Toggle */}
            <div className="flex justify-between items-center border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-50 mt-5">
              <span className="text-sm font-semibold text-gray-500">Active Status</span>

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
            className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm bg-indigo-500 text-white rounded-md hover:bg-indigo-700"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddSubDepartment;
